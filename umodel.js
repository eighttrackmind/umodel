// Generated by CoffeeScript 1.6.3
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
    }
  };

  Model = (function() {
    Model.prototype.options = {
      separator: '/'
    };

    function Model(_data, options) {
      this._data = _data != null ? _data : {};
      if (options) {
        _.extend(this.options, options);
      }
    }

    Model.prototype.get = function(key) {
      return this._get(this._split(key));
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
          throw new Error('key "' + head + '" does not exist in "' + accumulator.join('/') + '"');
        }
        accumulator.push(head);
        return this._get(key, parent[head], accumulator);
      }
      return parent;
    };

    Model.prototype._split = function(key) {
      return key.split(this.options.separator);
    };

    Model.prototype.set = function(key, value) {
      return key = this._split(key);
    };

    Model.prototype.setnx = function(key, value) {};

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
