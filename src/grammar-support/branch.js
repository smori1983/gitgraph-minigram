class Branch {
  /**
   * @param {string} name
   */
  constructor(name) {
    /**
     * @type {string}
     * @private
     */
    this._name = name;

    /**
     * @type {number}
     * @private
     */
    this._commits = 0;
  }

  /**
   * @returns {string}
   */
  getName() {
    return this._name;
  }

  incrementCommitCount() {
    this._commits += 1;
  }

  /**
   * @returns {number}
   */
  getCommitCount() {
    return this._commits;
  }
}

module.exports = Branch;
