const sprintf = require('sprintf-js').sprintf;

class TagList {
  constructor() {
    /**
     * @type {Set<string>}
     * @private
     */
    this._tags = new Set();
  }

  /**
   * @param {string} tag
   * @throws {Error}
   */
  add(tag) {
    if (this._tags.has(tag)) {
      throw new Error(sprintf('Tag \'%s\' already exists.', tag));
    }

    this._tags.add(tag);
  }

  /**
   * @return {string[]}
   */
  getTagNames() {
    const result = [];

    this._tags.forEach((tag) => {
      result.push(tag);
    });

    result.sort();

    return result;
  }
}

module.exports = TagList;
