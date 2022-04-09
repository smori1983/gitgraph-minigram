class BranchList {
  constructor() {
    /**
     * @type {Map<string, Branch>}
     * @private
     */
    this._branches = new Map();
  }

  /**
   * @param {string} branch
   * @throws {Error}
   */
  add(branch) {
    if (this._branches.has(branch)) {
      throw new Error('Branch already exists: ' + branch);
    }

    this._branches.set(branch, new Branch(branch));
  }

  /**
   * @param {string} branch
   * @return {Branch}
   * @throws {Error}
   */
  get(branch) {
    if (!this._branches.has(branch)) {
      throw new Error('Branch not created: ' + branch);
    }

    return this._branches.get(branch);
  }
}

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
      throw new Error('Tag already exists: ' + tag);
    }

    this._tags.add(tag);
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
     * @type {BranchList}
     * @private
     */
    this._branchList = new BranchList();

    /**
     * @type {TagList}
     * @private
     */
    this._tagList = new TagList();

    /**
     * @type {Branch|null}
     * @private
     */
    this._currentBranch = null;
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
   * @returns {Object}
   */
  gitEmptyLine() {
    return {
      type: 'empty_line',
    };
  }

  /**
   * @param {string} branch
   * @returns {Object}
   * @throws {Error}
   */
  gitBranch(branch) {
    const from = this.getCurrentBranch();

    this.addBranch(branch);

    return {
      type: 'branch:create',
      branch: branch,
      from: from,
    };
  }

  /**
   * @param {string} branch
   * @returns {Object}
   * @throws {Error}
   */
  gitBranchAndCheckout(branch) {
    const from = this.getCurrentBranch();

    this.addBranch(branch);
    this.setCurrentBranch(branch);

    return {
      type: 'branch:create',
      branch: branch,
      from: from,
    };
  }

  /**
   * @param {string} branch
   * @returns {Object}
   * @throws {Error}
   */
  gitBranchAndSwitch(branch) {
    const from = this.getCurrentBranch();

    this.addBranch(branch);
    this.setCurrentBranch(branch);

    return {
      type: 'branch:create',
      branch: branch,
      from: from,
    };
  }

  /**
   * @param {string} branch
   * @returns {Object}
   * @throws {Error}
   */
  gitCheckout(branch) {
    this.setCurrentBranch(branch);

    return {
      type: 'branch:checkout',
      branch: branch,
    };
  }

  /**
   * @param {string} branch
   * @returns {Object}
   * @throws {Error}
   */
  gitSwitch(branch) {
    this.setCurrentBranch(branch);

    return {
      type: 'branch:switch',
      branch: branch,
    };
  }

  /**
   * @param {string} message
   * @return {Object}
   * @throws {Error}
   */
  gitCommit(message) {
    const branch = this.getCurrentBranch();

    this.addCommit(branch);

    return {
      type: 'commit',
      branch: branch,
      message: message,
    };
  }

  /**
   * @param {string} branch
   * @return {Object}
   * @throws {Error}
   */
  gitMerge(branch) {
    const into = this.getCurrentBranch();

    this.checkBranchForMerge(branch);
    this.checkBranchForMerge(into);

    return {
      type: 'merge',
      branch: branch,
      into: into,
    };
  }

  /**
   * @param {string} tag
   * @return {Object}
   * @throws {Error}
   */
  gitTag(tag) {
    const branch = this.getCurrentBranch();

    this.addTag(branch, tag);

    return {
      type: 'tag',
      branch: branch,
      tag: tag,
    };
  }

  /**
   * @param {string} branch
   * @throws {Error}
   */
  addBranch(branch) {
    this._branchList.add(branch);
  }

  /**
   * @param {string} branch
   * @throws {Error}
   */
  ensureBranch(branch) {
    this._branchList.get(branch);
  }

  /**
   * @param {string} branch
   */
  addCommit(branch) {
    this._branchList.get(branch).incrementCommitCount();
  }

  /**
   * @param {string} branch
   * @throws {Error}
   */
  checkBranchForMerge(branch) {
    if (this._branchList.get(branch).getCommitCount() === 0) {
      throw new Error('Branch should have at least 1 commit: ' + branch);
    }
  }

  /**
   * @param {string} branch
   */
  setCurrentBranch(branch) {
    this._currentBranch = this._branchList.get(branch);
  }

  /**
   * @returns {string}
   */
  getCurrentBranch() {
    return this._currentBranch.getName();
  }

  /**
   * @param {string} branch
   * @param {string} tag
   * @throws {Error}
   */
  addTag(branch, tag) {
    if (this._branchList.get(branch).getCommitCount() === 0) {
      throw new Error('Branch should have at least 1 commit: ' + branch);
    }

    this._tagList.add(tag);
  }
}

module.exports = LogManager;
