const { describe, it } = require('mocha');
const assert = require('assert');
const Branch = require('../../src/grammar-support/branch');

describe('grammar-support - branch', () => {
  it('branch name', () => {
    const branch = new Branch('feature/1');

    assert.deepStrictEqual(branch.getName(), 'feature/1');
  });

  it('initial commit count should be 0', () => {
    const branch = new Branch('master');

    assert.deepStrictEqual(branch.getCommitCount(), 0);
  });

  it('handle commit count', () => {
    const branch = new Branch('master');

    branch.incrementCommitCount();
    branch.incrementCommitCount();
    branch.incrementCommitCount();

    assert.deepStrictEqual(branch.getCommitCount(), 3);
  });
});
