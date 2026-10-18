export type YamlValue = null | boolean | number | string | YamlValue[] | {
    [key: string]: YamlValue;
};
export declare function parseYaml(src: string): YamlValue;
