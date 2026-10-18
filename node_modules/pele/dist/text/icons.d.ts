import type { IconResolver } from '../types.js';
export declare function withIcons<T>(icons: IconResolver | undefined, run: () => T): T;
export declare function iconMarkup(name: string): string;
