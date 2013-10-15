(function() {
  var Model, umd, _,
    __hasProp = {}.hasOwnProperty;

  _ = {
    extend: function(a, b) {
      var key;
      for (key in b) {
        if (!__hasProp.call(b, key)) continue;
        a[key] = b[key];
      }
      return a;
    },
    trim: (function() {
      var head, tail;
      if (''.trim) {
        return function(string) {
          return string.trim();
        };
      } else {
        head = /^\s\s*/;
        tail = /\s\s*$/;
        return function(string) {
          return string.replace(head, '').replace(tail, '');
        };
      }
    })()
  };

  Model = (function() {
    function Model(_data, options) {
      this._data = _data != null ? _data : {};
      this.options = {
        separator: '/'
      };
      if (options) {
        _.extend(this.options, options);
      }
      this.events = {};
    }

    Model.prototype.get = function(key) {
      this.trigger('get', key);
      return this._get(this._split(key));
    };

    Model.prototype.set = function(key, value) {
      this.trigger('set', key);
      return this._set(this._split(key), value);
    };

    Model.prototype.setnx = function(key, value) {
      this.trigger('setnx', key);
      return this._set(this._split(key), value, true);
    };

    Model.prototype.on = function(eventAndProperty, fn) {
      var e, _results;
      if (fn) {
        return this._on(eventAndProperty, fn);
      } else {
        _results = [];
        for (e in eventAndProperty) {
          fn = eventAndProperty[e];
          _results.push(this._on(e, fn));
        }
        return _results;
      }
    };

    Model.prototype.trigger = function(event, path) {
      var e, fn, fns, _ref, _results;
      if (path == null) {
        path = '*';
      }
      path = this._normalize(path);
      if (event in this.events) {
        _ref = this.events[event];
        _results = [];
        for (e in _ref) {
          fns = _ref[e];
          if (e === '*' || (path + '/').indexOf(e + '/') === 0) {
            _results.push((function() {
              var _i, _len, _results1;
              _results1 = [];
              for (_i = 0, _len = fns.length; _i < _len; _i++) {
                fn = fns[_i];
                _results1.push(fn.call(this, path, void 0, this));
              }
              return _results1;
            }).call(this));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    Model.prototype._get = function(key, parent, accumulator) {
      var head;
      if (parent == null) {
        parent = this._data;
      }
      if (accumulator == null) {
        accumulator = [];
      }
      head = key.shift();
      if (head) {
        if (!(head in parent)) {
          throw new Error('get: key "' + head + '" does not exist in "' + accumulator.join('/') + '"');
        }
        accumulator.push(head);
        return this._get(key, parent[head], accumulator);
      }
      return parent;
    };

    Model.prototype._set = function(key, value, nx, parent, accumulator) {
      var head;
      if (nx == null) {
        nx = false;
      }
      if (parent == null) {
        parent = this._data;
      }
      if (accumulator == null) {
        accumulator = [];
      }
      head = key.shift();
      if (key.length) {
        if (!(head in parent)) {
          parent[head] = {};
        }
        accumulator.push(head);
        return this._set(key, value, nx, parent[head], accumulator);
      }
      if (!(nx && head in parent)) {
        return parent[head] = value;
      }
    };

    Model.prototype._on = function(eventAndProperty, fn) {
      var event, events, parts, property, _i, _len, _results;
      parts = eventAndProperty.split(':');
      events = parts[0].split(' ');
      property = this._normalize(parts[1] || '*');
      _results = [];
      for (_i = 0, _len = events.length; _i < _len; _i++) {
        event = events[_i];
        event = _.trim(event);
        if (!(event in this.events)) {
          this.events[event] = {};
        }
        if (!(property in this.events[event])) {
          this.events[event][property] = [];
        }
        _results.push(this.events[event][property].push(fn));
      }
      return _results;
    };

    Model.prototype._normalize = function(key) {
      var separator;
      separator = this.options.separator;
      key = _.trim(key);
      if (key.charAt(0) === separator) {
        key = key.slice(1);
      }
      if (key.charAt(key.length - 1) === separator) {
        key = key.slice(0, -1);
      }
      return key;
    };

    Model.prototype._split = function(key) {
      return (this._normalize(key)).split(this.options.separator);
    };

    return Model;

  })();

  umd = function(name, factory) {
    if (typeof exports === 'object') {
      return module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
      return define(name, [], function() {
        return factory;
      });
    } else {
      return this[name] = factory;
    }
  };

  umd('umodel', Model);

}).call(this);
