module.exports = [
  // General(no concrete input)
  {
    input: ``,
    line: 1,
  },
  {
    input: `   `,
    line: 1,
  },

  // General(unknown segment)
  {
    input: `
      [foo]
    `,
    line: 2,
  },

  // General(option segment)
  {
    input: `
      [option]
      foo: bar
    `,
    line: 3,
  },

  // General(log segment)
  {
    input: `
      [option]
    `,
    line: 3,
  },
  {
    input: `
      [log]
      [option]
    `,
    line: 3,
  },

  // Git command(general)
  {
    input: `
      [log]
      git
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git foo
    `,
    line: 3,
  },

  // Git command(commit)
  {
    input: `
      [log]
      git commit -m
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git commit -m foo
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git commit -m 'foo' 'bar'
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git commit -m 'foo
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git commit -m 'foo"
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git commit -m "foo
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git commit -m "foo'
    `,
    line: 3,
  },

  // Git command(checkout)
  {
    input: `
      [log]
      git checkout
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git checkout foo bar
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git checkout -z foo
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git checkout -b
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git checkout -b foo bar
    `,
    line: 3,
  },

  // Git command(switch)
  {
    input: `
      [log]
      git switch
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git switch foo bar
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git switch -z foo
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git switch -c
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git switch -c foo bar
    `,
    line: 3,
  },

  // Git command(merge)
  {
    input: `
      [log]
      git merge
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git merge foo bar
    `,
    line: 3,
  },

  // Git command(tag)
  {
    input: `
      [log]
      git tag
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git tag -c
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git tag v1 v2
    `,
    line: 3,
  },
];
