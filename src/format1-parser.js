const format1 = require('./grammar/format1');
const ParseResult = require('./parse-result');
const ParseData = require('./parse-data');

class Format1Parser {
  /**
   * @param {string} input
   * @returns {ParseResult}
   */
  parse(input) {
    try {
      const format1Parsed = format1.parse(input);

      const defaultBranch = this._resolveDefaultBranch(format1Parsed.option);
      const actions = this._prepareActions(format1Parsed.log, defaultBranch);

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
    for (let i = 0; i < options.length; i++) {
      if (options[i].name === 'defaultBranch') {
        return options[i].value;
      }
    }

    return 'master';
  }

  /**
   * @param {Object[]} logs
   * @param {string} currentBranch
   * @returns {Object[]}
   * @private
   */
  _prepareActions(logs, currentBranch) {
    const result = [];

    logs.forEach((log) => {
      if (log.type === 'branch:create') {
        result.push({
          type: 'branch:create',
          branch: log.branch,
          from: currentBranch,
        });
      }

      if (log.type === 'branch:checkout') {
        currentBranch = log.branch;
      }

      if (log.type === 'branch:switch') {
        currentBranch = log.branch;
      }

      if (log.type === 'branch:create:checkout') {
        result.push({
          type: 'branch:create',
          branch: log.branch,
          from: currentBranch,
        });

        currentBranch = log.branch;
      }

      if (log.type === 'branch:create:switch') {
        result.push({
          type: 'branch:create',
          branch: log.branch,
          from: currentBranch,
        });

        currentBranch = log.branch;
      }

      if (log.type === 'commit') {
        result.push({
          type: 'commit',
          branch: currentBranch,
          message: log.message,
        });
      }

      if (log.type === 'merge') {
        result.push({
          type: 'merge',
          branch: log.branch,
          into: currentBranch,
        });
      }

      if (log.type === 'tag') {
        result.push({
          type: 'tag',
          branch: currentBranch,
          tag: log.tag,
        });
      }
    });

    return result;
  }
}

module.exports = Format1Parser;
