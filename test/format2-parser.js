const { describe } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const Parser = require('../src/format2-parser');

describe('format2-parser', () => {
  describe('ok pattern', () => {
    const patterns = require('./input_ok_common');

    given(patterns).it('should parse', (arg) => {
      const parser = new Parser();
      const parseResult = parser.parse(arg.input);

      assert.deepStrictEqual(parseResult.parsed(), true);
      assert.deepStrictEqual(parseResult.getParseData().dump(), arg.result);
      assert.deepStrictEqual(parseResult.getParseData().getDefaultBranch(), arg.result.defaultBranch);
      assert.deepStrictEqual(parseResult.getParseData().getActions(), arg.result.actions);
    });

    given(patterns).it('should throw error from getError()', (arg) => {
      const parser = new Parser();
      const parseResult = parser.parse(arg.input);

      assert.throws(() => {
        parseResult.getError();
      }, Error);
    });
  });

  describe('error pattern', () => {
    const patternsSyntax = require('./input_error_syntax');
    const patternsSemantics = require('./input_error_semantics');
    const patterns = [].concat(patternsSyntax, patternsSemantics);

    given(patterns).it('should not parse', (arg) => {
      const parser = new Parser();
      const parseResult = parser.parse(arg.input);

      assert.deepStrictEqual(parseResult.parsed(), false);

      const error = parseResult.getError();

      assert.deepStrictEqual(error.location.start.line, arg.line);

      if (typeof arg.message === 'string') {
        assert.deepStrictEqual(error.message, arg.message);
      }
    });

    given(patterns).it('should throw error from getParseData()', (arg) => {
      const parser = new Parser();
      const parseResult = parser.parse(arg.input);

      assert.throws(() => {
        parseResult.getParseData();
      }, Error);
    });
  });
});
