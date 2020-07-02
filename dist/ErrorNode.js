"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorNode = void 0;
var ErrorNode = /** @class */ (function () {
    function ErrorNode(node, name) {
        if (node === void 0) { node = {}; }
        if (name === void 0) { name = null; }
        this._children = {};
        this.errors = [];
        this.name = name;
        this.parse(node);
    }
    ErrorNode.prototype.hasErrors = function () {
        return this.errors.length > 0;
    };
    ErrorNode.prototype.getErrors = function () {
        return this.errors;
    };
    ErrorNode.prototype.getName = function () {
        return this.name;
    };
    ErrorNode.prototype.getFlattenObject = function () {
        var e_1, _a, e_2, _b;
        var flattenObject = {};
        try {
            for (var _c = __values(Object.keys(this._children)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var key = _d.value;
                var childObj = this._children[key].getFlattenObject();
                try {
                    for (var _e = (e_2 = void 0, __values(Object.keys(childObj))), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var key1 = _f.value;
                        var key_1 = this.name + '.' + key1;
                        if (this.rootNode)
                            key_1 = key1;
                        flattenObject[key_1] = childObj[key1];
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (this.rootNode)
            return flattenObject;
        if (!this.rootNode && this.errors.length > 0) {
            flattenObject[this.name] = this.errors;
        }
        else {
            flattenObject[this.name] = [];
        }
        return flattenObject;
    };
    ErrorNode.prototype.getSimpleFlattenObject = function () {
        var e_3, _a, e_4, _b;
        var flattenObject = {};
        try {
            for (var _c = __values(Object.keys(this._children)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var key = _d.value;
                var childObj = this._children[key].getSimpleFlattenObject();
                try {
                    for (var _e = (e_4 = void 0, __values(Object.keys(childObj))), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var key1 = _f.value;
                        var key_2 = this.name + '.' + key1;
                        if (this.rootNode)
                            key_2 = key1;
                        flattenObject[key_2] = childObj[key1];
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (this.rootNode)
            return flattenObject;
        if (!this.rootNode && this.errors.length > 0) {
            flattenObject[this.name] = this.errors[0];
        }
        else {
            flattenObject[this.name] = null;
        }
        return flattenObject;
    };
    Object.defineProperty(ErrorNode.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ErrorNode.prototype, "rootNode", {
        get: function () {
            return this.name === null;
        },
        enumerable: false,
        configurable: true
    });
    ErrorNode.prototype.parse = function (node) {
        this.parseErrors(node);
        this.parseChildren(node);
    };
    ErrorNode.prototype.parseErrors = function (node) {
        if (node.errors) {
            this.errors = node.errors;
        }
    };
    ErrorNode.prototype.parseChildren = function (node) {
        var e_5, _a;
        if (node.children) {
            try {
                for (var _b = __values(Object.keys(node.children)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    this._children[key] = new ErrorNode(node.children[key], key);
                    this._children[key].parse(node.children[key]);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
    };
    return ErrorNode;
}());
exports.ErrorNode = ErrorNode;
//# sourceMappingURL=ErrorNode.js.map