declare type NodeChildrenObject = {
    [name: string]: NodeObject;
};
export declare type NodeObject = {
    errors?: string[];
    children?: NodeChildrenObject;
};
export declare type FlattenErrorNode = {
    [key: string]: string[];
};
export declare type SimpleFlattenErrorNode = {
    [key: string]: string | null;
};
export declare class ErrorNode {
    private _children;
    readonly name: string;
    private errors;
    constructor(node?: NodeObject, name?: string | null);
    hasErrors(): boolean;
    getErrors(): string[];
    getName(): string;
    getFlattenObject(): FlattenErrorNode;
    getSimpleFlattenObject(): SimpleFlattenErrorNode;
    get children(): {
        [p: string]: ErrorNode;
    };
    private get rootNode();
    private parse;
    private parseErrors;
    private parseChildren;
}
export {};
