import { type DiagramType, type MountOptions, type Mounted, type RenderOptions, type RenderResult } from './core.js';
export * from './core.js';
export type * from './models.js';
export declare function load(type: DiagramType | null): Promise<boolean>;
export declare function renderAsync(text: string, options?: RenderOptions): Promise<RenderResult>;
export declare function mountAsync(element: HTMLElement, text: string, options?: MountOptions): Promise<Mounted>;
