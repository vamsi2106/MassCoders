class Node<T> {
 
    constructor(public value: T, public next: Node<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}
 
export class LinkedList<T> {
    private _first: Node<T> | null = null;
    private _last: Node<T> | null = null;
    private _size: number = 0;
    private _currentIndex: number | undefined = undefined;
    private _current: Node<T> | null = null;
 
    constructor(...values: T[]) {
        this.append(...values);
    }
 
    append(...values: T[]){
        for (const value of values) {
            this._append(value);
        }
        return this;
    }
 
    isEmpty(): boolean {
        return this._size === 0;
    }
 
    private _append(value: T){
        const newNode = new Node(value);
 
        if (this.isEmpty()) {
            this._first = newNode;
        } else if (this._last) {
            this._last.next = newNode;
        }
 
        this._last = newNode;
        this._size++;
    }
 
    private _validateIndex(index: number): number {
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
 
    private _locate(index: number): Node<T> {
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
 
        return current!;
    }
 
    size(): number {
        return this._size;
    }
 
    get(index: number): T {
        return this._locate(index).value;
    }
 
    set(index: number, value: T){
        this._locate(index).value = value;
        return this;
    }
 
    insert(index: number, value: T){
        index = this._validateIndex(index);
 
        const newNode = new Node(value);
 
        if (index === 0) {
            newNode.next = this._first;
            this._first = newNode;
        } else {
            const n = this._locate(index - 1);
            newNode.next = n.next;
            n.next = newNode;
        }
        this._size++;
        return this;
    }
 
    remove(index: number): T | undefined {
        if (index === 0 && this._size > 0) {
            const delValue = this._first?.value;
            this._first = this._first?.next || null;
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
 
    toString(): string {
        let str = "LinkedList(\t";
        for (let n = this._first; n; n = n.next) {
            str += n.value + "\t";
        }
        return str + ")";
    }
 
    forEach(execute: (value: T, index: number) => void | any): any {
        let i = 0;
        for (let n = this._first; n; n = n.next) {
            const result = execute(n.value, i);
            if (result !== undefined) {
                return result;
            }
            i++;
        }
    }
 
    filter(matcher: (value: T) => boolean): LinkedList<T> {
        const result = new LinkedList<T>();
 
        this.forEach((v: T) => {
            const _matched = matcher(v);
            if (_matched) {
                result.append(v);
            }
        });
 
        return result;
    }
 
    find(matcher: (value: T) => boolean): T | undefined {
        for (let n = this._first; n != null; n = n.next) {
            if (matcher(n.value)) {
                return n.value;
            }
        }
        return undefined;
    }
 
    map<U>(mapper: (value: T) => U): LinkedList<U> {
        const result = new LinkedList<U>();
 
        this.forEach((v: T) => {
            result.append(mapper(v));
        });
 
        return result;
    }
}
 


