import {ErrorNode, FlattenErrorNode, NodeObject, SimpleFlattenErrorNode} from "./ErrorNode";

type FormErrorResponse = {
    code?: Number
    message?: string
    errors?: NodeObject
}

type FlattenErrors = {
    code: Number,
    message: string | null,
    errors: string[],
    nodes: FlattenErrorNode
}

type SimpleFlattenErrors = {
    code: Number,
    message: string | null,
    error: string | null,
    nodes: SimpleFlattenErrorNode
}

export class ErrorResponse {
    private readonly _code: Number
    private readonly _message: string

    private rootNode: ErrorNode

    constructor(response: FormErrorResponse) {
        if(response.errors) this.rootNode = new ErrorNode(response.errors)
        else this.rootNode = new ErrorNode()
        this._code = response.code? response.code : null
        this._message = response.message? response.message : null
    }

    public getFlattenObject(): FlattenErrors {
        return {
            code: this.code,
            message: this.message,
            errors: this.rootNode.getErrors(),
            nodes: this.rootNode.getFlattenObject()
        }
    }

    public getSimpleFlattenObject(): SimpleFlattenErrors {
        return {
            code: this.code,
            message: this.message,
            error: this.rootNode.hasErrors() ? this.rootNode.getErrors()[0] : null,
            nodes: this.rootNode.getSimpleFlattenObject()
        }
    }

    get code(): Number {
        return this._code;
    }

    get message(): string {
        return this._message;
    }

    get children():  {
        [name: string]: ErrorNode
    } {
        return this.rootNode.children
    }
}