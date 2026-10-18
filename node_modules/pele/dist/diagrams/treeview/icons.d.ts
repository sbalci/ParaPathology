import type { Config } from '../../preprocess.js';
import type { NodeType } from './model.js';
export declare const BUILTIN_PACK = "mermaid-treeview";
export declare const GLYPHS: ReadonlyMap<string, string>;
export type IconMap = {
    readonly [key: string]: unknown;
};
export interface IconConfig {
    showIcons: boolean;
    defaultIconPack: string;
    filenameIcons?: IconMap;
    extensionIcons?: IconMap;
}
export declare function detectIcon(name: string, config?: Pick<IconConfig, 'filenameIcons' | 'extensionIcons'>): string | undefined;
export declare function getNodeIcon(node: {
    icon?: string;
    name: string;
    nodeType: NodeType;
}, config: IconConfig): string | undefined;
export declare function iconConfig(config: Config): IconConfig;
