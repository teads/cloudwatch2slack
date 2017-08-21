import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';

import * as msg_builder from '../../src/slack/msg_builder';

@suite
class MessageBuilder {

    @test('it should build the expected message for a triggered alam')
    public testTriggeredAlarm() {
        
    }
}