import type { IshikawaModel, IshikawaNode } from './types.js';
export declare class IshikawaDb implements IshikawaModel {
    readonly type: 'ishikawa';
    title: string | undefined;
    root: IshikawaNode | undefined;
    private stack;
    private baseLevel;
    addNode(rawLevel: number, text: string): void;
}
