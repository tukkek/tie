# Tie
Tie is a tiny library for using templates easily and elegantly as building-blocks for your web-application. As simple as tying a knot!

It is a minimalistic, opinionated[^O] library but it is based on the native HTML design of the `<template>` tag and object-oriented-programming[^OOP] and as such should feel familiar to any web developer and integrate seamlessly with other technologies such as CSS and other frameworks, libraries and tool-chains.

Tie is a 100% pure Javascript library. No servers, frameworks or build-steps required.

[^O]: *What makes software opinionated?* https://imkylelambert.com/articles/opinionated-software
[^OOP]: *Using classes* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

# Setup
There are multiple ways to install Tie. You can:
* Add it as a `git` submodule: `git submodule add https://github.com/tukkek/tie/ library/tie/`
* Download the latest version as a package: https://github.com/tukkek/tie/archive/refs/heads/main.zip
* Download the latest version as a script (right-click and save-as): https://raw.githubusercontent.com/tukkek/tie/main/tie.js
* Import the latest version directly from a module: `import * as tie from 'https://tukkek.github.io/tie/tie.js'`

# Demonstrations and commented examples
Tie is a tiny, elegant library and as such simple examples should be enough to explore its features. The code for the demonstrations can be found here: https://github.com/tukkek/tie/tree/main/demonstrations/

## Template management
This demonstration shows the library's basic template-based operations, such as: creation; insertion; reacting to native Java Script events; and how to access the underlying HTML elements to write the POJO code you're already familiar with[^POJO].

Open this link to see the demonstration in action: https://tukkek.github.io/tie/demonstrations/race/race.html

The comments in these two sections of code should provide a good overview of Tie's approach to template management:
1. First this HTML section that defines two templates and their one-to-many relationship: https://github.com/tukkek/tie/blob/main/demonstrations/race/race.html#L21
2. Then this Java Script method that uses Tie to manage multiple instances of each template: https://github.com/tukkek/tie/blob/main/demonstrations/race/race.js#L13

[^POJO]: Plain-old Java Script object https://en.wikipedia.org/wiki/Plain_old_Java_object

## Reactive features
This next demonstration show-cases Tie's two-way reactive functionalty (HTML to Java Script and vice-versa). Access the demonstration here: https://tukkek.github.io/tie/demonstrations/react/react.html

The library features being high-lighted in this case are:
- `clone.react()`: registers a call-back to all default events in the clone tree.
- `clone.listen()`: as `react()` but reacts to only a single element at a time.
- `clone.trap()`: enables reacting to property changes in a Java Script object.
- `clone.bind()`: registers the call-backs for the trapped Java Script object.

Keep in mind that you can always access all the native Java Script features you know and love via the `clone.root` element, which is a template-clone's root element. This allows you, for example, to register non-default event listeners which aren't covered by `template.react()` and `template.listen()`.

The full commented code is pretty-self explanatory in itself. You can read it here: https://github.com/tukkek/tie/blob/main/demonstrations/react/react.js

## Clones as classes
This demonstration features the use of Clone sub-classes as building-blocks of a simple web application. Since Clones are normal Java Script classes, they can be used with common object-oriented techniques such as creating hierarchies, compositions, aggrgations...

View it in action here: https://tukkek.github.io/tie/demonstrations/filter/filter.html

The demonstration has a Clone sub-class for the filter widget and another for every individual item. By modelling the module like this, it's possibe to make use Tie's convenience methods alongside domain-specific methods in order to write simple, short and re-usable classes built using 100% pure Java Script.

You can read the code for the two classes here: https://github.com/tukkek/tie/blob/main/demonstrations/filter/filter.js

## Bundles
The Compose function is availabe to provide a way to bundle HTML and CSS files to modular Tie-components. Their contents will be inserted in respective Template and Style tags with the class-name provided.

~~~js
import * as tiem from './libraries/tie/tie.js'
await tiem.compose('my-component',import.meta.url)
~~~

In this example the contents of `my-component.html` and `my-component.css` in the same-path as the JS file will be inserted under `<template class='my-component'>` and `<style class='my-component'>`.

# Documentation
The demonstrations cover the majority of Tie's features but the API documentation thoroughly describes the library and can be used as a reference while programming. It also contains a few reminders and tips so it's worth reading in full (it's also pretty short, at around only a dozen contained methods or so).

- The full `Clone` class API can be found here: https://tukkek.github.io/tie/documentation/Clone.html
- Elements and default event types supported by `clone.listen()` and `clone.react()` are listed here: https://tukkek.github.io/tie/documentation/global.html

# Performance
Tie uses `element.querySelector()` or `element.querySelectorAll()` for most of its methods, so performance should be typical for most Java Script scenarios. If that's not enough, a cached version[^C] should be twice as fast.

For `clone.trap()` and `clone.bind()`, Tie uses the native Proxy object. You can test its performance here: https://www.measurethat.net/Benchmarks/Show/6274/4/access-to-proxy-vs-object

[^C]: *Implement cached clones* https://github.com/tukkek/tie/issues/3
