module.exports = [
  // Branch: Already created
  {
    input: `
      [log]
      git branch foo
      git branch foo
    `,
    line: 4,
  },
  {
    input: `
      [log]
      git branch foo
      git checkout -b foo
    `,
    line: 4,
  },
  {
    input: `
      [log]
      git branch foo
      git switch -c foo
    `,
    line: 4,
  },
  {
    input: `
      [log]
      git checkout -b foo
      git branch foo
    `,
    line: 4,
  },
  {
    input: `
      [log]
      git checkout -b foo
      git checkout -b foo
    `,
    line: 4,
  },
  {
    input: `
      [log]
      git checkout -b foo
      git switch -c foo
    `,
    line: 4,
  },
  {
    input: `
      [log]
      git switch -c foo
      git branch foo
    `,
    line: 4,
  },
  {
    input: `
      [log]
      git switch -c foo
      git checkout -b foo
    `,
    line: 4,
  },
  {
    input: `
      [log]
      git switch -c foo
      git switch -c foo
    `,
    line: 4,
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
      git switch -c foo
      git commit
      git checkout master
      git merge foo
    `,
    line: 6,
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
