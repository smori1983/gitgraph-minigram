class Branch {
  constructor() {
    /**
     * @type {number}
     * @private
     */
    this._commits = 0;
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

class LogManager {
  constructor() {
    /**
     * @type {string}
     * @private
     */
    this._defaultBranch = 'master';

    /**
     * @type {Map<string, Branch>}
     * @private
     */
    this._branches = new Map();

    /**
     * @type {Set<string>}
     * @private
     */
    this._tags = new Set();

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

    this._branches.set(branch, new Branch());
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
  addCommit(branch) {
    this.ensureBranch(branch);
    this._branches.get(branch).incrementCommitCount();
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

  /**
   * @param {string} branch
   * @param {string} tag
   * @throws {Error}
   */
  addTag(branch, tag) {
    this.ensureBranch(branch);

    if (this._branches.get(branch).getCommitCount() === 0) {
      throw new Error('Branch should have at least 1 commit: ' + branch);
    }

    if (this._tags.has(tag)) {
      throw new Error('Tag already exists: ' + tag);
    }

    this._tags.add(tag);
  }
}

module.exports = LogManager;
