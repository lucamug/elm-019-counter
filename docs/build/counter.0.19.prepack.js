(function () {
  "use strict";

  var __scope_0 = new Array(1);

  var __get_scope_binding_0 = function (__selector) {
    var __captured;

    switch (__selector) {
      case 0:
        __captured = [0, false];
        break;

      default:
        throw new Error("Unknown scope selector");
    }

    __scope_0[__selector] = __captured;
    return __captured;
  };

  var $$0 = {
    enumerable: false,
    configurable: true,
    writable: false
  };

  var _$0 = this;

  var _$1 = _$0.Object;
  var _$2 = _$1.defineProperty;
  var _$3 = _$0.Math;
  var _$4 = _$3.floor;
  var _$5 = _$3.log;
  var _$6 = _$3.ceil;

  var _2n = function (arity, fun, wrapper) {
    wrapper.a = arity;
    wrapper.f = fun;
    return wrapper;
  };

  var _2N = function (fun) {
    return _2n(2, fun, function (a) {
      return function (b) {
        return fun(a, b);
      };
    });
  };

  var _2o = function (fun) {
    return _2n(3, fun, function (a) {
      return function (b) {
        return function (c) {
          return fun(a, b, c);
        };
      };
    });
  };

  var _S = function (fun, a, b) {
    return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
  };

  var _17 = function (fun, a, b, c) {
    return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
  };

  var _1S = function (fun, a, b, c, d) {
    return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
  };

  var _37 = function (fun, a, b, c, d, e) {
    return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
  };

  var _18 = function (hd, tl) {
    return {
      $: '::',
      a: hd,
      b: tl
    };
  };

  var _v = function (arr) {
    var out = _L;

    for (var i = arr.length; i--;) {
      out = _18(arr[i], out);
    }

    return out;
  };

  var _3d = function (x, y, ord) {
    if (typeof x !== 'object') {
      return x === y ? /*EQ*/0 : x < y ? /*LT*/-1 : /*GT*/1;
    } /**/

    if (x instanceof String) {
      var a = x.valueOf();
      var b = y.valueOf();
      return a === b ? 0 : a < b ? -1 : 1;
    } //*/
    /**_UNUSED/
    if (!x.$)
    //*/ /**/

    if (x.$[0] === '#') //*/
      {
        return (ord = _3d(x.a, y.a)) ? ord : (ord = _3d(x.b, y.b)) ? ord : _3d(x.c, y.c);
      } // traverse conses until end of a list or a mismatch


    for (; x.b && y.b && !(ord = _3d(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES


    return ord || (x.b ? /*GT*/1 : y.b ? /*LT*/-1 : /*EQ*/0);
  };

  var _f = function (a, b) {
    return {
      $: '#2',
      a: a,
      b: b
    };
  };

  var _1g = function (oldRecord, updatedFields) {
    var newRecord = {};

    for (var key in oldRecord) {
      newRecord[key] = oldRecord[key];
    }

    for (var key in updatedFields) {
      newRecord[key] = updatedFields[key];
    }

    return newRecord;
  };

  var _3R = function (array) {
    return array.length;
  };

  var _z = function (value) {
    return _1Q(false, value);
  };

  var _1Q = function (ansi, value) {
    if (typeof value === 'function') {
      return _2D(ansi, '<function>');
    }

    if (typeof value === 'boolean') {
      return _2C(ansi, value ? 'True' : 'False');
    }

    if (typeof value === 'number') {
      return _2B(ansi, value + '');
    }

    if (value instanceof String) {
      return _2A(ansi, "'" + _29(value, true) + "'");
    }

    if (typeof value === 'string') {
      return _28(ansi, '"' + _29(value, false) + '"');
    }

    if (typeof value === 'object' && '$' in value) {
      var tag = value.$;

      if (typeof tag === 'number') {
        return _2D(ansi, '<internals>');
      }

      if (tag[0] === '#') {
        var output = [];

        for (var k in value) {
          if (k === '$') continue;
          output.push(_1Q(ansi, value[k]));
        }

        return '(' + output.join(',') + ')';
      }

      if (tag === 'Set_elm_builtin') {
        return _2C(ansi, 'Set') + _27(ansi, '.fromList') + ' ' + _1Q(ansi, _2Q(value));
      }

      if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin') {
        return _2C(ansi, 'Dict') + _27(ansi, '.fromList') + ' ' + _1Q(ansi, _2P(value));
      }

      if (tag === 'Array_elm_builtin') {
        return _2C(ansi, 'Array') + _27(ansi, '.fromList') + ' ' + _1Q(ansi, _2O(value));
      }

      if (tag === '::' || tag === '[]') {
        var output = '[';
        value.b && (output += _1Q(ansi, value.a), value = value.b);

        for (; value.b; value = value.b) // WHILE_CONS
        {
          output += ',' + _1Q(ansi, value.a);
        }

        return output + ']';
      }

      var output = '';

      for (var i in value) {
        if (i === '$') continue;

        var str = _1Q(ansi, value[i]);

        var c0 = str[0];
        var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
        output += ' ' + (parenless ? str : '(' + str + ')');
      }

      return _2C(ansi, tag) + output;
    }

    if (typeof value === 'object') {
      var output = [];

      for (var key in value) {
        var field = key[0] === '_' ? key.slice(1) : key;
        output.push(_27(ansi, field) + ' = ' + _1Q(ansi, value[key]));
      }

      if (output.length === 0) {
        return '{}';
      }

      return '{ ' + output.join(', ') + ' }';
    }

    return _2D(ansi, '<internals>');
  };

  var _29 = function (str, isChar) {
    var s = str.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/\t/g, '\\t').replace(/\r/g, '\\r').replace(/\v/g, '\\v').replace(/\0/g, '\\0');

    if (isChar) {
      return s.replace(/\'/g, '\\\'');
    } else {
      return s.replace(/\"/g, '\\"');
    }
  };

  var _2C = function (ansi, string) {
    return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
  };

  var _2B = function (ansi, string) {
    return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
  };

  var _28 = function (ansi, string) {
    return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
  };

  var _2A = function (ansi, string) {
    return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
  };

  var _27 = function (ansi, string) {
    return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
  };

  var _2D = function (ansi, string) {
    return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
  };

  var _W = function (identifier, fact1, fact2, fact3, fact4) {
    switch (identifier) {
      case 1:
        var url = fact1;
        throw new Error('Browser.fullscreen programs cannot handle URLs like this:\n\n    ' + url + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

      case 2:
        var message = fact1;
        throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + message);

      case 3:
        var portName = fact1;
        throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

      case 4:
        var portName = fact1;
        var problem = fact2;
        throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

      case 5:
        throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

      case 6:
        var moduleName = fact1;
        throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

      case 8:
        var moduleName = fact1;
        var region = fact2;
        var message = fact3;
        throw new Error('TODO in module `' + moduleName + '` ' + _10(region) + '\n\n' + message);

      case 9:
        var moduleName = fact1;
        var region = fact2;
        var value = fact3;
        var message = fact4;
        throw new Error('TODO in module `' + moduleName + '` from the `case` expression ' + _10(region) + '\n\nIt received the following value:\n\n    ' + _z(value).replace('\n', '\n    ') + '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    '));

      case 10:
        throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

      case 11:
        throw new Error('Cannot perform mod 0. Division by zero error.');
    }
  };

  var _10 = function (region) {
    if (region.start.line === region.end.line) {
      return 'on line ' + region.start.line;
    }

    return 'on lines ' + region.start.line + ' through ' + region.end.line;
  };

  var _k = function (number) {
    return number + '';
  };

  var _1k = function (msg) {
    return {
      $: 0,
      a: msg
    };
  };

  var _31 = function (f, decoders) {
    return {
      $: 13,
      f: f,
      g: decoders
    };
  };

  var _y = function (decoder, value) {
    switch (decoder.$) {
      case 3:
        return typeof value === 'boolean' ? _1h(value) : _1P('a BOOL', value);

      case 2:
        if (typeof value !== 'number') {
          return _1P('an INT', value);
        }

        if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
          return _1h(value);
        }

        if (isFinite(value) && !(value % 1)) {
          return _1h(value);
        }

        return _1P('an INT', value);

      case 4:
        return typeof value === 'number' ? _1h(value) : _1P('a FLOAT', value);

      case 6:
        return typeof value === 'string' ? _1h(value) : value instanceof String ? _1h(value + '') : _1P('a STRING', value);

      case 9:
        return value === null ? _1h(decoder.c) : _1P('null', value);

      case 5:
        return _1h(_U(value));

      case 7:
        if (!Array.isArray(value)) {
          return _1P('a LIST', value);
        }

        return _1q(decoder.b, value, _v);

      case 8:
        if (!Array.isArray(value)) {
          return _1P('an ARRAY', value);
        }

        return _1q(decoder.b, value, _1p);

      case 10:
        var field = decoder.d;

        if (typeof value !== 'object' || value === null || !(field in value)) {
          return _1P('an OBJECT with a field named `' + field + '`', value);
        }

        var result = _y(decoder.b, value[field]);

        return _V(result) ? result : _1v(_S(_1w, field, result.a));

      case 11:
        var index = decoder.e;

        if (!Array.isArray(value)) {
          return _1P('an ARRAY', value);
        }

        if (index >= value.length) {
          return _1P('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
        }

        var result = _y(decoder.b, value[index]);

        return _V(result) ? result : _1v(_S(_1y, index, result.a));

      case 12:
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
          return _1P('an OBJECT', value);
        }

        var keyValuePairs = _L; // TODO test perf of Object.keys and switch when support is good enough

        for (var key in value) {
          if (value.hasOwnProperty(key)) {
            var result = _y(decoder.b, value[key]);

            if (!_V(result)) {
              return _1v(_S(_1w, key, result.a));
            }

            keyValuePairs = _18(_f(key, result.a), keyValuePairs);
          }
        }

        return _1h(_20(keyValuePairs));

      case 13:
        var answer = decoder.f;
        var decoders = decoder.g;

        for (var i = 0; i < decoders.length; i++) {
          var result = _y(decoders[i], value);

          if (!_V(result)) {
            return result;
          }

          answer = answer(result.a);
        }

        return _1h(answer);

      case 14:
        var result = _y(decoder.b, value);

        return !_V(result) ? result : _y(decoder.h(result.a), value);

      case 15:
        var errors = _L;

        for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
        {
          var result = _y(temp.a, value);

          if (_V(result)) {
            return result;
          }

          errors = _18(result.a, errors);
        }

        return _1v(_21(_20(errors)));

      case 1:
        return _1v(_S(_22, decoder.a, _U(value)));

      case 0:
        return _1h(decoder.a);
    }
  };

  var _1q = function (decoder, value, toElmValue) {
    var len = value.length;
    var array = new Array(len);

    for (var i = 0; i < len; i++) {
      var result = _y(decoder, value[i]);

      if (!_V(result)) {
        return _1v(_S(_1y, i, result.a));
      }

      array[i] = result.a;
    }

    return _1h(toElmValue(array));
  };

  var _1p = function (array) {
    return _S(_2X, array.length, function (i) {
      return array[i];
    });
  };

  var _1P = function (type, value) {
    return _1v(_S(_22, 'Expecting ' + type, _U(value)));
  };

  var _2m = function (x, y) {
    if (x === y) {
      return true;
    }

    if (x.$ !== y.$) {
      return false;
    }

    switch (x.$) {
      case 0:
      case 1:
        return x.a === y.a;

      case 3:
      case 2:
      case 4:
      case 6:
      case 5:
        return true;

      case 9:
        return x.c === y.c;

      case 7:
      case 8:
      case 12:
        return _2m(x.b, y.b);

      case 10:
        return x.d === y.d && _2m(x.b, y.b);

      case 11:
        return x.e === y.e && _2m(x.b, y.b);

      case 13:
        return x.f === y.f && _36(x.g, y.g);

      case 14:
        return x.h === y.h && _2m(x.b, y.b);

      case 15:
        return _36(x.g, y.g);
    }
  };

  var _36 = function (aDecoders, bDecoders) {
    var len = aDecoders.length;

    if (len !== bDecoders.length) {
      return false;
    }

    for (var i = 0; i < len; i++) {
      if (!_2m(aDecoders[i], bDecoders[i])) {
        return false;
      }
    }

    return true;
  };

  var _U = function (value) {
    return {
      $: 0,
      a: value
    };
  };

  var _1K = function (value) {
    return value.a;
  };

  var _1T = function (callback) {
    return {
      $: 5,
      b: callback
    };
  };

  var _1R = function (task) {
    var __captured__scope_1 = __scope_0[0] || __get_scope_binding_0(0);

    var proc = {
      $: 0,
      e: __captured__scope_1[0]++,
      f: task,
      g: null,
      h: []
    };

    _1U(proc);

    return proc;
  };

  var _12 = function (proc, msg) {
    proc.h.push(msg);

    _1U(proc);
  };

  var _1U = function (proc) {
    var __captured__scope_1 = __scope_0[0] || __get_scope_binding_0(0);

    _1s.push(proc);

    if (__captured__scope_1[1]) {
      return;
    }

    __captured__scope_1[1] = true;

    while (proc = _1s.shift()) {
      _2E(proc);
    }

    __captured__scope_1[1] = false;
  };

  var _2E = function (proc) {
    while (proc.f) {
      var rootTag = proc.f.$;

      if (rootTag === 0 || rootTag === 1) {
        while (proc.g && proc.g.$ !== rootTag) {
          proc.g = proc.g.i;
        }

        if (!proc.g) {
          return;
        }

        proc.f = proc.g.b(proc.f.a);
        proc.g = proc.g.i;
      } else if (rootTag === 2) {
        proc.f.c = proc.f.b(function (newRoot) {
          proc.f = newRoot;

          _1U(proc);
        });
        return;
      } else if (rootTag === 5) {
        if (proc.h.length === 0) {
          return;
        }

        proc.f = proc.f.b(proc.h.shift());
      } else // if (rootTag === 3 || rootTag === 4)
        {
          proc.g = {
            $: rootTag === 3 ? 0 : 1,
            b: proc.f.b,
            i: proc.g
          };
          proc.f = proc.f.d;
        }
    }
  };

  var _9 = function (flagDecoder, flags, init, update, subscriptions, stepperBuilder) {
    var result = _S(_Q, flagDecoder, _U(flags));

    _V(result) || _W(2, result.a);
    var managers = {};
    result = init(result.a);
    var model = result.a;
    var stepper = stepperBuilder(sendToApp, model);

    var ports = _X(managers, sendToApp);

    function sendToApp(msg, viewMetadata) {
      result = _S(update, msg, model);
      stepper(model = result.a, viewMetadata);

      _Y(managers, result.b, subscriptions(model));
    }

    _Y(managers, result.b, subscriptions(model));

    return ports ? {
      ports: ports
    } : {};
  };

  var _X = function (managers, sendToApp) {
    var ports; // setup all necessary effect managers

    for (var key in _x) {
      var manager = _x[key];

      if (manager.a) {
        ports = ports || {};
        ports[key] = manager.a(key, sendToApp);
      }

      managers[key] = _11(manager, sendToApp);
    }

    return ports;
  };

  var _11 = function (info, sendToApp) {
    var router = {
      g: sendToApp,
      h: undefined
    };
    var onEffects = info.c;
    var onSelfMsg = info.d;
    var cmdMap = info.e;
    var subMap = info.f;

    function loop(state) {
      return _S(_1i, loop, _1T(function (msg) {
        var value = msg.a;

        if (msg.$ === 0) {
          return _17(onSelfMsg, router, value, state);
        }

        return cmdMap && subMap ? _1S(onEffects, router, value.i, value.j, state) : _17(onEffects, router, cmdMap ? value.i : value.j, state);
      }));
    }

    return router.h = _1R(_S(_1i, loop, info.b));
  };

  var _Y = function (managers, cmdBag, subBag) {
    var effectsDict = {};

    _13(true, cmdBag, effectsDict, null);

    _13(false, subBag, effectsDict, null);

    for (var home in managers) {
      _12(managers[home], {
        $: 'fx',
        a: effectsDict[home] || {
          i: _L,
          j: _L
        }
      });
    }
  };

  var _13 = function (isCmd, bag, effectsDict, taggers) {
    switch (bag.$) {
      case 1:
        var home = bag.k;

        var effect = _1W(isCmd, home, taggers, bag.l);

        effectsDict[home] = _1V(isCmd, effect, effectsDict[home]);
        return;

      case 2:
        for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
        {
          _13(isCmd, list.a, effectsDict, taggers);
        }

        return;

      case 3:
        _13(isCmd, bag.o, effectsDict, {
          p: bag.n,
          q: taggers
        });

        return;
    }
  };

  var _1W = function (isCmd, home, taggers, value) {
    function applyTaggers(x) {
      for (var temp = taggers; temp; temp = temp.q) {
        x = temp.p(x);
      }

      return x;
    }

    var map = isCmd ? _x[home].e : _x[home].f;
    return _S(map, applyTaggers, value);
  };

  var _1V = function (isCmd, newEffect, effects) {
    effects = effects || {
      i: _L,
      j: _L
    };
    isCmd ? effects.i = _18(newEffect, effects.i) : effects.j = _18(newEffect, effects.j);
    return effects;
  };

  var _2H = function (parent, child) {
    parent.appendChild(child);
  };

  var _p = function (string) {
    return {
      $: 0,
      a: string
    };
  };

  var _1J = function (factList) {
    for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
    {
      var entry = factList.a;
      var tag = entry.$;
      var key = entry.n;
      var value = entry.o;

      if (tag === 'a2') {
        key === 'className' ? _1o(facts, key, _1K(value)) : facts[key] = _1K(value);
        continue;
      }

      var subFacts = facts[tag] || (facts[tag] = {});
      tag === 'a3' && key === 'class' ? _1o(subFacts, key, value) : subFacts[key] = value;
    }

    return facts;
  };

  var _1o = function (object, key, newClass) {
    var classes = object[key];
    object[key] = classes ? classes + ' ' + newClass : newClass;
  };

  var _2G = function (vNode, eventNode) {
    var tag = vNode.$;

    if (tag === 5) {
      return _2G(vNode.k || (vNode.k = vNode.m()), eventNode);
    }

    if (tag === 0) {
      return _2g.createTextNode(vNode.a);
    }

    if (tag === 4) {
      var subNode = vNode.k;
      var tagger = vNode.j;

      while (subNode.$ === 4) {
        typeof tagger !== 'object' ? tagger = [tagger, subNode.j] : tagger.push(subNode.j);
        subNode = subNode.k;
      }

      var subEventRoot = {
        j: tagger,
        p: eventNode
      };

      var domNode = _2G(subNode, subEventRoot);

      domNode.elm_event_node_ref = subEventRoot;
      return domNode;
    }

    if (tag === 3) {
      var domNode = vNode.h(vNode.g);

      _2I(domNode, eventNode, vNode.d);

      return domNode;
    } // at this point `tag` must be 1 or 2


    var domNode = vNode.f ? _2g.createElementNS(vNode.f, vNode.c) : _2g.createElement(vNode.c);

    _2I(domNode, eventNode, vNode.d);

    for (var kids = vNode.e, i = 0; i < kids.length; i++) {
      _2H(domNode, _2G(tag === 1 ? kids[i] : kids[i].b, eventNode));
    }

    return domNode;
  };

  var _2I = function (domNode, eventNode, facts) {
    for (var key in facts) {
      var value = facts[key];
      key === 'a1' ? _2l(domNode, value) : key === 'a0' ? _2k(domNode, eventNode, value) : key === 'a3' ? _2j(domNode, value) : key === 'a4' ? _2i(domNode, value) : (key !== 'value' || domNode[key] !== value) && (domNode[key] = value);
    }
  };

  var _2l = function (domNode, styles) {
    var domNodeStyle = domNode.style;

    for (var key in styles) {
      domNodeStyle[key] = styles[key];
    }
  };

  var _2j = function (domNode, attrs) {
    for (var key in attrs) {
      var value = attrs[key];
      value ? domNode.setAttribute(key, value) : domNode.removeAttribute(key);
    }
  };

  var _2i = function (domNode, nsAttrs) {
    for (var key in nsAttrs) {
      var pair = nsAttrs[key];
      var namespace = pair.f;
      var value = pair.o;
      value ? domNode.setAttributeNS(namespace, key, value) : domNode.removeAttributeNS(namespace, key);
    }
  };

  var _2k = function (domNode, eventNode, events) {
    var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

    for (var key in events) {
      var newHandler = events[key];
      var oldCallback = allCallbacks[key];

      if (!newHandler) {
        domNode.removeEventListener(key, oldCallback);
        allCallbacks[key] = undefined;
        continue;
      }

      if (oldCallback) {
        var oldHandler = oldCallback.q;

        if (oldHandler.$ === newHandler.$) {
          oldCallback.q = newHandler;
          continue;
        }

        domNode.removeEventListener(key, oldCallback);
      }

      oldCallback = _35(eventNode, newHandler);
      domNode.addEventListener(key, oldCallback, void 0);
      allCallbacks[key] = oldCallback;
    }
  };

  var _35 = function (eventNode, initialHandler) {
    function callback(event) {
      var handler = callback.q;

      var result = _y(handler.a, event);

      if (!_V(result)) {
        return;
      }

      var ok = result.a;

      var timedMsg = _3L(event, _38(handler), ok);

      var message = timedMsg.a;
      var currentEventNode = eventNode;
      var tagger;
      var i;

      while (tagger = currentEventNode.j) {
        if (typeof tagger === 'function') {
          message = tagger(message);
        } else {
          for (var i = tagger.length; i--;) {
            message = tagger[i](message);
          }
        }

        currentEventNode = currentEventNode.p;
      }

      currentEventNode(message, _3K(timedMsg));
    }

    callback.q = initialHandler;
    return callback;
  };

  var _2K = function (x, y) {
    return x.$ === y.$ && _2m(x.a, y.a);
  };

  var _3L = function (event, tag, value) {
    // 0 = Normal
    // 1 = MayStopPropagation
    // 2 = MayPreventDefault
    // 3 = Custom
    if (!tag) {
      return value;
    }

    if (tag === 1 ? value.b : tag === 3 && value.stopPropagation) event.stopPropagation();
    if (tag === 2 ? value.b : tag === 3 && value.preventDefault) event.preventDefault();
    return tag < 3 ? value.a : value.message;
  };

  var _h = function (x, y) {
    var patches = [];

    _16(x, y, patches, 0);

    return patches;
  };

  var _1e = function (patches, type, index, data) {
    var patch = {
      $: type,
      r: index,
      s: data,
      t: undefined,
      u: undefined
    };
    patches.push(patch);
    return patch;
  };

  var _16 = function (x, y, patches, index) {
    if (x === y) {
      return;
    }

    var xType = x.$;
    var yType = y.$; // Bail if you run into different types of nodes. Implies that the
    // structure has changed significantly and it's not worth a diff.

    if (xType !== yType) {
      if (xType === 1 && yType === 2) {
        y = _1f(y);
        yType = 1;
      } else {
        _1e(patches, 0, index, y);

        return;
      }
    } // Now we know that both nodes are the same $.


    switch (yType) {
      case 5:
        var xRefs = x.l;
        var yRefs = y.l;
        var i = xRefs.length;
        var same = i === yRefs.length;

        while (same && i--) {
          same = xRefs[i] === yRefs[i];
        }

        if (same) {
          y.k = x.k;
          return;
        }

        y.k = y.m();
        var subPatches = [];

        _16(x.k, y.k, subPatches, 0);

        subPatches.length > 0 && _1e(patches, 1, index, subPatches);
        return;

      case 4:
        // gather nested taggers
        var xTaggers = x.j;
        var yTaggers = y.j;
        var nesting = false;
        var xSubNode = x.k;

        while (xSubNode.$ === 4) {
          nesting = true;
          typeof xTaggers !== 'object' ? xTaggers = [xTaggers, xSubNode.j] : xTaggers.push(xSubNode.j);
          xSubNode = xSubNode.k;
        }

        var ySubNode = y.k;

        while (ySubNode.$ === 4) {
          nesting = true;
          typeof yTaggers !== 'object' ? yTaggers = [yTaggers, ySubNode.j] : yTaggers.push(ySubNode.j);
          ySubNode = ySubNode.k;
        } // Just bail if different numbers of taggers. This implies the
        // structure of the virtual DOM has changed.


        if (nesting && xTaggers.length !== yTaggers.length) {
          _1e(patches, 0, index, y);

          return;
        } // check if taggers are "the same"


        if (nesting ? !_1d(xTaggers, yTaggers) : xTaggers !== yTaggers) {
          _1e(patches, 2, index, yTaggers);
        } // diff everything below the taggers


        _16(xSubNode, ySubNode, patches, index + 1);

        return;

      case 0:
        if (x.a !== y.a) {
          _1e(patches, 3, index, y.a);
        }

        return;

      case 1:
        _1c(x, y, patches, index, _1b);

        return;

      case 2:
        _1c(x, y, patches, index, _1a);

        return;

      case 3:
        if (x.h !== y.h) {
          _1e(patches, 0, index, y);

          return;
        }

        var factsDiff = _1Z(x.d, y.d);

        factsDiff && _1e(patches, 4, index, factsDiff);
        var patch = y.i(x.g, y.g);
        patch && _1e(patches, 5, index, patch);
        return;
    }
  };

  var _1d = function (as, bs) {
    for (var i = 0; i < as.length; i++) {
      if (as[i] !== bs[i]) {
        return false;
      }
    }

    return true;
  };

  var _1c = function (x, y, patches, index, diffKids) {
    // Bail if obvious indicators have changed. Implies more serious
    // structural changes such that it's not worth it to diff.
    if (x.c !== y.c || x.f !== y.f) {
      _1e(patches, 0, index, y);

      return;
    }

    var factsDiff = _1Z(x.d, y.d);

    factsDiff && _1e(patches, 4, index, factsDiff);
    diffKids(x, y, patches, index);
  };

  var _1Z = function (x, y, category) {
    var diff; // look for changes and removals

    for (var xKey in x) {
      if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4') {
        var subDiff = _1Z(x[xKey], y[xKey] || {}, xKey);

        if (subDiff) {
          diff = diff || {};
          diff[xKey] = subDiff;
        }

        continue;
      } // remove if not in the new facts


      if (!(xKey in y)) {
        diff = diff || {};
        diff[xKey] = !category ? typeof x[xKey] === 'string' ? '' : null : category === 'a1' ? '' : category === 'a0' || category === 'a3' ? undefined : {
          f: x[xKey].f,
          o: undefined
        };
        continue;
      }

      var xValue = x[xKey];
      var yValue = y[xKey]; // reference equal, so don't worry about it

      if (xValue === yValue && xKey !== 'value' || category === 'a0' && _2K(xValue, yValue)) {
        continue;
      }

      diff = diff || {};
      diff[xKey] = yValue;
    } // add new stuff


    for (var yKey in y) {
      if (!(yKey in x)) {
        diff = diff || {};
        diff[yKey] = y[yKey];
      }
    }

    return diff;
  };

  var _1b = function (xParent, yParent, patches, index) {
    var xKids = xParent.e;
    var yKids = yParent.e;
    var xLen = xKids.length;
    var yLen = yKids.length; // FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

    if (xLen > yLen) {
      _1e(patches, 6, index, xLen - yLen);
    } else if (xLen < yLen) {
      _1e(patches, 7, index, yKids.slice(xLen));
    } // PAIRWISE DIFF EVERYTHING ELSE


    for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++) {
      var xKid = xKids[i];

      _16(xKid, yKids[i], patches, ++index);

      index += xKid.b || 0;
    }
  };

  var _1a = function (xParent, yParent, patches, rootIndex) {
    var localPatches = [];
    var changes = {}; // Dict String Entry

    var inserts = []; // Array { index : Int, entry : Entry }
    // type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

    var xKids = xParent.e;
    var yKids = yParent.e;
    var xLen = xKids.length;
    var yLen = yKids.length;
    var xIndex = 0;
    var yIndex = 0;
    var index = rootIndex;

    while (xIndex < xLen && yIndex < yLen) {
      var x = xKids[xIndex];
      var y = yKids[yIndex];
      var xKey = x.a;
      var yKey = y.a;
      var xNode = x.b;
      var yNode = y.b; // check if keys match

      if (xKey === yKey) {
        index++;

        _16(xNode, yNode, localPatches, index);

        index += xNode.b || 0;
        xIndex++;
        yIndex++;
        continue;
      } // look ahead 1 to detect insertions and removals.


      var xNext = xKids[xIndex + 1];
      var yNext = yKids[yIndex + 1];

      if (xNext) {
        var xNextKey = xNext.a;
        var xNextNode = xNext.b;
        var oldMatch = yKey === xNextKey;
      }

      if (yNext) {
        var yNextKey = yNext.a;
        var yNextNode = yNext.b;
        var newMatch = xKey === yNextKey;
      } // swap x and y


      if (newMatch && oldMatch) {
        index++;

        _16(xNode, yNextNode, localPatches, index);

        _2M(changes, localPatches, xKey, yNode, yIndex, inserts);

        index += xNode.b || 0;
        index++;

        _2L(changes, localPatches, xKey, xNextNode, index);

        index += xNextNode.b || 0;
        xIndex += 2;
        yIndex += 2;
        continue;
      } // insert y


      if (newMatch) {
        index++;

        _2M(changes, localPatches, yKey, yNode, yIndex, inserts);

        _16(xNode, yNextNode, localPatches, index);

        index += xNode.b || 0;
        xIndex += 1;
        yIndex += 2;
        continue;
      } // remove x


      if (oldMatch) {
        index++;

        _2L(changes, localPatches, xKey, xNode, index);

        index += xNode.b || 0;
        index++;

        _16(xNextNode, yNode, localPatches, index);

        index += xNextNode.b || 0;
        xIndex += 2;
        yIndex += 1;
        continue;
      } // remove x, insert y


      if (xNext && xNextKey === yNextKey) {
        index++;

        _2L(changes, localPatches, xKey, xNode, index);

        _2M(changes, localPatches, yKey, yNode, yIndex, inserts);

        index += xNode.b || 0;
        index++;

        _16(xNextNode, yNextNode, localPatches, index);

        index += xNextNode.b || 0;
        xIndex += 2;
        yIndex += 2;
        continue;
      }

      break;
    } // eat up any remaining nodes with removeNode and insertNode


    while (xIndex < xLen) {
      index++;
      var x = xKids[xIndex];
      var xNode = x.b;

      _2L(changes, localPatches, x.a, xNode, index);

      index += xNode.b || 0;
      xIndex++;
    }

    while (yIndex < yLen) {
      var endInserts = endInserts || [];
      var y = yKids[yIndex];

      _2M(changes, localPatches, y.a, y.b, undefined, endInserts);

      yIndex++;
    }

    if (localPatches.length > 0 || inserts.length > 0 || endInserts) {
      _1e(patches, 8, rootIndex, {
        v: localPatches,
        w: inserts,
        x: endInserts
      });
    }
  };

  var _2M = function (changes, localPatches, key, vnode, yIndex, inserts) {
    var entry = changes[key]; // never seen this key before

    if (!entry) {
      entry = {
        c: 0,
        y: vnode,
        r: yIndex,
        s: undefined
      };
      inserts.push({
        r: yIndex,
        z: entry
      });
      changes[key] = entry;
      return;
    } // this key was removed earlier, a match!


    if (entry.c === 1) {
      inserts.push({
        r: yIndex,
        z: entry
      });
      entry.c = 2;
      var subPatches = [];

      _16(entry.y, vnode, subPatches, entry.r);

      entry.r = yIndex;
      entry.s.s = {
        v: subPatches,
        z: entry
      };
      return;
    } // this key has already been inserted or moved, a duplicate!


    _2M(changes, localPatches, key + "_elmW6BL", vnode, yIndex, inserts);
  };

  var _2L = function (changes, localPatches, key, vnode, index) {
    var entry = changes[key]; // never seen this key before

    if (!entry) {
      var patch = _1e(localPatches, 9, index, undefined);

      changes[key] = {
        c: 1,
        y: vnode,
        r: index,
        s: patch
      };
      return;
    } // this key was inserted earlier, a match!


    if (entry.c === 0) {
      entry.c = 2;
      var subPatches = [];

      _16(vnode, entry.y, subPatches, index);

      _1e(localPatches, 9, index, {
        v: subPatches,
        z: entry
      });

      return;
    } // this key has already been removed or moved, a duplicate!


    _2L(changes, localPatches, key + "_elmW6BL", vnode, index);
  };

  var _15 = function (domNode, vNode, patches, eventNode) {
    _1Y(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
  };

  var _1Y = function (domNode, vNode, patches, i, low, high, eventNode) {
    var patch = patches[i];
    var index = patch.r;

    while (index === low) {
      var patchType = patch.$;

      if (patchType === 1) {
        _15(domNode, vNode.k, patch.s, eventNode);
      } else if (patchType === 8) {
        patch.t = domNode;
        patch.u = eventNode;
        var subPatches = patch.s.v;

        if (subPatches.length > 0) {
          _1Y(domNode, vNode, subPatches, 0, low, high, eventNode);
        }
      } else if (patchType === 9) {
        patch.t = domNode;
        patch.u = eventNode;
        var data = patch.s;

        if (data) {
          data.z.s = domNode;
          var subPatches = data.v;

          if (subPatches.length > 0) {
            _1Y(domNode, vNode, subPatches, 0, low, high, eventNode);
          }
        }
      } else {
        patch.t = domNode;
        patch.u = eventNode;
      }

      i++;

      if (!(patch = patches[i]) || (index = patch.r) > high) {
        return i;
      }
    }

    var tag = vNode.$;

    if (tag === 4) {
      var subNode = vNode.k;

      while (subNode.$ === 4) {
        subNode = subNode.k;
      }

      return _1Y(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
    } // tag must be 1 or 2 at this point


    var vKids = vNode.e;
    var childNodes = domNode.childNodes;

    for (var j = 0; j < vKids.length; j++) {
      low++;
      var vKid = tag === 1 ? vKids[j] : vKids[j].b;
      var nextLow = low + (vKid.b || 0);

      if (low <= index && index <= nextLow) {
        i = _1Y(childNodes[j], vKid, patches, i, low, nextLow, eventNode);

        if (!(patch = patches[i]) || (index = patch.r) > high) {
          return i;
        }
      }

      low = nextLow;
    }

    return i;
  };

  var _g = function (rootDomNode, oldVirtualNode, patches, eventNode) {
    if (patches.length === 0) {
      return rootDomNode;
    }

    _15(rootDomNode, oldVirtualNode, patches, eventNode);

    return _14(rootDomNode, patches);
  };

  var _14 = function (rootDomNode, patches) {
    for (var i = 0; i < patches.length; i++) {
      var patch = patches[i];
      var localDomNode = patch.t;

      var newNode = _1X(localDomNode, patch);

      if (localDomNode === rootDomNode) {
        rootDomNode = newNode;
      }
    }

    return rootDomNode;
  };

  var _1X = function (domNode, patch) {
    switch (patch.$) {
      case 0:
        return _2J(domNode, patch.s, patch.u);

      case 4:
        _2I(domNode, patch.u, patch.s);

        return domNode;

      case 3:
        domNode.replaceData(0, domNode.length, patch.s);
        return domNode;

      case 1:
        return _14(domNode, patch.s);

      case 2:
        if (domNode.elm_event_node_ref) {
          domNode.elm_event_node_ref.j = patch.s;
        } else {
          domNode.elm_event_node_ref = {
            j: patch.s,
            p: patch.u
          };
        }

        return domNode;

      case 6:
        var i = patch.s;

        while (i--) {
          domNode.removeChild(domNode.lastChild);
        }

        return domNode;

      case 7:
        var newNodes = patch.s;

        for (var i = 0; i < newNodes.length; i++) {
          _2H(domNode, _2G(newNodes[i], patch.u));
        }

        return domNode;

      case 9:
        var data = patch.s;

        if (!data) {
          domNode.parentNode.removeChild(domNode);
          return domNode;
        }

        var entry = data.z;

        if (typeof entry.r !== 'undefined') {
          domNode.parentNode.removeChild(domNode);
        }

        entry.s = _14(domNode, data.v);
        return domNode;

      case 8:
        return _2F(domNode, patch);

      case 5:
        return patch.s(domNode);

      default:
        _W(10);

      // 'Ran into an unknown patch!'
    }
  };

  var _2J = function (domNode, vNode, eventNode) {
    var parentNode = domNode.parentNode;

    var newNode = _2G(vNode, eventNode);

    if (!newNode.elm_event_node_ref) {
      newNode.elm_event_node_ref = domNode.elm_event_node_ref;
    }

    if (parentNode && newNode !== domNode) {
      parentNode.replaceChild(newNode, domNode);
    }

    return newNode;
  };

  var _2F = function (domNode, patch) {
    var data = patch.s; // remove end inserts

    var frag = _2h(data.x, patch); // removals


    domNode = _14(domNode, data.v); // inserts

    var inserts = data.w;

    for (var i = 0; i < inserts.length; i++) {
      var insert = inserts[i];
      var entry = insert.z;
      var node = entry.c === 2 ? entry.s : _2G(entry.y, patch.u);
      domNode.insertBefore(node, domNode.childNodes[insert.r]);
    } // add end inserts


    if (frag) {
      _2H(domNode, frag);
    }

    return domNode;
  };

  var _2h = function (endInserts, patch) {
    if (!endInserts) {
      return;
    }

    var frag = _2g.createDocumentFragment();

    for (var i = 0; i < endInserts.length; i++) {
      var insert = endInserts[i];
      var entry = insert.z;

      _2H(frag, entry.c === 2 ? entry.s : _2G(entry.y, patch.u));
    }

    return frag;
  };

  var _j = function (node) {
    // TEXT NODES
    if (node.nodeType === 3) {
      return _p(node.textContent);
    } // WEIRD NODES


    if (node.nodeType !== 1) {
      return _p('');
    } // ELEMENT NODES


    var attrList = _L;
    var attrs = node.attributes;

    for (var i = attrs.length; i--;) {
      var attr = attrs[i];
      var name = attr.name;
      var value = attr.value;
      attrList = _18(_S(_1B, name, value), attrList);
    }

    var tag = node.tagName.toLowerCase();
    var kidList = _L;
    var kids = node.childNodes;

    for (var i = kids.length; i--;) {
      kidList = _18(_j(kids[i]), kidList);
    }

    return _17(_1A, tag, attrList, kidList);
  };

  var _1f = function (keyedNode) {
    var keyedKids = keyedNode.e;
    var len = keyedKids.length;
    var kids = new Array(len);

    for (var i = 0; i < len; i++) {
      kids[i] = keyedKids[i].b;
    }

    return {
      $: 1,
      c: keyedNode.c,
      d: keyedNode.d,
      e: kids,
      f: keyedNode.f,
      b: keyedNode.b
    };
  };

  var _G = function (domNode, view) {
    return function (sendToApp, initialModel) {
      var currNode = _j(domNode);

      return _i(initialModel, function (model) {
        var nextNode = view(model);

        var patches = _h(currNode, nextNode);

        domNode = _g(domNode, currNode, patches, sendToApp);
        currNode = nextNode;
      });
    };
  };

  var _i = function (model, draw) {
    draw(model);
    var state = 0;

    function updateIfNeeded() {
      state = state === 1 ? 0 : (_19(updateIfNeeded), draw(model), 1);
    }

    return function (nextModel, isSync) {
      model = nextModel;
      isSync ? (draw(model), state === 2 && (state = 1)) : (state === 0 && _19(updateIfNeeded), state = 2);
    };
  };

  var _3F = function (size, offset, func) {
    var result = new Array(size);

    for (var i = 0; i < size; i++) {
      result[i] = func(offset + i);
    }

    return result;
  };

  var _3l = function (max, ls) {
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++) {
      result[i] = ls.a;
      ls = ls.b;
    }

    result.length = i;
    return _f(result, ls);
  };

  var _3H = function (func, acc, array) {
    for (var i = array.length - 1; i >= 0; i--) {
      acc = _S(func, array[i], acc);
    }

    return acc;
  };

  var _2e = function (f, d1) {
    return _31(f, [d1]);
  };

  var _T = function (decoder, value) {
    return _y(decoder, _1K(value));
  };

  var _1r = function (callback, task) {
    return {
      $: 3,
      b: callback,
      d: task
    };
  };

  var _1m = function (namespace, tag) {
    return _2N(function (factList, kidList) {
      for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
      {
        var kid = kidList.a;
        descendantsCount += kid.b || 0;
        kids.push(kid);
      }

      descendantsCount += kids.length;
      return {
        $: 1,
        c: tag,
        d: _1J(factList),
        e: kids,
        f: namespace,
        b: descendantsCount
      };
    });
  };

  var _1A = function (b) {
    return _1m(void 0, b);
  };

  var _2d = function (key, handler) {
    return {
      $: 'a0',
      n: key,
      o: handler
    };
  };

  var _1O = function (key, value) {
    return {
      $: 'a3',
      n: key,
      o: value
    };
  };

  var _19 = function (callback) {
    setTimeout(callback, 1000 / 60);
  };

  var _33 = function (func, acc, t) {
    foldr: while (true) {
      if (t.$ === 'RBEmpty_elm_builtin') {
        return acc;
      } else {
        var key = t.b;
        var value = t.c;
        var left = t.d;
        var right = t.e;

        var $temp$func = func,
            $temp$acc = _17(func, key, value, _17(_2r, func, acc, right)),
            $temp$t = left;

        func = $temp$func;
        acc = $temp$acc;
        t = $temp$t;
        continue foldr;
      }
    }
  };

  var _2P = function (dict) {
    return _17(_2r, _2o(function (key, value, list) {
      return _S(_2Z, _f(key, value), list);
    }), _L, dict);
  };

  var _2t = function (dict) {
    return _17(_2r, _2o(function (key, value, keyList) {
      return _S(_2Z, key, keyList);
    }), _L, dict);
  };

  var _2Q = function (_n0) {
    var dict = _n0.a;
    return _2t(dict);
  };

  var _34 = function (func, baseCase, _n0) {
    var tree = _n0.c;
    var tail = _n0.d;

    var helper = _2N(function (node, acc) {
      if (node.$ === 'SubTree') {
        var subTree = node.a;
        return _17(_3D, helper, acc, subTree);
      } else {
        var values = node.a;
        return _17(_3D, func, acc, values);
      }
    });

    return _17(_3D, helper, _17(_3D, func, baseCase, tail), tree);
  };

  var _2O = function (array) {
    return _17(_2p, _2Z, _L, array);
  };

  var _1E = function (msg, model) {
    if (msg.$ === 'Increment') {
      return _1g(model, {
        count: model.count + 1
      });
    } else {
      return _1g(model, {
        count: model.count - 1
      });
    }
  };

  var _V = function (result) {
    if (result.$ === 'Ok') {
      return true;
    } else {
      return false;
    }
  };

  var _3Q = function (a, b, c, d) {
    return {
      $: 'Array_elm_builtin',
      a: a,
      b: b,
      c: c,
      d: d
    };
  };

  var _3O = function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return _3Q(a, b, c, d);
        };
      };
    };
  };

  var _3c = function (base, number) {
    return _3f(number) / _3f(base);
  };

  var _3N = function (a) {
    return {
      $: 'Leaf',
      a: a
    };
  };

  var _3m = function (a) {
    return {
      $: 'SubTree',
      a: a
    };
  };

  var _2u = function (func, acc, list) {
    foldl: while (true) {
      if (!list.b) {
        return acc;
      } else {
        var x = list.a;
        var xs = list.b;

        var $temp$func = func,
            $temp$acc = _S(func, x, acc),
            $temp$list = xs;

        func = $temp$func;
        acc = $temp$acc;
        list = $temp$list;
        continue foldl;
      }
    }
  };

  var $_2 = function (fun, a) {
    return function (b) {
      return function (c) {
        return fun(a, b, c);
      };
    };
  };

  var _2b = function (a) {
    return $_2.call(this, _2u, a);
  };

  var _2p = function (a) {
    return $_2.call(this, _34, a);
  };

  var _2r = function (a) {
    return $_2.call(this, _33, a);
  };

  var _3B = function (a) {
    return $_2.call(this, _3F, a);
  };

  var _3D = function (a) {
    return $_2.call(this, _3H, a);
  };

  var _20 = function (list) {
    return _17(_2b, _2Z, _L, list);
  };

  var _3k = function (nodes, acc) {
    compressNodes: while (true) {
      var _n0 = _S(_3g, 32, nodes);

      var node = _n0.a;
      var remainingNodes = _n0.b;

      var newAcc = _S(_2Z, _3m(node), acc);

      if (!remainingNodes.b) {
        return _20(newAcc);
      } else {
        var $temp$nodes = remainingNodes,
            $temp$acc = newAcc;
        nodes = $temp$nodes;
        acc = $temp$acc;
        continue compressNodes;
      }
    }
  };

  var _3b = function (nodeList, nodeListSize) {
    treeFromBuilder: while (true) {
      var newNodeSize = _3e(nodeListSize / 32);

      if (newNodeSize === 1) {
        return _S(_3g, 32, nodeList).a;
      } else {
        var $temp$nodeList = _S(_3i, nodeList, _L),
            $temp$nodeListSize = newNodeSize;

        nodeList = $temp$nodeList;
        nodeListSize = $temp$nodeListSize;
        continue treeFromBuilder;
      }
    }
  };

  var _3a = function (x, y) {
    return _3d(x, y) > 0 ? x : y;
  };

  var _3M = function (reverseNodeList, builder) {
    if (!builder.nodeListSize) {
      return _1S(_3O, _3R(builder.tail), 5, _30, builder.tail);
    } else {
      var treeLen = builder.nodeListSize * 32;

      var depth = _3T(_S(_3U, 32, treeLen - 1));

      var correctNodeList = reverseNodeList ? _20(builder.nodeList) : builder.nodeList;

      var tree = _S(_3W, correctNodeList, builder.nodeListSize);

      return _1S(_3O, _3R(builder.tail) + treeLen, _S(_3Y, 5, depth * 5), tree, builder.tail);
    }
  };

  var _3G = function (fn, fromIndex, len, nodeList, tail) {
    initializeHelp: while (true) {
      if (fromIndex < 0) {
        return _S(_3I, false, {
          nodeList: nodeList,
          nodeListSize: len / 32 | 0,
          tail: tail
        });
      } else {
        var leaf = _3N(_17(_3B, 32, fromIndex, fn));

        var $temp$fn = fn,
            $temp$fromIndex = fromIndex - 32,
            $temp$len = len,
            $temp$nodeList = _S(_2Z, leaf, nodeList),
            $temp$tail = tail;

        fn = $temp$fn;
        fromIndex = $temp$fromIndex;
        len = $temp$len;
        nodeList = $temp$nodeList;
        tail = $temp$tail;
        continue initializeHelp;
      }
    }
  };

  var _39 = function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return _3G(a, b, c, d, e);
          };
        };
      };
    };
  };

  var _2v = function (len, fn) {
    if (len <= 0) {
      return _2w;
    } else {
      var tailLen = len % 32;

      var tail = _17(_3B, tailLen, len - tailLen, fn);

      var initialFromIndex = len - tailLen - 32;
      return _37(_39, fn, initialFromIndex, len, _L, tail);
    }
  };

  var _1v = function (a) {
    return {
      $: 'Err',
      a: a
    };
  };

  var _1h = function (a) {
    return {
      $: 'Ok',
      a: a
    };
  };

  var _24 = function (a, b) {
    return {
      $: 'Failure',
      a: a,
      b: b
    };
  };

  var _26 = function (a, b) {
    return {
      $: 'Field',
      a: a,
      b: b
    };
  };

  var _25 = function (a, b) {
    return {
      $: 'Index',
      a: a,
      b: b
    };
  };

  var _21 = function (a) {
    return {
      $: 'OneOf',
      a: a
    };
  };

  var _3K = function (timed) {
    if (timed.$ === 'Sync') {
      return true;
    } else {
      return false;
    }
  };

  var _38 = function (handler) {
    switch (handler.$) {
      case 'Normal':
        return 0;

      case 'MayStopPropagation':
        return 1;

      case 'MayPreventDefault':
        return 2;

      default:
        return 3;
    }
  };

  var $_1 = function (tag, factList, kidList) {
    for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) {
      var kid = kidList.a;
      descendantsCount += kid.b || 0;
      kids.push(kid);
    }

    descendantsCount += kids.length;
    return {
      $: 1,
      c: tag,
      d: _1J(factList),
      e: kids,
      f: void 0,
      b: descendantsCount
    };
  };

  var _2U = function (a) {
    return {
      $: 'Normal',
      a: a
    };
  };

  var _2R = function (a) {
    return {
      $: 'Sync',
      a: a
    };
  };

  var _1n = function (event, decoder) {
    return _S(_2V, event, _2U(_S(_2S, _2R, decoder)));
  };

  var _m = function (msg) {
    return _S(_1H, 'click', _1k(msg));
  };

  var _A = function (model) {
    return _S(_d, _L, _v([_S(_r, _L, _v([_p('0.19')])), _S(_n, _v([_m(_b)]), _v([_p('+1')])), _S(_d, _L, _v([_p(_k(model.count))])), _S(_n, _v([_m(_Z)]), _v([_p('-1')]))]));
  };

  var _F = function (_n1) {
    return _f(_H, _J);
  };

  var _E = function (_n2) {
    return _N;
  };

  var _P = function (msg, model) {
    return _f(_S(_t, msg, model), _J);
  };

  var $_0 = function (fun, a) {
    return function (b) {
      return fun(a, b);
    };
  };

  var _C = function (a) {
    return $_0.call(this, _P, a);
  };

  var _Q = function (a) {
    return $_0.call(this, _T, a);
  };

  var _d = function (a) {
    return $_0.call(this, _w, a);
  };

  var _n = function (a) {
    return $_0.call(this, _1G, a);
  };

  var _r = function (a) {
    return $_0.call(this, _1F, a);
  };

  var _t = function (a) {
    return $_0.call(this, _1E, a);
  };

  var _1B = function (a) {
    return $_0.call(this, _1O, a);
  };

  var _1H = function (a) {
    return $_0.call(this, _1n, a);
  };

  var _1i = function (a) {
    return $_0.call(this, _1r, a);
  };

  var _1w = function (a) {
    return $_0.call(this, _26, a);
  };

  var _1y = function (a) {
    return $_0.call(this, _25, a);
  };

  var _22 = function (a) {
    return $_0.call(this, _24, a);
  };

  var _2S = function (a) {
    return $_0.call(this, _2e, a);
  };

  var _2V = function (a) {
    return $_0.call(this, _2d, a);
  };

  var _2X = function (a) {
    return $_0.call(this, _2v, a);
  };

  var _2Z = function (a) {
    return $_0.call(this, _18, a);
  };

  var _3I = function (a) {
    return $_0.call(this, _3M, a);
  };

  var _3U = function (a) {
    return $_0.call(this, _3c, a);
  };

  var _3W = function (a) {
    return $_0.call(this, _3b, a);
  };

  var _3Y = function (a) {
    return $_0.call(this, _3a, a);
  };

  var _3g = function (a) {
    return $_0.call(this, _3l, a);
  };

  var _3i = function (a) {
    return $_0.call(this, _3k, a);
  };

  var _3 = function (node, flags) {
    return _9(_4, flags, _8.init, _8.update, _8.subscriptions, _G(node, _8.view));
  };

  console.warn("Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.");
  _22.a = 2;
  _22.f = _24;
  _1y.a = 2;
  _1y.f = _25;
  var _L = {
    $: "[]"
  };
  var _30 = [];
  var _2w = {
    $: "Array_elm_builtin",
    a: 0,
    b: 5,
    c: _30,
    d: _30
  };
  _3B.a = 3;
  _3B.f = _3F;
  _3O.a = 4;
  _3O.f = _3Q;
  $$0.value = "_JsArray_length", _$2(_3R, "name", $$0);
  var _3T = _$4;
  var _3f = _$5;
  _3U.a = 2;
  _3U.f = _3c;
  _2b.a = 3;
  _2b.f = _2u;
  _2Z.a = 2;
  _2Z.f = _18;
  var _3e = _$6;
  _3g.a = 2;
  _3g.f = _3l;
  _3i.a = 2;
  _3i.f = _3k;
  _3W.a = 2;
  _3W.f = _3b;
  _3Y.a = 2;
  _3Y.f = _3a;
  _3I.a = 2;
  _3I.f = _3M;
  _39.a = 5;
  _39.f = _3G;
  _2X.a = 2;
  _2X.f = _2v;
  _1w.a = 2;
  _1w.f = _26;
  _Q.a = 2;
  _Q.f = _T;
  _2r.a = 3;
  _2r.f = _33;
  _3D.a = 3;
  _3D.f = _3H;
  _2p.a = 3;
  _2p.f = _34;
  var _x = {};
  _1i.a = 2;
  _1i.f = _1r;
  var _1s = [];
  var _4 = {
    $: 0,
    a: {
      $: "#0"
    }
  };
  var _H = {
    count: 0
  };
  var _J = {
    $: 2,
    m: _L
  };
  var _N = {
    $: 2,
    m: _L
  };
  _t.a = 2;
  _t.f = _1E;
  _C.a = 2;
  _C.f = _P;

  var _w = $_1.bind(null, "div");

  _d.a = 2;
  _d.f = _w;

  var _1F = $_1.bind(null, "h1");

  _r.a = 2;
  _r.f = _1F;
  $$0.value = "_VirtualDom_text", _$2(_p, "name", $$0);

  var _1G = $_1.bind(null, "button");

  _n.a = 2;
  _n.f = _1G;
  _2V.a = 2;
  _2V.f = _2d;
  _2S.a = 2;
  _2S.f = _2e;
  _1H.a = 2;
  _1H.f = _1n;
  $$0.value = "_Json_succeed", _$2(_1k, "name", $$0);
  var _b = {
    $: "Increment"
  };
  $$0.value = "_String_fromNumber", _$2(_k, "name", $$0);
  var _Z = {
    $: "Decrement"
  };
  $$0.value = "author$project$Main$view", _$2(_A, "name", $$0);
  var _8 = {
    init: _F,
    subscriptions: _E,
    update: _C,
    view: _A
  };
  _1B.a = 2;
  _1B.f = _1O;
  var _2g = document;
  _$0.Elm = {
    Main: {
      embed: _3
    }
  };
}).call(this);
