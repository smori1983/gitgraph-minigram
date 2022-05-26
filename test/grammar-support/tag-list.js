const { describe, it } = require('mocha');
const assert = require('assert');
const TagList = require('../../src/grammar-support/tag-list');

describe('grammar-support - tag-list', () => {
  it('should throw Error when tag name duplicated', () => {
    const tagList = new TagList();

    assert.throws(() => {
      tagList.add('v1.0.0');
      tagList.add('v1.0.0');
    }, Error);
  });

  it('tag names', () => {
    const tagList = new TagList();

    tagList.add('t2');
    tagList.add('t1');

    assert.deepStrictEqual(tagList.getTagNames(), ['t1', 't2']);
  });
});
