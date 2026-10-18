export interface TimelinePeriod {
    text: string;
    events: string[];
    section: string;
    sectionIndex: number;
}
export interface TimelineModel {
    type: 'timeline';
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    direction: 'LR' | 'TD';
    sections: string[];
    periods: TimelinePeriod[];
}
export declare class TimelineDb implements TimelineModel {
    readonly type: 'timeline';
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    direction: 'LR' | 'TD';
    sections: string[];
    periods: TimelinePeriod[];
    private currentSection;
    getCommonDb(): this;
    setDiagramTitle(text: string): void;
    setAccTitle(text: string): void;
    setAccDescription(text: string): void;
    setDirection(direction: 'LR' | 'TD'): void;
    addSection(text: string): void;
    addTask(period: string, _length?: number, event?: string): void;
    addEvent(event: string): void;
}
