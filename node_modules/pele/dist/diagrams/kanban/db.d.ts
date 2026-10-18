import { getType } from '../common/outline.js';
export interface KanbanNode {
    id: string;
    level: number;
    label: string;
    icon?: string;
    assigned?: string;
    ticket?: string;
    priority?: string;
    cssClasses?: string;
}
export interface KanbanSection extends KanbanNode {
    items: KanbanNode[];
}
export interface KanbanModel {
    type: 'kanban';
    title: string | undefined;
    sections: KanbanSection[];
}
export declare class KanbanDb implements KanbanModel {
    readonly type = "kanban";
    title: string | undefined;
    sections: KanbanSection[];
    getType: typeof getType;
    private last;
    private sectionLevel;
    private misplaced;
    addNode(level: number, id: string, descr: string, _type: number, shapeData?: string): void;
    decorateNode(decoration?: {
        class?: string;
        icon?: string;
    }): void;
}
