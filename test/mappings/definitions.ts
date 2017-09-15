import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';

import * as mappings from '../../src/mappings/definitions';

@suite
class MappingDefinitions {

    @test('alarmState should map Cloudwatch alarm states to their status and matching colors')
    public testAlarmState() {
        const ok = mappings.mapAlarmState('OK');
        const alarm = mappings.mapAlarmState('ALARM');
        const insufficientData = mappings.mapAlarmState('INSUFFICIENT_DATA');

        expect(ok.transition).to.equal('RECOVERED');
        expect(ok.color).to.equal('good');

        expect(alarm.transition).to.equal('TRIGGERED');
        expect(alarm.color).to.equal('danger');

        expect(insufficientData.transition).to.equal('WARN');
        expect(insufficientData.color).to.equal('warn');

        expect(() => mappings.mapAlarmState('')).to.throw();
    }

    @test('operator should map Cloudwatch operators to their math representation')
    public testOperator() {
        expect(mappings.mapOperator('GreaterThanOrEqualToThreshold')).to.equal('>=');
        expect(mappings.mapOperator('GreaterThanThreshold')).to.equal('>');
        expect(mappings.mapOperator('LessThanOrEqualToThreshold')).to.equal('<=');
        expect(mappings.mapOperator('LessThanThreshold')).to.equal('<');

        expect(() => mappings.mapOperator('')).to.throw();
    }

    @test('statistic should map Cloudwatch statistics to their short name')
    public testStatistic() {
        expect(mappings.mapStatistic('AVERAGE')).to.equal('avg');
        expect(mappings.mapStatistic('SAMPLE_COUNT')).to.equal('sampleCount');
        expect(mappings.mapStatistic('SUM')).to.equal('sum');
        expect(mappings.mapStatistic('MINIMUM')).to.equal('min');
        expect(mappings.mapStatistic('MAXIMUM')).to.equal('max');
        expect(() => mappings.mapStatistic('')).to.throw();
    }
}
