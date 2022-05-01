const GrammarError = require('pegjs').GrammarError;
const format1 = require('./grammar/format1');
const LogManager = require('./grammar/log-manager');
const ParseResult = require('./parse-result');
const ParseData = require('./parse-data');

class Format1Parser {
  /**
   * @param {string} input
   * @returns {ParseResult}
   */
  parse(input) {
    try {
      const logManager = new LogManager();

      const format1Parsed = format1.parse(input);

      const defaultBranch = this._resolveDefaultBranch(format1Parsed.option);

      logManager.setDefaultBranch(defaultBranch);
      logManager.optionParsed();

      const actions = this._prepareActions(format1Parsed.log, logManager);

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
        return options[i].value.text;
      }
    }

    return 'master';
  }

  /**
   * @param {Object[]} logs
   * @param {LogManager} logManager
   * @returns {Object[]}
   * @private
   */
  _prepareActions(logs, logManager) {
    const result = [];

    logs.forEach((log) => {
      if (log.type === 'branch:create') {
        try {
          result.push(logManager.gitBranch(log.branch.text));
        } catch (e) {
          throw new GrammarError(e.message, log._location);
        }
      }

      if (log.type === 'branch:checkout') {
        try {
          logManager.gitCheckout(log.branch.text);
        } catch (e) {
          throw new GrammarError(e.message, log._location);
        }
      }

      if (log.type === 'branch:switch') {
        try {
          logManager.gitSwitch(log.branch.text);
        } catch (e) {
          throw new GrammarError(e.message, log._location);
        }
      }

      if (log.type === 'branch:create:checkout') {
        try {
          result.push(logManager.gitBranchAndCheckout(log.branch.text));
        } catch (e) {
          throw new GrammarError(e.message, log._location);
        }
      }

      if (log.type === 'branch:create:switch') {
        try {
          result.push(logManager.gitBranchAndSwitch(log.branch.text));
        } catch (e) {
          throw new GrammarError(e.message, log._location);
        }
      }

      if (log.type === 'commit') {
        try {
          result.push(logManager.gitCommit(log.message ? log.message.text : ''));
        } catch (e) {
          throw new GrammarError(e.message, log._location);
        }
      }

      if (log.type === 'merge') {
        try {
          result.push(logManager.gitMerge(log.branch.text));
        } catch (e) {
          throw new GrammarError(e.message, log._location);
        }
      }

      if (log.type === 'tag') {
        try {
          result.push(logManager.gitTag(log.tag.text));
        } catch (e) {
          throw new GrammarError(e.message, log._location);
        }
      }
    });

    return result;
  }
}

module.exports = Format1Parser;
