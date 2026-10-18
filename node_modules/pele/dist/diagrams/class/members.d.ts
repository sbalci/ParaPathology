export type Visibility = '#' | '+' | '~' | '-' | '';
export declare class ClassMember {
    id: string;
    memberType: 'method' | 'attribute';
    visibility: Visibility;
    classifier: string;
    parameters: string;
    returnType: string;
    constructor(input: string, memberType: 'method' | 'attribute');
    private parseMethod;
    private parseAttribute;
    getDisplayDetails(): {
        displayText: string;
        cssStyle: string;
    };
    parseClassifier(): string;
}
