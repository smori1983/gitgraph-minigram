module.exports = [
  // create branch - no commits on start point branch
  {
    case: 'create branch - no commits on start point branch - 01',
    input: `
      [log]
      git branch foo
    `,
    line: 3,
    message: 'Branch should have at least 1 commit: master',
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
    message: 'Branch should have at least 1 commit: foo',
  },
  {
    case: 'create branch - no commits on start point branch - 03',
    input: `
      [log]
      git checkout -b foo
    `,
    line: 3,
    message: 'Branch should have at least 1 commit: master',
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
    message: 'Branch should have at least 1 commit: foo',
  },
  {
    case: 'create branch - no commits on start point branch - 05',
    input: `
      [log]
      git switch -c foo
    `,
    line: 3,
    message: 'Branch should have at least 1 commit: master',
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
    message: 'Branch should have at least 1 commit: foo',
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
    message: 'Branch already exists: foo',
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
    message: 'Branch already exists: foo',
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
    message: 'Branch already exists: foo',
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
    message: 'Branch already exists: foo',
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
    message: 'Branch already exists: foo',
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
    message: 'Branch already exists: foo',
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
    message: 'Branch already exists: foo',
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
    message: 'Branch already exists: foo',
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
    message: 'Branch already exists: foo',
  },

  // merge - branch not created
  {
    case: 'merge - branch not created - 01',
    input: `
      [log]
      git merge foo
    `,
    line: 3,
    message: 'Branch not created: foo',
  },
  {
    case: 'merge - branch not created - 02',
    input: `
      [log]
      git commit
      git merge foo
    `,
    line: 4,
    message: 'Branch not created: foo',
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
    message: 'Branch should have at least 1 commit: foo',
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
    message: 'Branch should have at least 1 commit: bar',
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
    message: 'Another branch should be merged, current branch: master',
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
    message: 'Another branch should be merged, current branch: foo',
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
    message: 'Tag already exists: v1',
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
    message: 'Tag already exists: v1',
  },

  // tag - no commits on branch
  {
    case: 'tag - no commits on branch - 01',
    input: `
      [log]
      git tag v1
    `,
    line: 3,
    message: 'Branch should have at least 1 commit: master',
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
    message: 'Branch should have at least 1 commit: foo',
  },
];
