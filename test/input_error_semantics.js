module.exports = [
  // Create branch: No commits on start point branch
  {
    input: `
      [log]
      git branch foo
    `,
    line: 3,
  },
  {
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
    input: `
      [log]
      git checkout -b foo
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git commit
      git checkout -b foo
      git checkout -b bar
    `,
    line: 5,
  },
  {
    input: `
      [log]
      git switch -c foo
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git commit
      git switch -c foo
      git switch -c bar
    `,
    line: 5,
  },

  // Create branch: Already created
  {
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
    input: `
      [log]
      git commit
      git switch -c foo
      git commit
      git switch -c foo
    `,
    line: 6,
  },

  // Merge: Branch not created
  {
    input: `
      [log]
      git merge foo
    `,
    line: 3,
  },
  {
    input: `
      [log]
      git commit
      git merge foo
    `,
    line: 4,
  },

  // Merge: No commits on branch
  {
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

  // Tag: Already exists
  {
    input: `
      [log]
      git commit
      git tag v1
      git tag v1
    `,
    line: 5,
  },
  {
    input: `
      [log]
      git commit
      git tag v1
      git commit
      git tag v1
    `,
    line: 6,
  },

  // Tag: No commits on branch
  {
    input: `
      [log]
      git tag v1
    `,
    line: 3,
  },
];
