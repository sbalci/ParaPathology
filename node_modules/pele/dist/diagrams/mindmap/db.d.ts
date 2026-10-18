import { getType } from '../common/outline.js';
export interface MindmapNode {
    id: number;
    nodeId: string;
    level: number;
    descr: string;
    type: number;
    children: MindmapNode[];
    isRoot: boolean;
    section?: number;
    class?: string;
    icon?: string;
}
export interface MindmapModel {
    type: 'mindmap';
    title: string | undefined;
    nodes: MindmapNode[];
}
export declare class MindmapDb implements MindmapModel {
    readonly type = "mindmap";
    title: string | undefined;
    nodes: MindmapNode[];
    getType: typeof getType;
    private baseLevel;
    private open;
    addNode(level: number, id: string, descr: string, type: number): void;
    decorateNode(decoration?: {
        class?: string;
        icon?: string;
    }): void;
}
