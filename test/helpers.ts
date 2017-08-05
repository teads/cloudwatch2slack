import { suite, test } from 'mocha-typescript';
import * as chai from 'chai';

import * as helpers from '../src/helpers';

@suite()
class Helpers {
    public static before() {
        chai.should();
    }

    @test('isSNSRecord should guard against non SNS messages')
    public testIsSnsRecord() {
        helpers.isSnsRecord({EventSource: 'aws:sns'}).should.be.true;
        helpers.isSnsRecord({EventSource: 'aws:ec2'}).should.be.false;
    }

    @test('extractTopicInfo should be able to parse the SNS topic ARN')
    public testExtractTopicInfo() {
        const arn = 'arn:aws:sns:eu-west-1:00000000000:my_topic';
        const topicInfo = helpers.extractTopicInfo(arn);
        topicInfo.region.should.equal('eu-west-1');
        topicInfo.topic.should.equal('my_topic');
    }
}