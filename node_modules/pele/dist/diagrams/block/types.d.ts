export interface Block {
    id: string;
    type?: string;
    label?: string;
    children?: Block[];
    columns?: number;
    widthInColumns?: number;
    width?: number;
    directions?: string[];
    classes?: string[];
    styles?: string[];
    colorIndex?: number;
    start?: string;
    end?: string;
    arrowTypeStart?: string;
    arrowTypeEnd?: string;
    thickness?: string;
    pattern?: string;
    css?: string;
    styleClass?: string;
    stylesStr?: string;
}
export type Statement = Block | Block[];
export interface BlockClassDef {
    id: string;
    styles: string[];
    textStyles: string[];
}
export interface BlockModel {
    type: 'block';
    root: Block;
    blocks: Block[];
    edges: Block[];
    classes: Map<string, BlockClassDef>;
    byId: Map<string, Block>;
    title?: string;
    accTitle?: string;
    accDescr?: string;
}
