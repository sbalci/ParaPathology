export interface XyText {
    text: string;
    type: 'text' | 'markdown';
}
export interface DataPoint {
    value: number;
    label: string;
}
export interface BandAxis {
    type: 'band';
    title: string;
    categories: string[];
}
export interface LinearAxis {
    type: 'linear';
    title: string;
    min: number;
    max: number;
}
export type PlotData = [string, number | undefined][];
export interface Plot {
    type: 'line' | 'bar';
    title: string;
    data: PlotData;
    pointLabels?: string[];
}
export interface XyChartModel {
    type: 'xychart';
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    orientation: 'vertical' | 'horizontal' | undefined;
    xAxis: BandAxis | LinearAxis;
    yAxis: LinearAxis;
    hasSetYAxis: boolean;
    plots: Plot[];
}
export declare class XyChartDb implements XyChartModel {
    readonly type = "xychart";
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    orientation: 'vertical' | 'horizontal' | undefined;
    xAxis: BandAxis | LinearAxis;
    yAxis: LinearAxis;
    hasSetXAxis: boolean;
    hasSetYAxis: boolean;
    plots: Plot[];
    setOrientation(orientation: string): void;
    setXAxisTitle(title: XyText): void;
    setXAxisRangeData(min: number, max: number): void;
    setXAxisBand(categories: XyText[]): void;
    setYAxisTitle(title: XyText): void;
    setYAxisRangeData(min: number, max: number): void;
    private plotData;
    private addPlot;
    setLineData(title: XyText, data: DataPoint[]): void;
    setBarData(title: XyText, data: DataPoint[]): void;
    setDiagramTitle(text: string): void;
    setAccTitle(text: string): void;
    setAccDescription(text: string): void;
}
