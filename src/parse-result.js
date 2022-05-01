/**
 * @typedef {import('./parse-data')} ParseData
 * @typedef {import('pegjs').GrammarError} GrammarError
 * @typedef {import('pegjs').PEG.SyntaxError} PegSyntaxError
 */

class ParseResult {
  /**
   * @param {ParseData|null} parseData
   * @param {GrammarError|PegSyntaxError|null} error
   */
  constructor(parseData, error) {
    /**
     * @type {ParseData|null}
     * @private
     */
    this._parseData = parseData;

    /**
     * @type {GrammarError|PegSyntaxError|null}
     * @private
     */
    this._error = error;
  }

  /**
   * @returns {boolean}
   */
  parsed() {
    return this._parseData !== null;
  }

  /**
   * @returns {ParseData}
   * @throws {Error}
   */
  getParseData() {
    if (this._parseData === null) {
      throw new Error('Parse failed');
    }

    return this._parseData;
  }

  /**
   * @returns {GrammarError|PegSyntaxError}
   * @throws {Error}
   */
  getError() {
    if (this._error === null) {
      throw new Error('Parse succeeded');
    }

    return this._error;
  }
}

module.exports = ParseResult;
