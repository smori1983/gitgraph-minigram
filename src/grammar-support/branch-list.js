const sprintf = require('sprintf-js').sprintf;
const Branch = require('./branch');

/**
 * Only manages branch list, does not manage commit graph.
 */
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
      throw new Error(sprintf('A branch named \'%s\' already exists.', branch));
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

  /**
   * @return {string[]}
   */
  getBranchNames() {
    const result = [];

    this._branches.forEach((branch) => {
      result.push(branch.getName());
    });

    result.sort();

    return result;
  }
}

module.exports = BranchList;
