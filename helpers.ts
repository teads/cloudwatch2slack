import {SNSEventRecord} from 'aws-lambda';
import * as _ from 'lodash';

export const isSnsRecord = (record: any): record is SNSEventRecord => {
  return record.EventSource === 'aws:sns';
};

export interface TopicInfo {
  region: string;
  topic: string;
}

export const extractTopicInfo = (topicArn: string): TopicInfo => {
  const parts = topicArn.split(':');
  // TODO : handle undefined
  return { region: parts[3], topic: _.last(parts) || ''};
};
