import { Mappings } from './mappings';
import { AlarmStateMapping } from './types';

const alarmStateMappings = new Mappings(
    'alarm state',
    ['OK', new AlarmStateMapping('Recovered', 'good')],
    ['ALARM', new AlarmStateMapping('Triggered', 'danger')],
    ['INSUFFICIENT_DATA', new AlarmStateMapping('Warn', 'warn')],
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
    ['SampleCount', 'sampleCount'], // TODO: check formatting of the statistic
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