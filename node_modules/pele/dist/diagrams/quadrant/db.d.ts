export interface QuadrantText {
    text: string;
    type: 'text' | 'markdown';
}
export interface PointStyle {
    radius?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: string;
}
export interface QuadrantPoint extends PointStyle {
    x: number;
    y: number;
    text: QuadrantText;
    className: string;
}
export interface QuadrantModel {
    type: 'quadrantChart';
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    quadrants: (QuadrantText | undefined)[];
    xAxisLeft: QuadrantText | undefined;
    xAxisRight: QuadrantText | undefined;
    yAxisBottom: QuadrantText | undefined;
    yAxisTop: QuadrantText | undefined;
    points: QuadrantPoint[];
    classes: Map<string, PointStyle>;
}
export declare function parseStyles(styles: string[]): PointStyle;
export declare class QuadrantDb implements QuadrantModel {
    readonly type = "quadrantChart";
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    quadrants: (QuadrantText | undefined)[];
    xAxisLeft: QuadrantText | undefined;
    xAxisRight: QuadrantText | undefined;
    yAxisBottom: QuadrantText | undefined;
    yAxisTop: QuadrantText | undefined;
    points: QuadrantPoint[];
    classes: Map<string, PointStyle>;
    setQuadrant1Text(label: QuadrantText): void;
    setQuadrant2Text(label: QuadrantText): void;
    setQuadrant3Text(label: QuadrantText): void;
    setQuadrant4Text(label: QuadrantText): void;
    setXAxisLeftText(label: QuadrantText): void;
    setXAxisRightText(label: QuadrantText): void;
    setYAxisBottomText(label: QuadrantText): void;
    setYAxisTopText(label: QuadrantText): void;
    addPoint(label: QuadrantText, className: string, x: string, y: string, styles: string[]): void;
    addClass(className: string, styles: string[]): void;
    setDiagramTitle(text: string): void;
    setAccTitle(text: string): void;
    setAccDescription(text: string): void;
}
