const { describe } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const Parser = require('../src/format1-parser');

describe('format1-parser', () => {
  const okPatterns = require('./format1-parser_ok');

  given(okPatterns).it('should parse', (arg) => {
    const parser = new Parser();

    const parseResult = parser.parse(arg.input);

    assert.deepStrictEqual(parseResult.parsed(), true);
    assert.deepStrictEqual(parseResult.getParseData().dump(), arg.result);
  });

  const errorPatterns = require('./format1-parser_error');

  given(errorPatterns).it('should not parse', (arg) => {
    const parser = new Parser();

    const parseResult = parser.parse(arg.input);

    assert.deepStrictEqual(parseResult.parsed(), false);

    const error = parseResult.getError();

    assert.deepStrictEqual(error.location.start.line, arg.line);
  });
});
