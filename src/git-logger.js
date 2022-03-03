/**
 * @typedef {import('@gitgraph/core/lib/user-api/gitgraph-user-api').GitgraphUserApi} GitgraphUserApi
 * @typedef {import('@gitgraph/core/lib/user-api/branch-user-api').BranchUserApi} BranchUserApi
 */

const Format1Parser = require('./format1-parser');

class GitLogger {
  constructor() {
    /**
     * @type {Format1Parser}
     * @private
     */
    this._parser = new Format1Parser();

    /**
     * @type {Map<string, BranchUserApi>}
     * @private
     */
    this._branches = new Map();
  }

  /**
   * @param {GitgraphUserApi} api
   * @param {string} input
   */
  create(api, input) {
    const parsed = this._parser.parse(input);

    this._registerBranch(api.branch(parsed.data.defaultBranch));

    parsed.data.actions.forEach((action) => {
      if (action.type === 'branch:create') {
        this._createBranch(action);
      }
      if (action.type === 'commit') {
        this._createCommit(action);
      }
      if (action.type === 'merge') {
        this._createMerge(action);
      }
      if (action.type === 'tag') {
        this._createTag(action);
      }
    });
  }

  /**
   * @param {Object} action
   * @private
   */
  _createBranch(action) {
    const from = this._getBranch(action.from);

    this._registerBranch(from.branch(action.branch));
  }

  /**
   * @param {Object} action
   * @private
   */
  _createCommit(action) {
    const branch = this._getBranch(action.branch);

    branch.commit(action.message);
  }

  /**
   * @param {Object} action
   * @private
   */
  _createMerge(action) {
    const branch = this._getBranch(action.branch);
    const into = this._getBranch(action.into);

    into.merge(branch);
  }

  /**
   * @param {Object} action
   * @private
   */
  _createTag(action) {
    const branch = this._getBranch(action.branch);

    branch.tag(action.tag);
  }

  /**
   * @param {BranchUserApi} branch
   * @private
   */
  _registerBranch(branch) {
    this._branches.set(branch.name, branch);
  }

  /**
   * @param {string} name
   * @returns {BranchUserApi}
   * @throws {Error}
   * @private
   */
  _getBranch(name) {
    if (this._branches.has(name) === false) {
      throw new Error('Branch not created: ' + name);
    }

    return this._branches.get(name);
  }
}

module.exports = GitLogger;
