export interface OrderedJson {
    value: Record<string, unknown>;
    propertyOrder: Map<string, string[]>;
}
export declare function parseOrderedJson(text: string, origin: () => [number, number]): OrderedJson;
