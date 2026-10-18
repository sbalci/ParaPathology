export type SourceStrategy = 'build' | 'buy' | 'outsource' | 'market';
export type Flow = 'forward' | 'backward' | 'bidirectional';
export interface WardleyNode {
    id: string;
    label: string;
    x?: number;
    y?: number;
    className?: string;
    labelOffsetX?: number;
    labelOffsetY?: number;
    inPipeline?: boolean;
    isPipelineParent?: boolean;
    inertia?: boolean;
    sourceStrategy?: SourceStrategy;
}
export interface WardleyLink {
    source: string;
    target: string;
    dashed?: boolean;
    label?: string;
    flow?: Flow;
}
export interface WardleyTrend {
    nodeId: string;
    targetX: number;
    targetY: number;
}
export interface WardleyPipeline {
    nodeId: string;
    componentIds: string[];
}
export interface WardleyAnnotation {
    number: number;
    coordinates: {
        x: number;
        y: number;
    }[];
    text?: string;
}
export interface WardleyNote {
    text: string;
    x: number;
    y: number;
}
export interface WardleyForce {
    name: string;
    x: number;
    y: number;
}
export interface WardleyAxesConfig {
    xLabel?: string;
    yLabel?: string;
    stages?: string[];
    stageBoundaries?: number[];
}
export interface WardleyBuildResult {
    nodes: WardleyNode[];
    links: WardleyLink[];
    trends: WardleyTrend[];
    pipelines: WardleyPipeline[];
    annotations: WardleyAnnotation[];
    notes: WardleyNote[];
    accelerators: WardleyForce[];
    deaccelerators: WardleyForce[];
    annotationsBox?: {
        x: number;
        y: number;
    };
    axes: WardleyAxesConfig;
    size?: {
        width: number;
        height: number;
    };
}
export declare class WardleyBuilder {
    private nodes;
    private labels;
    private links;
    private trends;
    private pipelines;
    private annotations;
    private notes;
    private accelerators;
    private deaccelerators;
    private annotationsBox?;
    private axes;
    private size?;
    addNode(node: WardleyNode): void;
    addLink(link: WardleyLink): void;
    addTrend(trend: WardleyTrend): void;
    startPipeline(nodeId: string): void;
    addPipelineComponent(pipelineNodeId: string, componentId: string): void;
    addAnnotation(annotation: WardleyAnnotation): void;
    addNote(note: WardleyNote): void;
    addAccelerator(accelerator: WardleyForce): void;
    addDeaccelerator(deaccelerator: WardleyForce): void;
    setAnnotationsBox(x: number, y: number): void;
    setAxes(partial: WardleyAxesConfig): void;
    setSize(width: number, height: number): void;
    getNode(id: string): WardleyNode | undefined;
    resolveNodeId(name: string): string;
    build(): WardleyBuildResult;
}
