import { KMS } from 'aws-sdk';

export class Config {
    public static load(): Promise<Config> {
        const encryptedVars = [
            Config.requiredEnv('SLACK_WEBHOOK_URL')
        ].map((encrypted) => Config.decrypt(encrypted));
        return Promise.all(encryptedVars)
            .then((decrypted) => {
                const channel = process.env.CHANNEL || '';
                return new Config(decrypted[0], channel);
            });
    }

    private static kms: KMS = new KMS();

    private static decrypt(value: string): Promise<string> {
        const encrypted = new Buffer(value, 'base64');
        return Config.kms
            .decrypt({ CiphertextBlob: encrypted })
            .promise()
            .then((resp) => {
                const plaintext = resp.Plaintext;
                if (plaintext === undefined) {
                    throw new Error('Could not decrypt secret variable');
                }
                return plaintext.toString();
            });
    }

    private static requiredEnv<T>(key: string): string {
        const value = process.env[key];
        if (value === undefined) {
            throw new Error(`Required environment variable '${key}' is not defined.`);
        }
        return value as string;
    }

    public readonly webhookUrl: string;
    public readonly channel: string;

    private constructor(webhookUrl: string, channel: string) {
        this.webhookUrl = webhookUrl;
        this.channel = channel;
    }
}
