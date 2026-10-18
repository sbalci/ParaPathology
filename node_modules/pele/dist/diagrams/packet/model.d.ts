import type { Config } from '../../preprocess.js';
import type { PacketAst } from './parser.js';
export interface PacketBlock {
    start: number;
    end: number;
    bits: number;
    label: string;
}
export interface PacketModel {
    type: 'packet';
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    bitsPerRow: number;
    rows: PacketBlock[][];
}
export declare function packetOption(config: Config, key: string, fallback: number, min: number, max: number): number;
export declare function buildPacket(ast: PacketAst, config: Config, title: string | undefined): PacketModel;
