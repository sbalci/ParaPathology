import type { Config } from '../../preprocess.js';
import type { RenderOptions, Rendered } from '../../types.js';
import type { AgentflowDb } from './db.js';
import { type AgentGraph } from './graph.js';
export declare const PALETTE = 8;
export declare function agentGraph(db: AgentflowDb, config: Config): AgentGraph;
export declare function renderAgentflow(db: AgentflowDb, config: Config, options: RenderOptions): Rendered;
