import { type TokenType } from '../common/tokens.js';
export declare const WARDLEY_TOKENS: readonly TokenType[];
export interface LabelAst {
    $type: 'Label';
    negX: boolean;
    offsetX: number;
    negY: boolean;
    offsetY: number;
}
export interface StageAst {
    $type: 'EvolutionStage';
    name: string;
    boundary?: number;
    secondName?: string;
}
export interface ComponentAst {
    $type: 'Component';
    name: string;
    visibility: number;
    evolution: number;
    label?: LabelAst;
    decorator?: {
        $type: 'Decorator';
        strategy: string;
    };
    inertia: boolean;
}
export interface PipelineComponentAst {
    $type: 'PipelineComponent';
    name: string;
    evolution: number;
    label?: LabelAst;
}
export interface LinkAst {
    $type: 'Link';
    from: string;
    fromPort?: string;
    arrow?: string;
    to: string;
    toPort?: string;
    linkLabel?: string;
}
interface Placed {
    name: string;
    x: number;
    y: number;
}
export interface WardleyAst {
    $type: 'Wardley';
    title?: string;
    accTitle?: string;
    accDescr?: string;
    size?: {
        $type: 'Size';
        width: number;
        height: number;
    };
    evolution?: {
        $type: 'Evolution';
        stages: StageAst[];
    };
    anchors: {
        $type: 'Anchor';
        name: string;
        visibility: number;
        evolution: number;
    }[];
    components: ComponentAst[];
    links: LinkAst[];
    evolves: {
        $type: 'Evolve';
        component: string;
        target: number;
    }[];
    pipelines: {
        $type: 'Pipeline';
        parent: string;
        components: PipelineComponentAst[];
    }[];
    notes: {
        $type: 'Note';
        text: string;
        visibility: number;
        evolution: number;
    }[];
    annotations: {
        $type: 'Annotations';
        x: number;
        y: number;
    }[];
    annotation: {
        $type: 'Annotation';
        number: number;
        x: number;
        y: number;
        text: string;
    }[];
    accelerators: ({
        $type: 'Accelerator';
    } & Placed)[];
    deaccelerators: ({
        $type: 'Deaccelerator';
    } & Placed)[];
}
export declare function parseWardley(src: string): WardleyAst;
export {};
