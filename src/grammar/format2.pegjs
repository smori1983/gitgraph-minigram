{
  const logManager = options.logManager;
}

start
  = (_ newline)*
    o:segment_option?
    &{ logManager.optionParsed(); return true; }
    l:segment_log
  {
    return {
      option: o || [],
      log: l,
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
    return {
      type: 'empty_line',
    };
  }

git_branch
  = _ 'git' __ 'branch' __ b:branch_add _ newline
  {
    return {
      type: 'branch:create',
      branch: b,
      from: logManager.getCurrentBranch(),
    };
  }

git_branch_and_checkout
  = _ 'git' __ 'checkout' __ '-b' __ b:branch_add _ newline
  {
    const from = logManager.getCurrentBranch();
    logManager.setCurrentBranch(b);

    return {
      type: 'branch:create',
      branch: b,
      from: from,
    };
  }

git_branch_and_switch
  = _ 'git' __ 'switch' __ '-c' __ b:branch_add _ newline
  {
    const from = logManager.getCurrentBranch();
    logManager.setCurrentBranch(b);

    return {
      type: 'branch:create',
      branch: b,
      from: from,
    }
  }

git_checkout
  = _ 'git' __ 'checkout' __ b:branch_get _ newline
  {
    logManager.setCurrentBranch(b);

    return {
      type: 'branch:checkout',
      branch: b,
    };
  }

git_switch
  = _ 'git' __ 'switch' __ b:branch_get _ newline
  {
    logManager.setCurrentBranch(b);

    return {
      type: 'branch:switch',
      branch: b,
    }
  }

git_commit
  = _ 'git' __ 'commit' __ '-m' __ m:(text_single_quote / text_double_quote) _ newline
  {
    const branch = logManager.getCurrentBranch();
    logManager.addCommit(branch);

    return {
      type: 'commit',
      branch: branch,
      message: m,
    };
  }
  / _ 'git' __ 'commit' _ newline
  {
    const branch = logManager.getCurrentBranch();
    logManager.addCommit(branch);

    return {
      type: 'commit',
      branch: branch,
      message: '',
    };
  }

git_merge
  = _ 'git' __ 'merge' __ b:branch_merge _ newline
  {
    const into = logManager.getCurrentBranch();

    try {
      logManager.checkBranchForMerge(into);
    } catch (e) {
      error(e.message);
    }

    return {
      type: 'merge',
      branch: b,
      into: into,
    };
  }

git_tag
  = _ 'git' __ 'tag' __ t:tag_add _ newline
  {
    return {
      type: 'tag',
      branch: logManager.getCurrentBranch(),
      tag: t,
    };
  }

branch_add
  = b:branch_name
  {
    try {
      logManager.addBranch(b);
    } catch (e) {
      error(e.message);
    }

    return b;
  }

branch_get
  = b:branch_name
  {
    try {
      logManager.ensureBranch(b);
    } catch (e) {
      error(e.message);
    }

    return b;
  }

branch_merge
  = b:branch_name
  {
    try {
      logManager.checkBranchForMerge(b);
    } catch (e) {
      error(e.message);
    }

    return b;
  }

tag_add
  = t:tag_name
  {
    const branch = logManager.getCurrentBranch();

    try {
      logManager.addTag(branch, t);
    } catch (e) {
      error(e.message);
    }

    return t;
  }

branch_name
  = $([^ \t\r\n\-][^ \t\r\n]*)

tag_name
  = $([^ \t\r\n\-][^ \t\r\n]*)

text_single_quote
  = single_quote chars:text_single_quote_char* single_quote
  {
    return chars.join('');
  }

text_single_quote_char
  = !single_quote char:[^\r\n]
  {
    return char;
  }

text_double_quote
  = double_quote chars:text_double_quote_char* double_quote
  {
    return chars.join('');
  }

text_double_quote_char
  = !double_quote char:[^\r\n]
  {
    return char;
  }

single_quote
  = "'"

double_quote
  = '"'

_
  = [ \t]*

__
  = [ \t]+

newline
  = [\r\n]+
