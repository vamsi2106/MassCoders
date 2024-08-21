const matchers = {
  match: (criteria) => {
    return (item) => {
      for (let key in criteria) {
        if (key.startsWith("$")) {
          if (!criteria[key](item)) return false;
        } else if (!matchers.compare(criteria[key], item[key])) {
          return false;
        }
      }
      return true;
    };
  },

  compare: (expected, actual) => {
    if (typeof expected === "function") {
      return expected(actual);
    }
    return expected === actual;
  },

  contains: (subStr) => (str) =>
    str.toLowerCase().includes(subStr.toLowerCase()),

  not: (matcher) => (value) => !matcher(value),

  between: (min, max) => (value) => value >= min && value <= max,

  any:
    (...matchers) =>
    (item) =>
      matchers.some((m) => m(item)),

  all:
    (...matchers) =>
    (item) =>
      matchers.every((m) => m(item)),

  lessThan: (n) => (value) => value < n,

  containsNoneOf:
    (...subStrs) =>
    (str) =>
      subStrs.every(
        (subStr) => !str.toLowerCase().includes(subStr.toLowerCase())
      ),

  or:
    (...criteria) =>
    (item) =>
      matchers.any(...criteria)(item),

  take: (n, matcher = () => true) => {
    let count = 0;
    return (value) => {
      if (count < n) {
        const result = matcher(value);
        count++;
        return result;
      }
      return false;
    };
  },

  distinct: (keyFn = (item) => item) => {
    const seen = new Set();
    return (item) => {
      const key = keyFn(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    };
  },
};

const generators = {
  fixed: (count, value) => {
    return function* () {
      for (let i = 0; i < count; i++) {
        yield value;
      }
    };
  },

  range: (start, end, step = 1) => {
    return function* () {
      for (let i = start; i < end; i += step) {
        yield i;
      }
    };
  },
};

const fill = (collection, generator) => {
  const gen = generator();
  for (let value of gen) {
    if (Array.isArray(collection)) {
      collection.push(value);
    } else if (typeof collection === "function") {
      collection(value);
    }
  }
};

module.exports = {
  matchers,
  generators,
  fill,
};
