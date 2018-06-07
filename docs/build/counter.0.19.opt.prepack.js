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

  var _2U = function (arity, fun, wrapper) {
    wrapper.a = arity;
    wrapper.f = fun;
    return wrapper;
  };

  var _27 = function (fun) {
    return _2U(2, fun, function (a) {
      return function (b) {
        return fun(a, b);
      };
    });
  };

  var _Q = function (fun, a, b) {
    return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
  };

  var _z = function (fun, a, b, c) {
    return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
  };

  var _1J = function (fun, a, b, c, d) {
    return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
  };

  var _2g = function (fun, a, b, c, d, e) {
    return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
  };

  var _10 = function (hd, tl) {
    return {
      $: 1,
      a: hd,
      b: tl
    };
  };

  var _p = function (arr) {
    var out = _J;

    for (var i = arr.length; i--;) {
      out = _10(arr[i], out);
    }

    return out;
  };

  var _39 = function (x, y, ord) {
    if (typeof x !== 'object') {
      return x === y ? /*EQ*/0 : x < y ? /*LT*/-1 : /*GT*/1;
    } /**_UNUSED/
      if (x instanceof String)
      {
      	var a = x.valueOf();
      	var b = y.valueOf();
      	return a === b ? 0 : a < b ? -1 : 1;
      }
      //*/ /**/

    if (!x.$) //*/
      /**_UNUSED/
      if (x.$[0] === '#')
      //*/{
        return (ord = _39(x.a, y.a)) ? ord : (ord = _39(x.b, y.b)) ? ord : _39(x.c, y.c);
      } // traverse conses until end of a list or a mismatch


    for (; x.b && y.b && !(ord = _39(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES


    return ord || (x.b ? /*GT*/1 : y.b ? /*LT*/-1 : /*EQ*/0);
  };

  var _Z = function (a, b) {
    return {
      a: a,
      b: b
    };
  };

  var _1X = function (oldRecord, updatedFields) {
    var newRecord = {};

    for (var key in oldRecord) {
      newRecord[key] = oldRecord[key];
    }

    for (var key in updatedFields) {
      newRecord[key] = updatedFields[key];
    }

    return newRecord;
  };

  var _2x = function (array) {
    return array.length;
  };

  var _U = function (identifier) {
    throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
  };

  var _e = function (number) {
    return number + '';
  };

  var _1b = function (msg) {
    return {
      $: 0,
      a: msg
    };
  };

  var _2c = function (f, decoders) {
    return {
      $: 13,
      f: f,
      g: decoders
    };
  };

  var _s = function (decoder, value) {
    switch (decoder.$) {
      case 3:
        return typeof value === 'boolean' ? _1Y(value) : _1H('a BOOL', value);

      case 2:
        if (typeof value !== 'number') {
          return _1H('an INT', value);
        }

        if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
          return _1Y(value);
        }

        if (isFinite(value) && !(value % 1)) {
          return _1Y(value);
        }

        return _1H('an INT', value);

      case 4:
        return typeof value === 'number' ? _1Y(value) : _1H('a FLOAT', value);

      case 6:
        return typeof value === 'string' ? _1Y(value) : value instanceof String ? _1Y(value + '') : _1H('a STRING', value);

      case 9:
        return value === null ? _1Y(decoder.c) : _1H('null', value);

      case 5:
        return _1Y(_S(value));

      case 7:
        if (!Array.isArray(value)) {
          return _1H('a LIST', value);
        }

        return _1h(decoder.b, value, _p);

      case 8:
        if (!Array.isArray(value)) {
          return _1H('an ARRAY', value);
        }

        return _1h(decoder.b, value, _1g);

      case 10:
        var field = decoder.d;

        if (typeof value !== 'object' || value === null || !(field in value)) {
          return _1H('an OBJECT with a field named `' + field + '`', value);
        }

        var result = _s(decoder.b, value[field]);

        return _T(result) ? result : _1m(_Q(_1n, field, result.a));

      case 11:
        var index = decoder.e;

        if (!Array.isArray(value)) {
          return _1H('an ARRAY', value);
        }

        if (index >= value.length) {
          return _1H('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
        }

        var result = _s(decoder.b, value[index]);

        return _T(result) ? result : _1m(_Q(_1p, index, result.a));

      case 12:
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
          return _1H('an OBJECT', value);
        }

        var keyValuePairs = _J; // TODO test perf of Object.keys and switch when support is good enough

        for (var key in value) {
          if (value.hasOwnProperty(key)) {
            var result = _s(decoder.b, value[key]);

            if (!_T(result)) {
              return _1m(_Q(_1n, key, result.a));
            }

            keyValuePairs = _10(_Z(key, result.a), keyValuePairs);
          }
        }

        return _1Y(_1r(keyValuePairs));

      case 13:
        var answer = decoder.f;
        var decoders = decoder.g;

        for (var i = 0; i < decoders.length; i++) {
          var result = _s(decoders[i], value);

          if (!_T(result)) {
            return result;
          }

          answer = answer(result.a);
        }

        return _1Y(answer);

      case 14:
        var result = _s(decoder.b, value);

        return !_T(result) ? result : _s(decoder.h(result.a), value);

      case 15:
        var errors = _J;

        for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
        {
          var result = _s(temp.a, value);

          if (_T(result)) {
            return result;
          }

          errors = _10(result.a, errors);
        }

        return _1m(_1s(_1r(errors)));

      case 1:
        return _1m(_Q(_1t, decoder.a, _S(value)));

      case 0:
        return _1Y(decoder.a);
    }
  };

  var _1h = function (decoder, value, toElmValue) {
    var len = value.length;
    var array = new Array(len);

    for (var i = 0; i < len; i++) {
      var result = _s(decoder, value[i]);

      if (!_T(result)) {
        return _1m(_Q(_1p, i, result.a));
      }

      array[i] = result.a;
    }

    return _1Y(toElmValue(array));
  };

  var _1g = function (array) {
    return _Q(_2E, array.length, function (i) {
      return array[i];
    });
  };

  var _1H = function (type, value) {
    return _1m(_Q(_1t, 'Expecting ' + type, _S(value)));
  };

  var _2T = function (x, y) {
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
        return _2T(x.b, y.b);

      case 10:
        return x.d === y.d && _2T(x.b, y.b);

      case 11:
        return x.e === y.e && _2T(x.b, y.b);

      case 13:
        return x.f === y.f && _2f(x.g, y.g);

      case 14:
        return x.h === y.h && _2T(x.b, y.b);

      case 15:
        return _2f(x.g, y.g);
    }
  };

  var _2f = function (aDecoders, bDecoders) {
    var len = aDecoders.length;

    if (len !== bDecoders.length) {
      return false;
    }

    for (var i = 0; i < len; i++) {
      if (!_2T(aDecoders[i], bDecoders[i])) {
        return false;
      }
    }

    return true;
  };

  var _S = function (value) {
    return value;
  };

  var _1C = function (value) {
    return value;
  };

  var _1K = function (callback) {
    return {
      $: 5,
      b: callback
    };
  };

  var _1I = function (task) {
    var __captured__scope_1 = __scope_0[0] || __get_scope_binding_0(0);

    var proc = {
      $: 0,
      e: __captured__scope_1[0]++,
      f: task,
      g: null,
      h: []
    };

    _1L(proc);

    return proc;
  };

  var _u = function (proc, msg) {
    proc.h.push(msg);

    _1L(proc);
  };

  var _1L = function (proc) {
    var __captured__scope_1 = __scope_0[0] || __get_scope_binding_0(0);

    _1j.push(proc);

    if (__captured__scope_1[1]) {
      return;
    }

    __captured__scope_1[1] = true;

    while (proc = _1j.shift()) {
      _1y(proc);
    }

    __captured__scope_1[1] = false;
  };

  var _1y = function (proc) {
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

          _1L(proc);
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

  var _7 = function (flagDecoder, flags, init, update, subscriptions, stepperBuilder) {
    var result = _Q(_O, flagDecoder, _S(flags));

    _T(result) || _U(2, result.a);
    var managers = {};
    result = init(result.a);
    var model = result.a;
    var stepper = stepperBuilder(sendToApp, model);

    var ports = _V(managers, sendToApp);

    function sendToApp(msg, viewMetadata) {
      result = _Q(update, msg, model);
      stepper(model = result.a, viewMetadata);

      _W(managers, result.b, subscriptions(model));
    }

    _W(managers, result.b, subscriptions(model));

    return ports ? {
      ports: ports
    } : {};
  };

  var _V = function (managers, sendToApp) {
    var ports; // setup all necessary effect managers

    for (var key in _r) {
      var manager = _r[key];

      if (manager.a) {
        ports = ports || {};
        ports[key] = manager.a(key, sendToApp);
      }

      managers[key] = _t(manager, sendToApp);
    }

    return ports;
  };

  var _t = function (info, sendToApp) {
    var router = {
      g: sendToApp,
      h: undefined
    };
    var onEffects = info.c;
    var onSelfMsg = info.d;
    var cmdMap = info.e;
    var subMap = info.f;

    function loop(state) {
      return _Q(_1Z, loop, _1K(function (msg) {
        var value = msg.a;

        if (msg.$ === 0) {
          return _z(onSelfMsg, router, value, state);
        }

        return cmdMap && subMap ? _1J(onEffects, router, value.i, value.j, state) : _z(onEffects, router, cmdMap ? value.i : value.j, state);
      }));
    }

    return router.h = _1I(_Q(_1Z, loop, info.b));
  };

  var _W = function (managers, cmdBag, subBag) {
    var effectsDict = {};

    _v(true, cmdBag, effectsDict, null);

    _v(false, subBag, effectsDict, null);

    for (var home in managers) {
      _u(managers[home], {
        $: 'fx',
        a: effectsDict[home] || {
          i: _J,
          j: _J
        }
      });
    }
  };

  var _v = function (isCmd, bag, effectsDict, taggers) {
    switch (bag.$) {
      case 1:
        var home = bag.k;

        var effect = _1N(isCmd, home, taggers, bag.l);

        effectsDict[home] = _1M(isCmd, effect, effectsDict[home]);
        return;

      case 2:
        for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
        {
          _v(isCmd, list.a, effectsDict, taggers);
        }

        return;

      case 3:
        _v(isCmd, bag.o, effectsDict, {
          p: bag.n,
          q: taggers
        });

        return;
    }
  };

  var _1N = function (isCmd, home, taggers, value) {
    function applyTaggers(x) {
      for (var temp = taggers; temp; temp = temp.q) {
        x = temp.p(x);
      }

      return x;
    }

    var map = isCmd ? _r[home].e : _r[home].f;
    return _Q(map, applyTaggers, value);
  };

  var _1M = function (isCmd, newEffect, effects) {
    effects = effects || {
      i: _J,
      j: _J
    };
    isCmd ? effects.i = _10(newEffect, effects.i) : effects.j = _10(newEffect, effects.j);
    return effects;
  };

  var _21 = function (parent, child) {
    parent.appendChild(child);
  };

  var _j = function (string) {
    return {
      $: 0,
      a: string
    };
  };

  var _1B = function (factList) {
    for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
    {
      var entry = factList.a;
      var tag = entry.$;
      var key = entry.n;
      var value = entry.o;

      if (tag === 'a2') {
        key === 'className' ? _1f(facts, key, _1C(value)) : facts[key] = _1C(value);
        continue;
      }

      var subFacts = facts[tag] || (facts[tag] = {});
      tag === 'a3' && key === 'class' ? _1f(subFacts, key, value) : subFacts[key] = value;
    }

    return facts;
  };

  var _1f = function (object, key, newClass) {
    var classes = object[key];
    object[key] = classes ? classes + ' ' + newClass : newClass;
  };

  var _20 = function (vNode, eventNode) {
    var tag = vNode.$;

    if (tag === 5) {
      return _20(vNode.k || (vNode.k = vNode.m()), eventNode);
    }

    if (tag === 0) {
      return _2N.createTextNode(vNode.a);
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

      var domNode = _20(subNode, subEventRoot);

      domNode.elm_event_node_ref = subEventRoot;
      return domNode;
    }

    if (tag === 3) {
      var domNode = vNode.h(vNode.g);

      _22(domNode, eventNode, vNode.d);

      return domNode;
    } // at this point `tag` must be 1 or 2


    var domNode = vNode.f ? _2N.createElementNS(vNode.f, vNode.c) : _2N.createElement(vNode.c);

    _22(domNode, eventNode, vNode.d);

    for (var kids = vNode.e, i = 0; i < kids.length; i++) {
      _21(domNode, _20(tag === 1 ? kids[i] : kids[i].b, eventNode));
    }

    return domNode;
  };

  var _22 = function (domNode, eventNode, facts) {
    for (var key in facts) {
      var value = facts[key];
      key === 'a1' ? _2S(domNode, value) : key === 'a0' ? _2R(domNode, eventNode, value) : key === 'a3' ? _2Q(domNode, value) : key === 'a4' ? _2P(domNode, value) : (key !== 'value' || domNode[key] !== value) && (domNode[key] = value);
    }
  };

  var _2S = function (domNode, styles) {
    var domNodeStyle = domNode.style;

    for (var key in styles) {
      domNodeStyle[key] = styles[key];
    }
  };

  var _2Q = function (domNode, attrs) {
    for (var key in attrs) {
      var value = attrs[key];
      value ? domNode.setAttribute(key, value) : domNode.removeAttribute(key);
    }
  };

  var _2P = function (domNode, nsAttrs) {
    for (var key in nsAttrs) {
      var pair = nsAttrs[key];
      var namespace = pair.f;
      var value = pair.o;
      value ? domNode.setAttributeNS(namespace, key, value) : domNode.removeAttributeNS(namespace, key);
    }
  };

  var _2R = function (domNode, eventNode, events) {
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

      oldCallback = _2e(eventNode, newHandler);
      domNode.addEventListener(key, oldCallback, void 0);
      allCallbacks[key] = oldCallback;
    }
  };

  var _2e = function (eventNode, initialHandler) {
    function callback(event) {
      var handler = callback.q;

      var result = _s(handler.a, event);

      if (!_T(result)) {
        return;
      }

      var ok = result.a;

      var timedMsg = _2r(event, _2h(handler), ok);

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

      currentEventNode(message, _2q(timedMsg));
    }

    callback.q = initialHandler;
    return callback;
  };

  var _24 = function (x, y) {
    return x.$ === y.$ && _2T(x.a, y.a);
  };

  var _2r = function (event, tag, value) {
    // 0 = Normal
    // 1 = MayStopPropagation
    // 2 = MayPreventDefault
    // 3 = Custom
    if (!tag) {
      return value;
    }

    if (tag === 1 ? value.b : tag === 3 && value.ae) event.stopPropagation();
    if (tag === 2 ? value.b : tag === 3 && value._) event.preventDefault();
    return tag < 3 ? value.a : value.k;
  };

  var _b = function (x, y) {
    var patches = [];

    _y(x, y, patches, 0);

    return patches;
  };

  var _1V = function (patches, type, index, data) {
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

  var _y = function (x, y, patches, index) {
    if (x === y) {
      return;
    }

    var xType = x.$;
    var yType = y.$; // Bail if you run into different types of nodes. Implies that the
    // structure has changed significantly and it's not worth a diff.

    if (xType !== yType) {
      if (xType === 1 && yType === 2) {
        y = _1W(y);
        yType = 1;
      } else {
        _1V(patches, 0, index, y);

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

        _y(x.k, y.k, subPatches, 0);

        subPatches.length > 0 && _1V(patches, 1, index, subPatches);
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
          _1V(patches, 0, index, y);

          return;
        } // check if taggers are "the same"


        if (nesting ? !_1U(xTaggers, yTaggers) : xTaggers !== yTaggers) {
          _1V(patches, 2, index, yTaggers);
        } // diff everything below the taggers


        _y(xSubNode, ySubNode, patches, index + 1);

        return;

      case 0:
        if (x.a !== y.a) {
          _1V(patches, 3, index, y.a);
        }

        return;

      case 1:
        _1T(x, y, patches, index, _1S);

        return;

      case 2:
        _1T(x, y, patches, index, _1R);

        return;

      case 3:
        if (x.h !== y.h) {
          _1V(patches, 0, index, y);

          return;
        }

        var factsDiff = _1Q(x.d, y.d);

        factsDiff && _1V(patches, 4, index, factsDiff);
        var patch = y.i(x.g, y.g);
        patch && _1V(patches, 5, index, patch);
        return;
    }
  };

  var _1U = function (as, bs) {
    for (var i = 0; i < as.length; i++) {
      if (as[i] !== bs[i]) {
        return false;
      }
    }

    return true;
  };

  var _1T = function (x, y, patches, index, diffKids) {
    // Bail if obvious indicators have changed. Implies more serious
    // structural changes such that it's not worth it to diff.
    if (x.c !== y.c || x.f !== y.f) {
      _1V(patches, 0, index, y);

      return;
    }

    var factsDiff = _1Q(x.d, y.d);

    factsDiff && _1V(patches, 4, index, factsDiff);
    diffKids(x, y, patches, index);
  };

  var _1Q = function (x, y, category) {
    var diff; // look for changes and removals

    for (var xKey in x) {
      if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4') {
        var subDiff = _1Q(x[xKey], y[xKey] || {}, xKey);

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

      if (xValue === yValue && xKey !== 'value' || category === 'a0' && _24(xValue, yValue)) {
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

  var _1S = function (xParent, yParent, patches, index) {
    var xKids = xParent.e;
    var yKids = yParent.e;
    var xLen = xKids.length;
    var yLen = yKids.length; // FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

    if (xLen > yLen) {
      _1V(patches, 6, index, xLen - yLen);
    } else if (xLen < yLen) {
      _1V(patches, 7, index, yKids.slice(xLen));
    } // PAIRWISE DIFF EVERYTHING ELSE


    for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++) {
      var xKid = xKids[i];

      _y(xKid, yKids[i], patches, ++index);

      index += xKid.b || 0;
    }
  };

  var _1R = function (xParent, yParent, patches, rootIndex) {
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

        _y(xNode, yNode, localPatches, index);

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

        _y(xNode, yNextNode, localPatches, index);

        _26(changes, localPatches, xKey, yNode, yIndex, inserts);

        index += xNode.b || 0;
        index++;

        _25(changes, localPatches, xKey, xNextNode, index);

        index += xNextNode.b || 0;
        xIndex += 2;
        yIndex += 2;
        continue;
      } // insert y


      if (newMatch) {
        index++;

        _26(changes, localPatches, yKey, yNode, yIndex, inserts);

        _y(xNode, yNextNode, localPatches, index);

        index += xNode.b || 0;
        xIndex += 1;
        yIndex += 2;
        continue;
      } // remove x


      if (oldMatch) {
        index++;

        _25(changes, localPatches, xKey, xNode, index);

        index += xNode.b || 0;
        index++;

        _y(xNextNode, yNode, localPatches, index);

        index += xNextNode.b || 0;
        xIndex += 2;
        yIndex += 1;
        continue;
      } // remove x, insert y


      if (xNext && xNextKey === yNextKey) {
        index++;

        _25(changes, localPatches, xKey, xNode, index);

        _26(changes, localPatches, yKey, yNode, yIndex, inserts);

        index += xNode.b || 0;
        index++;

        _y(xNextNode, yNextNode, localPatches, index);

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

      _25(changes, localPatches, x.a, xNode, index);

      index += xNode.b || 0;
      xIndex++;
    }

    while (yIndex < yLen) {
      var endInserts = endInserts || [];
      var y = yKids[yIndex];

      _26(changes, localPatches, y.a, y.b, undefined, endInserts);

      yIndex++;
    }

    if (localPatches.length > 0 || inserts.length > 0 || endInserts) {
      _1V(patches, 8, rootIndex, {
        v: localPatches,
        w: inserts,
        x: endInserts
      });
    }
  };

  var _26 = function (changes, localPatches, key, vnode, yIndex, inserts) {
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

      _y(entry.y, vnode, subPatches, entry.r);

      entry.r = yIndex;
      entry.s.s = {
        v: subPatches,
        z: entry
      };
      return;
    } // this key has already been inserted or moved, a duplicate!


    _26(changes, localPatches, key + "_elmW6BL", vnode, yIndex, inserts);
  };

  var _25 = function (changes, localPatches, key, vnode, index) {
    var entry = changes[key]; // never seen this key before

    if (!entry) {
      var patch = _1V(localPatches, 9, index, undefined);

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

      _y(vnode, entry.y, subPatches, index);

      _1V(localPatches, 9, index, {
        v: subPatches,
        z: entry
      });

      return;
    } // this key has already been removed or moved, a duplicate!


    _25(changes, localPatches, key + "_elmW6BL", vnode, index);
  };

  var _x = function (domNode, vNode, patches, eventNode) {
    _1P(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
  };

  var _1P = function (domNode, vNode, patches, i, low, high, eventNode) {
    var patch = patches[i];
    var index = patch.r;

    while (index === low) {
      var patchType = patch.$;

      if (patchType === 1) {
        _x(domNode, vNode.k, patch.s, eventNode);
      } else if (patchType === 8) {
        patch.t = domNode;
        patch.u = eventNode;
        var subPatches = patch.s.v;

        if (subPatches.length > 0) {
          _1P(domNode, vNode, subPatches, 0, low, high, eventNode);
        }
      } else if (patchType === 9) {
        patch.t = domNode;
        patch.u = eventNode;
        var data = patch.s;

        if (data) {
          data.z.s = domNode;
          var subPatches = data.v;

          if (subPatches.length > 0) {
            _1P(domNode, vNode, subPatches, 0, low, high, eventNode);
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

      return _1P(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
    } // tag must be 1 or 2 at this point


    var vKids = vNode.e;
    var childNodes = domNode.childNodes;

    for (var j = 0; j < vKids.length; j++) {
      low++;
      var vKid = tag === 1 ? vKids[j] : vKids[j].b;
      var nextLow = low + (vKid.b || 0);

      if (low <= index && index <= nextLow) {
        i = _1P(childNodes[j], vKid, patches, i, low, nextLow, eventNode);

        if (!(patch = patches[i]) || (index = patch.r) > high) {
          return i;
        }
      }

      low = nextLow;
    }

    return i;
  };

  var _a = function (rootDomNode, oldVirtualNode, patches, eventNode) {
    if (patches.length === 0) {
      return rootDomNode;
    }

    _x(rootDomNode, oldVirtualNode, patches, eventNode);

    return _w(rootDomNode, patches);
  };

  var _w = function (rootDomNode, patches) {
    for (var i = 0; i < patches.length; i++) {
      var patch = patches[i];
      var localDomNode = patch.t;

      var newNode = _1O(localDomNode, patch);

      if (localDomNode === rootDomNode) {
        rootDomNode = newNode;
      }
    }

    return rootDomNode;
  };

  var _1O = function (domNode, patch) {
    switch (patch.$) {
      case 0:
        return _23(domNode, patch.s, patch.u);

      case 4:
        _22(domNode, patch.u, patch.s);

        return domNode;

      case 3:
        domNode.replaceData(0, domNode.length, patch.s);
        return domNode;

      case 1:
        return _w(domNode, patch.s);

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
          _21(domNode, _20(newNodes[i], patch.u));
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

        entry.s = _w(domNode, data.v);
        return domNode;

      case 8:
        return _1z(domNode, patch);

      case 5:
        return patch.s(domNode);

      default:
        _U(10);

      // 'Ran into an unknown patch!'
    }
  };

  var _23 = function (domNode, vNode, eventNode) {
    var parentNode = domNode.parentNode;

    var newNode = _20(vNode, eventNode);

    if (!newNode.elm_event_node_ref) {
      newNode.elm_event_node_ref = domNode.elm_event_node_ref;
    }

    if (parentNode && newNode !== domNode) {
      parentNode.replaceChild(newNode, domNode);
    }

    return newNode;
  };

  var _1z = function (domNode, patch) {
    var data = patch.s; // remove end inserts

    var frag = _2O(data.x, patch); // removals


    domNode = _w(domNode, data.v); // inserts

    var inserts = data.w;

    for (var i = 0; i < inserts.length; i++) {
      var insert = inserts[i];
      var entry = insert.z;
      var node = entry.c === 2 ? entry.s : _20(entry.y, patch.u);
      domNode.insertBefore(node, domNode.childNodes[insert.r]);
    } // add end inserts


    if (frag) {
      _21(domNode, frag);
    }

    return domNode;
  };

  var _2O = function (endInserts, patch) {
    if (!endInserts) {
      return;
    }

    var frag = _2N.createDocumentFragment();

    for (var i = 0; i < endInserts.length; i++) {
      var insert = endInserts[i];
      var entry = insert.z;

      _21(frag, entry.c === 2 ? entry.s : _20(entry.y, patch.u));
    }

    return frag;
  };

  var _d = function (node) {
    // TEXT NODES
    if (node.nodeType === 3) {
      return _j(node.textContent);
    } // WEIRD NODES


    if (node.nodeType !== 1) {
      return _j('');
    } // ELEMENT NODES


    var attrList = _J;
    var attrs = node.attributes;

    for (var i = attrs.length; i--;) {
      var attr = attrs[i];
      var name = attr.name;
      var value = attr.value;
      attrList = _10(_Q(_13, name, value), attrList);
    }

    var tag = node.tagName.toLowerCase();
    var kidList = _J;
    var kids = node.childNodes;

    for (var i = kids.length; i--;) {
      kidList = _10(_d(kids[i]), kidList);
    }

    return _z(_12, tag, attrList, kidList);
  };

  var _1W = function (keyedNode) {
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

  var _E = function (domNode, view) {
    return function (sendToApp, initialModel) {
      var currNode = _d(domNode);

      return _c(initialModel, function (model) {
        var nextNode = view(model);

        var patches = _b(currNode, nextNode);

        domNode = _a(domNode, currNode, patches, sendToApp);
        currNode = nextNode;
      });
    };
  };

  var _c = function (model, draw) {
    draw(model);
    var state = 0;

    function updateIfNeeded() {
      state = state === 1 ? 0 : (_11(updateIfNeeded), draw(model), 1);
    }

    return function (nextModel, isSync) {
      model = nextModel;
      isSync ? (draw(model), state === 2 && (state = 1)) : (state === 0 && _11(updateIfNeeded), state = 2);
    };
  };

  var _2m = function (size, offset, func) {
    var result = new Array(size);

    for (var i = 0; i < size; i++) {
      result[i] = func(offset + i);
    }

    return result;
  };

  var _3H = function (max, ls) {
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++) {
      result[i] = ls.a;
      ls = ls.b;
    }

    result.length = i;
    return _Z(result, ls);
  };

  var _2L = function (f, d1) {
    return _2c(f, [d1]);
  };

  var _R = function (decoder, value) {
    return _s(decoder, _1C(value));
  };

  var _1i = function (callback, task) {
    return {
      $: 3,
      b: callback,
      d: task
    };
  };

  var _1d = function (namespace, tag) {
    return _27(function (factList, kidList) {
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
        d: _1B(factList),
        e: kids,
        f: namespace,
        b: descendantsCount
      };
    });
  };

  var _12 = function (b) {
    return _1d(void 0, b);
  };

  var _2K = function (key, handler) {
    return {
      $: 'a0',
      n: key,
      o: handler
    };
  };

  var _1G = function (key, value) {
    return {
      $: 'a3',
      n: key,
      o: value
    };
  };

  var _11 = function (callback) {
    setTimeout(callback, 1000 / 60);
  };

  var _16 = function (msg, model) {
    if (!msg) {
      return _1X(model, {
        n: model.n + 1
      });
    } else {
      return _1X(model, {
        n: model.n - 1
      });
    }
  };

  var _T = function (result) {
    if (!result.$) {
      return true;
    } else {
      return false;
    }
  };

  var _2w = function (a, b, c, d) {
    return {
      $: 0,
      a: a,
      b: b,
      c: c,
      d: d
    };
  };

  var _2u = function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return _2w(a, b, c, d);
        };
      };
    };
  };

  var _38 = function (base, number) {
    return _3B(number) / _3B(base);
  };

  var _2t = function (a) {
    return {
      $: 1,
      a: a
    };
  };

  var _3I = function (a) {
    return {
      $: 0,
      a: a
    };
  };

  var _2V = function (func, acc, list) {
    foldl: while (true) {
      if (!list.b) {
        return acc;
      } else {
        var x = list.a;
        var xs = list.b;

        var $temp$func = func,
            $temp$acc = _Q(func, x, acc),
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

  var _2I = function (a) {
    return $_2.call(this, _2V, a);
  };

  var _2k = function (a) {
    return $_2.call(this, _2m, a);
  };

  var _1r = function (list) {
    return _z(_2I, _2G, _J, list);
  };

  var _3G = function (nodes, acc) {
    compressNodes: while (true) {
      var _n0 = _Q(_3C, 32, nodes);

      var node = _n0.a;
      var remainingNodes = _n0.b;

      var newAcc = _Q(_2G, _3I(node), acc);

      if (!remainingNodes.b) {
        return _1r(newAcc);
      } else {
        var $temp$nodes = remainingNodes,
            $temp$acc = newAcc;
        nodes = $temp$nodes;
        acc = $temp$acc;
        continue compressNodes;
      }
    }
  };

  var _37 = function (nodeList, nodeListSize) {
    treeFromBuilder: while (true) {
      var newNodeSize = _3A(nodeListSize / 32);

      if (newNodeSize === 1) {
        return _Q(_3C, 32, nodeList).a;
      } else {
        var $temp$nodeList = _Q(_3E, nodeList, _J),
            $temp$nodeListSize = newNodeSize;

        nodeList = $temp$nodeList;
        nodeListSize = $temp$nodeListSize;
        continue treeFromBuilder;
      }
    }
  };

  var _36 = function (x, y) {
    return _39(x, y) > 0 ? x : y;
  };

  var _2s = function (reverseNodeList, builder) {
    if (!builder.a) {
      return _1J(_2u, _2x(builder.c), 5, _2b, builder.c);
    } else {
      var treeLen = builder.a * 32;

      var depth = _2z(_Q(_30, 32, treeLen - 1));

      var correctNodeList = reverseNodeList ? _1r(builder.d) : builder.d;

      var tree = _Q(_32, correctNodeList, builder.a);

      return _1J(_2u, _2x(builder.c) + treeLen, _Q(_34, 5, depth * 5), tree, builder.c);
    }
  };

  var _2n = function (fn, fromIndex, len, nodeList, tail) {
    initializeHelp: while (true) {
      if (fromIndex < 0) {
        return _Q(_2o, false, {
          d: nodeList,
          a: len / 32 | 0,
          c: tail
        });
      } else {
        var leaf = _2t(_z(_2k, 32, fromIndex, fn));

        var $temp$fn = fn,
            $temp$fromIndex = fromIndex - 32,
            $temp$len = len,
            $temp$nodeList = _Q(_2G, leaf, nodeList),
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

  var _2i = function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return _2n(a, b, c, d, e);
          };
        };
      };
    };
  };

  var _2W = function (len, fn) {
    if (len <= 0) {
      return _2X;
    } else {
      var tailLen = len % 32;

      var tail = _z(_2k, tailLen, len - tailLen, fn);

      var initialFromIndex = len - tailLen - 32;
      return _2g(_2i, fn, initialFromIndex, len, _J, tail);
    }
  };

  var _1m = function (a) {
    return {
      $: 1,
      a: a
    };
  };

  var _1Y = function (a) {
    return {
      $: 0,
      a: a
    };
  };

  var _1v = function (a, b) {
    return {
      $: 3,
      a: a,
      b: b
    };
  };

  var _1x = function (a, b) {
    return {
      $: 0,
      a: a,
      b: b
    };
  };

  var _1w = function (a, b) {
    return {
      $: 1,
      a: a,
      b: b
    };
  };

  var _1s = function (a) {
    return {
      $: 2,
      a: a
    };
  };

  var _2q = function (timed) {
    if (!timed.$) {
      return true;
    } else {
      return false;
    }
  };

  var _2h = function (handler) {
    switch (handler.$) {
      case 0:
        return 0;

      case 1:
        return 1;

      case 2:
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
      d: _1B(factList),
      e: kids,
      f: void 0,
      b: descendantsCount
    };
  };

  var _2B = function (a) {
    return {
      $: 0,
      a: a
    };
  };

  var _28 = function (a) {
    return {
      $: 0,
      a: a
    };
  };

  var _1e = function (event, decoder) {
    return _Q(_2C, event, _2B(_Q(_29, _28, decoder)));
  };

  var _g = function (msg) {
    return _Q(_19, 'click', _1b(msg));
  };

  var _8 = function (model) {
    return _Q(_X, _J, _p([_Q(_l, _J, _p([_j('0.19')])), _Q(_h, _p([_g(0)]), _p([_j('+1')])), _Q(_X, _J, _p([_j(_e(model.n))])), _Q(_h, _p([_g(1)]), _p([_j('-1')]))]));
  };

  var _D = function (_n1) {
    return _Z(_F, _H);
  };

  var _C = function (_n2) {
    return _L;
  };

  var _N = function (msg, model) {
    return _Z(_Q(_n, msg, model), _H);
  };

  var $_0 = function (fun, a) {
    return function (b) {
      return fun(a, b);
    };
  };

  var _A = function (a) {
    return $_0.call(this, _N, a);
  };

  var _O = function (a) {
    return $_0.call(this, _R, a);
  };

  var _X = function (a) {
    return $_0.call(this, _q, a);
  };

  var _h = function (a) {
    return $_0.call(this, _18, a);
  };

  var _l = function (a) {
    return $_0.call(this, _17, a);
  };

  var _n = function (a) {
    return $_0.call(this, _16, a);
  };

  var _13 = function (a) {
    return $_0.call(this, _1G, a);
  };

  var _19 = function (a) {
    return $_0.call(this, _1e, a);
  };

  var _1Z = function (a) {
    return $_0.call(this, _1i, a);
  };

  var _1n = function (a) {
    return $_0.call(this, _1x, a);
  };

  var _1p = function (a) {
    return $_0.call(this, _1w, a);
  };

  var _1t = function (a) {
    return $_0.call(this, _1v, a);
  };

  var _29 = function (a) {
    return $_0.call(this, _2L, a);
  };

  var _2C = function (a) {
    return $_0.call(this, _2K, a);
  };

  var _2E = function (a) {
    return $_0.call(this, _2W, a);
  };

  var _2G = function (a) {
    return $_0.call(this, _10, a);
  };

  var _2o = function (a) {
    return $_0.call(this, _2s, a);
  };

  var _30 = function (a) {
    return $_0.call(this, _38, a);
  };

  var _32 = function (a) {
    return $_0.call(this, _37, a);
  };

  var _34 = function (a) {
    return $_0.call(this, _36, a);
  };

  var _3C = function (a) {
    return $_0.call(this, _3H, a);
  };

  var _3E = function (a) {
    return $_0.call(this, _3G, a);
  };

  var _2 = function (node, flags) {
    return _7(_3, flags, _6.ao, _6.av, _6.H, _E(node, _6.aw));
  };

  _1t.a = 2;
  _1t.f = _1v;
  _1p.a = 2;
  _1p.f = _1w;
  var _J = {
    $: 0
  };
  var _2b = [];
  var _2X = {
    $: 0,
    a: 0,
    b: 5,
    c: _2b,
    d: _2b
  };
  _2k.a = 3;
  _2k.f = _2m;
  _2u.a = 4;
  _2u.f = _2w;
  $$0.value = "_JsArray_length", _$2(_2x, "name", $$0);
  var _2z = _$4;
  var _3B = _$5;
  _30.a = 2;
  _30.f = _38;
  _2I.a = 3;
  _2I.f = _2V;
  _2G.a = 2;
  _2G.f = _10;
  var _3A = _$6;
  _3C.a = 2;
  _3C.f = _3H;
  _3E.a = 2;
  _3E.f = _3G;
  _32.a = 2;
  _32.f = _37;
  _34.a = 2;
  _34.f = _36;
  _2o.a = 2;
  _2o.f = _2s;
  _2i.a = 5;
  _2i.f = _2n;
  _2E.a = 2;
  _2E.f = _2W;
  _1n.a = 2;
  _1n.f = _1x;
  _O.a = 2;
  _O.f = _R;
  var _r = {};
  _1Z.a = 2;
  _1Z.f = _1i;
  var _1j = [];
  var _3 = {
    $: 0,
    a: 0
  };
  var _F = {
    n: 0
  };
  var _H = {
    $: 2,
    m: _J
  };
  var _L = {
    $: 2,
    m: _J
  };
  _n.a = 2;
  _n.f = _16;
  _A.a = 2;
  _A.f = _N;

  var _q = $_1.bind(null, "div");

  _X.a = 2;
  _X.f = _q;

  var _17 = $_1.bind(null, "h1");

  _l.a = 2;
  _l.f = _17;
  $$0.value = "_VirtualDom_text", _$2(_j, "name", $$0);

  var _18 = $_1.bind(null, "button");

  _h.a = 2;
  _h.f = _18;
  _2C.a = 2;
  _2C.f = _2K;
  _29.a = 2;
  _29.f = _2L;
  _19.a = 2;
  _19.f = _1e;
  $$0.value = "_Json_succeed", _$2(_1b, "name", $$0);
  $$0.value = "_String_fromNumber", _$2(_e, "name", $$0);
  $$0.value = "author$project$Main$view", _$2(_8, "name", $$0);
  var _6 = {
    ao: _D,
    H: _C,
    av: _A,
    aw: _8
  };
  _13.a = 2;
  _13.f = _1G;
  var _2N = document;
  _$0.Elm = {
    Main: {
      embed: _2
    }
  };
}).call(this);
