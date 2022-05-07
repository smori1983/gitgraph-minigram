module.exports = [
  // general - unknown segment
  {
    case: 'general - unknown segment - 01',
    input: `
      [foo]
    `,
    line: 2,
  },

  // general - option segment
  {
    case: 'general - option segment - 01',
    input: `
      [option]
      foo: bar
    `,
    line: 3,
  },

  // general - log segment
  {
    case: 'general - log segment - 01',
    input: `
      [option]
    `,
    line: 3,
  },
  {
    case: 'general - log segment - 02',
    input: `
      [log]
      [option]
    `,
    line: 3,
  },

  // git command - general
  {
    case: 'git command - general - 01',
    input: `
      [log]
      git
    `,
    line: 3,
  },
  {
    case: 'git command - general - 02',
    input: `
      [log]
      git foo
    `,
    line: 3,
  },

  // git command - commit
  {
    case: 'git command - commit - 01',
    input: `
      [log]
      git commit -m
    `,
    line: 3,
  },
  {
    case: 'git command - commit - 02',
    input: `
      [log]
      git commit -m foo
    `,
    line: 3,
  },
  {
    case: 'git command - commit - 03',
    input: `
      [log]
      git commit -m 'foo' 'bar'
    `,
    line: 3,
  },
  {
    case: 'git command - commit - 04',
    input: `
      [log]
      git commit -m 'foo
    `,
    line: 3,
  },
  {
    case: 'git command - commit - 05',
    input: `
      [log]
      git commit -m 'foo"
    `,
    line: 3,
  },
  {
    case: 'git command - commit - 06',
    input: `
      [log]
      git commit -m "foo
    `,
    line: 3,
  },
  {
    case: 'git command - commit - 07',
    input: `
      [log]
      git commit -m "foo'
    `,
    line: 3,
  },

  // git command - checkout
  {
    case: 'git command - checkout - 01',
    input: `
      [log]
      git checkout
    `,
    line: 3,
  },
  {
    case: 'git command - checkout - 02',
    input: `
      [log]
      git checkout foo bar
    `,
    line: 3,
  },
  {
    case: 'git command - checkout - 03',
    input: `
      [log]
      git checkout -z foo
    `,
    line: 3,
  },
  {
    case: 'git command - checkout - 04',
    input: `
      [log]
      git checkout -b
    `,
    line: 3,
  },
  {
    case: 'git command - checkout - 05',
    input: `
      [log]
      git checkout -b foo bar
    `,
    line: 3,
  },

  // git command - switch
  {
    case: 'git command - switch - 01',
    input: `
      [log]
      git switch
    `,
    line: 3,
  },
  {
    case: 'git command - switch - 02',
    input: `
      [log]
      git switch foo bar
    `,
    line: 3,
  },
  {
    case: 'git command - switch - 03',
    input: `
      [log]
      git switch -z foo
    `,
    line: 3,
  },
  {
    case: 'git command - switch - 04',
    input: `
      [log]
      git switch -c
    `,
    line: 3,
  },
  {
    case: 'git command - switch - 05',
    input: `
      [log]
      git switch -c foo bar
    `,
    line: 3,
  },

  // git command - merge
  {
    case: 'git command - merge - 01',
    input: `
      [log]
      git merge
    `,
    line: 3,
  },
  {
    case: 'git command - merge - 02',
    input: `
      [log]
      git merge foo bar
    `,
    line: 3,
  },

  // git command - tag
  {
    case: 'git command - tag - 01',
    input: `
      [log]
      git tag
    `,
    line: 3,
  },
  {
    case: 'git command - tag - 02',
    input: `
      [log]
      git tag -c
    `,
    line: 3,
  },
  {
    case: 'git command - tag - 03',
    input: `
      [log]
      git tag v1 v2
    `,
    line: 3,
  },
];
