# gitgraph-minigram

Provides grammar and parser for git command (made with [pegjs](https://www.npmjs.com/package/pegjs)), and API invoker for [@gitgraph/js](https://www.npmjs.com/package/@gitgraph/js).


## Grammar

### Basic structure of input

- `[option]` is optional.

```
[option]
defaultBranch: <branch>
[log]
...
```

```
[log]
...
```

### Configuration

- `defaultBranch`
  - default: `master`

### Supported git commands in `[log]` section

```
git commit
git commit -m '<message>'
git commit -m "<message>"
git branch <branch>
git checkout <branch>
git checkout -b <branch>
git switch <branch>
git switch -c <branch>
git merge <branch>
git tag <tag>
```


## Basic usage

```js
import { createGitgraph } from '@gitgraph/js';
import { Format1Parser, GitLogger } from 'gitgraph-minigram';

const parser = new Format1Parser();
const logger = new GitLogger();

const input = ...;
const parseResult = parser.parse(input);

if (parseResult.parsed()) {
  const container = ...; // HTML element to draw git commit graph.
  const graph = createGitgraph(container);

  const parseData = parseResult.getParseData();
  logger.create(graph, parseData);
} else {
  const e = parseResult.getError(); // pegjs syntax error object.
}
```
