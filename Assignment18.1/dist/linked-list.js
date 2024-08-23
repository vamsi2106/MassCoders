"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
        this.value = value;
        this.next = next;
    }
}
class LinkedList {
    constructor(...values) {
        this._first = null;
        this._last = null;
        this._size = 0;
        this._currentIndex = undefined;
        this._current = null;
        this.append(...values);
    }
    append(...values) {
        for (const value of values) {
            this._append(value);
        }
        return this;
    }
    isEmpty() {
        return this._size === 0;
    }
    _append(value) {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this._first = newNode;
        }
        else if (this._last) {
            this._last.next = newNode;
        }
        this._last = newNode;
        this._size++;
    }
    _validateIndex(index) {
        if (typeof index !== 'number') {
            throw new TypeError(`Index must be a number: "${index}"`);
        }
        if (index < 0) {
            index += this._size;
        }
        if (index < 0 || index >= this._size) {
            throw new RangeError(`Index out of range: ${index}. valid range=(0-${this._size - 1})`);
        }
        return index;
    }
    _locate(index) {
        index = this._validateIndex(index);
        let current = this._first;
        let startIndex = 0;
        let steps = index;
        if (this._current && this._currentIndex !== undefined && this._currentIndex < index) {
            startIndex = this._currentIndex;
            current = this._current;
            steps = index - this._currentIndex;
        }
        for (let i = 0; i < steps; i++) {
            if (current) {
                current = current.next;
            }
        }
        if (current) {
            this._current = current;
            this._currentIndex = index;
        }
        return current;
    }
    size() {
        return this._size;
    }
    get(index) {
        return this._locate(index).value;
    }
    set(index, value) {
        this._locate(index).value = value;
        return this;
    }
    insert(index, value) {
        index = this._validateIndex(index);
        const newNode = new Node(value);
        if (index === 0) {
            newNode.next = this._first;
            this._first = newNode;
        }
        else {
            const n = this._locate(index - 1);
            newNode.next = n.next;
            n.next = newNode;
        }
        this._size++;
        return this;
    }
    remove(index) {
        var _a, _b;
        if (index === 0 && this._size > 0) {
            const delValue = (_a = this._first) === null || _a === void 0 ? void 0 : _a.value;
            this._first = ((_b = this._first) === null || _b === void 0 ? void 0 : _b.next) || null;
            this._size--;
            return delValue;
        }
        this._validateIndex(index);
        const p = this._locate(index - 1);
        if (p.next) {
            const delValue = p.next.value;
            p.next = p.next.next;
            this._size--;
            return delValue;
        }
        return undefined;
    }
    toString() {
        let str = "LinkedList(\t";
        for (let n = this._first; n; n = n.next) {
            str += n.value + "\t";
        }
        return str + ")";
    }
    forEach(execute) {
        let i = 0;
        for (let n = this._first; n; n = n.next) {
            const result = execute(n.value, i);
            if (result !== undefined) {
                return result;
            }
            i++;
        }
    }
    filter(matcher) {
        const result = new LinkedList();
        this.forEach((v) => {
            const _matched = matcher(v);
            if (_matched) {
                result.append(v);
            }
        });
        return result;
    }
    find(matcher) {
        for (let n = this._first; n != null; n = n.next) {
            if (matcher(n.value)) {
                return n.value;
            }
        }
        return undefined;
    }
    map(mapper) {
        const result = new LinkedList();
        this.forEach((v) => {
            result.append(mapper(v));
        });
        return result;
    }
}
exports.LinkedList = LinkedList;
