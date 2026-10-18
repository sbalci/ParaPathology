export interface IshikawaNode {
    text: string;
    children: IshikawaNode[];
}
export interface IshikawaModel {
    type: 'ishikawa';
    title: string | undefined;
    root: IshikawaNode | undefined;
}
