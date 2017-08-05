import * as _ from 'lodash';

class Mappings<T> {
    private mappingType: string;
    private mappings: Array<Mapping<T>>;
    public constructor(mappingType: string, ...mappings: Array<Mapping<T>>) {
        this.mappingType = mappingType;
        this.mappings = mappings;
    }

    public lookup(key: string): T {
        const mapping = _.find(this.mappings, (m) => key.toLowerCase() === m.source.toLowerCase());
        if (mapping === undefined) {
            throw new Error(`Unexpected ${this.mappingType} type: ${key}`);
        }
        return mapping.mapping;
    }
}

class Mapping<T> {
    public source: string;
    public mapping: T;
    public constructor(source: string, mapping: T) {
        this.source = source;
        this.mapping = mapping;
    }
}

export class AlarmStateMapping {
    public transition: string;
    public color: string;

    public constructor(transition: string, color: string) {
        this.transition = transition;
        this.color = color;
    }
}

const alarmStateMappings = new Mappings(
    'alarm state',
    new Mapping('OK', new AlarmStateMapping('Recovered', 'good')),
    new Mapping('ALARM', new AlarmStateMapping('Triggered', 'danger')),
    new Mapping('INSUFFICIENT_DATA', new AlarmStateMapping('Warn', 'warn')),
);

const comparisonOperatorMappings = new Mappings(
    'comparison operator',
    new Mapping('GreaterThanOrEqualToThreshold', '>='),
    new Mapping('GreaterThanThreshold', '>'),
    new Mapping('LessThanOrEqualToThreshold', '<='),
    new Mapping('LessThanThreshold', '<')
);

const statisticMappings = new Mappings(
    'statistic',
    new Mapping('SampleCount', 'samplesCount'),
    new Mapping('Average', 'avg'),
    new Mapping('Sum', 'sum'),
    new Mapping('Minimum', 'min'),
    new Mapping('Maximum', 'max')
);

export const mapAlarmState = (alarmState: string): AlarmStateMapping => {
    return alarmStateMappings.lookup(alarmState);
};

export const mapOperator = (operator: string): string => {
    return comparisonOperatorMappings.lookup(operator);
};

export const mapStatistic = (statistic: string): string => {
    return statisticMappings.lookup(statistic);
};
