# µModel

[![Build Status](https://travis-ci.org/eighttrackmind/umodel.png)](https://travis-ci.org/eighttrackmind/umodel.png)

Tiny, generic, fully tested model.

```coffee
new umodel [data], [options]
```

`data` {Object} initialize the model with some data

`options` {Object}

- `separator` (default: `/`) separator for getting/setting nested keys

## API

`umodel.`

- `get key` get a key, throwing an error if a parent key is not set
- `set key, value` set a key, lazy-creating parent keys along the way if nested
- `setnx key, value` like `set`, but only if the given key has not been set yet
- `on event1 [event2...] fn]` call `fn` with `{key: value}, this` when an event is triggered

## Usage

```coffee
Model = require 'umodel'

model = new Model
	foo: 'bar'
# => model

model.get 'foo'
# => 'bar'

model.set 'bar/baz', (beans) -> 'stew'
# => [Function]

model.get 'bar/baz'
# => [Function]

# set only if the key "tomato" is not yet set.
model.setnx 'tomato', 'potato'
# => "potato"

# call the function `callback` when any property is changed
callback = (changes, model) ->
	...
model.on 'set', callback

# call the function `callback` when `get` or `set` is called on `foo/bar` or any of its descendants
model.on 'get set foo/bar', callback

# magic method to listen to `get`, `set`, and `setnx` events on any property
model.on 'change', (changes, model) ->
	...

```