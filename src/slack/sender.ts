import { ChatPostMessageResult, IncomingWebhook } from '@slack/client';
import { AlarmDetails } from '../alarm_details';
import { buildSlackMessage } from './msg_builder';

export const sendNotification = (webhook: IncomingWebhook,
                                 region: string,
                                 channel: string,
                                 alarm: AlarmDetails) => {
    const msg = buildSlackMessage(channel, region, alarm);
    webhook.send(msg).catch((err) => console.log(err));
};
