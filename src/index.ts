import { Callback, Context, Handler, SNSEventRecord } from 'aws-lambda';
import * as _ from 'lodash';
import * as Slack from 'node-slack';
import { AlarmDetails } from './alarm_details';
import { Config } from './config';
import * as helpers from './helpers';
import { sendNotification } from './slack';

let config: Config;
let slackClient: Slack;

const fail = (msg: string, callback: Callback) => {
    console.log(msg);
    callback(Error(msg));
};

const func: Handler = (event: any, context: Context, callback: Callback) => {
    if (config) {
        processEvent(event, context, callback);
    } else {
        Config.load()
            .then((loadedConfig) => {
                config = loadedConfig;
                slackClient = new Slack(config.webhookUrl);
                processEvent(event, context, callback);
            })
            .catch((err) => fail(`Could not load configuration: ${err}`, callback));
    }
};

const processEvent: Handler = (event: any, context: Context, callback: Callback) => {
    for (const record of event.Records) {
        if (helpers.isSnsRecord(record)) {
            const topicInfo = helpers.extractTopicInfo(record.Sns.TopicArn);
            const alarmDetails = JSON.parse(record.Sns.Message) as AlarmDetails;
            const channel = config.channel || topicInfo.topic;
            sendNotification(slackClient, topicInfo.region, channel, alarmDetails);
        } else {
            fail(`Expected SNS event, but got message from a '${record.EventSource}' event source`, callback);
        }
    }
    return callback();
};

export default func;
