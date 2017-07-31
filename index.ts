import {Callback, Context, Handler, SNSEventRecord} from 'aws-lambda';
import * as _ from 'lodash';
import { AlarmDetails } from './alarm_details';
import { Config } from './config';
import { sendNotification } from './slack';

const isSnsRecord = (record: any): record is SNSEventRecord => {
  return record.EventSource === 'aws:sns';
};

const fail = (msg: string, callback: Callback) => {
  console.log(msg);
  callback(Error(msg));
};

interface TopicInfo {
  region: string;
  topic: string;
}

const extractTopicInfo = (topicArn: string): TopicInfo => {
  const parts = topicArn.split(':');
  // TODO : handle undefined
  return { region: parts[3], topic: _.last(parts) || ''};
};

const func: Handler = (event: any, context: Context, callback: Callback) => {
  const config = new Config();
  for (const record of event.Records) {
    if (isSnsRecord(record)) {
      const topicInfo = extractTopicInfo(record.Sns.TopicArn);
      const alarmDetails = JSON.parse(record.Sns.Message) as AlarmDetails;
      sendNotification(config.webhookUrl, topicInfo.region, topicInfo.topic, alarmDetails);
    } else {
      fail(`Expected SNS event, but got message from a '${record.EventSource}' event source`, callback);
    }
  }
  return callback();
};

export default func;
