import { ChatPostMessageParams } from '@slack/client';
import * as moment from 'moment';
import { AlarmDetails, AlarmTrigger, Dimension } from '../alarm_details';
import * as mappings from '../mappings/definitions';

const markdownFormattedFields = ['text', 'pretext', 'fallback', 'fields'];

export const buildSlackMessage = (channel: string, region: string, alarm: AlarmDetails): ChatPostMessageParams => {
    const alarmState = mappings.mapAlarmState(alarm.NewStateValue);
    const msgTitle = title(region, alarm.AlarmName);

    return {
        attachments: [
            {
                color: alarmState.color,
                fallback: msgTitle,
                fields: [
                    field('State Changed', stateChangedDate(alarm.StateChangeTime)),
                    field('Previous state', alarm.OldStateValue),
                    field('Namepace', alarm.Trigger.Namespace),
                    field('Dimensions', formatDimensions(alarm.Trigger.Dimensions)),
                ],
                mrkdwn_in: markdownFormattedFields,
                text: `${formatTrigger(alarm.Trigger)}\n\n${alarm.NewStateReason}`,
                title: detailsTitle(alarmState.transition, alarm.AlarmDescription),
                title_link: alarmLink(alarm.AlarmName, region)
            }
        ],
        channel,
        text: msgTitle,
    };
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

const field = (fieldTitle: string, value: string, short: boolean = true) => {
    return { fieldTitle: title, value, short };
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
