export interface AlarmDetails {
    AlarmName: string;
    AlarmDescription: string;
    NewStateValue: string;
    NewStateReason: string;
    StateChangeTime: string;
    Region: string;
    OldStateValue: string;
    Trigger: AlarmTrigger;
};

export interface AlarmTrigger {
    MetricName: string;
    Namespace: string;
    Statistic: string;
    ExtendedStatistic: string;
    Dimensions: Dimension[];
    ComparisonOperator: string;
    Period: number;
    EvaluationPeriods: number;
    Threshold: number;
};

export interface Dimension {
    name: string;
    value: string;
}