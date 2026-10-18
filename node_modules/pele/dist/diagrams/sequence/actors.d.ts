import { type IconResolver } from '../../svg/builder.js';
import type { Label } from '../../text/label.js';
export interface ActorSize {
    w: number;
    h: number;
}
export declare function actorKind(type: string): string;
export declare function isFigure(kind: string): boolean;
export declare function actorSize(kind: string, label: Label, minW: number, minH: number, paddingX?: number): ActorSize;
export declare function drawActor(kind: string, cx: number, top: number, size: ActorSize, label: Label, icons: IconResolver | undefined): string;
