module.exports = [
  // Branch already created
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

  // Merge: no commits on branch
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

  // Tag already exists
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
];