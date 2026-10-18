export interface GanttBuilder {
    setDateFormat(txt: string): void;
    enableInclusiveEndDates(): void;
    TopAxis(): void;
    setAxisFormat(txt: string): void;
    setTickInterval(txt: string): void;
    setExcludes(txt: string): void;
    setIncludes(txt: string): void;
    setTodayMarker(txt: string): void;
    setWeekday(txt: string): void;
    setWeekend(txt: string): void;
    setDiagramTitle(txt: string): void;
    setAccTitle(txt: string): void;
    setAccDescription(txt: string): void;
    addSection(txt: string): void;
    addTask(descr: string, data: string): void;
    setClickEvent(ids: string, functionName: string, functionArgs: string | null): void;
    setLink(ids: string, link: string): void;
}
export declare function parseGantt(src: string, db: GanttBuilder): void;
