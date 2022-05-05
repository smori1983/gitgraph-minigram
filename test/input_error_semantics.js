module.exports = [
  // create branch - no commits on start point branch
  {
    case: 'create branch - no commits on start point branch - 01',
    input: `
      [log]
      git branch foo
    `,
    line: 3,
  },
  {
    case: 'create branch - no commits on start point branch - 02',
    input: `
      [log]
      git commit
      git branch foo
      git checkout foo
      git branch bar
    `,
    line: 6,
  },
  {
    case: 'create branch - no commits on start point branch - 03',
    input: `
      [log]
      git checkout -b foo
    `,
    line: 3,
  },
  {
    case: 'create branch - no commits on start point branch - 04',
    input: `
      [log]
      git commit
      git checkout -b foo
      git checkout -b bar
    `,
    line: 5,
  },
  {
    case: 'create branch - no commits on start point branch - 05',
    input: `
      [log]
      git switch -c foo
    `,
    line: 3,
  },
  {
    case: 'create branch - no commits on start point branch - 06',
    input: `
      [log]
      git commit
      git switch -c foo
      git switch -c bar
    `,
    line: 5,
  },

  // create branch - already created
  {
    case: 'create branch - already created - 01',
    input: `
      [log]
      git commit
      git branch foo
      git commit
      git branch foo
    `,
    line: 6,
  },
  {
    case: 'create branch - already created - 02',
    input: `
      [log]
      git commit
      git branch foo
      git commit
      git checkout -b foo
    `,
    line: 6,
  },
  {
    case: 'create branch - already created - 03',
    input: `
      [log]
      git commit
      git branch foo
      git commit
      git switch -c foo
    `,
    line: 6,
  },
  {
    case: 'create branch - already created - 04',
    input: `
      [log]
      git commit
      git checkout -b foo
      git commit
      git branch foo
    `,
    line: 6,
  },
  {
    case: 'create branch - already created - 05',
    input: `
      [log]
      git commit
      git checkout -b foo
      git commit
      git checkout -b foo
    `,
    line: 6,
  },
  {
    case: 'create branch - already created - 06',
    input: `
      [log]
      git commit
      git checkout -b foo
      git commit
      git switch -c foo
    `,
    line: 6,
  },
  {
    case: 'create branch - already created - 07',
    input: `
      [log]
      git commit
      git switch -c foo
      git commit
      git branch foo
    `,
    line: 6,
  },
  {
    case: 'create branch - already created - 08',
    input: `
      [log]
      git commit
      git switch -c foo
      git commit
      git checkout -b foo
    `,
    line: 6,
  },
  {
    case: 'create branch - already created - 09',
    input: `
      [log]
      git commit
      git switch -c foo
      git commit
      git switch -c foo
    `,
    line: 6,
  },

  // merge - branch not created
  {
    case: 'merge - branch not created - 01',
    input: `
      [log]
      git merge foo
    `,
    line: 3,
  },
  {
    case: 'merge - branch not created - 02',
    input: `
      [log]
      git commit
      git merge foo
    `,
    line: 4,
  },

  // merge - no commits on branch
  {
    case: 'merge - no commits on branch - 01',
    input: `
      [log]
      git commit
      git switch -c foo
      git checkout master
      git merge foo
    `,
    line: 6,
  },
  {
    case: 'merge - no commits on branch - 02',
    input: `
      [log]
      git commit
      git switch -c foo
      git commit
      git checkout -b bar
      git merge foo
    `,
    line: 7,
  },

  // merge - current branch and target branch
  {
    case: 'merge - current branch and target branch - 01',
    input: `
      [log]
      git commit
      git merge master
    `,
    line: 4,
  },
  {
    case: 'merge - current branch and target branch - 02',
    input: `
      [log]
      git commit
      git switch -c foo
      git commit
      git merge foo
    `,
    line: 6,
  },

  // tag - already exists
  {
    case: 'tag - already exists - 01',
    input: `
      [log]
      git commit
      git tag v1
      git tag v1
    `,
    line: 5,
  },
  {
    case: 'tag - already exists - 02',
    input: `
      [log]
      git commit
      git tag v1
      git commit
      git tag v1
    `,
    line: 6,
  },

  // tag - no commits on branch
  {
    case: 'tag - no commits on branch - 01',
    input: `
      [log]
      git tag v1
    `,
    line: 3,
  },
  {
    case: 'tag - no commits on branch - 02',
    input: `
      [log]
      git commit
      git switch -c foo
      git tag v1
    `,
    line: 5,
  },
];
