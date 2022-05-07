{
  const logManager = options.logManager;
}

start
  = whitespace*
    o:segment_option?
    &{ logManager.optionParsed(); return true; }
    l:segment_log?
  {
    return {
      option: o || [],
      log: l || [],
    };
  }

segment_option
  = _ '[option]' _ newline
    options:option_line*
  {
    return options;
  }

option_line
  = option_empty_line
  / option_default_branch

option_empty_line
  = _ newline
  {
    return {
      name: '',
      value: '',
    };
  }

option_default_branch
  = _ 'defaultBranch' _ ':' _ b:branch_name _ newline
  {
    logManager.setDefaultBranch(b);

    return {
      name: 'defaultBranch',
      value: b,
    };
  }

segment_log
  = _ '[log]' _ newline
    logs:log_line*
  {
    return logs;
  }

log_line
  = git_empty_line
  / git_branch
  / git_branch_and_checkout
  / git_branch_and_switch
  / git_checkout
  / git_switch
  / git_commit
  / git_merge
  / git_tag

git_empty_line
  = (_ newline / __)
  {
    return logManager.gitEmptyLine();
  }

git_branch
  = _ 'git' __ 'branch' __ b:branch_name _ newline
  {
    try {
      return logManager.gitBranch(b);
    } catch (e) {
      error(e.message);
    }
  }

git_branch_and_checkout
  = _ 'git' __ 'checkout' __ '-b' __ b:branch_name _ newline
  {
    try {
      return logManager.gitBranchAndCheckout(b);
    } catch (e) {
      error(e.message);
    }
  }

git_branch_and_switch
  = _ 'git' __ 'switch' __ '-c' __ b:branch_name _ newline
  {
    try {
      return logManager.gitBranchAndSwitch(b);
    } catch (e) {
      error(e.message);
    }
  }

git_checkout
  = _ 'git' __ 'checkout' __ b:branch_name _ newline
  {
    try {
      return logManager.gitCheckout(b);
    } catch (e) {
      error(e.message);
    }
  }

git_switch
  = _ 'git' __ 'switch' __ b:branch_name _ newline
  {
    try {
      return logManager.gitSwitch(b);
    } catch (e) {
      error(e.message);
    }
  }

git_commit
  = _ 'git' __ 'commit' __ '-m' __ m:(text_single_quote / text_double_quote) _ newline
  {
    try {
      return logManager.gitCommit(m);
    } catch (e) {
      error(e.message);
    }
  }
  / _ 'git' __ 'commit' _ newline
  {
    try {
      return logManager.gitCommit('');
    } catch (e) {
      error(e.message);
    }
  }

git_merge
  = _ 'git' __ 'merge' __ b:branch_name _ newline
  {
    try {
      return logManager.gitMerge(b);
    } catch (e) {
      error(e.message);
    }
  }

git_tag
  = _ 'git' __ 'tag' __ t:tag_name _ newline
  {
    try {
      return logManager.gitTag(t);
    } catch (e) {
      error(e.message);
    }
  }

branch_name 'branch name'
  = $([^ \t\r\n\-][^ \t\r\n]*)

tag_name 'tag name'
  = $([^ \t\r\n\-][^ \t\r\n]*)

text_single_quote
  = single_quote chars:text_single_quote_char* single_quote
  {
    return chars.join('');
  }

text_single_quote_char 'text'
  = !single_quote char:[^\r\n]
  {
    return char;
  }

text_double_quote
  = double_quote chars:text_double_quote_char* double_quote
  {
    return chars.join('');
  }

text_double_quote_char 'text'
  = !double_quote char:[^\r\n]
  {
    return char;
  }

single_quote
  = "'"

double_quote
  = '"'

_ 'space'
  = [ \t]*

__ 'space'
  = [ \t]+

newline 'newline'
  = [\r\n]+

whitespace 'whitespace'
  = [ \t\r\n]
