/**
 * Created by n.atlas on 17/7/2015.
 */
(function () {
  var cache = {};
  var callbackFun = function (id) {
    if (cache[id]) return cache[id];
    var random = 99999;
    var callback = {
      fns: {},
      checks: {},
      add: function (key, fn, code, check) {
        if (typeof key === "string") {
          key = [key];
        }
        for (var i in key) {
          if (!this.fns[key[i]]) this.fns[key[i]] = {};
          if (code)
            this.fns[key[i]][code] = fn;
          else
            this.fns[key[i]][random++] = fn;
          if (typeof check === "function") {
            this.checks[key[i] + code] = check;
          }
        }
      },
      remove: function (key, code) {
        if(code) delete this.fns[key][code];
        else delete this.fns[key];
      },
      execute: function (k) {
        var args = [];
        for (var i = 1; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        var arr = [];
        for (var j in this.fns[k]) {
          arr.push(j);
          this.fns[k][j].apply(null, args);
        }
        return arr;
      },
      executeOnce: function(k){
        var arr = this.execute(k);
        this.remove(k);
        return arr;
      },
      executeAndCheck: function (k) {
        if (!this.fns[k]) return;
        var arr = this.execute(k);
        for( var i in this.fns[k] )
          if(typeof this.checks[k + i] === "function")
            if( this.checks[k+i]() )
              this.remove(k , i);
        if (Object.keys(this.fns[k]) == 0) delete this.fns[k];
        return arr;
      },
      getKeys: function(){
        return Object.keys(this.fns);
      },
      dispose: function () {
        this.fns = {};
      },
      length: function () {
        return Object.keys(this.fns).length;
      }
    };
    cache[id] = callback;
    return callback;
  }
  window.CallbackJS = callbackFun;
})();
