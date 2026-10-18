import type { VennModel, VennStyle, VennSubset, VennText } from './types.js';
export declare function normalizeText(text: string): string;
export declare class VennDb implements VennModel {
    readonly type: 'venn';
    title: string | undefined;
    subsets: VennSubset[];
    textNodes: VennText[];
    styles: VennStyle[];
    private known;
    private current;
    private indent;
    setDiagramTitle(title: string): void;
    addSubsetData(ids: string[], label: string | undefined, size: number | undefined): void;
    addTextData(ids: string[], id: string, label: string | undefined): void;
    addStyleData(ids: string[], data: [string, string][]): void;
    validateUnionIdentifiers(ids: string[]): void;
    getCurrentSets(): string[] | undefined;
    getIndentMode(): boolean;
    setIndentMode(enabled: boolean): void;
}
