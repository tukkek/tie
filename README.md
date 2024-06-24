# Tie

Like a simple knot, this small Javascript library aims to reactively tie together the declarative HTML and programmatic Javascript layers of a web-page. In specific, one-directional reactivity where new Javascript instances are rendered as new DOM element sub-trees and then changes to their property values are rendered to those same elements.

It is a minimalistic, opinionated[^opinionated] library but it is based on the native design of the `<template>` tag and HTML as a whole and as such should feel familiar to any web developer and integrate seamlessly with other technologies such as CSS and other frameworks, libraries and tool-chains.

Tie is a 100% native Javascript library. No servers, builds, frameworks... required. However, as stated, it should integrate easily into any setups you have or want.

While perfectly adequate for most use-cases, Tie has not yet been optimized for speed but due to its minimalistic nature, this should be easy to achieve. If you're interested in improving Tie for high-performance scenarios, a pull-request is welcome.

[^opinionated]: *What makes software opinionated?* https://imkylelambert.com/articles/opinionated-software

## Installing

There are multiple ways to install Tie. You can:
* Add it as a `git` submodule: `git submodule add https://github.com/tukkek/tie library/tie/`
* Download the latest version as a package https://github.com/tukkek/tie/archive/refs/heads/main.zip
* Download the latest version as a script (right-click and save-as) https://raw.githubusercontent.com/tukkek/tie/main/tie.js

## Examples

Tie is a small (and hopefully elegant) library and as such a simple example is enough to show-case all of its functions. You can open this link to see it in action while you read through this section: https://tukkek.github.io/tie/
