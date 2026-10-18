export interface Cell {
    children: Cell[];
    columns: number;
    span: number;
    space: boolean;
    head: number;
    nw: number;
    nh: number;
    col: number;
    row: number;
    cols: number;
    heights: number[];
    x: number;
    y: number;
    w: number;
    h: number;
}
export declare function cell(nw: number, nh: number, span?: number): Cell;
export declare function calculateBlockPosition(columns: number, position: number): {
    px: number;
    py: number;
};
export declare function layout(root: Cell, gap: number): {
    width: number;
    height: number;
};
