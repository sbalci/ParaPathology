import { type CEdge, type CNode, type CompoundResult, type Dir } from '../../layout/compound.js';
import type { LayeredOptions } from '../../layout/layered.js';
import type { Config } from '../../preprocess.js';
import { type ResolvedStyle } from '../../svg/theme.js';
import { type Label } from '../../text/label.js';
import type { IconResolver, RenderOptions, Rendered } from '../../types.js';
import type { FlowDb } from './db.js';
import { type FlowGraph } from './graph.js';
export interface FlowVariant {
    type: string;
    prepare(graph: FlowGraph): void;
    layout(nodes: CNode[], edges: CEdge[], dir: Dir, opt: LayeredOptions, tight: boolean): CompoundResult;
    drawGroup?(c: CNode, label: Label, style: ResolvedStyle, classes: string, id: string, dir: Dir, icons: IconResolver | undefined): string;
}
export declare function renderFlowchart(db: FlowDb, config: Config, options: RenderOptions, variant?: FlowVariant): Rendered;
