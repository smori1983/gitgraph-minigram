start
  = (_ newline)*
    o:segment_option?
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
  = option_default_branch

option_default_branch
  = _ 'defaultBranch' _ ':' _ b:branch_name _ newline
  {
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
  = empty_line
  / git_branch
  / git_branch_and_checkout
  / git_branch_and_switch
  / git_checkout
  / git_switch
  / git_commit
  / git_merge
  / git_tag

empty_line
  = (_ newline / __)
  {
    return {
      type: 'empty_line',
    };
  }

git_branch
  = _ 'git' __ 'branch' __ b:branch_name _ newline
  {
    return {
      type: 'branch:create',
      branch: b,
    };
  }

git_branch_and_checkout
  = _ 'git' _ 'checkout' _ '-b' _ b:branch_name _ newline
  {
    return {
      type: 'branch:create:checkout',
      branch: b,
    };
  }

git_branch_and_switch
  = _ 'git' _ 'switch' _ '-c' _ b:branch_name _ newline
  {
    return {
      type: 'branch:create:switch',
      branch: b,
    }
  }

git_checkout
  = _ 'git' __ 'checkout' __ b:branch_name _ newline
  {
    return {
      type: 'branch:checkout',
      branch: b,
    };
  }

git_switch
  = _ 'git' __ 'switch' __ b:branch_name _ newline
  {
    return {
      type: 'branch:switch',
      branch: b,
    }
  }

git_commit
  = _ 'git' __ 'commit' __ '-m' __ m:(text_single_quote / text_double_quote) _ newline
  {
    return {
      type: 'commit',
      message: m,
    };
  }
  / _ 'git' __ 'commit' _ newline
  {
    return {
      type: 'commit',
      message: '',
    };
  }

git_merge
  = _ 'git' __ 'merge' __ b:branch_name _ newline
  {
    return {
      type: 'merge',
      branch: b,
    };
  }

git_tag
  = _ 'git' __ 'tag' __ t:tag_name _ newline
  {
    return {
      type: 'tag',
      tag: t,
    };
  }

branch_name
  = $([^ \t\r\n]+)

tag_name
  = $([^ \t\r\n]+)

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
