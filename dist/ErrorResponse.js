"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
var ErrorNode_1 = require("./ErrorNode");
var ErrorResponse = /** @class */ (function () {
    function ErrorResponse(response) {
        if (response.errors)
            this.rootNode = new ErrorNode_1.ErrorNode(response.errors);
        else
            this.rootNode = new ErrorNode_1.ErrorNode();
        this._code = response.code ? response.code : null;
        this._message = response.message ? response.message : null;
    }
    ErrorResponse.parse = function (response) {
        return new ErrorResponse(response);
    };
    ErrorResponse.prototype.getFlattenObject = function () {
        return {
            code: this.code,
            message: this.message,
            errors: this.rootNode.getErrors(),
            nodes: this.rootNode.getFlattenObject()
        };
    };
    ErrorResponse.prototype.getSimpleFlattenObject = function () {
        return {
            code: this.code,
            message: this.message,
            error: this.rootNode.hasErrors() ? this.rootNode.getErrors()[0] : null,
            nodes: this.rootNode.getSimpleFlattenObject()
        };
    };
    Object.defineProperty(ErrorResponse.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ErrorResponse.prototype, "message", {
        get: function () {
            return this._message;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ErrorResponse.prototype, "children", {
        get: function () {
            return this.rootNode.children;
        },
        enumerable: false,
        configurable: true
    });
    return ErrorResponse;
}());
exports.ErrorResponse = ErrorResponse;
exports.default = ErrorResponse;
//# sourceMappingURL=ErrorResponse.js.map