export class Config {

    private static requiredEnv<T>(key: string): string {
        const value = process.env[key];
        if (value === undefined) {
            throw new Error(`Required environment variable '${key}' is not defined.`);
        }
        return value as string;
    }

    public readonly webhookUrl: string;

    public constructor() {
        this.webhookUrl = Config.requiredEnv('SLACK_WEBHOOK_URL');
    }
}
