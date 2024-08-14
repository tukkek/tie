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

## Performance

Tie uses `element.querySelector()` or `element.querySelectorAll()` for most of its methods, so performance should be typical for most Java-script scenarios. If that's not enough, a cached version[^C] should be twice as fast.

[^C]: *Implement cached templates* https://github.com/tukkek/tie/issues/3

## Demonstrations and commented examples

Tie is a tiny, elegant library and as such simple examples should be enough to explore its functions. The code for both demonstrations can be found here: https://github.com/tukkek/tie/tree/main/demonstrations/

### Template management

This demonstration shows the library's basic template-based operations, such as: creation; insertion; reacting to native Java-script events; and how to access the underlying HTML elements te write the POJO code you already know[^POJO].

Open this link to see this demonstration in action: https://tukkek.github.io/tie/demonstrations/race/race.html

The comments in these two sections of code should provide a good overview of Tie's approach to template management:
1. First this HTML section that defines two templates and their one-to-many relationship: https://github.com/tukkek/tie/blob/main/demonstrations/race/race.html#L21
2. Then this Java-script method that uses Tie to manage multiple instances of each template: https://github.com/tukkek/tie/blob/main/demonstrations/race/race.js#L13

[^POJO]: https://en.wikipedia.org/wiki/Plain_old_Java_object

### Reactive features

This next demonstration show-cases Tie's two-way reactive functionalty. Access the demonstration here: https://tukkek.github.io/tie/demonstrations/react/react.html

The library features being high-lighted in this case are:
- `template.react()`: registers a call-back to any default event in the HTML page.
- `template.listen()`: as `react()` but reacts to only a single element at a time.
- `template.trap()`: enables reacting to property changes in a Java-script object.
- `pojo.bind()`: once enabled, registers the callbacks for the Java-script object.

Keep in mind that you can always access all the normal Java-script features you know and love via the `template.root` element, which is a template clone's root element. This allows you, for example, to register non-default event listeners which aren't covered by `template.react()` and `template.listen()`.

The full commented code is pretty-self explanatory in itself. You can read it here: https://github.com/tukkek/tie/blob/main/demonstrations/react/react.js

## Docementation

The demonstrations cover the majority of Tie's features but Tie's API documentation thoroughly documents the library and can be used as a reference while programming. It also contains a few reminders and tips so it's worth reading in full as it's also pretty short, at around only a dozen methods described or so.

- The full `Template` class API can be found here: https://tukkek.github.io/tie/documentation/Template.html
- The element and event types supported by `template.listen()` and `template.react()` are listed here: https://tukkek.github.io/tie/documentation/global.html
