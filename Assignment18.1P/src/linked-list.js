"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
var Node = /** @class */ (function () {
    function Node(value, next) {
        if (next === void 0) { next = null; }
        this.value = value;
        this.next = next;
        this.value = value;
        this.next = next;
    }
    return Node;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this._first = null;
        this._last = null;
        this._size = 0;
        this._currentIndex = undefined;
        this._current = null;
        this.append.apply(this, values);
    }
    LinkedList.prototype.append = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
            var value = values_1[_a];
            this._append(value);
        }
        return this;
    };
    LinkedList.prototype.isEmpty = function () {
        return this._size === 0;
    };
    LinkedList.prototype._append = function (value) {
        var newNode = new Node(value);
        if (this.isEmpty()) {
            this._first = newNode;
        }
        else if (this._last) {
            this._last.next = newNode;
        }
        this._last = newNode;
        this._size++;
    };
    LinkedList.prototype._validateIndex = function (index) {
        if (typeof index !== 'number') {
            throw new TypeError("Index must be a number: \"".concat(index, "\""));
        }
        if (index < 0) {
            index += this._size;
        }
        if (index < 0 || index >= this._size) {
            throw new RangeError("Index out of range: ".concat(index, ". valid range=(0-").concat(this._size - 1, ")"));
        }
        return index;
    };
    LinkedList.prototype._locate = function (index) {
        index = this._validateIndex(index);
        var current = this._first;
        var startIndex = 0;
        var steps = index;
        if (this._current && this._currentIndex !== undefined && this._currentIndex < index) {
            startIndex = this._currentIndex;
            current = this._current;
            steps = index - this._currentIndex;
        }
        for (var i = 0; i < steps; i++) {
            if (current) {
                current = current.next;
            }
        }
        if (current) {
            this._current = current;
            this._currentIndex = index;
        }
        return current;
    };
    LinkedList.prototype.size = function () {
        return this._size;
    };
    LinkedList.prototype.get = function (index) {
        return this._locate(index).value;
    };
    LinkedList.prototype.set = function (index, value) {
        this._locate(index).value = value;
        return this;
    };
    LinkedList.prototype.insert = function (index, value) {
        index = this._validateIndex(index);
        var newNode = new Node(value);
        if (index === 0) {
            newNode.next = this._first;
            this._first = newNode;
        }
        else {
            var n = this._locate(index - 1);
            newNode.next = n.next;
            n.next = newNode;
        }
        this._size++;
        return this;
    };
    LinkedList.prototype.remove = function (index) {
        var _a, _b;
        if (index === 0 && this._size > 0) {
            var delValue = (_a = this._first) === null || _a === void 0 ? void 0 : _a.value;
            this._first = ((_b = this._first) === null || _b === void 0 ? void 0 : _b.next) || null;
            this._size--;
            return delValue;
        }
        this._validateIndex(index);
        var p = this._locate(index - 1);
        if (p.next) {
            var delValue = p.next.value;
            p.next = p.next.next;
            this._size--;
            return delValue;
        }
        return undefined;
    };
    LinkedList.prototype.toString = function () {
        var str = "LinkedList(\t";
        for (var n = this._first; n; n = n.next) {
            str += n.value + "\t";
        }
        return str + ")";
    };
    LinkedList.prototype.forEach = function (execute) {
        var i = 0;
        for (var n = this._first; n; n = n.next) {
            var result = execute(n.value, i);
            if (result !== undefined) {
                return result;
            }
            i++;
        }
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
var list = new LinkedList(1, 2, 3, 4);
console.log(list);
