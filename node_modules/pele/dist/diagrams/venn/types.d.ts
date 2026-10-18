export interface VennSubset {
    sets: string[];
    size: number;
    label: string | undefined;
}
export interface VennText {
    sets: string[];
    id: string;
    label: string | undefined;
}
export interface VennStyle {
    targets: string[];
    styles: Map<string, string>;
}
export interface VennModel {
    type: 'venn';
    title: string | undefined;
    subsets: VennSubset[];
    textNodes: VennText[];
    styles: VennStyle[];
}
