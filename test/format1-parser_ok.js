module.exports = [
  {
    input: `
      [log]
      git commit
    `,
    result: {
      defaultBranch: 'master',
      actions: [
        {type: 'commit', branch: 'master', message: ''},
      ],
    },
  },
  {
    input: `
      [option]
      [log]
      git commit
    `,
    result: {
      defaultBranch: 'master',
      actions: [
        {type: 'commit', branch: 'master', message: ''},
      ],
    },
  },
  {
    input: `
      [option]
      defaultBranch: foo
      [log]
      git commit
    `,
    result: {
      defaultBranch: 'foo',
      actions: [
        {type: 'commit', branch: 'foo', message: ''},
      ],
    },
  },
  {
    input: `
      [log]
      git commit -m 'initial commit'
    `,
    result: {
      defaultBranch: 'master',
      actions: [
        {type: 'commit', branch: 'master', message: 'initial commit'},
      ],
    },
  },
  {
    input: `
      [log]
      git commit -m "initial commit"
    `,
    result: {
      defaultBranch: 'master',
      actions: [
        {type: 'commit', branch: 'master', message: 'initial commit'},
      ],
    },
  },
  {
    input: `
      [log]
      git commit -m '1'
      git branch feature/1
      git checkout feature/1
      git commit -m '2'
      git checkout master
      git merge feature/1
      git tag v1.0.0
    `,
    result: {
      defaultBranch: 'master',
      actions: [
        {type: 'commit', branch: 'master', message: '1'},
        {type: 'branch:create', branch: 'feature/1', from: 'master'},
        {type: 'commit', branch: 'feature/1', message: '2'},
        {type: 'merge', branch: 'feature/1', into: 'master'},
        {type: 'tag', branch: 'master', tag: 'v1.0.0'},
      ],
    },
  },
  {
    input: `
      [log]
      git commit -m '1'
      git checkout -b feature/1
      git commit -m '2'
      git checkout master
      git merge feature/1
      git tag v1.0.0
    `,
    result: {
      defaultBranch: 'master',
      actions: [
        {type: 'commit', branch: 'master', message: '1'},
        {type: 'branch:create', branch: 'feature/1', from: 'master'},
        {type: 'commit', branch: 'feature/1', message: '2'},
        {type: 'merge', branch: 'feature/1', into: 'master'},
        {type: 'tag', branch: 'master', tag: 'v1.0.0'},
      ],
    },
  },
  {
    input: `
      [log]
      git commit -m '1'
      git branch feature/1
      git switch feature/1
      git commit -m '2'
      git switch master
      git merge feature/1
      git tag v1.0.0
    `,
    result: {
      defaultBranch: 'master',
      actions: [
        {type: 'commit', branch: 'master', message: '1'},
        {type: 'branch:create', branch: 'feature/1', from: 'master'},
        {type: 'commit', branch: 'feature/1', message: '2'},
        {type: 'merge', branch: 'feature/1', into: 'master'},
        {type: 'tag', branch: 'master', tag: 'v1.0.0'},
      ],
    },
  },
  {
    input: `
      [log]
      git commit -m '1'
      git switch -c feature/1
      git commit -m '2'
      git switch master
      git merge feature/1
      git tag v1.0.0
    `,
    result: {
      defaultBranch: 'master',
      actions: [
        {type: 'commit', branch: 'master', message: '1'},
        {type: 'branch:create', branch: 'feature/1', from: 'master'},
        {type: 'commit', branch: 'feature/1', message: '2'},
        {type: 'merge', branch: 'feature/1', into: 'master'},
        {type: 'tag', branch: 'master', tag: 'v1.0.0'},
      ],
    },
  },
];
