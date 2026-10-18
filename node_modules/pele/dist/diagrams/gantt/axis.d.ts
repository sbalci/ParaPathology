export type TickUnit = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
export declare function autoTicks(start: number, stop: number, count: number): number[];
export declare function intervalTicks(interval: string, weekday: string, start: number, stop: number, limit: number): number[] | undefined;
export declare function timeFormat(specifier: string, date: Date): string;
