import * as moment from 'moment';
import * as Slack from 'node-slack';
import { AlarmDetails, AlarmTrigger, Dimension } from './alarm_details';
import * as mappings from './mappings';

const markdownFormattedFields = [ 'text', 'pretext', 'fallback', 'fields'];

export const sendNotification = (client: Slack, region: string, channel: string, alarmDetails: AlarmDetails) => {
    const alarmState = mappings.mapAlarmState(alarmDetails.NewStateValue);
    const msgTitle = title(region, alarmDetails.AlarmName);

    const callback = (err: any, body: any) => console.log(err);
    client.send({
        attachments: [
            {
                color: alarmState.color,
                fallback: msgTitle,
                fields: [
                    field('State Changed', stateChangedDate(alarmDetails.StateChangeTime)),
                    field('Previous state', alarmDetails.OldStateValue),
                    field('Namepace', alarmDetails.Trigger.Namespace),
                    field('Dimensions', formatDimensions(alarmDetails.Trigger.Dimensions)),
                ],
                markdown_in: markdownFormattedFields,
                text: `${formatTrigger(alarmDetails.Trigger)}\n\n${alarmDetails.NewStateReason}`,
                title: detailsTitle(alarmState.transition, alarmDetails.AlarmDescription),
                title_link: alarmLink(alarmDetails.AlarmName, region)
            }
        ],
        channel,
        text: msgTitle,
    }, callback);
};

const detailsTitle = (transition: string, description: string): string => {
    const desc = description || 'No alarm description available';
    return `${transition}: ${desc}`;
};

const title = (region: string, alarmName: string): string => {
    return `\`${region.toUpperCase()}\` - *${alarmName}*`;
};

const alarmLink = (alarmName: string, region: string): string => {
    const encoded = encodeURIComponent(alarmName);
    return `https://${region}.console.aws.amazon.com/cloudwatch/home?region=${region}#alarm:alarmFilter=ANY;name=${encoded}`;
};

const field = (title: string, value: string, short: boolean = true) => {
    return { title, value, short };
};

const formatTrigger = (trigger: AlarmTrigger): string => {
    const operator = mappings.mapOperator(trigger.ComparisonOperator);
    const stat = mappings.mapStatistic(trigger.Statistic);
    return `Trigger: ${stat}(${trigger.MetricName}) ${operator} ${trigger.Threshold} for ${trigger.EvaluationPeriods} periods of ${trigger.Period}s`;
};

const formatDimensions = (dimensions: Dimension[]): string => {
    return dimensions.map((dimension) => `${dimension.name}: ${dimension.value}`).join('\n');
};

const stateChangedDate = (dateStr: string): string => {
    const ts = moment(dateStr).unix();
    return `<!date^${ts}^{date_num} {time_secs}|Date unavailable>`;
};
