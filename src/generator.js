/**
 * @typedef {import('@gitgraph/core/lib/user-api/gitgraph-user-api').GitgraphUserApi} GitgraphUserApi
 * @typedef {import('@gitgraph/core/lib/user-api/branch-user-api').BranchUserApi} BranchUserApi
 * @typedef {import('./parse-data')} ParseData
 */

const sprintf = require('sprintf-js').sprintf;

class Generator {
  constructor() {
    /**
     * @type {Map<string, BranchUserApi>}
     * @private
     */
    this._branches = new Map();
  }

  /**
   * @param {GitgraphUserApi} api
   * @param {ParseData} parseData
   */
  generate(api, parseData) {
    this._registerBranch(api.branch(parseData.getDefaultBranch()));

    parseData.getActions().forEach((action) => {
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
      throw new Error(sprintf('A branch named \'%s\' not created.', name));
    }

    return this._branches.get(name);
  }
}

module.exports = Generator;
