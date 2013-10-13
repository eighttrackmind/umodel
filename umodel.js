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
      return this._get(key.split(this.options.separator));
    };

    Model.prototype._get = function(key, parent) {
      var head;
      if (parent == null) {
        parent = this._data;
      }
      head = key.shift();
      if (head && head in parent) {
        return this._get(key, parent[head]);
      } else {
        return parent;
      }
    };

    Model.prototype.set = function(key, value) {};

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
