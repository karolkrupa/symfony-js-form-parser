import { ErrorNode, FlattenErrorNode, NodeObject, SimpleFlattenErrorNode } from "./ErrorNode";
declare type FormErrorResponse = {
    code?: Number;
    message?: string;
    errors?: NodeObject;
};
declare type FlattenErrors = {
    code: Number;
    message: string | null;
    errors: string[];
    nodes: FlattenErrorNode;
};
declare type SimpleFlattenErrors = {
    code: Number;
    message: string | null;
    error: string | null;
    nodes: SimpleFlattenErrorNode;
};
export declare class ErrorResponse {
    private readonly _code;
    private readonly _message;
    private rootNode;
    constructor(response: FormErrorResponse);
    getFlattenObject(): FlattenErrors;
    getSimpleFlattenObject(): SimpleFlattenErrors;
    get code(): Number;
    get message(): string;
    get children(): {
        [name: string]: ErrorNode;
    };
}
export {};
