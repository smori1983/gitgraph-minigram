{
  const minigram_location = () => {
    const loc = location();
    return loc;
  };
}

start
  = whitespace*
    o:segment_option?
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
      _location: minigram_location(),
    };
  }

git_branch
  = _ 'git' __ 'branch' __ b:branch_name _ newline
  {
    return {
      type: 'branch:create',
      branch: b,
      _location: minigram_location(),
    };
  }

git_branch_and_checkout
  = _ 'git' __ 'checkout' __ '-b' __ b:branch_name _ newline
  {
    return {
      type: 'branch:create:checkout',
      branch: b,
      _location: minigram_location(),
    };
  }

git_branch_and_switch
  = _ 'git' __ 'switch' __ '-c' __ b:branch_name _ newline
  {
    return {
      type: 'branch:create:switch',
      branch: b,
      _location: minigram_location(),
    }
  }

git_checkout
  = _ 'git' __ 'checkout' __ b:branch_name _ newline
  {
    return {
      type: 'branch:checkout',
      branch: b,
      _location: minigram_location(),
    };
  }

git_switch
  = _ 'git' __ 'switch' __ b:branch_name _ newline
  {
    return {
      type: 'branch:switch',
      branch: b,
      _location: minigram_location(),
    }
  }

git_commit
  = _ 'git' __ 'commit' __ '-m' __ m:(text_single_quote / text_double_quote) _ newline
  {
    return {
      type: 'commit',
      message: m,
      _location: minigram_location(),
    };
  }
  / _ 'git' __ 'commit' _ newline
  {
    return {
      type: 'commit',
      message: null,
      _location: minigram_location(),
    };
  }

git_merge
  = _ 'git' __ 'merge' __ b:branch_name _ newline
  {
    return {
      type: 'merge',
      branch: b,
      _location: minigram_location(),
    };
  }

git_tag
  = _ 'git' __ 'tag' __ t:tag_name _ newline
  {
    return {
      type: 'tag',
      tag: t,
      _location: minigram_location(),
    };
  }

branch_name 'branch name'
  = b:$([^ \t\r\n\-][^ \t\r\n]*)
  {
    return {
      text: b,
      _location: minigram_location(),
    };
  }

tag_name 'tag name'
  = t:$([^ \t\r\n\-][^ \t\r\n]*)
  {
    return {
      text: t,
      _location: minigram_location(),
    };
  }

text_single_quote
  = single_quote chars:text_single_quote_char* single_quote
  {
    return {
      text: chars.join(''),
      _location: minigram_location(),
    };
  }

text_single_quote_char 'text'
  = !single_quote char:[^\r\n]
  {
    return char;
  }

text_double_quote
  = double_quote chars:text_double_quote_char* double_quote
  {
    return {
      text: chars.join(''),
      _location: minigram_location(),
    };
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
