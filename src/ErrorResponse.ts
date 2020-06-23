import {ErrorNode, NodeObject} from "./ErrorNode";

type FormErrorResponse = {
    code: Number
    message: string
    errors: NodeObject
}

export class ErrorResponse {
    private readonly _code: Number
    private readonly _message: string

    private rootNode: ErrorNode

    constructor(response: FormErrorResponse) {
        this.rootNode = new ErrorNode(response.errors)
        this._code = response.code
        this._message = response.message
    }

    public getFlattenObject(): { [name: string]: string | { [name: string]: string } } {
        return {
            error: this.rootNode.hasErrors() ? this.rootNode.getErrors()[0] : '',
            nodes: this.rootNode.getFlattenObject()
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