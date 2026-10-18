import type { DocItem, ErClassDef, ErEntity, ErModel, ErRelationship, ErSubgraph, ParsedAttribute, RelSpec } from './types.js';
export declare class ErDb implements ErModel {
    readonly type: 'er';
    direction: string;
    entities: Map<string, ErEntity>;
    relationships: ErRelationship[];
    classes: Map<string, ErClassDef>;
    subgraphs: ErSubgraph[];
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    private subgraphLookup;
    private claimed;
    addEntity(name: string, alias?: string): ErEntity;
    addAttributes(name: string, attributes: ParsedAttribute[]): void;
    addRelationship(entA: string, roleA: string, entB: string, relSpec: RelSpec): void;
    setDirection(dir: string): void;
    addCssStyles(ids: string[], styles: string[] | undefined): void;
    addClass(ids: string[], styles: string[] | undefined): void;
    setClass(ids: string[], classNames: string[]): void;
    addSubGraph(idText: {
        text: string;
    }, list: DocItem[], titleText: {
        text: string;
        type?: string;
    }): string;
    setAccTitle(text: string): void;
    setAccDescription(text: string): void;
}
