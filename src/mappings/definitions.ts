import { Mappings } from './mappings';
import { AlarmStateMapping } from './types';

const alarmStateMappings = new Mappings(
    'alarm state',
    ['OK', new AlarmStateMapping('RECOVERED', 'good')],
    ['ALARM', new AlarmStateMapping('TRIGGERED', 'danger')],
    ['INSUFFICIENT_DATA', new AlarmStateMapping('WARN', 'warn')],
);

const operatorMappings = new Mappings(
    'comparison operator',
    ['GreaterThanOrEqualToThreshold', '>='],
    ['GreaterThanThreshold', '>'],
    ['LessThanOrEqualToThreshold', '<='],
    ['LessThanThreshold', '<']
);

const statisticMappings = new Mappings(
    'statistic',
    ['SAMPLE_COUNT', 'sampleCount'],
    ['AVERAGE', 'avg'],
    ['SUM', 'sum'],
    ['MINIMUM', 'min'],
    ['MAXIMUM', 'max']
);

export const mapAlarmState = (alarmState: string): AlarmStateMapping => {
    return alarmStateMappings.lookup(alarmState);
};

export const mapOperator = (operator: string): string => {
    return operatorMappings.lookup(operator);
};

export const mapStatistic = (statistic: string): string => {
    return statisticMappings.lookup(statistic);
};
