import type { BlockDb } from './db.js';
export type BlockBuilder = Pick<BlockDb, 'typeStr2Type' | 'edgeStrToEdgeData' | 'edgeStrToEdgeStartData' | 'edgeStrToThickness' | 'edgeStrToPattern' | 'generateId' | 'setHierarchy'>;
export declare function parseBlock(src: string, db: BlockBuilder): void;
