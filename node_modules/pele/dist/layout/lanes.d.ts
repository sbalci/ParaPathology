import type { CEdge, CNode, CompoundResult, Dir } from './compound.js';
import { type LayeredOptions } from './layered.js';
export declare function laneLayout(nodes: CNode[], edges: CEdge[], dir: Dir, opt: LayeredOptions, lanePad?: number): CompoundResult;
