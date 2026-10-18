import type { Config } from '../../preprocess.js';
import type { RenderOptions, Rendered } from '../../types.js';
import type { TreeViewModel } from './model.js';
export declare function treeSettings(config: Config): {
    paddingX: number;
    paddingY: number;
    rowIndent: number;
    lineThickness: number;
};
export declare function renderTreeView(model: TreeViewModel, config: Config, options: RenderOptions): Rendered;
