import { ErrorNode, FlattenErrorNode, NodeObject, SimpleFlattenErrorNode } from "./ErrorNode";
export declare type FormErrorResponse = {
    code?: Number;
    message?: string;
    errors?: NodeObject;
};
export declare type FlattenErrors = {
    code: Number;
    message: string | null;
    errors: string[];
    nodes: FlattenErrorNode;
};
export declare type SimpleFlattenErrors = {
    code: Number;
    message: string | null;
    error: string | null;
    nodes: SimpleFlattenErrorNode;
};
export declare class ErrorResponse {
    private readonly _code;
    private readonly _message;
    private rootNode;
    static parse(response: FormErrorResponse): ErrorResponse;
    constructor(response: FormErrorResponse);
    getFlattenObject(): FlattenErrors;
    getSimpleFlattenObject(): SimpleFlattenErrors;
    get code(): Number;
    get message(): string;
    get children(): {
        [name: string]: ErrorNode;
    };
}
export default ErrorResponse;
