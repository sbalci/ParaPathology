import { type TokenType } from '../common/tokens.js';
export declare const PACKET_TOKENS: readonly TokenType[];
export interface PacketBlockAst {
    $type: 'PacketBlock';
    start?: number;
    end?: number;
    bits?: number;
    label: string;
}
export interface PacketAst {
    $type: 'Packet';
    title?: string;
    accTitle?: string;
    accDescr?: string;
    blocks: PacketBlockAst[];
}
export declare function parsePacket(src: string): PacketAst;
