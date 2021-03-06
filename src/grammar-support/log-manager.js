const BranchList = require('./branch-list');
const TagList = require('./tag-list');

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
    this._addBranch(this._defaultBranch);
    this._setCurrentBranch(this._defaultBranch);
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
    const from = this._getCurrentBranch();

    this._addBranch(branch);
    this._checkBranchForStartPoint(from);

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
    const from = this._getCurrentBranch();

    this._addBranch(branch);
    this._checkBranchForStartPoint(from);
    this._setCurrentBranch(branch);

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
    const from = this._getCurrentBranch();

    this._addBranch(branch);
    this._checkBranchForStartPoint(from);
    this._setCurrentBranch(branch);

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
    this._setCurrentBranch(branch);

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
    this._setCurrentBranch(branch);

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
    const branch = this._getCurrentBranch();

    this._addCommit(branch);

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
    const into = this._getCurrentBranch();

    this._checkBranchForMerge(branch, into);

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
    const branch = this._getCurrentBranch();

    this._addTag(branch, tag);

    return {
      type: 'tag',
      branch: branch,
      tag: tag,
    };
  }

  /**
   * @param {string} branch
   * @throws {Error}
   * @private
   */
  _addBranch(branch) {
    this._branchList.add(branch);
  }

  /**
   * @param {string} branch
   * @private
   */
  _addCommit(branch) {
    this._branchList.get(branch).incrementCommitCount();
  }

  /**
   * @param {string} branch
   * @throws {Error}
   * @private
   */
  _checkBranchForStartPoint(branch) {
    if (this._branchList.get(branch).getCommitCount() === 0) {
      throw new Error('Branch should have at least 1 commit: ' + branch);
    }
  }

  /**
   * @param {string} branch
   * @param {string} into
   * @throws {Error}
   * @private
   */
  _checkBranchForMerge(branch, into) {
    if (this._branchList.get(branch).getCommitCount() === 0) {
      throw new Error('Branch should have at least 1 commit: ' + branch);
    }

    if (this._branchList.get(into).getCommitCount() === 0) {
      throw new Error('Branch should have at least 1 commit: ' + into);
    }

    if (branch === into) {
      throw new Error('Another branch should be merged, current branch: ' + into);
    }
  }

  /**
   * @param {string} branch
   * @private
   */
  _setCurrentBranch(branch) {
    this._currentBranch = this._branchList.get(branch);
  }

  /**
   * @returns {string}
   * @private
   */
  _getCurrentBranch() {
    return this._currentBranch.getName();
  }

  /**
   * @param {string} branch
   * @param {string} tag
   * @throws {Error}
   * @private
   */
  _addTag(branch, tag) {
    if (this._branchList.get(branch).getCommitCount() === 0) {
      throw new Error('Branch should have at least 1 commit: ' + branch);
    }

    this._tagList.add(tag);
  }
}

module.exports = LogManager;
