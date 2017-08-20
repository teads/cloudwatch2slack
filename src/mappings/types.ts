export class AlarmStateMapping {
    public readonly transition: string;
    public readonly color: string;

    public constructor(transition: string, color: string) {
        this.transition = transition;
        this.color = color;
    }
}
