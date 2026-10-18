export interface GanttTask {
    id: string;
    task: string;
    section: string;
    startTime: Date | undefined;
    endTime: Date | undefined;
    renderEndTime: Date | null;
    manualEndTime: boolean;
    processed: boolean;
    active: boolean;
    done: boolean;
    crit: boolean;
    milestone: boolean;
    vert: boolean;
    order: number;
    classes: string[];
    prevTaskId: string | undefined;
    raw: {
        data: string;
        start: string | undefined;
        end: string;
    };
}
export interface GanttModel {
    type: 'gantt';
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    dateFormat: string;
    axisFormat: string;
    tickInterval: string | undefined;
    todayMarker: string;
    includes: string[];
    excludes: string[];
    inclusiveEndDates: boolean;
    topAxis: boolean;
    displayMode: string;
    weekday: string | undefined;
    weekend: string;
    sections: string[];
    links: Map<string, string>;
    tasks: GanttTask[];
    getTasks(now?: number | Date): GanttTask[];
}
