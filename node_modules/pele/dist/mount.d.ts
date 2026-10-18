import type { DiagramModel } from './models.js';
import type { RenderOptions, RenderResult } from './types.js';
import { type Zoom, type ZoomOptions } from './zoom.js';
export interface MountOptions extends RenderOptions {
    onRender?: (result: RenderResult) => void;
    zoom?: boolean | 'auto' | ZoomOptions;
    sanitize?: (svg: string) => Node;
    onError?: (error: unknown) => void;
}
export interface Mounted {
    readonly result: RenderResult | undefined;
    readonly source: string;
    readonly error: unknown;
    readonly zoom: Zoom | undefined;
    update(text: string, options?: MountOptions): void;
    refresh(): void;
    destroy(): void;
}
export interface Engine {
    parse(text: string, options: RenderOptions): DiagramModel;
    render(model: DiagramModel, options: RenderOptions): RenderResult;
}
export declare function mountWith(engine: Engine, element: HTMLElement, text: string, options?: MountOptions): Mounted;
