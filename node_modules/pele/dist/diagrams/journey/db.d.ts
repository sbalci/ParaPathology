export interface JourneyTask {
    task: string;
    score: number;
    people: string[];
    section: string;
}
export interface JourneyModel {
    type: 'journey';
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    sections: string[];
    tasks: JourneyTask[];
}
export declare function journeyActors(tasks: JourneyTask[]): string[];
export declare class JourneyDb implements JourneyModel {
    readonly type: 'journey';
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    sections: string[];
    tasks: JourneyTask[];
    private currentSection;
    setDiagramTitle(text: string): void;
    setAccTitle(text: string): void;
    setAccDescription(text: string): void;
    addSection(text: string): void;
    addTask(task: string, data: string): void;
    getActors(): string[];
}
