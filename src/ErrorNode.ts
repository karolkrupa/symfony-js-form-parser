type NodeChildrenObject = {
    [name: string]: NodeObject
}

export type NodeObject = {
    errors?: string[]
    children?: NodeChildrenObject
}

export type FlattenErrorNode = {
    [key: string]: string[]
}

export type SimpleFlattenErrorNode = {
    [key: string]: string | null
}

export class ErrorNode {
    private _children: {
        [name: string]: ErrorNode
    } = {}

    readonly name: string
    private errors: string[] = []

    constructor(node: NodeObject, name: string|null = null) {
        this.name = name
        this.parse(node)
    }

    public hasErrors(): boolean {
        return this.errors.length > 0
    }

    public getErrors(): string[] {
        return this.errors
    }

    public getName(): string {
        return this.name
    }

    public getFlattenObject(): FlattenErrorNode {
        let flattenObject: FlattenErrorNode = {}
        for(let key of Object.keys(this._children)) {
            let childObj = this._children[key].getFlattenObject()

            for(let key1 of Object.keys(childObj)) {
                let key = this.name + '.' + key1
                if(this.rootNode) key = key1
                flattenObject[key] = childObj[key1]
            }
        }

        if(this.rootNode) return flattenObject

        if(!this.rootNode && this.errors.length > 0) {
            flattenObject[this.name] = this.errors
        }else {
            flattenObject[this.name] = []
        }

        return flattenObject
    }

    public getSimpleFlattenObject(): SimpleFlattenErrorNode {
        let flattenObject: SimpleFlattenErrorNode = {}
        for(let key of Object.keys(this._children)) {
            let childObj = this._children[key].getSimpleFlattenObject()

            for(let key1 of Object.keys(childObj)) {
                let key = this.name + '.' + key1
                if(this.rootNode) key = key1
                flattenObject[key] = childObj[key1]
            }
        }

        if(this.rootNode) return flattenObject

        if(!this.rootNode && this.errors.length > 0) {
            flattenObject[this.name] = this.errors[0]
        }else {
            flattenObject[this.name] = null
        }

        return flattenObject
    }

    get children(): { [p: string]: ErrorNode } {
        return this._children;
    }

    private get rootNode(): boolean {
        return this.name === null
    }

    private parse(node: NodeObject) {
        this.parseErrors(node)
        this.parseChildren(node)
    }

    private parseErrors(node: NodeObject) {
        if(node.errors) {
            this.errors = node.errors
        }
    }

    private parseChildren(node: NodeObject) {
        if(node.children) {
            for(let key of Object.keys(node.children)) {
                this._children[key] = new ErrorNode(node.children[key], key)
                this._children[key].parse(node.children[key])
            }
        }
    }
}