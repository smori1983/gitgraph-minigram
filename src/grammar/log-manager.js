class LogManager {
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

    /**
     * @type {string}
     * @private
     */
    this._currentBranch = '';
  }

  /**
   * @param {string} branch
   */
  setDefaultBranch(branch) {
    this._defaultBranch = branch;
  }

  optionParsed() {
    this.addBranch(this._defaultBranch);
    this.setCurrentBranch(this._defaultBranch);
  }

  /**
   * @param {string} branch
   * @throws {Error}
   */
  addBranch(branch) {
    if (this._branches.has(branch)) {
      throw new Error('Branch already exists: ' + branch);
    }

    this._branches.add(branch);
  }

  /**
   * @param {string} branch
   * @throws {Error}
   */
  ensureBranch(branch) {
    if (!this._branches.has(branch)) {
      throw new Error('Branch not created: ' + branch);
    }
  }

  /**
   * @param {string} branch
   */
  setCurrentBranch(branch) {
    this.ensureBranch(branch);
    this._currentBranch = branch;
  }

  /**
   * @returns {string}
   */
  getCurrentBranch() {
    return this._currentBranch;
  }
}

module.exports = LogManager;
