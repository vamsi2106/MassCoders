var { LinkedList } = require("./list");

//import LinkedList from './list';

(function () {
  LinkedList.prototype._removeIndex = LinkedList.prototype.remove;

  LinkedList.prototype._removeSelected = function (matcher) {
    var removed = new LinkedList();

    var p = null;
    for (var i = 0; i < this.size(); i++) {
      var v = this.get(i);
      console.log(i, v);

      var _matched = matcher(v);
      if (_matched === undefined) break;
      if (_matched) {
        console.log("removing ", v);
        removed.append(v);
        this._removeIndex(i);
        i--;
      }
    }
    return removed;
  };

  LinkedList.prototype.remove = function (param) {
    if (typeof param === "function") return this._removeSelected(param);
    else return this._removeIndex(param);
  };

  LinkedList.prototype.groupBy = function (keyGetter) {
    const result = {};

    this.forEach((value) => {
      const key = keyGetter(value);
      if (!result[key]) {
        result[key] = new LinkedList();
      }
      result[key].append(value);
    });

    return result;
  };

  LinkedList.prototype._forEach = function* () {
    for (let n = this._first; n; n = n.next) {
      yield n;
    }
  };

  LinkedList.prototype._filter = function* (matcher) {
    for (let { value } of this.forEachGenerator()) {
      if (matcher(value)) {
        yield value;
      }
    }
  };

  LinkedList.prototype._map = function* (mapper) {
    for (let { value } of this.forEachGenerator()) {
      yield mapper(value);
    }
  };

  LinkedList.prototype._groupBy = function* (keyGetter) {
    const groups = {};

    for (let { value } of this._forEach()) {
      const key = keyGetter(value);
      if (!groups[key]) {
        groups[key] = new LinkedList();
      }
      groups[key].append(value);
      yield { key, value };
    }

    return groups;
  };
})();
