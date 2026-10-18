export declare const KIND_SLOT: ReadonlyMap<string, number>;
export declare const KIND_COUNT: number;
export declare const containerSlotCount: (paletteLength: number) => number;
export declare const containerSlot: (n: number, paletteLength: number) => number;
interface SlotNode {
    id: string;
    shape?: string;
    isGroup?: boolean;
    colorIndex?: number;
    kind?: string;
}
export declare function assignColorSlots(nodes: SlotNode[], kindOf: (id: string) => string | undefined, containerOrder: ReadonlyMap<string, number>, paletteLength: number): void;
export {};
