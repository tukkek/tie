# Tie

Tie is a tiny library for using templates easily and elegantly as building-blocks for your web-application. As simple as tying a knot!

It is a minimalistic, opinionated[^O] library but it is based on the native design of the `<template>` tag and object-oriented-programming[^OOP] and as such should feel familiar to any web developer and integrate seamlessly with other technologies such as CSS and other frameworks, libraries and tool-chains.

Tie is a 100% pure Javascript library. No servers, builds or frameworks.

[^O]: *What makes software opinionated?* https://imkylelambert.com/articles/opinionated-software
[^OOP]: *Using classes* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

## Setup

There are multiple ways to install Tie. You can:
* Add it as a `git` submodule: `git submodule add https://github.com/tukkek/tie/ library/tie/`
* Download the latest version as a package: https://github.com/tukkek/tie/archive/refs/heads/main.zip
* Download the latest version as a script (right-click and save-as): https://raw.githubusercontent.com/tukkek/tie/main/tie.js
* Import the latest version directly from a module: `import * as tie from 'https://tukkek.github.io/tie/tie.js'`

# Performance

Tie uses `element.querySelector()` or `element.querySelectorAll()` for most of its methods, so performance should be typical for most Java-script scenarios. If that's not enough, a cached version[^C] should be twice as fast.

[^C]: *Implement cached templates* https://github.com/tukkek/tie/issues/3

## Demonstration and commented examples

Tie is a small (and hopefully elegant) library and as such a simple example should be enough to show-case most of its functions. You can open this link to see it in action while you read through this section: https://tukkek.github.io/tie/demonstration/

The comments in these two sections of code should provide a good overview of Tie's approach to template management:
1. First this HTML section that defines two templates and their one-to-many relationship: https://github.com/tukkek/tie/blob/main/demonstration/index.html#L21
2. Then this Java-script method that uses Tie to manage multiple instances of each template: https://github.com/tukkek/tie/blob/main/demonstration/race.js#L13

The full demonstration code is here: https://github.com/tukkek/tie/tree/main/demonstration
