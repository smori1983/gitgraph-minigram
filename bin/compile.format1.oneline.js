const fs = require('fs');
const peg = require('pegjs');

const grammar = fs.readFileSync('src/grammar/format1.pegjs').toString();

const parser = peg.generate(grammar, {
  allowedStartRules: [
    'git_branch',
    'git_branch_and_checkout',
    'git_branch_and_switch',
    'git_checkout',
    'git_switch',
    'git_commit',
    'git_merge',
    'git_tag',
  ],
  format: 'commonjs',
  output: 'source',
  trace: false,
});

fs.writeFileSync('src/grammar/format1.oneline.js', parser);
