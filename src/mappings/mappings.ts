import { find } from 'lodash';

type Mapping<T> = [string, T];

export class Mappings<T> {
    private readonly mappingType: string;
    private readonly mappings: Array<Mapping<T>>;

    public constructor(mappingType: string, ...mappings: Array<Mapping<T>>) {
        this.mappingType = mappingType;
        this.mappings = mappings;
    }

    public lookup(key: string): T {
        const mapping = find(this.mappings, (m) => key === m[0]);
        if (mapping === undefined) {
            throw new Error(`Unexpected ${this.mappingType} type: ${key}`);
        }
        return mapping[1];
    }
}
