import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';

import * as msg_builder from '../../src/slack/msg_builder';
import { AlarmDetails } from "../../src/alarm_details";

@suite
class MessageBuilder {

    @test('it should build the expected message for a triggered alam')
    public testTriggeredAlarm() {
        const alarm: AlarmDetails = {
            AlarmName: '[SSP] At least one instance is not responding',
            AlarmDescription: '',
            NewStateValue: 'ALARM',
            OldStateValue: 'OK'

        }

        const msg = msg_builder.buildSlackMessage('alert', 'eu-west-1', alarm);
    }
}