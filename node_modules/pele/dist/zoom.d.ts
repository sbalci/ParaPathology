export interface ZoomOptions {
    always?: boolean;
    maxScale?: number;
    controls?: boolean;
    labels?: {
        zoomIn?: string;
        zoomOut?: string;
        reset?: string;
    };
}
export interface Zoom {
    readonly scale: number;
    readonly fit: number;
    zoomBy(factor: number): void;
    zoomTo(scale: number): void;
    reset(): void;
    refresh(): void;
    destroy(): void;
}
export interface Frame {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare function frame(natural: {
    width: number;
    height: number;
}, box: {
    width: number;
    height: number;
}, scale: number, x: number, y: number): Frame;
export declare function enableZoom(element: HTMLElement, options?: ZoomOptions): Zoom;
export declare function zoomWith(element: HTMLElement, options: ZoomOptions, observe: boolean): Zoom & {
    resized(): void;
};
