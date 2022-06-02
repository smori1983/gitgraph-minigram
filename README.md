# gitgraph-minigram

Provides grammar and parser for git commands (made with [pegjs](https://www.npmjs.com/package/pegjs)), and API invoker for [@gitgraph/js](https://www.npmjs.com/package/@gitgraph/js).

This library takes the approach to draw commit graph from the sequence of git command inputs as you usually use in terminal.


## Grammar

Input text consists of 2 sections: `[option]` and `[log]`.

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

### Options in `[option]` section

| key             | value  | default  |
|-----------------|--------|----------|
| `defaultBranch` | string | `master` |

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
import { Format2Parser, Generator } from 'gitgraph-minigram';

const parser = new Format2Parser();
const generator = new Generator();

const input = ...; // Prepare text written in above grammar.
const parseResult = parser.parse(input);

if (parseResult.parsed()) {
  const container = ...; // HTML element to draw git commit graph.
  const graph = createGitgraph(container);

  generator.generate(graph, parseResult.getParseData());
} else {
  const e = parseResult.getError(); // pegjs syntax error object.
}
```


## Used by

- [vuepress-plugin-gitgraph-minigram](https://www.npmjs.com/package/vuepress-plugin-gitgraph-minigram)
