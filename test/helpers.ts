import { suite, test } from 'mocha-typescript';
import { expect } from 'chai';

import * as helpers from '../src/helpers';

@suite
class Helpers {

    @test('isSNSRecord should guard against non SNS messages')
    public testIsSnsRecord() {
        expect(helpers.isSnsRecord({ EventSource: 'aws:sns' })).to.be.true;
        expect(helpers.isSnsRecord({ EventSource: 'aws:ec2' })).to.be.false;
    }

    @test('extractTopicInfo should be able to parse the SNS topic ARN')
    public testExtractTopicInfo() {
        const arn = 'arn:aws:sns:eu-west-1:00000000000:my_topic';
        const topicInfo = helpers.extractTopicInfo(arn);
        expect(topicInfo.region).to.equal('eu-west-1');
        expect(topicInfo.topic).to.equal('my_topic');
    }
}