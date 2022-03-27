class BranchManager {
  constructor() {
    /**
     * @type {string}
     * @private
     */
    this._defaultBranch = 'master';

    /**
     * @type {Set<string>}
     * @private
     */
    this._branches = new Set();
  }

  /**
   * @param {string} branch
   */
  setDefaultBranch(branch) {
    this._defaultBranch = branch;
  }

  optionParsed() {
    this.add(this._defaultBranch);
  }

  /**
   * @param {string} branch
   * @throws {Error}
   */
  add(branch) {
    if (this._branches.has(branch)) {
      throw new Error('Branch already exists: ' + branch);
    }

    this._branches.add(branch);
  }

  /**
   * @param {string} branch
   * @throws {Error}
   */
  shouldExist(branch) {
    if (!this._branches.has(branch)) {
      throw new Error('Branch not created: ' + branch);
    }
  }
}

module.exports = BranchManager;
