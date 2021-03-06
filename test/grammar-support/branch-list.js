const { describe, it } = require('mocha');
const assert = require('assert');
const BranchList = require('../../src/grammar-support/branch-list');

describe('grammar-support - branch-list', () => {
  it('should throw Error when branch name duplicated', () => {
    const branchList = new BranchList();

    assert.throws(() => {
      branchList.add('master');
      branchList.add('master');
    }, Error);
  });

  it('should throw Error when non-existing branch was requested', () => {
    const branchList = new BranchList();

    assert.throws(() => {
      branchList.get('master');
    }, Error);
  });

  it('branch names', () => {
    const branchList = new BranchList();

    branchList.add('b2');
    branchList.add('b1');

    assert.deepStrictEqual(branchList.getBranchNames(), ['b1', 'b2']);
  });
});
