const format2 = require('./grammar/format2');
const LogManager = require('./grammar/log-manager');
const ParseResult = require('./parse-result');
const ParseData = require('./parse-data');

class Format2Parser {
  /**
   * @param {string} input
   * @returns {ParseResult}
   */
  parse(input) {
    try {
      const format2Parsed = format2.parse(input, {
        logManager: new LogManager(),
      });

      const defaultBranch = this._resolveDefaultBranch(format2Parsed.option);
      const actions = this._prepareActions(format2Parsed.log);

      const parseData = new ParseData({
        defaultBranch: defaultBranch,
        actions: actions,
      });

      return new ParseResult(parseData, null);
    } catch (e) {
      return new ParseResult(null, e);
    }
  }

  /**
   * @param {Object[]} options
   * @returns {string}
   * @private
   */
  _resolveDefaultBranch(options) {
    let result = 'master';

    for (let i = 0; i < options.length; i++) {
      if (options[i].name === 'defaultBranch') {
        result = options[i].value;
      }
    }

    return result;
  }

  /**
   * @param {Object[]} logs
   * @returns {Object[]}
   * @private
   */
  _prepareActions(logs) {
    const targets = [
      'branch:create',
      'commit',
      'merge',
      'tag',
    ];

    return logs.filter((log) => {
      return targets.indexOf(log.type) >= 0;
    });
  }
}

module.exports = Format2Parser;
