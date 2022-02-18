var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop3 in b || (b = {}))
    if (__hasOwnProp.call(b, prop3))
      __defNormalProp(a, prop3, b[prop3]);
  if (__getOwnPropSymbols)
    for (var prop3 of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop3))
        __defNormalProp(a, prop3, b[prop3]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function makeMap(str, expectsLowerCase) {
  const map3 = Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map3[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map3[val.toLowerCase()] : (val) => !!map3[val];
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString$1(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$1(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$1(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function looseCompareArrays(a, b) {
  if (a.length !== b.length)
    return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}
function looseEqual(a, b) {
  if (a === b)
    return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isArray(a);
  bValidType = isArray(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = isObject$1(a);
  bValidType = isObject$1(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}
const toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate = (val) => val instanceof Date;
const isFunction = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise$1 = (val) => {
  return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString$1(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
const cacheStringFunction = (fn2) => {
  const cache = Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn2(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
let activeEffectScope;
const effectScopeStack = [];
class EffectScope {
  constructor(detached = false) {
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn2) {
    if (this.active) {
      try {
        this.on();
        return fn2();
      } finally {
        this.off();
      }
    }
  }
  on() {
    if (this.active) {
      effectScopeStack.push(this);
      activeEffectScope = this;
    }
  }
  off() {
    if (this.active) {
      effectScopeStack.pop();
      activeEffectScope = effectScopeStack[effectScopeStack.length - 1];
    }
  }
  stop(fromParent) {
    if (this.active) {
      this.effects.forEach((e) => e.stop());
      this.cleanups.forEach((cleanup) => cleanup());
      if (this.scopes) {
        this.scopes.forEach((e) => e.stop(true));
      }
      if (this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.active = false;
    }
  }
}
function recordEffectScope(effect2, scope) {
  scope = scope || activeEffectScope;
  if (scope && scope.active) {
    scope.effects.push(effect2);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect2) => {
  const { deps } = effect2;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect2);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
const effectStack = [];
let activeEffect;
const ITERATE_KEY = Symbol("");
const MAP_KEY_ITERATE_KEY = Symbol("");
class ReactiveEffect {
  constructor(fn2, scheduler = null, scope) {
    this.fn = fn2;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    if (!effectStack.length || !effectStack.includes(this)) {
      try {
        effectStack.push(activeEffect = this);
        enableTracking();
        trackOpBit = 1 << ++effectTrackDepth;
        if (effectTrackDepth <= maxMarkerBits) {
          initDepMarkers(this);
        } else {
          cleanupEffect(this);
        }
        return this.fn();
      } finally {
        if (effectTrackDepth <= maxMarkerBits) {
          finalizeDepMarkers(this);
        }
        trackOpBit = 1 << --effectTrackDepth;
        resetTracking();
        effectStack.pop();
        const n = effectStack.length;
        activeEffect = n > 0 ? effectStack[n - 1] : void 0;
      }
    }
  }
  stop() {
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect2) {
  const { deps } = effect2;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect2);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type3, key) {
  if (!isTracking()) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, depsMap = new Map());
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, dep = createDep());
  }
  trackEffects(dep);
}
function isTracking() {
  return shouldTrack && activeEffect !== void 0;
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function trigger$1(target, type3, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type3 === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type3) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  for (const effect2 of isArray(dep) ? dep : [...dep]) {
    if (effect2 !== activeEffect || effect2.allowRecurse) {
      if (effect2.scheduler) {
        effect2.scheduler();
      } else {
        effect2.run();
      }
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get3(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$2 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set3(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue)) {
      return false;
    }
    if (!shallow && !isReadonly(value)) {
      if (!isShallow(value)) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger$1(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger$1(target, "set", key, value);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger$1(target, "delete", key, void 0);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set: set$2,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    return true;
  },
  deleteProperty(target, key) {
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "get", key);
  }
  !isReadonly2 && track(rawTarget, "get", rawKey);
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "has", key);
  }
  !isReadonly2 && track(rawTarget, "has", rawKey);
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger$1(target, "add", value, value);
  }
  return this;
}
function set$1$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get3 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  const oldValue = get3.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger$1(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger$1(target, "set", key, value);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get3 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  get3 ? get3.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger$1(target, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result = target.clear();
  if (hadItems) {
    trigger$1(target, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type3) {
  return function(...args) {
    return type3 === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const reactiveMap = new WeakMap();
const shallowReactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
const shallowReadonlyMap = new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (isTracking()) {
    ref2 = toRaw(ref2);
    if (!ref2.dep) {
      ref2.dep = createDep();
    }
    {
      trackEffects(ref2.dep);
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    {
      triggerEffects(ref2.dep);
    }
  }
}
function isRef(r) {
  return Boolean(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    newVal = this.__v_isShallow ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = this.__v_isShallow ? newVal : toReactive(newVal);
      triggerRefValue(this);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
function toRefs(object) {
  const ret = isArray(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = toRef(object, key);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
}
function toRef(object, key, defaultValue) {
  const val = object[key];
  return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  return cRef;
}
Promise.resolve();
function callWithErrorHandling(fn2, instance, type3, args) {
  let res;
  try {
    res = args ? fn2(...args) : fn2();
  } catch (err) {
    handleError(err, instance, type3);
  }
  return res;
}
function callWithAsyncErrorHandling(fn2, instance, type3, args) {
  if (isFunction(fn2)) {
    const res = callWithErrorHandling(fn2, instance, type3, args);
    if (res && isPromise$1(res)) {
      res.catch((err) => {
        handleError(err, instance, type3);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn2.length; i++) {
    values.push(callWithAsyncErrorHandling(fn2[i], instance, type3, args));
  }
  return values;
}
function handleError(err, instance, type3, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type3;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type3, contextVNode, throwInDev);
}
function logError(err, type3, contextVNode, throwInDev = true) {
  {
    console.error(err);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
function nextTick(fn2) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn2 ? p2.then(this ? fn2.bind(this) : fn2) : p2;
}
function findInsertionIndex(id) {
  let start2 = flushIndex + 1;
  let end2 = queue.length;
  while (start2 < end2) {
    const middle = start2 + end2 >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start2 = middle + 1 : end2 = middle;
  }
  return start2;
}
function queueJob(job) {
  if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queueCb(cb, activeQueue, pendingQueue, index) {
  if (!isArray(cb)) {
    if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index + 1 : index)) {
      pendingQueue.push(cb);
    }
  } else {
    pendingQueue.push(...cb);
  }
  queueFlush();
}
function queuePreFlushCb(cb) {
  queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen, parentJob = null) {
  if (pendingPreFlushCbs.length) {
    currentPreFlushParentJob = parentJob;
    activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
    pendingPreFlushCbs.length = 0;
    for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
      activePreFlushCbs[preFlushIndex]();
    }
    activePreFlushCbs = null;
    preFlushIndex = 0;
    currentPreFlushParentJob = null;
    flushPreFlushCbs(seen, parentJob);
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  flushPreFlushCbs(seen);
  queue.sort((a, b) => getId(a) - getId(b));
  const check = NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (false)
          ;
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function emit$1(instance, event, ...rawArgs) {
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => a.trim());
    } else if (number) {
      args = rawArgs.map(toNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, null);
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  cache.set(comp, normalized);
  return normalized;
}
function isEmitListener(options2, key) {
  if (!options2 || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options2, key[0].toLowerCase() + key.slice(1)) || hasOwn(options2, hyphenate(key)) || hasOwn(options2, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function pushScopeId(id) {
  currentScopeId = id;
}
function popScopeId() {
  currentScopeId = null;
}
function withCtx(fn2, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn2;
  if (fn2._n) {
    return fn2;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    const res = fn2(...args);
    setCurrentRenderingInstance(prevInstance);
    if (renderFnWithContext._d) {
      setBlockTracking(1);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit, render, renderCache, data, setupState, ctx, inheritAttrs } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false)
        ;
      result = normalizeVNode(render2.length > 1 ? render2(props, false ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit
      } : { attrs, slots, emit }) : render2(props, null));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys4 = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys4.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys4.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        }
        root = cloneVNode(root, fallthroughAttrs);
      }
    }
  }
  if (vnode.dirs) {
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    root.transition = vnode.transition;
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense = (type3) => type3.__isSuspense;
function queueEffectWithSuspense(fn2, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn2)) {
      suspense.effects.push(...fn2);
    } else {
      suspense.effects.push(fn2);
    }
  } else {
    queuePostFlushCb(fn2);
  }
}
function provide(key, value) {
  if (!currentInstance)
    ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else
      ;
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options2) {
  return doWatch(source, cb, options2);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some(isReactive);
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else
        ;
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn2) => {
    cleanup = effect2.onStop = () => {
      callWithErrorHandling(fn2, instance, 4);
    };
  };
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    return NOOP;
  }
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect2.active) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect2.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job);
      } else {
        job();
      }
    };
  }
  const effect2 = new ReactiveEffect(getter, scheduler);
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect2.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect2.run.bind(effect2), instance && instance.suspense);
  } else {
    effect2.run();
  }
  return () => {
    effect2.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect2);
    }
  };
}
function instanceWatch(source, value, options2) {
  const publicThis = this.proxy;
  const getter = isString$1(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options2 = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options2);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path3) {
  const segments = path3.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
function defineComponent(options2) {
  return isFunction(options2) ? { setup: options2, name: options2.name } : options2;
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type3, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type3, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type3, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type3, target, keepAliveRoot) {
  const injected = injectHook(type3, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove(keepAliveRoot[type3], injected);
  }, target);
}
function injectHook(type3, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type3] || (target[type3] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type3, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, hook, target);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options2 = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options2.beforeCreate) {
    callHook(options2.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components,
    directives,
    filters
  } = options2;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject$1(data))
      ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get3 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set3 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get: get3,
        set: set3
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register2, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register2(_hook.bind(publicThis)));
    } else if (hook) {
      register2(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key, opt.default, true);
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook(hook, instance, type3) {
  callWithAsyncErrorHandling(isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type3);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString$1(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else
    ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions$1(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions$1(resolved, base, optionMergeStrategies);
  }
  cache.set(base, resolved);
  return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions$1(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions$1(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose")
      ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options2] = instance.propsOptions;
  let hasAttrsChanged = false;
  if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        const value = rawProps[key];
        if (options2) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(options2, rawCurrentProps, camelizedKey, value, instance, false);
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options2) {
          if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(options2, rawCurrentProps, key, void 0, instance, true);
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger$1(instance, "set", "$attrs");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options2, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options2 && hasOwn(options2, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options2, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options2, props, key, value, instance, isAbsent) {
  const opt = options2[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys4] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys4)
        needCastKeys.push(...keys4);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, EMPTY_ARR);
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop3 = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : opt;
        if (prop3) {
          const booleanIndex = getTypeIndex(Boolean, prop3.type);
          const stringIndex = getTypeIndex(String, prop3.type);
          prop3[0] = booleanIndex > -1;
          prop3[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop3, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  cache.set(comp, res);
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  }
  return false;
}
function getType(ctor) {
  const match3 = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match3 ? match3[1] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type3, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type3));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type3) ? 0 : -1;
  }
  return -1;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot$1 = (key, rawSlot, ctx) => {
  const normalized = withCtx((...args) => {
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot$1(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type3 = children._;
    if (type3) {
      instance.slots = toRaw(children);
      def(children, "_", type3);
    } else {
      normalizeObjectSlots(children, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type3 = children._;
    if (type3) {
      if (optimized && type3 === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type3 === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
    return vnode;
  }
  const instance = internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (isFunction(dir)) {
      dir = {
        mounted: dir,
        updated: dir
      };
    }
    if (dir.deep) {
      traverse(value);
    }
    bindings.push({
      dir,
      instance,
      value,
      oldValue: void 0,
      arg,
      modifiers
    });
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  };
}
let uid = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (rootProps != null && !isObject$1(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = new Set();
    let isMounted = false;
    const app = context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options2) {
        if (installedPlugins.has(plugin))
          ;
        else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options2);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options2);
        } else
          ;
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString$1(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString2 = isString$1(ref2);
    const _isRef = isRef(ref2);
    if (_isString2 || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString2 ? refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray(existing) && remove(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString2) {
                refs[ref2] = [refValue];
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString2) {
          refs[ref2] = value;
          if (hasOwn(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (isRef(ref2)) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else
          ;
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options2) {
  return baseCreateRenderer(options2);
}
function baseCreateRenderer(options2, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, cloneNode: hostCloneNode, insertStaticContent: hostInsertStaticContent } = options2;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type: type3, ref: ref2, shapeFlag } = n2;
    switch (type3) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        }
        break;
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 64) {
          type3.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128) {
          type3.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else
          ;
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type: type3, props, shapeFlag, transition, patchFlag, dirs } = vnode;
    if (vnode.el && hostCloneNode !== void 0 && patchFlag === -1) {
      el = vnode.el = hostCloneNode(vnode.el);
    } else {
      el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type3 !== "foreignObject", slotScopeIds, optimized);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      if (props) {
        for (const key in props) {
          if (key !== "value" && !isReservedProp(key)) {
            hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if ("value" in props) {
          hostPatchProp(el, "value", null, props.value);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start2 = 0) => {
    for (let i = start2; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
        if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
          traverseStaticChildren(n1, n2, true);
        }
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.component = n1.component;
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot(instance);
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(() => !instance.isUnmounted && hydrateSubTree());
          } else {
            hydrateSubTree();
          }
        } else {
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, isSVG);
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
        }
      }
    };
    const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn, () => queueJob(instance.update), instance.scope);
    const update3 = instance.update = effect2.run.bind(effect2);
    update3.id = instance.uid;
    toggleRecurse(instance, true);
    update3();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(void 0, instance.update);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type: type3, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type3.move(vnode, container, anchor, internals);
      return;
    }
    if (type3 === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type3 === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove3 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove3();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove3, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const { type: type3, props, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && (type3 !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type3 === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type: type3, el, anchor, transition } = vnode;
    if (type3 === Fragment) {
      removeFragment(el, anchor);
      return;
    }
    if (type3 === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end2) => {
    let next;
    while (cur !== end2) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end2);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, update: update3, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update3) {
      update3.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start2 = 0) => {
    for (let i = start2; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options2
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function toggleRecurse({ effect: effect2, update: update3 }, allowed) {
  effect2.allowRecurse = update3.allowRecurse = allowed;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
const isTeleport = (type3) => type3.__isTeleport;
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol();
function resolveAsset(type3, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type3 === COMPONENTS) {
      const selfName = getComponentName(Component);
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = resolve(instance[type3] || Component[type3], name) || resolve(instance.appContext[type3], name);
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const Fragment = Symbol(void 0);
const Text = Symbol(void 0);
const Comment = Symbol(void 0);
const Static = Symbol(void 0);
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type3, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(createBaseVNode(type3, props, children, patchFlag, dynamicProps, shapeFlag, true));
}
function createBlock(type3, props, children, patchFlag, dynamicProps) {
  return setupBlock(createVNode(type3, props, children, patchFlag, dynamicProps, true));
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref: ref2, ref_key, ref_for }) => {
  return ref2 != null ? isString$1(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type3, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type3 === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type: type3,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type3.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString$1(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type3, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type3 || type3 === NULL_DYNAMIC_COMPONENT) {
    type3 = Comment;
  }
  if (isVNode(type3)) {
    const cloned = cloneVNode(type3, props, true);
    if (children) {
      normalizeChildren(cloned, children);
    }
    return cloned;
  }
  if (isClassComponent(type3)) {
    type3 = type3.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString$1(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject$1(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString$1(type3) ? 1 : isSuspense(type3) ? 128 : isTeleport(type3) ? 64 : isObject$1(type3) ? 4 : isFunction(type3) ? 2 : 0;
  return createBaseVNode(type3, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor
  };
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(Fragment, null, child.slice());
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type3 = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type3 = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type3 = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type3 = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type3 = 16;
      children = [createTextVNode(children)];
    } else {
      type3 = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type3;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache && cache[index];
  if (isArray(source) || isString$1(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
    } else {
      const keys4 = Object.keys(source);
      ret = new Array(keys4.length);
      for (let i = 0, l = keys4.length; i < l; i++) {
        const key = keys4[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index] = ret;
  }
  return ret;
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE) {
    return createVNode("slot", name === "default" ? null : { name }, fallback && fallback());
  }
  let slot = slots[name];
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(Fragment, { key: props.key || `_${name}` }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 ? 64 : -2);
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = extend(Object.create(null), {
  $: (i) => i,
  $el: (i) => i.vnode.el,
  $data: (i) => i.data,
  $props: (i) => i.props,
  $attrs: (i) => i.attrs,
  $slots: (i) => i.slots,
  $refs: (i) => i.refs,
  $parent: (i) => getPublicInstance(i.parent),
  $root: (i) => getPublicInstance(i.root),
  $emit: (i) => i.emit,
  $options: (i) => resolveMergedOptions(i),
  $forceUpdate: (i) => () => queueJob(i.update),
  $nextTick: (i) => nextTick.bind(i.proxy),
  $watch: (i) => instanceWatch.bind(i)
});
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type: type3, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if ((cssModule = type3.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else
      ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
      setupState[key] = value;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || setupState !== EMPTY_OBJ && hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  }
};
const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type3 = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1++,
    vnode,
    type: type3,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type3, appContext),
    emitsOptions: normalizeEmitsOptions(type3, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type3.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise$1(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else
    ;
  finishComponentSetup(instance, isSSR);
}
let compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template;
      if (template) {
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(extend({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
}
function createAttrsProxy(instance) {
  return new Proxy(instance.attrs, {
    get(target, key) {
      track(instance, "get", "$attrs");
      return target[key];
    }
  });
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return {
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      }
    }));
  }
}
function getComponentName(Component) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
function h(type3, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject$1(propsOrChildren) && !isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type3, null, [propsOrChildren]);
      }
      return createVNode(type3, propsOrChildren);
    } else {
      return createVNode(type3, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type3, propsOrChildren, children);
  }
}
const version = "3.2.28";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  cloneNode(el) {
    const cloned = el.cloneNode(true);
    if (`_value` in el) {
      cloned._value = el._value;
    }
    return cloned;
  },
  insertStaticContent(content, parent, anchor, isSVG, start2, end2) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start2 && end2) {
      while (true) {
        parent.insertBefore(start2.cloneNode(true), anchor);
        if (start2 === end2 || !(start2 = start2.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      before ? before.nextSibling : parent.firstChild,
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString$1(next);
  if (next && !isCssString) {
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
    if (prev && !isString$1(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean2 = isSpecialBooleanAttr(key);
    if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean2 ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  if (key === "value" && el.tagName !== "PROGRESS" && !el.tagName.includes("-")) {
    el._value = value;
    const newValue = value == null ? "" : value;
    if (el.value !== newValue || el.tagName === "OPTION") {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  if (value === "" || value == null) {
    const type3 = typeof el[key];
    if (type3 === "boolean") {
      el[key] = includeBooleanAttr(value);
      return;
    } else if (value == null && type3 === "string") {
      el[key] = "";
      el.removeAttribute(key);
      return;
    } else if (type3 === "number") {
      try {
        el[key] = 0;
      } catch (_a) {
      }
      el.removeAttribute(key);
      return;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
}
let _getNow = Date.now;
let skipTimestampCheck = false;
if (typeof window !== "undefined") {
  if (_getNow() > document.createEvent("Event").timeStamp) {
    _getNow = () => performance.now();
  }
  const ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
  skipTimestampCheck = !!(ffMatch && Number(ffMatch[1]) <= 53);
}
let cachedNow = 0;
const p = Promise.resolve();
const reset = () => {
  cachedNow = 0;
};
const getNow = () => cachedNow || (p.then(reset), cachedNow = _getNow());
function addEventListener(el, event, handler, options2) {
  el.addEventListener(event, handler, options2);
}
function removeEventListener(el, event, handler, options2) {
  el.removeEventListener(event, handler, options2);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options2] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options2);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options2);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options2;
  if (optionsModifierRE.test(name)) {
    options2 = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options2[m[0].toLowerCase()] = true;
    }
  }
  return [hyphenate(name.slice(2)), options2];
}
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    const timeStamp = e.timeStamp || _getNow();
    if (skipTimestampCheck || timeStamp >= invoker.attached - 1) {
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
    }
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn2) => (e2) => !e2._stopped && fn2 && fn2(e2));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString$1(value)) {
    return false;
  }
  return key in el;
}
const getModelAssigner = (vnode) => {
  const fn2 = vnode.props["onUpdate:modelValue"];
  return isArray(fn2) ? (value) => invokeArrayFns(fn2, value) : fn2;
};
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  const target = e.target;
  if (target.composing) {
    target.composing = false;
    trigger(target, "input");
  }
}
function trigger(el, type3) {
  const e = document.createEvent("HTMLEvents");
  e.initEvent(type3, true, true);
  el.dispatchEvent(e);
}
const vModelText = {
  created(el, { modifiers: { lazy, trim, number } }, vnode) {
    el._assign = getModelAssigner(vnode);
    const castToNumber = number || vnode.props && vnode.props.type === "number";
    addEventListener(el, lazy ? "change" : "input", (e) => {
      if (e.target.composing)
        return;
      let domValue = el.value;
      if (trim) {
        domValue = domValue.trim();
      } else if (castToNumber) {
        domValue = toNumber(domValue);
      }
      el._assign(domValue);
    });
    if (trim) {
      addEventListener(el, "change", () => {
        el.value = el.value.trim();
      });
    }
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, modifiers: { lazy, trim, number } }, vnode) {
    el._assign = getModelAssigner(vnode);
    if (el.composing)
      return;
    if (document.activeElement === el) {
      if (lazy) {
        return;
      }
      if (trim && el.value.trim() === value) {
        return;
      }
      if ((number || el.type === "number") && toNumber(el.value) === value) {
        return;
      }
    }
    const newValue = value == null ? "" : value;
    if (el.value !== newValue) {
      el.value = newValue;
    }
  }
};
const vModelSelect = {
  deep: true,
  created(el, { value, modifiers: { number } }, vnode) {
    const isSetModel = isSet(value);
    addEventListener(el, "change", () => {
      const selectedVal = Array.prototype.filter.call(el.options, (o) => o.selected).map((o) => number ? toNumber(getValue(o)) : getValue(o));
      el._assign(el.multiple ? isSetModel ? new Set(selectedVal) : selectedVal : selectedVal[0]);
    });
    el._assign = getModelAssigner(vnode);
  },
  mounted(el, { value }) {
    setSelected(el, value);
  },
  beforeUpdate(el, _binding, vnode) {
    el._assign = getModelAssigner(vnode);
  },
  updated(el, { value }) {
    setSelected(el, value);
  }
};
function setSelected(el, value) {
  const isMultiple = el.multiple;
  if (isMultiple && !isArray(value) && !isSet(value)) {
    return;
  }
  for (let i = 0, l = el.options.length; i < l; i++) {
    const option = el.options[i];
    const optionValue = getValue(option);
    if (isMultiple) {
      if (isArray(value)) {
        option.selected = looseIndexOf(value, optionValue) > -1;
      } else {
        option.selected = value.has(optionValue);
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i)
          el.selectedIndex = i;
        return;
      }
    }
  }
  if (!isMultiple && el.selectedIndex !== -1) {
    el.selectedIndex = -1;
  }
}
function getValue(el) {
  return "_value" in el ? el._value : el.value;
}
const systemModifiers = ["ctrl", "shift", "alt", "meta"];
const modifierGuards = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
const withModifiers = (fn2, modifiers) => {
  return (event, ...args) => {
    for (let i = 0; i < modifiers.length; i++) {
      const guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers))
        return;
    }
    return fn2(event, ...args);
  };
};
const vShow = {
  beforeMount(el, { value }, { transition }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el._vod : "none";
}
const rendererOptions = extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
};
function normalizeContainer(container) {
  if (isString$1(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
function getDevtoolsGlobalHook() {
  return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
  return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
}
const isProxyAvailable = typeof Proxy === "function";
const HOOK_SETUP = "devtools-plugin:setup";
const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
class ApiProxy {
  constructor(plugin, hook) {
    this.target = null;
    this.targetQueue = [];
    this.onQueue = [];
    this.plugin = plugin;
    this.hook = hook;
    const defaultSettings = {};
    if (plugin.settings) {
      for (const id in plugin.settings) {
        const item = plugin.settings[id];
        defaultSettings[id] = item.defaultValue;
      }
    }
    const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
    let currentSettings = Object.assign({}, defaultSettings);
    try {
      const raw = localStorage.getItem(localSettingsSaveId);
      const data = JSON.parse(raw);
      Object.assign(currentSettings, data);
    } catch (e) {
    }
    this.fallbacks = {
      getSettings() {
        return currentSettings;
      },
      setSettings(value) {
        try {
          localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
        } catch (e) {
        }
        currentSettings = value;
      }
    };
    if (hook) {
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
    }
    this.proxiedOn = new Proxy({}, {
      get: (_target, prop3) => {
        if (this.target) {
          return this.target.on[prop3];
        } else {
          return (...args) => {
            this.onQueue.push({
              method: prop3,
              args
            });
          };
        }
      }
    });
    this.proxiedTarget = new Proxy({}, {
      get: (_target, prop3) => {
        if (this.target) {
          return this.target[prop3];
        } else if (prop3 === "on") {
          return this.proxiedOn;
        } else if (Object.keys(this.fallbacks).includes(prop3)) {
          return (...args) => {
            this.targetQueue.push({
              method: prop3,
              args,
              resolve: () => {
              }
            });
            return this.fallbacks[prop3](...args);
          };
        } else {
          return (...args) => {
            return new Promise((resolve2) => {
              this.targetQueue.push({
                method: prop3,
                args,
                resolve: resolve2
              });
            });
          };
        }
      }
    });
  }
  async setRealTarget(target) {
    this.target = target;
    for (const item of this.onQueue) {
      this.target.on[item.method](...item.args);
    }
    for (const item of this.targetQueue) {
      item.resolve(await this.target[item.method](...item.args));
    }
  }
}
function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
  const target = getTarget();
  const hook = getDevtoolsGlobalHook();
  const enableProxy = isProxyAvailable && pluginDescriptor.enableEarlyProxy;
  if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
    hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
  } else {
    const proxy = enableProxy ? new ApiProxy(pluginDescriptor, hook) : null;
    const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
    list.push({
      pluginDescriptor,
      setupFn,
      proxy
    });
    if (proxy)
      setupFn(proxy.proxiedTarget);
  }
}
/*!
 * vuex v4.0.2
 * (c) 2021 Evan You
 * @license MIT
 */
var storeKey = "store";
function useStore(key) {
  if (key === void 0)
    key = null;
  return inject(key !== null ? key : storeKey);
}
function find(list, f) {
  return list.filter(f)[0];
}
function deepCopy(obj, cache) {
  if (cache === void 0)
    cache = [];
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  var hit = find(cache, function(c) {
    return c.original === obj;
  });
  if (hit) {
    return hit.copy;
  }
  var copy = Array.isArray(obj) ? [] : {};
  cache.push({
    original: obj,
    copy
  });
  Object.keys(obj).forEach(function(key) {
    copy[key] = deepCopy(obj[key], cache);
  });
  return copy;
}
function forEachValue(obj, fn2) {
  Object.keys(obj).forEach(function(key) {
    return fn2(obj[key], key);
  });
}
function isObject(obj) {
  return obj !== null && typeof obj === "object";
}
function isPromise(val) {
  return val && typeof val.then === "function";
}
function partial(fn2, arg) {
  return function() {
    return fn2(arg);
  };
}
function genericSubscribe(fn2, subs, options2) {
  if (subs.indexOf(fn2) < 0) {
    options2 && options2.prepend ? subs.unshift(fn2) : subs.push(fn2);
  }
  return function() {
    var i = subs.indexOf(fn2);
    if (i > -1) {
      subs.splice(i, 1);
    }
  };
}
function resetStore(store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  installModule(store, state, [], store._modules.root, true);
  resetStoreState(store, state, hot);
}
function resetStoreState(store, state, hot) {
  var oldState = store._state;
  store.getters = {};
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computedObj = {};
  forEachValue(wrappedGetters, function(fn2, key) {
    computedObj[key] = partial(fn2, store);
    Object.defineProperty(store.getters, key, {
      get: function() {
        return computedObj[key]();
      },
      enumerable: true
    });
  });
  store._state = reactive({
    data: state
  });
  if (store.strict) {
    enableStrictMode(store);
  }
  if (oldState) {
    if (hot) {
      store._withCommit(function() {
        oldState.data = null;
      });
    }
  }
}
function installModule(store, rootState, path3, module, hot) {
  var isRoot = !path3.length;
  var namespace = store._modules.getNamespace(path3);
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && false) {
      console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path3.join("/"));
    }
    store._modulesNamespaceMap[namespace] = module;
  }
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path3.slice(0, -1));
    var moduleName = path3[path3.length - 1];
    store._withCommit(function() {
      parentState[moduleName] = module.state;
    });
  }
  var local = module.context = makeLocalContext(store, namespace, path3);
  module.forEachMutation(function(mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });
  module.forEachAction(function(action, key) {
    var type3 = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type3, handler, local);
  });
  module.forEachGetter(function(getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });
  module.forEachChild(function(child, key) {
    installModule(store, rootState, path3.concat(key), child, hot);
  });
}
function makeLocalContext(store, namespace, path3) {
  var noNamespace = namespace === "";
  var local = {
    dispatch: noNamespace ? store.dispatch : function(_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options2 = args.options;
      var type3 = args.type;
      if (!options2 || !options2.root) {
        type3 = namespace + type3;
      }
      return store.dispatch(type3, payload);
    },
    commit: noNamespace ? store.commit : function(_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options2 = args.options;
      var type3 = args.type;
      if (!options2 || !options2.root) {
        type3 = namespace + type3;
      }
      store.commit(type3, payload, options2);
    }
  };
  Object.defineProperties(local, {
    getters: {
      get: noNamespace ? function() {
        return store.getters;
      } : function() {
        return makeLocalGetters(store, namespace);
      }
    },
    state: {
      get: function() {
        return getNestedState(store.state, path3);
      }
    }
  });
  return local;
}
function makeLocalGetters(store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function(type3) {
      if (type3.slice(0, splitPos) !== namespace) {
        return;
      }
      var localType = type3.slice(splitPos);
      Object.defineProperty(gettersProxy, localType, {
        get: function() {
          return store.getters[type3];
        },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }
  return store._makeLocalGettersCache[namespace];
}
function registerMutation(store, type3, handler, local) {
  var entry = store._mutations[type3] || (store._mutations[type3] = []);
  entry.push(function wrappedMutationHandler(payload) {
    handler.call(store, local.state, payload);
  });
}
function registerAction(store, type3, handler, local) {
  var entry = store._actions[type3] || (store._actions[type3] = []);
  entry.push(function wrappedActionHandler(payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function(err) {
        store._devtoolHook.emit("vuex:error", err);
        throw err;
      });
    } else {
      return res;
    }
  });
}
function registerGetter(store, type3, rawGetter, local) {
  if (store._wrappedGetters[type3]) {
    return;
  }
  store._wrappedGetters[type3] = function wrappedGetter(store2) {
    return rawGetter(local.state, local.getters, store2.state, store2.getters);
  };
}
function enableStrictMode(store) {
  watch(function() {
    return store._state.data;
  }, function() {
  }, { deep: true, flush: "sync" });
}
function getNestedState(state, path3) {
  return path3.reduce(function(state2, key) {
    return state2[key];
  }, state);
}
function unifyObjectStyle(type3, payload, options2) {
  if (isObject(type3) && type3.type) {
    options2 = payload;
    payload = type3;
    type3 = type3.type;
  }
  return { type: type3, payload, options: options2 };
}
var LABEL_VUEX_BINDINGS = "vuex bindings";
var MUTATIONS_LAYER_ID = "vuex:mutations";
var ACTIONS_LAYER_ID = "vuex:actions";
var INSPECTOR_ID = "vuex";
var actionId = 0;
function addDevtools(app, store) {
  setupDevtoolsPlugin({
    id: "org.vuejs.vuex",
    app,
    label: "Vuex",
    homepage: "https://next.vuex.vuejs.org/",
    logo: "https://vuejs.org/images/icons/favicon-96x96.png",
    packageName: "vuex",
    componentStateTypes: [LABEL_VUEX_BINDINGS]
  }, function(api) {
    api.addTimelineLayer({
      id: MUTATIONS_LAYER_ID,
      label: "Vuex Mutations",
      color: COLOR_LIME_500
    });
    api.addTimelineLayer({
      id: ACTIONS_LAYER_ID,
      label: "Vuex Actions",
      color: COLOR_LIME_500
    });
    api.addInspector({
      id: INSPECTOR_ID,
      label: "Vuex",
      icon: "storage",
      treeFilterPlaceholder: "Filter stores..."
    });
    api.on.getInspectorTree(function(payload) {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        if (payload.filter) {
          var nodes = [];
          flattenStoreForInspectorTree(nodes, store._modules.root, payload.filter, "");
          payload.rootNodes = nodes;
        } else {
          payload.rootNodes = [
            formatStoreForInspectorTree(store._modules.root, "")
          ];
        }
      }
    });
    api.on.getInspectorState(function(payload) {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        var modulePath = payload.nodeId;
        makeLocalGetters(store, modulePath);
        payload.state = formatStoreForInspectorState(getStoreModule(store._modules, modulePath), modulePath === "root" ? store.getters : store._makeLocalGettersCache, modulePath);
      }
    });
    api.on.editInspectorState(function(payload) {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        var modulePath = payload.nodeId;
        var path3 = payload.path;
        if (modulePath !== "root") {
          path3 = modulePath.split("/").filter(Boolean).concat(path3);
        }
        store._withCommit(function() {
          payload.set(store._state.data, path3, payload.state.value);
        });
      }
    });
    store.subscribe(function(mutation, state) {
      var data = {};
      if (mutation.payload) {
        data.payload = mutation.payload;
      }
      data.state = state;
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.addTimelineEvent({
        layerId: MUTATIONS_LAYER_ID,
        event: {
          time: Date.now(),
          title: mutation.type,
          data
        }
      });
    });
    store.subscribeAction({
      before: function(action, state) {
        var data = {};
        if (action.payload) {
          data.payload = action.payload;
        }
        action._id = actionId++;
        action._time = Date.now();
        data.state = state;
        api.addTimelineEvent({
          layerId: ACTIONS_LAYER_ID,
          event: {
            time: action._time,
            title: action.type,
            groupId: action._id,
            subtitle: "start",
            data
          }
        });
      },
      after: function(action, state) {
        var data = {};
        var duration = Date.now() - action._time;
        data.duration = {
          _custom: {
            type: "duration",
            display: duration + "ms",
            tooltip: "Action duration",
            value: duration
          }
        };
        if (action.payload) {
          data.payload = action.payload;
        }
        data.state = state;
        api.addTimelineEvent({
          layerId: ACTIONS_LAYER_ID,
          event: {
            time: Date.now(),
            title: action.type,
            groupId: action._id,
            subtitle: "end",
            data
          }
        });
      }
    });
  });
}
var COLOR_LIME_500 = 8702998;
var COLOR_DARK = 6710886;
var COLOR_WHITE = 16777215;
var TAG_NAMESPACED = {
  label: "namespaced",
  textColor: COLOR_WHITE,
  backgroundColor: COLOR_DARK
};
function extractNameFromPath(path3) {
  return path3 && path3 !== "root" ? path3.split("/").slice(-2, -1)[0] : "Root";
}
function formatStoreForInspectorTree(module, path3) {
  return {
    id: path3 || "root",
    label: extractNameFromPath(path3),
    tags: module.namespaced ? [TAG_NAMESPACED] : [],
    children: Object.keys(module._children).map(function(moduleName) {
      return formatStoreForInspectorTree(module._children[moduleName], path3 + moduleName + "/");
    })
  };
}
function flattenStoreForInspectorTree(result, module, filter2, path3) {
  if (path3.includes(filter2)) {
    result.push({
      id: path3 || "root",
      label: path3.endsWith("/") ? path3.slice(0, path3.length - 1) : path3 || "Root",
      tags: module.namespaced ? [TAG_NAMESPACED] : []
    });
  }
  Object.keys(module._children).forEach(function(moduleName) {
    flattenStoreForInspectorTree(result, module._children[moduleName], filter2, path3 + moduleName + "/");
  });
}
function formatStoreForInspectorState(module, getters, path3) {
  getters = path3 === "root" ? getters : getters[path3];
  var gettersKeys = Object.keys(getters);
  var storeState = {
    state: Object.keys(module.state).map(function(key) {
      return {
        key,
        editable: true,
        value: module.state[key]
      };
    })
  };
  if (gettersKeys.length) {
    var tree = transformPathsToObjectTree(getters);
    storeState.getters = Object.keys(tree).map(function(key) {
      return {
        key: key.endsWith("/") ? extractNameFromPath(key) : key,
        editable: false,
        value: canThrow(function() {
          return tree[key];
        })
      };
    });
  }
  return storeState;
}
function transformPathsToObjectTree(getters) {
  var result = {};
  Object.keys(getters).forEach(function(key) {
    var path3 = key.split("/");
    if (path3.length > 1) {
      var target = result;
      var leafKey = path3.pop();
      path3.forEach(function(p2) {
        if (!target[p2]) {
          target[p2] = {
            _custom: {
              value: {},
              display: p2,
              tooltip: "Module",
              abstract: true
            }
          };
        }
        target = target[p2]._custom.value;
      });
      target[leafKey] = canThrow(function() {
        return getters[key];
      });
    } else {
      result[key] = canThrow(function() {
        return getters[key];
      });
    }
  });
  return result;
}
function getStoreModule(moduleMap, path3) {
  var names = path3.split("/").filter(function(n) {
    return n;
  });
  return names.reduce(function(module, moduleName, i) {
    var child = module[moduleName];
    if (!child) {
      throw new Error('Missing module "' + moduleName + '" for path "' + path3 + '".');
    }
    return i === names.length - 1 ? child : child._children;
  }, path3 === "root" ? moduleMap : moduleMap.root._children);
}
function canThrow(cb) {
  try {
    return cb();
  } catch (e) {
    return e;
  }
}
var Module = function Module2(rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
};
var prototypeAccessors$1 = { namespaced: { configurable: true } };
prototypeAccessors$1.namespaced.get = function() {
  return !!this._rawModule.namespaced;
};
Module.prototype.addChild = function addChild(key, module) {
  this._children[key] = module;
};
Module.prototype.removeChild = function removeChild(key) {
  delete this._children[key];
};
Module.prototype.getChild = function getChild(key) {
  return this._children[key];
};
Module.prototype.hasChild = function hasChild(key) {
  return key in this._children;
};
Module.prototype.update = function update(rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};
Module.prototype.forEachChild = function forEachChild(fn2) {
  forEachValue(this._children, fn2);
};
Module.prototype.forEachGetter = function forEachGetter(fn2) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn2);
  }
};
Module.prototype.forEachAction = function forEachAction(fn2) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn2);
  }
};
Module.prototype.forEachMutation = function forEachMutation(fn2) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn2);
  }
};
Object.defineProperties(Module.prototype, prototypeAccessors$1);
var ModuleCollection = function ModuleCollection2(rawRootModule) {
  this.register([], rawRootModule, false);
};
ModuleCollection.prototype.get = function get2(path3) {
  return path3.reduce(function(module, key) {
    return module.getChild(key);
  }, this.root);
};
ModuleCollection.prototype.getNamespace = function getNamespace(path3) {
  var module = this.root;
  return path3.reduce(function(namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + "/" : "");
  }, "");
};
ModuleCollection.prototype.update = function update$1(rawRootModule) {
  update2([], this.root, rawRootModule);
};
ModuleCollection.prototype.register = function register(path3, rawModule, runtime) {
  var this$1$1 = this;
  if (runtime === void 0)
    runtime = true;
  var newModule = new Module(rawModule, runtime);
  if (path3.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path3.slice(0, -1));
    parent.addChild(path3[path3.length - 1], newModule);
  }
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function(rawChildModule, key) {
      this$1$1.register(path3.concat(key), rawChildModule, runtime);
    });
  }
};
ModuleCollection.prototype.unregister = function unregister(path3) {
  var parent = this.get(path3.slice(0, -1));
  var key = path3[path3.length - 1];
  var child = parent.getChild(key);
  if (!child) {
    return;
  }
  if (!child.runtime) {
    return;
  }
  parent.removeChild(key);
};
ModuleCollection.prototype.isRegistered = function isRegistered(path3) {
  var parent = this.get(path3.slice(0, -1));
  var key = path3[path3.length - 1];
  if (parent) {
    return parent.hasChild(key);
  }
  return false;
};
function update2(path3, targetModule, newModule) {
  targetModule.update(newModule);
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        return;
      }
      update2(path3.concat(key), targetModule.getChild(key), newModule.modules[key]);
    }
  }
}
function createStore(options2) {
  return new Store(options2);
}
var Store = function Store2(options2) {
  var this$1$1 = this;
  if (options2 === void 0)
    options2 = {};
  var plugins = options2.plugins;
  if (plugins === void 0)
    plugins = [];
  var strict = options2.strict;
  if (strict === void 0)
    strict = false;
  var devtools = options2.devtools;
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options2);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._makeLocalGettersCache = Object.create(null);
  this._devtools = devtools;
  var store = this;
  var ref2 = this;
  var dispatch2 = ref2.dispatch;
  var commit2 = ref2.commit;
  this.dispatch = function boundDispatch(type3, payload) {
    return dispatch2.call(store, type3, payload);
  };
  this.commit = function boundCommit(type3, payload, options3) {
    return commit2.call(store, type3, payload, options3);
  };
  this.strict = strict;
  var state = this._modules.root.state;
  installModule(this, state, [], this._modules.root);
  resetStoreState(this, state);
  plugins.forEach(function(plugin) {
    return plugin(this$1$1);
  });
};
var prototypeAccessors = { state: { configurable: true } };
Store.prototype.install = function install(app, injectKey) {
  app.provide(injectKey || storeKey, this);
  app.config.globalProperties.$store = this;
  var useDevtools = this._devtools !== void 0 ? this._devtools : false;
  if (useDevtools) {
    addDevtools(app, this);
  }
};
prototypeAccessors.state.get = function() {
  return this._state.data;
};
prototypeAccessors.state.set = function(v) {
};
Store.prototype.commit = function commit(_type, _payload, _options) {
  var this$1$1 = this;
  var ref2 = unifyObjectStyle(_type, _payload, _options);
  var type3 = ref2.type;
  var payload = ref2.payload;
  var mutation = { type: type3, payload };
  var entry = this._mutations[type3];
  if (!entry) {
    return;
  }
  this._withCommit(function() {
    entry.forEach(function commitIterator(handler) {
      handler(payload);
    });
  });
  this._subscribers.slice().forEach(function(sub) {
    return sub(mutation, this$1$1.state);
  });
};
Store.prototype.dispatch = function dispatch(_type, _payload) {
  var this$1$1 = this;
  var ref2 = unifyObjectStyle(_type, _payload);
  var type3 = ref2.type;
  var payload = ref2.payload;
  var action = { type: type3, payload };
  var entry = this._actions[type3];
  if (!entry) {
    return;
  }
  try {
    this._actionSubscribers.slice().filter(function(sub) {
      return sub.before;
    }).forEach(function(sub) {
      return sub.before(action, this$1$1.state);
    });
  } catch (e) {
  }
  var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
    return handler(payload);
  })) : entry[0](payload);
  return new Promise(function(resolve2, reject3) {
    result.then(function(res) {
      try {
        this$1$1._actionSubscribers.filter(function(sub) {
          return sub.after;
        }).forEach(function(sub) {
          return sub.after(action, this$1$1.state);
        });
      } catch (e) {
      }
      resolve2(res);
    }, function(error) {
      try {
        this$1$1._actionSubscribers.filter(function(sub) {
          return sub.error;
        }).forEach(function(sub) {
          return sub.error(action, this$1$1.state, error);
        });
      } catch (e) {
      }
      reject3(error);
    });
  });
};
Store.prototype.subscribe = function subscribe(fn2, options2) {
  return genericSubscribe(fn2, this._subscribers, options2);
};
Store.prototype.subscribeAction = function subscribeAction(fn2, options2) {
  var subs = typeof fn2 === "function" ? { before: fn2 } : fn2;
  return genericSubscribe(subs, this._actionSubscribers, options2);
};
Store.prototype.watch = function watch$1(getter, cb, options2) {
  var this$1$1 = this;
  return watch(function() {
    return getter(this$1$1.state, this$1$1.getters);
  }, cb, Object.assign({}, options2));
};
Store.prototype.replaceState = function replaceState(state) {
  var this$1$1 = this;
  this._withCommit(function() {
    this$1$1._state.data = state;
  });
};
Store.prototype.registerModule = function registerModule(path3, rawModule, options2) {
  if (options2 === void 0)
    options2 = {};
  if (typeof path3 === "string") {
    path3 = [path3];
  }
  this._modules.register(path3, rawModule);
  installModule(this, this.state, path3, this._modules.get(path3), options2.preserveState);
  resetStoreState(this, this.state);
};
Store.prototype.unregisterModule = function unregisterModule(path3) {
  var this$1$1 = this;
  if (typeof path3 === "string") {
    path3 = [path3];
  }
  this._modules.unregister(path3);
  this._withCommit(function() {
    var parentState = getNestedState(this$1$1.state, path3.slice(0, -1));
    delete parentState[path3[path3.length - 1]];
  });
  resetStore(this);
};
Store.prototype.hasModule = function hasModule(path3) {
  if (typeof path3 === "string") {
    path3 = [path3];
  }
  return this._modules.isRegistered(path3);
};
Store.prototype.hotUpdate = function hotUpdate(newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};
Store.prototype._withCommit = function _withCommit(fn2) {
  var committing = this._committing;
  this._committing = true;
  fn2();
  this._committing = committing;
};
Object.defineProperties(Store.prototype, prototypeAccessors);
function createLogger(ref2) {
  if (ref2 === void 0)
    ref2 = {};
  var collapsed = ref2.collapsed;
  if (collapsed === void 0)
    collapsed = true;
  var filter2 = ref2.filter;
  if (filter2 === void 0)
    filter2 = function(mutation, stateBefore, stateAfter) {
      return true;
    };
  var transformer = ref2.transformer;
  if (transformer === void 0)
    transformer = function(state) {
      return state;
    };
  var mutationTransformer = ref2.mutationTransformer;
  if (mutationTransformer === void 0)
    mutationTransformer = function(mut) {
      return mut;
    };
  var actionFilter = ref2.actionFilter;
  if (actionFilter === void 0)
    actionFilter = function(action, state) {
      return true;
    };
  var actionTransformer = ref2.actionTransformer;
  if (actionTransformer === void 0)
    actionTransformer = function(act) {
      return act;
    };
  var logMutations = ref2.logMutations;
  if (logMutations === void 0)
    logMutations = true;
  var logActions = ref2.logActions;
  if (logActions === void 0)
    logActions = true;
  var logger = ref2.logger;
  if (logger === void 0)
    logger = console;
  return function(store) {
    var prevState = deepCopy(store.state);
    if (typeof logger === "undefined") {
      return;
    }
    if (logMutations) {
      store.subscribe(function(mutation, state) {
        var nextState = deepCopy(state);
        if (filter2(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + mutation.type + formattedTime;
          startMessage(logger, message, collapsed);
          logger.log("%c prev state", "color: #9E9E9E; font-weight: bold", transformer(prevState));
          logger.log("%c mutation", "color: #03A9F4; font-weight: bold", formattedMutation);
          logger.log("%c next state", "color: #4CAF50; font-weight: bold", transformer(nextState));
          endMessage(logger);
        }
        prevState = nextState;
      });
    }
    if (logActions) {
      store.subscribeAction(function(action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + action.type + formattedTime;
          startMessage(logger, message, collapsed);
          logger.log("%c action", "color: #03A9F4; font-weight: bold", formattedAction);
          endMessage(logger);
        }
      });
    }
  };
}
function startMessage(logger, message, collapsed) {
  var startMessage2 = collapsed ? logger.groupCollapsed : logger.group;
  try {
    startMessage2.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}
function endMessage(logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log("\u2014\u2014 log end \u2014\u2014");
  }
}
function getFormattedTime() {
  var time = new Date();
  return " @ " + pad$1(time.getHours(), 2) + ":" + pad$1(time.getMinutes(), 2) + ":" + pad$1(time.getSeconds(), 2) + "." + pad$1(time.getMilliseconds(), 3);
}
function repeat(str, times) {
  return new Array(times + 1).join(str);
}
function pad$1(num, maxLength) {
  return repeat("0", maxLength - num.toString().length) + num;
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function commonjsRequire(path3) {
  throw new Error('Could not dynamically require "' + path3 + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var isMergeableObject = function isMergeableObject2(value) {
  return isNonNullObject(value) && !isSpecial(value);
};
function isNonNullObject(value) {
  return !!value && typeof value === "object";
}
function isSpecial(value) {
  var stringValue = Object.prototype.toString.call(value);
  return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
}
var canUseSymbol = typeof Symbol === "function" && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
function isReactElement(value) {
  return value.$$typeof === REACT_ELEMENT_TYPE;
}
function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}
function cloneUnlessOtherwiseSpecified(value, options2) {
  return options2.clone !== false && options2.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options2) : value;
}
function defaultArrayMerge(target, source, options2) {
  return target.concat(source).map(function(element) {
    return cloneUnlessOtherwiseSpecified(element, options2);
  });
}
function getMergeFunction(key, options2) {
  if (!options2.customMerge) {
    return deepmerge;
  }
  var customMerge = options2.customMerge(key);
  return typeof customMerge === "function" ? customMerge : deepmerge;
}
function getEnumerableOwnPropertySymbols(target) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
    return target.propertyIsEnumerable(symbol);
  }) : [];
}
function getKeys(target) {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}
function propertyIsOnObject(object, property) {
  try {
    return property in object;
  } catch (_) {
    return false;
  }
}
function propertyIsUnsafe(target, key) {
  return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
}
function mergeObject(target, source, options2) {
  var destination = {};
  if (options2.isMergeableObject(target)) {
    getKeys(target).forEach(function(key) {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options2);
    });
  }
  getKeys(source).forEach(function(key) {
    if (propertyIsUnsafe(target, key)) {
      return;
    }
    if (propertyIsOnObject(target, key) && options2.isMergeableObject(source[key])) {
      destination[key] = getMergeFunction(key, options2)(target[key], source[key], options2);
    } else {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options2);
    }
  });
  return destination;
}
function deepmerge(target, source, options2) {
  options2 = options2 || {};
  options2.arrayMerge = options2.arrayMerge || defaultArrayMerge;
  options2.isMergeableObject = options2.isMergeableObject || isMergeableObject;
  options2.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
  var sourceIsArray = Array.isArray(source);
  var targetIsArray = Array.isArray(target);
  var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source, options2);
  } else if (sourceIsArray) {
    return options2.arrayMerge(target, source, options2);
  } else {
    return mergeObject(target, source, options2);
  }
}
deepmerge.all = function deepmergeAll(array, options2) {
  if (!Array.isArray(array)) {
    throw new Error("first argument should be an array");
  }
  return array.reduce(function(prev, next) {
    return deepmerge(prev, next, options2);
  }, {});
};
var deepmerge_1 = deepmerge;
var cjs = deepmerge_1;
let MockStorage;
{
  MockStorage = class {
    get length() {
      return Object.keys(this).length;
    }
    key(index) {
      return Object.keys(this)[index];
    }
    setItem(key, data) {
      this[key] = data.toString();
    }
    getItem(key) {
      return this[key];
    }
    removeItem(key) {
      delete this[key];
    }
    clear() {
      for (let key of Object.keys(this)) {
        delete this[key];
      }
    }
  };
}
class SimplePromiseQueue {
  constructor() {
    this._queue = [];
    this._flushing = false;
  }
  enqueue(promise) {
    this._queue.push(promise);
    if (!this._flushing) {
      return this.flushQueue();
    }
    return Promise.resolve();
  }
  flushQueue() {
    this._flushing = true;
    const chain = () => {
      const nextTask = this._queue.shift();
      if (nextTask) {
        return nextTask.then(chain);
      } else {
        this._flushing = false;
      }
    };
    return Promise.resolve(chain());
  }
}
const options = {
  replaceArrays: {
    arrayMerge: (destinationArray, sourceArray, options2) => sourceArray
  },
  concatArrays: {
    arrayMerge: (target, source, options2) => target.concat(...source)
  }
};
function merge$1(into, from, mergeOption) {
  return cjs(into, from, options[mergeOption]);
}
let FlattedJSON = JSON;
class VuexPersistence {
  constructor(options2) {
    this._mutex = new SimplePromiseQueue();
    this.subscriber = (store) => (handler) => store.subscribe(handler);
    if (typeof options2 === "undefined")
      options2 = {};
    this.key = options2.key != null ? options2.key : "vuex";
    this.subscribed = false;
    this.supportCircular = options2.supportCircular || false;
    if (this.supportCircular) {
      FlattedJSON = require("flatted");
    }
    this.mergeOption = options2.mergeOption || "replaceArrays";
    let localStorageLitmus = true;
    try {
      window.localStorage.getItem("");
    } catch (err) {
      localStorageLitmus = false;
    }
    if (options2.storage) {
      this.storage = options2.storage;
    } else if (localStorageLitmus) {
      this.storage = window.localStorage;
    } else if (MockStorage) {
      this.storage = new MockStorage();
    } else {
      throw new Error("Neither 'window' is defined, nor 'MockStorage' is available");
    }
    this.reducer = options2.reducer != null ? options2.reducer : options2.modules == null ? (state) => state : (state) => options2.modules.reduce((a, i) => merge$1(a, { [i]: state[i] }, this.mergeOption), {});
    this.filter = options2.filter || ((mutation) => true);
    this.strictMode = options2.strictMode || false;
    this.RESTORE_MUTATION = function RESTORE_MUTATION(state, savedState) {
      const mergedState = merge$1(state, savedState || {}, this.mergeOption);
      for (const propertyName of Object.keys(mergedState)) {
        this._vm.$set(state, propertyName, mergedState[propertyName]);
      }
    };
    this.asyncStorage = options2.asyncStorage || false;
    if (this.asyncStorage) {
      this.restoreState = options2.restoreState != null ? options2.restoreState : (key, storage) => storage.getItem(key).then((value) => typeof value === "string" ? this.supportCircular ? FlattedJSON.parse(value || "{}") : JSON.parse(value || "{}") : value || {});
      this.saveState = options2.saveState != null ? options2.saveState : (key, state, storage) => storage.setItem(key, this.asyncStorage ? merge$1({}, state || {}, this.mergeOption) : this.supportCircular ? FlattedJSON.stringify(state) : JSON.stringify(state));
      this.plugin = (store) => {
        store.restored = this.restoreState(this.key, this.storage).then((savedState) => {
          if (this.strictMode) {
            store.commit("RESTORE_MUTATION", savedState);
          } else {
            store.replaceState(merge$1(store.state, savedState || {}, this.mergeOption));
          }
          this.subscriber(store)((mutation, state) => {
            if (this.filter(mutation)) {
              this._mutex.enqueue(this.saveState(this.key, this.reducer(state), this.storage));
            }
          });
          this.subscribed = true;
        });
      };
    } else {
      this.restoreState = options2.restoreState != null ? options2.restoreState : (key, storage) => {
        const value = storage.getItem(key);
        if (typeof value === "string") {
          return this.supportCircular ? FlattedJSON.parse(value || "{}") : JSON.parse(value || "{}");
        } else {
          return value || {};
        }
      };
      this.saveState = options2.saveState != null ? options2.saveState : (key, state, storage) => storage.setItem(key, this.supportCircular ? FlattedJSON.stringify(state) : JSON.stringify(state));
      this.plugin = (store) => {
        const savedState = this.restoreState(this.key, this.storage);
        if (this.strictMode) {
          store.commit("RESTORE_MUTATION", savedState);
        } else {
          store.replaceState(merge$1(store.state, savedState || {}, this.mergeOption));
        }
        this.subscriber(store)((mutation, state) => {
          if (this.filter(mutation)) {
            this.saveState(this.key, this.reducer(state), this.storage);
          }
        });
        this.subscribed = true;
      };
    }
  }
}
var VuexPersistence$1 = VuexPersistence;
var __$1 = {
  "@@functional/placeholder": true
};
function _isPlaceholder(a) {
  return a != null && typeof a === "object" && a["@@functional/placeholder"] === true;
}
function _curry1(fn2) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn2.apply(this, arguments);
    }
  };
}
function _curry2(fn2) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function(_b) {
          return fn2(a, _b);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a) {
          return fn2(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function(_b) {
          return fn2(a, _b);
        }) : fn2(a, b);
    }
  };
}
function _arity(n, fn2) {
  switch (n) {
    case 0:
      return function() {
        return fn2.apply(this, arguments);
      };
    case 1:
      return function(a0) {
        return fn2.apply(this, arguments);
      };
    case 2:
      return function(a0, a1) {
        return fn2.apply(this, arguments);
      };
    case 3:
      return function(a0, a1, a2) {
        return fn2.apply(this, arguments);
      };
    case 4:
      return function(a0, a1, a2, a3) {
        return fn2.apply(this, arguments);
      };
    case 5:
      return function(a0, a1, a2, a3, a4) {
        return fn2.apply(this, arguments);
      };
    case 6:
      return function(a0, a1, a2, a3, a4, a5) {
        return fn2.apply(this, arguments);
      };
    case 7:
      return function(a0, a1, a2, a3, a4, a5, a6) {
        return fn2.apply(this, arguments);
      };
    case 8:
      return function(a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn2.apply(this, arguments);
      };
    case 9:
      return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn2.apply(this, arguments);
      };
    case 10:
      return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn2.apply(this, arguments);
      };
    default:
      throw new Error("First argument to _arity must be a non-negative integer no greater than ten");
  }
}
function _curryN(length, received, fn2) {
  return function() {
    var combined = [];
    var argsIdx = 0;
    var left2 = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder(result)) {
        left2 -= 1;
      }
      combinedIdx += 1;
    }
    return left2 <= 0 ? fn2.apply(this, combined) : _arity(left2, _curryN(length, combined, fn2));
  };
}
var curryN = /* @__PURE__ */ _curry2(function curryN2(length, fn2) {
  if (length === 1) {
    return _curry1(fn2);
  }
  return _arity(length, _curryN(length, [], fn2));
});
var curryN$1 = curryN;
function _curry3(fn2) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder(a) ? f3 : _curry2(function(_b, _c) {
          return fn2(a, _b, _c);
        });
      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function(_a, _c) {
          return fn2(_a, b, _c);
        }) : _isPlaceholder(b) ? _curry2(function(_b, _c) {
          return fn2(a, _b, _c);
        }) : _curry1(function(_c) {
          return fn2(a, b, _c);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function(_a, _b) {
          return fn2(_a, _b, c);
        }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function(_a, _c) {
          return fn2(_a, b, _c);
        }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) {
          return fn2(a, _b, _c);
        }) : _isPlaceholder(a) ? _curry1(function(_a) {
          return fn2(_a, b, c);
        }) : _isPlaceholder(b) ? _curry1(function(_b) {
          return fn2(a, _b, c);
        }) : _isPlaceholder(c) ? _curry1(function(_c) {
          return fn2(a, b, _c);
        }) : fn2(a, b, c);
    }
  };
}
var _isArray = Array.isArray || function _isArray2(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === "[object Array]";
};
function _isTransformer(obj) {
  return obj != null && typeof obj["@@transducer/step"] === "function";
}
function _dispatchable(methodNames, transducerCreator, fn2) {
  return function() {
    if (arguments.length === 0) {
      return fn2();
    }
    var obj = arguments[arguments.length - 1];
    if (!_isArray(obj)) {
      var idx = 0;
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === "function") {
          return obj[methodNames[idx]].apply(obj, Array.prototype.slice.call(arguments, 0, -1));
        }
        idx += 1;
      }
      if (_isTransformer(obj)) {
        var transducer = transducerCreator.apply(null, Array.prototype.slice.call(arguments, 0, -1));
        return transducer(obj);
      }
    }
    return fn2.apply(this, arguments);
  };
}
var _xfBase = {
  init: function() {
    return this.xf["@@transducer/init"]();
  },
  result: function(result) {
    return this.xf["@@transducer/result"](result);
  }
};
function _map(fn2, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);
  while (idx < len) {
    result[idx] = fn2(functor[idx]);
    idx += 1;
  }
  return result;
}
function _isString(x) {
  return Object.prototype.toString.call(x) === "[object String]";
}
var _isArrayLike = /* @__PURE__ */ _curry1(function isArrayLike(x) {
  if (_isArray(x)) {
    return true;
  }
  if (!x) {
    return false;
  }
  if (typeof x !== "object") {
    return false;
  }
  if (_isString(x)) {
    return false;
  }
  if (x.length === 0) {
    return true;
  }
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
});
var _isArrayLike$1 = _isArrayLike;
var XWrap = /* @__PURE__ */ function() {
  function XWrap2(fn2) {
    this.f = fn2;
  }
  XWrap2.prototype["@@transducer/init"] = function() {
    throw new Error("init not implemented on XWrap");
  };
  XWrap2.prototype["@@transducer/result"] = function(acc) {
    return acc;
  };
  XWrap2.prototype["@@transducer/step"] = function(acc, x) {
    return this.f(acc, x);
  };
  return XWrap2;
}();
function _xwrap(fn2) {
  return new XWrap(fn2);
}
var bind = /* @__PURE__ */ _curry2(function bind2(fn2, thisObj) {
  return _arity(fn2.length, function() {
    return fn2.apply(thisObj, arguments);
  });
});
var bind$1 = bind;
function _arrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    acc = xf["@@transducer/step"](acc, list[idx]);
    if (acc && acc["@@transducer/reduced"]) {
      acc = acc["@@transducer/value"];
      break;
    }
    idx += 1;
  }
  return xf["@@transducer/result"](acc);
}
function _iterableReduce(xf, acc, iter) {
  var step = iter.next();
  while (!step.done) {
    acc = xf["@@transducer/step"](acc, step.value);
    if (acc && acc["@@transducer/reduced"]) {
      acc = acc["@@transducer/value"];
      break;
    }
    step = iter.next();
  }
  return xf["@@transducer/result"](acc);
}
function _methodReduce(xf, acc, obj, methodName) {
  return xf["@@transducer/result"](obj[methodName](bind$1(xf["@@transducer/step"], xf), acc));
}
var symIterator = typeof Symbol !== "undefined" ? Symbol.iterator : "@@iterator";
function _reduce(fn2, acc, list) {
  if (typeof fn2 === "function") {
    fn2 = _xwrap(fn2);
  }
  if (_isArrayLike$1(list)) {
    return _arrayReduce(fn2, acc, list);
  }
  if (typeof list["fantasy-land/reduce"] === "function") {
    return _methodReduce(fn2, acc, list, "fantasy-land/reduce");
  }
  if (list[symIterator] != null) {
    return _iterableReduce(fn2, acc, list[symIterator]());
  }
  if (typeof list.next === "function") {
    return _iterableReduce(fn2, acc, list);
  }
  if (typeof list.reduce === "function") {
    return _methodReduce(fn2, acc, list, "reduce");
  }
  throw new TypeError("reduce: list must be array or iterable");
}
var XMap = /* @__PURE__ */ function() {
  function XMap2(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XMap2.prototype["@@transducer/init"] = _xfBase.init;
  XMap2.prototype["@@transducer/result"] = _xfBase.result;
  XMap2.prototype["@@transducer/step"] = function(result, input) {
    return this.xf["@@transducer/step"](result, this.f(input));
  };
  return XMap2;
}();
var _xmap = /* @__PURE__ */ _curry2(function _xmap2(f, xf) {
  return new XMap(f, xf);
});
var _xmap$1 = _xmap;
function _has(prop3, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop3);
}
var toString$2 = Object.prototype.toString;
var _isArguments = /* @__PURE__ */ function() {
  return toString$2.call(arguments) === "[object Arguments]" ? function _isArguments2(x) {
    return toString$2.call(x) === "[object Arguments]";
  } : function _isArguments2(x) {
    return _has("callee", x);
  };
}();
var _isArguments$1 = _isArguments;
var hasEnumBug = !/* @__PURE__ */ {
  toString: null
}.propertyIsEnumerable("toString");
var nonEnumerableProps = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
var hasArgsEnumBug = /* @__PURE__ */ function() {
  return arguments.propertyIsEnumerable("length");
}();
var contains$1 = function contains(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
};
var keys = typeof Object.keys === "function" && !hasArgsEnumBug ? /* @__PURE__ */ _curry1(function keys2(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) : /* @__PURE__ */ _curry1(function keys3(obj) {
  if (Object(obj) !== obj) {
    return [];
  }
  var prop3, nIdx;
  var ks = [];
  var checkArgsLength = hasArgsEnumBug && _isArguments$1(obj);
  for (prop3 in obj) {
    if (_has(prop3, obj) && (!checkArgsLength || prop3 !== "length")) {
      ks[ks.length] = prop3;
    }
  }
  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;
    while (nIdx >= 0) {
      prop3 = nonEnumerableProps[nIdx];
      if (_has(prop3, obj) && !contains$1(ks, prop3)) {
        ks[ks.length] = prop3;
      }
      nIdx -= 1;
    }
  }
  return ks;
});
var keys$1 = keys;
var map = /* @__PURE__ */ _curry2(/* @__PURE__ */ _dispatchable(["fantasy-land/map", "map"], _xmap$1, function map2(fn2, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case "[object Function]":
      return curryN$1(functor.length, function() {
        return fn2.call(this, functor.apply(this, arguments));
      });
    case "[object Object]":
      return _reduce(function(acc, key) {
        acc[key] = fn2(functor[key]);
        return acc;
      }, {}, keys$1(functor));
    default:
      return _map(fn2, functor);
  }
}));
var map$1 = map;
var _isInteger = Number.isInteger || function _isInteger2(n) {
  return n << 0 === n;
};
var nth = /* @__PURE__ */ _curry2(function nth2(offset2, list) {
  var idx = offset2 < 0 ? list.length + offset2 : offset2;
  return _isString(list) ? list.charAt(idx) : list[idx];
});
var nth$1 = nth;
var prop = /* @__PURE__ */ _curry2(function prop2(p2, obj) {
  if (obj == null) {
    return;
  }
  return _isInteger(p2) ? nth$1(p2, obj) : obj[p2];
});
var prop$1 = prop;
var always = /* @__PURE__ */ _curry1(function always2(val) {
  return function() {
    return val;
  };
});
var always$1 = always;
function _assoc(prop3, val, obj) {
  if (_isInteger(prop3) && _isArray(obj)) {
    var arr = [].concat(obj);
    arr[prop3] = val;
    return arr;
  }
  var result = {};
  for (var p2 in obj) {
    result[p2] = obj[p2];
  }
  result[prop3] = val;
  return result;
}
var isNil = /* @__PURE__ */ _curry1(function isNil2(x) {
  return x == null;
});
var isNil$1 = isNil;
var assocPath = /* @__PURE__ */ _curry3(function assocPath2(path3, val, obj) {
  if (path3.length === 0) {
    return val;
  }
  var idx = path3[0];
  if (path3.length > 1) {
    var nextObj = !isNil$1(obj) && _has(idx, obj) ? obj[idx] : _isInteger(path3[1]) ? [] : {};
    val = assocPath2(Array.prototype.slice.call(path3, 1), val, nextObj);
  }
  return _assoc(idx, val, obj);
});
var assocPath$1 = assocPath;
var assoc = /* @__PURE__ */ _curry3(function assoc2(prop3, val, obj) {
  return assocPath$1([prop3], val, obj);
});
var assoc$1 = assoc;
function _cloneRegExp(pattern) {
  return new RegExp(pattern.source, (pattern.global ? "g" : "") + (pattern.ignoreCase ? "i" : "") + (pattern.multiline ? "m" : "") + (pattern.sticky ? "y" : "") + (pattern.unicode ? "u" : ""));
}
var type = /* @__PURE__ */ _curry1(function type2(val) {
  return val === null ? "Null" : val === void 0 ? "Undefined" : Object.prototype.toString.call(val).slice(8, -1);
});
var type$1 = type;
function _clone(value, refFrom, refTo, deep) {
  var copy = function copy2(copiedValue) {
    var len = refFrom.length;
    var idx = 0;
    while (idx < len) {
      if (value === refFrom[idx]) {
        return refTo[idx];
      }
      idx += 1;
    }
    refFrom[idx] = value;
    refTo[idx] = copiedValue;
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key];
      }
    }
    return copiedValue;
  };
  switch (type$1(value)) {
    case "Object":
      return copy(Object.create(Object.getPrototypeOf(value)));
    case "Array":
      return copy([]);
    case "Date":
      return new Date(value.valueOf());
    case "RegExp":
      return _cloneRegExp(value);
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "BigInt64Array":
    case "BigUint64Array":
      return value.slice();
    default:
      return value;
  }
}
var clone = /* @__PURE__ */ _curry1(function clone2(value) {
  return value != null && typeof value.clone === "function" ? value.clone() : _clone(value, [], [], true);
});
var clone$1 = clone;
function _arrayFromIterator(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
}
function _includesWith(pred, x, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}
function _functionName(f) {
  var match3 = String(f).match(/^function (\w*)/);
  return match3 == null ? "" : match3[1];
}
function _objectIs(a, b) {
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  } else {
    return a !== a && b !== b;
  }
}
var _objectIs$1 = typeof Object.is === "function" ? Object.is : _objectIs;
function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = _arrayFromIterator(aIterator);
  var b = _arrayFromIterator(bIterator);
  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  }
  return !_includesWith(function(b2, aItem) {
    return !_includesWith(eq, aItem, b2);
  }, b, a);
}
function _equals(a, b, stackA, stackB) {
  if (_objectIs$1(a, b)) {
    return true;
  }
  var typeA = type$1(a);
  if (typeA !== type$1(b)) {
    return false;
  }
  if (typeof a["fantasy-land/equals"] === "function" || typeof b["fantasy-land/equals"] === "function") {
    return typeof a["fantasy-land/equals"] === "function" && a["fantasy-land/equals"](b) && typeof b["fantasy-land/equals"] === "function" && b["fantasy-land/equals"](a);
  }
  if (typeof a.equals === "function" || typeof b.equals === "function") {
    return typeof a.equals === "function" && a.equals(b) && typeof b.equals === "function" && b.equals(a);
  }
  switch (typeA) {
    case "Arguments":
    case "Array":
    case "Object":
      if (typeof a.constructor === "function" && _functionName(a.constructor) === "Promise") {
        return a === b;
      }
      break;
    case "Boolean":
    case "Number":
    case "String":
      if (!(typeof a === typeof b && _objectIs$1(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case "Date":
      if (!_objectIs$1(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case "Error":
      return a.name === b.name && a.message === b.message;
    case "RegExp":
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }
      break;
  }
  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }
  switch (typeA) {
    case "Map":
      if (a.size !== b.size) {
        return false;
      }
      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
    case "Set":
      if (a.size !== b.size) {
        return false;
      }
      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
    case "Arguments":
    case "Array":
    case "Object":
    case "Boolean":
    case "Number":
    case "String":
    case "Date":
    case "Error":
    case "RegExp":
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "ArrayBuffer":
      break;
    default:
      return false;
  }
  var keysA = keys$1(a);
  if (keysA.length !== keys$1(b).length) {
    return false;
  }
  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);
  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }
    idx -= 1;
  }
  return true;
}
var equals = /* @__PURE__ */ _curry2(function equals2(a, b) {
  return _equals(a, b, [], []);
});
var equals$1 = equals;
function _indexOf(list, a, idx) {
  var inf, item;
  if (typeof list.indexOf === "function") {
    switch (typeof a) {
      case "number":
        if (a === 0) {
          inf = 1 / a;
          while (idx < list.length) {
            item = list[idx];
            if (item === 0 && 1 / item === inf) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        } else if (a !== a) {
          while (idx < list.length) {
            item = list[idx];
            if (typeof item === "number" && item !== item) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        }
        return list.indexOf(a, idx);
      case "string":
      case "boolean":
      case "function":
      case "undefined":
        return list.indexOf(a, idx);
      case "object":
        if (a === null) {
          return list.indexOf(a, idx);
        }
    }
  }
  while (idx < list.length) {
    if (equals$1(list[idx], a)) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}
function _includes(a, list) {
  return _indexOf(list, a, 0) >= 0;
}
function _quote(s) {
  var escaped = s.replace(/\\/g, "\\\\").replace(/[\b]/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\v/g, "\\v").replace(/\0/g, "\\0");
  return '"' + escaped.replace(/"/g, '\\"') + '"';
}
var pad = function pad2(n) {
  return (n < 10 ? "0" : "") + n;
};
var _toISOString = typeof Date.prototype.toISOString === "function" ? function _toISOString2(d) {
  return d.toISOString();
} : function _toISOString3(d) {
  return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "." + (d.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
};
var _toISOString$1 = _toISOString;
function _complement(f) {
  return function() {
    return !f.apply(this, arguments);
  };
}
function _filter(fn2, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  while (idx < len) {
    if (fn2(list[idx])) {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
}
function _isObject(x) {
  return Object.prototype.toString.call(x) === "[object Object]";
}
var XFilter = /* @__PURE__ */ function() {
  function XFilter2(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFilter2.prototype["@@transducer/init"] = _xfBase.init;
  XFilter2.prototype["@@transducer/result"] = _xfBase.result;
  XFilter2.prototype["@@transducer/step"] = function(result, input) {
    return this.f(input) ? this.xf["@@transducer/step"](result, input) : result;
  };
  return XFilter2;
}();
var _xfilter = /* @__PURE__ */ _curry2(function _xfilter2(f, xf) {
  return new XFilter(f, xf);
});
var _xfilter$1 = _xfilter;
var filter = /* @__PURE__ */ _curry2(/* @__PURE__ */ _dispatchable(["fantasy-land/filter", "filter"], _xfilter$1, function(pred, filterable) {
  return _isObject(filterable) ? _reduce(function(acc, key) {
    if (pred(filterable[key])) {
      acc[key] = filterable[key];
    }
    return acc;
  }, {}, keys$1(filterable)) : _filter(pred, filterable);
}));
var filter$1 = filter;
var reject = /* @__PURE__ */ _curry2(function reject2(pred, filterable) {
  return filter$1(_complement(pred), filterable);
});
var reject$1 = reject;
function _toString(x, seen) {
  var recur = function recur2(y) {
    var xs = seen.concat([x]);
    return _includes(y, xs) ? "<Circular>" : _toString(y, xs);
  };
  var mapPairs = function(obj, keys4) {
    return _map(function(k) {
      return _quote(k) + ": " + recur(obj[k]);
    }, keys4.slice().sort());
  };
  switch (Object.prototype.toString.call(x)) {
    case "[object Arguments]":
      return "(function() { return arguments; }(" + _map(recur, x).join(", ") + "))";
    case "[object Array]":
      return "[" + _map(recur, x).concat(mapPairs(x, reject$1(function(k) {
        return /^\d+$/.test(k);
      }, keys$1(x)))).join(", ") + "]";
    case "[object Boolean]":
      return typeof x === "object" ? "new Boolean(" + recur(x.valueOf()) + ")" : x.toString();
    case "[object Date]":
      return "new Date(" + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString$1(x))) + ")";
    case "[object Null]":
      return "null";
    case "[object Number]":
      return typeof x === "object" ? "new Number(" + recur(x.valueOf()) + ")" : 1 / x === -Infinity ? "-0" : x.toString(10);
    case "[object String]":
      return typeof x === "object" ? "new String(" + recur(x.valueOf()) + ")" : _quote(x);
    case "[object Undefined]":
      return "undefined";
    default:
      if (typeof x.toString === "function") {
        var repr = x.toString();
        if (repr !== "[object Object]") {
          return repr;
        }
      }
      return "{" + mapPairs(x, keys$1(x)).join(", ") + "}";
  }
}
var toString = /* @__PURE__ */ _curry1(function toString2(val) {
  return _toString(val, []);
});
var toString$1 = toString;
function _objectAssign(target) {
  if (target == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  var output = Object(target);
  var idx = 1;
  var length = arguments.length;
  while (idx < length) {
    var source = arguments[idx];
    if (source != null) {
      for (var nextKey in source) {
        if (_has(nextKey, source)) {
          output[nextKey] = source[nextKey];
        }
      }
    }
    idx += 1;
  }
  return output;
}
var _objectAssign$1 = typeof Object.assign === "function" ? Object.assign : _objectAssign;
var lens = /* @__PURE__ */ _curry2(function lens2(getter, setter) {
  return function(toFunctorFn) {
    return function(target) {
      return map$1(function(focus) {
        return setter(focus, target);
      }, toFunctorFn(getter(target)));
    };
  };
});
var lens$1 = lens;
var paths = /* @__PURE__ */ _curry2(function paths2(pathsArray, obj) {
  return pathsArray.map(function(paths3) {
    var val = obj;
    var idx = 0;
    var p2;
    while (idx < paths3.length) {
      if (val == null) {
        return;
      }
      p2 = paths3[idx];
      val = _isInteger(p2) ? nth$1(p2, val) : val[p2];
      idx += 1;
    }
    return val;
  });
});
var paths$1 = paths;
var path = /* @__PURE__ */ _curry2(function path2(pathAr, obj) {
  return paths$1([pathAr], obj)[0];
});
var path$1 = path;
var lensPath = /* @__PURE__ */ _curry1(function lensPath2(p2) {
  return lens$1(path$1(p2), assocPath$1(p2));
});
var lensPath$1 = lensPath;
var lensProp = /* @__PURE__ */ _curry1(function lensProp2(k) {
  return lens$1(prop$1(k), assoc$1(k));
});
var lensProp$1 = lensProp;
var match = /* @__PURE__ */ _curry2(function match2(rx, str) {
  return str.match(rx) || [];
});
var match$1 = match;
var mergeAll = /* @__PURE__ */ _curry1(function mergeAll2(list) {
  return _objectAssign$1.apply(null, [{}].concat(list));
});
var mergeAll$1 = mergeAll;
var mergeWithKey = /* @__PURE__ */ _curry3(function mergeWithKey2(fn2, l, r) {
  var result = {};
  var k;
  for (k in l) {
    if (_has(k, l)) {
      result[k] = _has(k, r) ? fn2(k, l[k], r[k]) : l[k];
    }
  }
  for (k in r) {
    if (_has(k, r) && !_has(k, result)) {
      result[k] = r[k];
    }
  }
  return result;
});
var mergeWithKey$1 = mergeWithKey;
var mergeRight = /* @__PURE__ */ _curry2(function mergeRight2(l, r) {
  return _objectAssign$1({}, l, r);
});
var mergeRight$1 = mergeRight;
var mergeWith = /* @__PURE__ */ _curry3(function mergeWith2(fn2, l, r) {
  return mergeWithKey$1(function(_, _l, _r) {
    return fn2(_l, _r);
  }, l, r);
});
var mergeWith$1 = mergeWith;
var omit = /* @__PURE__ */ _curry2(function omit2(names, obj) {
  var result = {};
  var index = {};
  var idx = 0;
  var len = names.length;
  while (idx < len) {
    index[names[idx]] = 1;
    idx += 1;
  }
  for (var prop3 in obj) {
    if (!index.hasOwnProperty(prop3)) {
      result[prop3] = obj[prop3];
    }
  }
  return result;
});
var omit$1 = omit;
var Identity = function(x) {
  return {
    value: x,
    map: function(f) {
      return Identity(f(x));
    }
  };
};
var over = /* @__PURE__ */ _curry3(function over2(lens3, f, x) {
  return lens3(function(y) {
    return Identity(f(y));
  })(x).value;
});
var over$1 = over;
var set = /* @__PURE__ */ _curry3(function set2(lens3, v, x) {
  return over$1(lens3, always$1(v), x);
});
var set$1 = set;
function _isRegExp(x) {
  return Object.prototype.toString.call(x) === "[object RegExp]";
}
var test = /* @__PURE__ */ _curry2(function test2(pattern, str) {
  if (!_isRegExp(pattern)) {
    throw new TypeError("\u2018test\u2019 requires a value of type RegExp as its first argument; received " + toString$1(pattern));
  }
  return _cloneRegExp(pattern).test(str);
});
var test$1 = test;
var Const = function(x) {
  return {
    value: x,
    "fantasy-land/map": function() {
      return this;
    }
  };
};
var view = /* @__PURE__ */ _curry2(function view2(lens3, x) {
  return lens3(Const)(x).value;
});
var view$1 = view;
var localforage = { exports: {} };
/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
(function(module, exports) {
  (function(f) {
    {
      module.exports = f();
    }
  })(function() {
    return function e(t, n, r) {
      function s(o2, u) {
        if (!n[o2]) {
          if (!t[o2]) {
            var a = typeof commonjsRequire == "function" && commonjsRequire;
            if (!u && a)
              return a(o2, true);
            if (i)
              return i(o2, true);
            var f = new Error("Cannot find module '" + o2 + "'");
            throw f.code = "MODULE_NOT_FOUND", f;
          }
          var l = n[o2] = { exports: {} };
          t[o2][0].call(l.exports, function(e2) {
            var n2 = t[o2][1][e2];
            return s(n2 ? n2 : e2);
          }, l, l.exports, e, t, n, r);
        }
        return n[o2].exports;
      }
      var i = typeof commonjsRequire == "function" && commonjsRequire;
      for (var o = 0; o < r.length; o++)
        s(r[o]);
      return s;
    }({ 1: [function(_dereq_, module2, exports2) {
      (function(global2) {
        var Mutation = global2.MutationObserver || global2.WebKitMutationObserver;
        var scheduleDrain;
        {
          if (Mutation) {
            var called = 0;
            var observer = new Mutation(nextTick2);
            var element = global2.document.createTextNode("");
            observer.observe(element, {
              characterData: true
            });
            scheduleDrain = function() {
              element.data = called = ++called % 2;
            };
          } else if (!global2.setImmediate && typeof global2.MessageChannel !== "undefined") {
            var channel = new global2.MessageChannel();
            channel.port1.onmessage = nextTick2;
            scheduleDrain = function() {
              channel.port2.postMessage(0);
            };
          } else if ("document" in global2 && "onreadystatechange" in global2.document.createElement("script")) {
            scheduleDrain = function() {
              var scriptEl = global2.document.createElement("script");
              scriptEl.onreadystatechange = function() {
                nextTick2();
                scriptEl.onreadystatechange = null;
                scriptEl.parentNode.removeChild(scriptEl);
                scriptEl = null;
              };
              global2.document.documentElement.appendChild(scriptEl);
            };
          } else {
            scheduleDrain = function() {
              setTimeout(nextTick2, 0);
            };
          }
        }
        var draining;
        var queue2 = [];
        function nextTick2() {
          draining = true;
          var i, oldQueue;
          var len = queue2.length;
          while (len) {
            oldQueue = queue2;
            queue2 = [];
            i = -1;
            while (++i < len) {
              oldQueue[i]();
            }
            len = queue2.length;
          }
          draining = false;
        }
        module2.exports = immediate;
        function immediate(task) {
          if (queue2.push(task) === 1 && !draining) {
            scheduleDrain();
          }
        }
      }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}], 2: [function(_dereq_, module2, exports2) {
      var immediate = _dereq_(1);
      function INTERNAL() {
      }
      var handlers = {};
      var REJECTED = ["REJECTED"];
      var FULFILLED = ["FULFILLED"];
      var PENDING = ["PENDING"];
      module2.exports = Promise2;
      function Promise2(resolver) {
        if (typeof resolver !== "function") {
          throw new TypeError("resolver must be a function");
        }
        this.state = PENDING;
        this.queue = [];
        this.outcome = void 0;
        if (resolver !== INTERNAL) {
          safelyResolveThenable(this, resolver);
        }
      }
      Promise2.prototype["catch"] = function(onRejected) {
        return this.then(null, onRejected);
      };
      Promise2.prototype.then = function(onFulfilled, onRejected) {
        if (typeof onFulfilled !== "function" && this.state === FULFILLED || typeof onRejected !== "function" && this.state === REJECTED) {
          return this;
        }
        var promise = new this.constructor(INTERNAL);
        if (this.state !== PENDING) {
          var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
          unwrap(promise, resolver, this.outcome);
        } else {
          this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
        }
        return promise;
      };
      function QueueItem(promise, onFulfilled, onRejected) {
        this.promise = promise;
        if (typeof onFulfilled === "function") {
          this.onFulfilled = onFulfilled;
          this.callFulfilled = this.otherCallFulfilled;
        }
        if (typeof onRejected === "function") {
          this.onRejected = onRejected;
          this.callRejected = this.otherCallRejected;
        }
      }
      QueueItem.prototype.callFulfilled = function(value) {
        handlers.resolve(this.promise, value);
      };
      QueueItem.prototype.otherCallFulfilled = function(value) {
        unwrap(this.promise, this.onFulfilled, value);
      };
      QueueItem.prototype.callRejected = function(value) {
        handlers.reject(this.promise, value);
      };
      QueueItem.prototype.otherCallRejected = function(value) {
        unwrap(this.promise, this.onRejected, value);
      };
      function unwrap(promise, func, value) {
        immediate(function() {
          var returnValue;
          try {
            returnValue = func(value);
          } catch (e) {
            return handlers.reject(promise, e);
          }
          if (returnValue === promise) {
            handlers.reject(promise, new TypeError("Cannot resolve promise with itself"));
          } else {
            handlers.resolve(promise, returnValue);
          }
        });
      }
      handlers.resolve = function(self2, value) {
        var result = tryCatch(getThen, value);
        if (result.status === "error") {
          return handlers.reject(self2, result.value);
        }
        var thenable = result.value;
        if (thenable) {
          safelyResolveThenable(self2, thenable);
        } else {
          self2.state = FULFILLED;
          self2.outcome = value;
          var i = -1;
          var len = self2.queue.length;
          while (++i < len) {
            self2.queue[i].callFulfilled(value);
          }
        }
        return self2;
      };
      handlers.reject = function(self2, error) {
        self2.state = REJECTED;
        self2.outcome = error;
        var i = -1;
        var len = self2.queue.length;
        while (++i < len) {
          self2.queue[i].callRejected(error);
        }
        return self2;
      };
      function getThen(obj) {
        var then = obj && obj.then;
        if (obj && (typeof obj === "object" || typeof obj === "function") && typeof then === "function") {
          return function appyThen() {
            then.apply(obj, arguments);
          };
        }
      }
      function safelyResolveThenable(self2, thenable) {
        var called = false;
        function onError(value) {
          if (called) {
            return;
          }
          called = true;
          handlers.reject(self2, value);
        }
        function onSuccess(value) {
          if (called) {
            return;
          }
          called = true;
          handlers.resolve(self2, value);
        }
        function tryToUnwrap() {
          thenable(onSuccess, onError);
        }
        var result = tryCatch(tryToUnwrap);
        if (result.status === "error") {
          onError(result.value);
        }
      }
      function tryCatch(func, value) {
        var out = {};
        try {
          out.value = func(value);
          out.status = "success";
        } catch (e) {
          out.status = "error";
          out.value = e;
        }
        return out;
      }
      Promise2.resolve = resolve2;
      function resolve2(value) {
        if (value instanceof this) {
          return value;
        }
        return handlers.resolve(new this(INTERNAL), value);
      }
      Promise2.reject = reject3;
      function reject3(reason) {
        var promise = new this(INTERNAL);
        return handlers.reject(promise, reason);
      }
      Promise2.all = all;
      function all(iterable) {
        var self2 = this;
        if (Object.prototype.toString.call(iterable) !== "[object Array]") {
          return this.reject(new TypeError("must be an array"));
        }
        var len = iterable.length;
        var called = false;
        if (!len) {
          return this.resolve([]);
        }
        var values = new Array(len);
        var resolved = 0;
        var i = -1;
        var promise = new this(INTERNAL);
        while (++i < len) {
          allResolver(iterable[i], i);
        }
        return promise;
        function allResolver(value, i2) {
          self2.resolve(value).then(resolveFromAll, function(error) {
            if (!called) {
              called = true;
              handlers.reject(promise, error);
            }
          });
          function resolveFromAll(outValue) {
            values[i2] = outValue;
            if (++resolved === len && !called) {
              called = true;
              handlers.resolve(promise, values);
            }
          }
        }
      }
      Promise2.race = race;
      function race(iterable) {
        var self2 = this;
        if (Object.prototype.toString.call(iterable) !== "[object Array]") {
          return this.reject(new TypeError("must be an array"));
        }
        var len = iterable.length;
        var called = false;
        if (!len) {
          return this.resolve([]);
        }
        var i = -1;
        var promise = new this(INTERNAL);
        while (++i < len) {
          resolver(iterable[i]);
        }
        return promise;
        function resolver(value) {
          self2.resolve(value).then(function(response) {
            if (!called) {
              called = true;
              handlers.resolve(promise, response);
            }
          }, function(error) {
            if (!called) {
              called = true;
              handlers.reject(promise, error);
            }
          });
        }
      }
    }, { "1": 1 }], 3: [function(_dereq_, module2, exports2) {
      (function(global2) {
        if (typeof global2.Promise !== "function") {
          global2.Promise = _dereq_(2);
        }
      }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "2": 2 }], 4: [function(_dereq_, module2, exports2) {
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function getIDB() {
        try {
          if (typeof indexedDB !== "undefined") {
            return indexedDB;
          }
          if (typeof webkitIndexedDB !== "undefined") {
            return webkitIndexedDB;
          }
          if (typeof mozIndexedDB !== "undefined") {
            return mozIndexedDB;
          }
          if (typeof OIndexedDB !== "undefined") {
            return OIndexedDB;
          }
          if (typeof msIndexedDB !== "undefined") {
            return msIndexedDB;
          }
        } catch (e) {
          return;
        }
      }
      var idb = getIDB();
      function isIndexedDBValid() {
        try {
          if (!idb || !idb.open) {
            return false;
          }
          var isSafari = typeof openDatabase !== "undefined" && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
          var hasFetch = typeof fetch === "function" && fetch.toString().indexOf("[native code") !== -1;
          return (!isSafari || hasFetch) && typeof indexedDB !== "undefined" && typeof IDBKeyRange !== "undefined";
        } catch (e) {
          return false;
        }
      }
      function createBlob(parts, properties) {
        parts = parts || [];
        properties = properties || {};
        try {
          return new Blob(parts, properties);
        } catch (e) {
          if (e.name !== "TypeError") {
            throw e;
          }
          var Builder = typeof BlobBuilder !== "undefined" ? BlobBuilder : typeof MSBlobBuilder !== "undefined" ? MSBlobBuilder : typeof MozBlobBuilder !== "undefined" ? MozBlobBuilder : WebKitBlobBuilder;
          var builder = new Builder();
          for (var i = 0; i < parts.length; i += 1) {
            builder.append(parts[i]);
          }
          return builder.getBlob(properties.type);
        }
      }
      if (typeof Promise === "undefined") {
        _dereq_(3);
      }
      var Promise$1 = Promise;
      function executeCallback(promise, callback) {
        if (callback) {
          promise.then(function(result) {
            callback(null, result);
          }, function(error) {
            callback(error);
          });
        }
      }
      function executeTwoCallbacks(promise, callback, errorCallback) {
        if (typeof callback === "function") {
          promise.then(callback);
        }
        if (typeof errorCallback === "function") {
          promise["catch"](errorCallback);
        }
      }
      function normalizeKey2(key2) {
        if (typeof key2 !== "string") {
          console.warn(key2 + " used as a key, but it is not a string.");
          key2 = String(key2);
        }
        return key2;
      }
      function getCallback() {
        if (arguments.length && typeof arguments[arguments.length - 1] === "function") {
          return arguments[arguments.length - 1];
        }
      }
      var DETECT_BLOB_SUPPORT_STORE = "local-forage-detect-blob-support";
      var supportsBlobs = void 0;
      var dbContexts = {};
      var toString3 = Object.prototype.toString;
      var READ_ONLY = "readonly";
      var READ_WRITE = "readwrite";
      function _binStringToArrayBuffer(bin) {
        var length2 = bin.length;
        var buf = new ArrayBuffer(length2);
        var arr = new Uint8Array(buf);
        for (var i = 0; i < length2; i++) {
          arr[i] = bin.charCodeAt(i);
        }
        return buf;
      }
      function _checkBlobSupportWithoutCaching(idb2) {
        return new Promise$1(function(resolve2) {
          var txn = idb2.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
          var blob = createBlob([""]);
          txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, "key");
          txn.onabort = function(e) {
            e.preventDefault();
            e.stopPropagation();
            resolve2(false);
          };
          txn.oncomplete = function() {
            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
            var matchedEdge = navigator.userAgent.match(/Edge\//);
            resolve2(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
          };
        })["catch"](function() {
          return false;
        });
      }
      function _checkBlobSupport(idb2) {
        if (typeof supportsBlobs === "boolean") {
          return Promise$1.resolve(supportsBlobs);
        }
        return _checkBlobSupportWithoutCaching(idb2).then(function(value) {
          supportsBlobs = value;
          return supportsBlobs;
        });
      }
      function _deferReadiness(dbInfo) {
        var dbContext = dbContexts[dbInfo.name];
        var deferredOperation = {};
        deferredOperation.promise = new Promise$1(function(resolve2, reject3) {
          deferredOperation.resolve = resolve2;
          deferredOperation.reject = reject3;
        });
        dbContext.deferredOperations.push(deferredOperation);
        if (!dbContext.dbReady) {
          dbContext.dbReady = deferredOperation.promise;
        } else {
          dbContext.dbReady = dbContext.dbReady.then(function() {
            return deferredOperation.promise;
          });
        }
      }
      function _advanceReadiness(dbInfo) {
        var dbContext = dbContexts[dbInfo.name];
        var deferredOperation = dbContext.deferredOperations.pop();
        if (deferredOperation) {
          deferredOperation.resolve();
          return deferredOperation.promise;
        }
      }
      function _rejectReadiness(dbInfo, err) {
        var dbContext = dbContexts[dbInfo.name];
        var deferredOperation = dbContext.deferredOperations.pop();
        if (deferredOperation) {
          deferredOperation.reject(err);
          return deferredOperation.promise;
        }
      }
      function _getConnection(dbInfo, upgradeNeeded) {
        return new Promise$1(function(resolve2, reject3) {
          dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();
          if (dbInfo.db) {
            if (upgradeNeeded) {
              _deferReadiness(dbInfo);
              dbInfo.db.close();
            } else {
              return resolve2(dbInfo.db);
            }
          }
          var dbArgs = [dbInfo.name];
          if (upgradeNeeded) {
            dbArgs.push(dbInfo.version);
          }
          var openreq = idb.open.apply(idb, dbArgs);
          if (upgradeNeeded) {
            openreq.onupgradeneeded = function(e) {
              var db = openreq.result;
              try {
                db.createObjectStore(dbInfo.storeName);
                if (e.oldVersion <= 1) {
                  db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                }
              } catch (ex) {
                if (ex.name === "ConstraintError") {
                  console.warn('The database "' + dbInfo.name + '" has been upgraded from version ' + e.oldVersion + " to version " + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                } else {
                  throw ex;
                }
              }
            };
          }
          openreq.onerror = function(e) {
            e.preventDefault();
            reject3(openreq.error);
          };
          openreq.onsuccess = function() {
            var db = openreq.result;
            db.onversionchange = function(e) {
              e.target.close();
            };
            resolve2(db);
            _advanceReadiness(dbInfo);
          };
        });
      }
      function _getOriginalConnection(dbInfo) {
        return _getConnection(dbInfo, false);
      }
      function _getUpgradedConnection(dbInfo) {
        return _getConnection(dbInfo, true);
      }
      function _isUpgradeNeeded(dbInfo, defaultVersion) {
        if (!dbInfo.db) {
          return true;
        }
        var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
        var isDowngrade = dbInfo.version < dbInfo.db.version;
        var isUpgrade = dbInfo.version > dbInfo.db.version;
        if (isDowngrade) {
          if (dbInfo.version !== defaultVersion) {
            console.warn('The database "' + dbInfo.name + `" can't be downgraded from version ` + dbInfo.db.version + " to version " + dbInfo.version + ".");
          }
          dbInfo.version = dbInfo.db.version;
        }
        if (isUpgrade || isNewStore) {
          if (isNewStore) {
            var incVersion = dbInfo.db.version + 1;
            if (incVersion > dbInfo.version) {
              dbInfo.version = incVersion;
            }
          }
          return true;
        }
        return false;
      }
      function _encodeBlob(blob) {
        return new Promise$1(function(resolve2, reject3) {
          var reader = new FileReader();
          reader.onerror = reject3;
          reader.onloadend = function(e) {
            var base64 = btoa(e.target.result || "");
            resolve2({
              __local_forage_encoded_blob: true,
              data: base64,
              type: blob.type
            });
          };
          reader.readAsBinaryString(blob);
        });
      }
      function _decodeBlob(encodedBlob) {
        var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
        return createBlob([arrayBuff], { type: encodedBlob.type });
      }
      function _isEncodedBlob(value) {
        return value && value.__local_forage_encoded_blob;
      }
      function _fullyReady(callback) {
        var self2 = this;
        var promise = self2._initReady().then(function() {
          var dbContext = dbContexts[self2._dbInfo.name];
          if (dbContext && dbContext.dbReady) {
            return dbContext.dbReady;
          }
        });
        executeTwoCallbacks(promise, callback, callback);
        return promise;
      }
      function _tryReconnect(dbInfo) {
        _deferReadiness(dbInfo);
        var dbContext = dbContexts[dbInfo.name];
        var forages = dbContext.forages;
        for (var i = 0; i < forages.length; i++) {
          var forage = forages[i];
          if (forage._dbInfo.db) {
            forage._dbInfo.db.close();
            forage._dbInfo.db = null;
          }
        }
        dbInfo.db = null;
        return _getOriginalConnection(dbInfo).then(function(db) {
          dbInfo.db = db;
          if (_isUpgradeNeeded(dbInfo)) {
            return _getUpgradedConnection(dbInfo);
          }
          return db;
        }).then(function(db) {
          dbInfo.db = dbContext.db = db;
          for (var i2 = 0; i2 < forages.length; i2++) {
            forages[i2]._dbInfo.db = db;
          }
        })["catch"](function(err) {
          _rejectReadiness(dbInfo, err);
          throw err;
        });
      }
      function createTransaction(dbInfo, mode, callback, retries) {
        if (retries === void 0) {
          retries = 1;
        }
        try {
          var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
          callback(null, tx);
        } catch (err) {
          if (retries > 0 && (!dbInfo.db || err.name === "InvalidStateError" || err.name === "NotFoundError")) {
            return Promise$1.resolve().then(function() {
              if (!dbInfo.db || err.name === "NotFoundError" && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                if (dbInfo.db) {
                  dbInfo.version = dbInfo.db.version + 1;
                }
                return _getUpgradedConnection(dbInfo);
              }
            }).then(function() {
              return _tryReconnect(dbInfo).then(function() {
                createTransaction(dbInfo, mode, callback, retries - 1);
              });
            })["catch"](callback);
          }
          callback(err);
        }
      }
      function createDbContext() {
        return {
          forages: [],
          db: null,
          dbReady: null,
          deferredOperations: []
        };
      }
      function _initStorage(options2) {
        var self2 = this;
        var dbInfo = {
          db: null
        };
        if (options2) {
          for (var i in options2) {
            dbInfo[i] = options2[i];
          }
        }
        var dbContext = dbContexts[dbInfo.name];
        if (!dbContext) {
          dbContext = createDbContext();
          dbContexts[dbInfo.name] = dbContext;
        }
        dbContext.forages.push(self2);
        if (!self2._initReady) {
          self2._initReady = self2.ready;
          self2.ready = _fullyReady;
        }
        var initPromises = [];
        function ignoreErrors() {
          return Promise$1.resolve();
        }
        for (var j = 0; j < dbContext.forages.length; j++) {
          var forage = dbContext.forages[j];
          if (forage !== self2) {
            initPromises.push(forage._initReady()["catch"](ignoreErrors));
          }
        }
        var forages = dbContext.forages.slice(0);
        return Promise$1.all(initPromises).then(function() {
          dbInfo.db = dbContext.db;
          return _getOriginalConnection(dbInfo);
        }).then(function(db) {
          dbInfo.db = db;
          if (_isUpgradeNeeded(dbInfo, self2._defaultConfig.version)) {
            return _getUpgradedConnection(dbInfo);
          }
          return db;
        }).then(function(db) {
          dbInfo.db = dbContext.db = db;
          self2._dbInfo = dbInfo;
          for (var k = 0; k < forages.length; k++) {
            var forage2 = forages[k];
            if (forage2 !== self2) {
              forage2._dbInfo.db = dbInfo.db;
              forage2._dbInfo.version = dbInfo.version;
            }
          }
        });
      }
      function getItem(key2, callback) {
        var self2 = this;
        key2 = normalizeKey2(key2);
        var promise = new Promise$1(function(resolve2, reject3) {
          self2.ready().then(function() {
            createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
              if (err) {
                return reject3(err);
              }
              try {
                var store = transaction.objectStore(self2._dbInfo.storeName);
                var req = store.get(key2);
                req.onsuccess = function() {
                  var value = req.result;
                  if (value === void 0) {
                    value = null;
                  }
                  if (_isEncodedBlob(value)) {
                    value = _decodeBlob(value);
                  }
                  resolve2(value);
                };
                req.onerror = function() {
                  reject3(req.error);
                };
              } catch (e) {
                reject3(e);
              }
            });
          })["catch"](reject3);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function iterate(iterator, callback) {
        var self2 = this;
        var promise = new Promise$1(function(resolve2, reject3) {
          self2.ready().then(function() {
            createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
              if (err) {
                return reject3(err);
              }
              try {
                var store = transaction.objectStore(self2._dbInfo.storeName);
                var req = store.openCursor();
                var iterationNumber = 1;
                req.onsuccess = function() {
                  var cursor = req.result;
                  if (cursor) {
                    var value = cursor.value;
                    if (_isEncodedBlob(value)) {
                      value = _decodeBlob(value);
                    }
                    var result = iterator(value, cursor.key, iterationNumber++);
                    if (result !== void 0) {
                      resolve2(result);
                    } else {
                      cursor["continue"]();
                    }
                  } else {
                    resolve2();
                  }
                };
                req.onerror = function() {
                  reject3(req.error);
                };
              } catch (e) {
                reject3(e);
              }
            });
          })["catch"](reject3);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function setItem(key2, value, callback) {
        var self2 = this;
        key2 = normalizeKey2(key2);
        var promise = new Promise$1(function(resolve2, reject3) {
          var dbInfo;
          self2.ready().then(function() {
            dbInfo = self2._dbInfo;
            if (toString3.call(value) === "[object Blob]") {
              return _checkBlobSupport(dbInfo.db).then(function(blobSupport) {
                if (blobSupport) {
                  return value;
                }
                return _encodeBlob(value);
              });
            }
            return value;
          }).then(function(value2) {
            createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
              if (err) {
                return reject3(err);
              }
              try {
                var store = transaction.objectStore(self2._dbInfo.storeName);
                if (value2 === null) {
                  value2 = void 0;
                }
                var req = store.put(value2, key2);
                transaction.oncomplete = function() {
                  if (value2 === void 0) {
                    value2 = null;
                  }
                  resolve2(value2);
                };
                transaction.onabort = transaction.onerror = function() {
                  var err2 = req.error ? req.error : req.transaction.error;
                  reject3(err2);
                };
              } catch (e) {
                reject3(e);
              }
            });
          })["catch"](reject3);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function removeItem(key2, callback) {
        var self2 = this;
        key2 = normalizeKey2(key2);
        var promise = new Promise$1(function(resolve2, reject3) {
          self2.ready().then(function() {
            createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
              if (err) {
                return reject3(err);
              }
              try {
                var store = transaction.objectStore(self2._dbInfo.storeName);
                var req = store["delete"](key2);
                transaction.oncomplete = function() {
                  resolve2();
                };
                transaction.onerror = function() {
                  reject3(req.error);
                };
                transaction.onabort = function() {
                  var err2 = req.error ? req.error : req.transaction.error;
                  reject3(err2);
                };
              } catch (e) {
                reject3(e);
              }
            });
          })["catch"](reject3);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function clear2(callback) {
        var self2 = this;
        var promise = new Promise$1(function(resolve2, reject3) {
          self2.ready().then(function() {
            createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
              if (err) {
                return reject3(err);
              }
              try {
                var store = transaction.objectStore(self2._dbInfo.storeName);
                var req = store.clear();
                transaction.oncomplete = function() {
                  resolve2();
                };
                transaction.onabort = transaction.onerror = function() {
                  var err2 = req.error ? req.error : req.transaction.error;
                  reject3(err2);
                };
              } catch (e) {
                reject3(e);
              }
            });
          })["catch"](reject3);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function length(callback) {
        var self2 = this;
        var promise = new Promise$1(function(resolve2, reject3) {
          self2.ready().then(function() {
            createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
              if (err) {
                return reject3(err);
              }
              try {
                var store = transaction.objectStore(self2._dbInfo.storeName);
                var req = store.count();
                req.onsuccess = function() {
                  resolve2(req.result);
                };
                req.onerror = function() {
                  reject3(req.error);
                };
              } catch (e) {
                reject3(e);
              }
            });
          })["catch"](reject3);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function key(n, callback) {
        var self2 = this;
        var promise = new Promise$1(function(resolve2, reject3) {
          if (n < 0) {
            resolve2(null);
            return;
          }
          self2.ready().then(function() {
            createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
              if (err) {
                return reject3(err);
              }
              try {
                var store = transaction.objectStore(self2._dbInfo.storeName);
                var advanced = false;
                var req = store.openKeyCursor();
                req.onsuccess = function() {
                  var cursor = req.result;
                  if (!cursor) {
                    resolve2(null);
                    return;
                  }
                  if (n === 0) {
                    resolve2(cursor.key);
                  } else {
                    if (!advanced) {
                      advanced = true;
                      cursor.advance(n);
                    } else {
                      resolve2(cursor.key);
                    }
                  }
                };
                req.onerror = function() {
                  reject3(req.error);
                };
              } catch (e) {
                reject3(e);
              }
            });
          })["catch"](reject3);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function keys4(callback) {
        var self2 = this;
        var promise = new Promise$1(function(resolve2, reject3) {
          self2.ready().then(function() {
            createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
              if (err) {
                return reject3(err);
              }
              try {
                var store = transaction.objectStore(self2._dbInfo.storeName);
                var req = store.openKeyCursor();
                var keys5 = [];
                req.onsuccess = function() {
                  var cursor = req.result;
                  if (!cursor) {
                    resolve2(keys5);
                    return;
                  }
                  keys5.push(cursor.key);
                  cursor["continue"]();
                };
                req.onerror = function() {
                  reject3(req.error);
                };
              } catch (e) {
                reject3(e);
              }
            });
          })["catch"](reject3);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function dropInstance(options2, callback) {
        callback = getCallback.apply(this, arguments);
        var currentConfig = this.config();
        options2 = typeof options2 !== "function" && options2 || {};
        if (!options2.name) {
          options2.name = options2.name || currentConfig.name;
          options2.storeName = options2.storeName || currentConfig.storeName;
        }
        var self2 = this;
        var promise;
        if (!options2.name) {
          promise = Promise$1.reject("Invalid arguments");
        } else {
          var isCurrentDb = options2.name === currentConfig.name && self2._dbInfo.db;
          var dbPromise = isCurrentDb ? Promise$1.resolve(self2._dbInfo.db) : _getOriginalConnection(options2).then(function(db) {
            var dbContext = dbContexts[options2.name];
            var forages = dbContext.forages;
            dbContext.db = db;
            for (var i = 0; i < forages.length; i++) {
              forages[i]._dbInfo.db = db;
            }
            return db;
          });
          if (!options2.storeName) {
            promise = dbPromise.then(function(db) {
              _deferReadiness(options2);
              var dbContext = dbContexts[options2.name];
              var forages = dbContext.forages;
              db.close();
              for (var i = 0; i < forages.length; i++) {
                var forage = forages[i];
                forage._dbInfo.db = null;
              }
              var dropDBPromise = new Promise$1(function(resolve2, reject3) {
                var req = idb.deleteDatabase(options2.name);
                req.onerror = function() {
                  var db2 = req.result;
                  if (db2) {
                    db2.close();
                  }
                  reject3(req.error);
                };
                req.onblocked = function() {
                  console.warn('dropInstance blocked for database "' + options2.name + '" until all open connections are closed');
                };
                req.onsuccess = function() {
                  var db2 = req.result;
                  if (db2) {
                    db2.close();
                  }
                  resolve2(db2);
                };
              });
              return dropDBPromise.then(function(db2) {
                dbContext.db = db2;
                for (var i2 = 0; i2 < forages.length; i2++) {
                  var _forage = forages[i2];
                  _advanceReadiness(_forage._dbInfo);
                }
              })["catch"](function(err) {
                (_rejectReadiness(options2, err) || Promise$1.resolve())["catch"](function() {
                });
                throw err;
              });
            });
          } else {
            promise = dbPromise.then(function(db) {
              if (!db.objectStoreNames.contains(options2.storeName)) {
                return;
              }
              var newVersion = db.version + 1;
              _deferReadiness(options2);
              var dbContext = dbContexts[options2.name];
              var forages = dbContext.forages;
              db.close();
              for (var i = 0; i < forages.length; i++) {
                var forage = forages[i];
                forage._dbInfo.db = null;
                forage._dbInfo.version = newVersion;
              }
              var dropObjectPromise = new Promise$1(function(resolve2, reject3) {
                var req = idb.open(options2.name, newVersion);
                req.onerror = function(err) {
                  var db2 = req.result;
                  db2.close();
                  reject3(err);
                };
                req.onupgradeneeded = function() {
                  var db2 = req.result;
                  db2.deleteObjectStore(options2.storeName);
                };
                req.onsuccess = function() {
                  var db2 = req.result;
                  db2.close();
                  resolve2(db2);
                };
              });
              return dropObjectPromise.then(function(db2) {
                dbContext.db = db2;
                for (var j = 0; j < forages.length; j++) {
                  var _forage2 = forages[j];
                  _forage2._dbInfo.db = db2;
                  _advanceReadiness(_forage2._dbInfo);
                }
              })["catch"](function(err) {
                (_rejectReadiness(options2, err) || Promise$1.resolve())["catch"](function() {
                });
                throw err;
              });
            });
          }
        }
        executeCallback(promise, callback);
        return promise;
      }
      var asyncStorage = {
        _driver: "asyncStorage",
        _initStorage,
        _support: isIndexedDBValid(),
        iterate,
        getItem,
        setItem,
        removeItem,
        clear: clear2,
        length,
        key,
        keys: keys4,
        dropInstance
      };
      function isWebSQLValid() {
        return typeof openDatabase === "function";
      }
      var BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var BLOB_TYPE_PREFIX = "~~local_forage_type~";
      var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
      var SERIALIZED_MARKER = "__lfsc__:";
      var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;
      var TYPE_ARRAYBUFFER = "arbf";
      var TYPE_BLOB = "blob";
      var TYPE_INT8ARRAY = "si08";
      var TYPE_UINT8ARRAY = "ui08";
      var TYPE_UINT8CLAMPEDARRAY = "uic8";
      var TYPE_INT16ARRAY = "si16";
      var TYPE_INT32ARRAY = "si32";
      var TYPE_UINT16ARRAY = "ur16";
      var TYPE_UINT32ARRAY = "ui32";
      var TYPE_FLOAT32ARRAY = "fl32";
      var TYPE_FLOAT64ARRAY = "fl64";
      var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
      var toString$12 = Object.prototype.toString;
      function stringToBuffer(serializedString) {
        var bufferLength = serializedString.length * 0.75;
        var len = serializedString.length;
        var i;
        var p2 = 0;
        var encoded1, encoded2, encoded3, encoded4;
        if (serializedString[serializedString.length - 1] === "=") {
          bufferLength--;
          if (serializedString[serializedString.length - 2] === "=") {
            bufferLength--;
          }
        }
        var buffer = new ArrayBuffer(bufferLength);
        var bytes = new Uint8Array(buffer);
        for (i = 0; i < len; i += 4) {
          encoded1 = BASE_CHARS.indexOf(serializedString[i]);
          encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
          encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
          encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);
          bytes[p2++] = encoded1 << 2 | encoded2 >> 4;
          bytes[p2++] = (encoded2 & 15) << 4 | encoded3 >> 2;
          bytes[p2++] = (encoded3 & 3) << 6 | encoded4 & 63;
        }
        return buffer;
      }
      function bufferToString(buffer) {
        var bytes = new Uint8Array(buffer);
        var base64String = "";
        var i;
        for (i = 0; i < bytes.length; i += 3) {
          base64String += BASE_CHARS[bytes[i] >> 2];
          base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
          base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
          base64String += BASE_CHARS[bytes[i + 2] & 63];
        }
        if (bytes.length % 3 === 2) {
          base64String = base64String.substring(0, base64String.length - 1) + "=";
        } else if (bytes.length % 3 === 1) {
          base64String = base64String.substring(0, base64String.length - 2) + "==";
        }
        return base64String;
      }
      function serialize(value, callback) {
        var valueType = "";
        if (value) {
          valueType = toString$12.call(value);
        }
        if (value && (valueType === "[object ArrayBuffer]" || value.buffer && toString$12.call(value.buffer) === "[object ArrayBuffer]")) {
          var buffer;
          var marker = SERIALIZED_MARKER;
          if (value instanceof ArrayBuffer) {
            buffer = value;
            marker += TYPE_ARRAYBUFFER;
          } else {
            buffer = value.buffer;
            if (valueType === "[object Int8Array]") {
              marker += TYPE_INT8ARRAY;
            } else if (valueType === "[object Uint8Array]") {
              marker += TYPE_UINT8ARRAY;
            } else if (valueType === "[object Uint8ClampedArray]") {
              marker += TYPE_UINT8CLAMPEDARRAY;
            } else if (valueType === "[object Int16Array]") {
              marker += TYPE_INT16ARRAY;
            } else if (valueType === "[object Uint16Array]") {
              marker += TYPE_UINT16ARRAY;
            } else if (valueType === "[object Int32Array]") {
              marker += TYPE_INT32ARRAY;
            } else if (valueType === "[object Uint32Array]") {
              marker += TYPE_UINT32ARRAY;
            } else if (valueType === "[object Float32Array]") {
              marker += TYPE_FLOAT32ARRAY;
            } else if (valueType === "[object Float64Array]") {
              marker += TYPE_FLOAT64ARRAY;
            } else {
              callback(new Error("Failed to get type for BinaryArray"));
            }
          }
          callback(marker + bufferToString(buffer));
        } else if (valueType === "[object Blob]") {
          var fileReader = new FileReader();
          fileReader.onload = function() {
            var str = BLOB_TYPE_PREFIX + value.type + "~" + bufferToString(this.result);
            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
          };
          fileReader.readAsArrayBuffer(value);
        } else {
          try {
            callback(JSON.stringify(value));
          } catch (e) {
            console.error("Couldn't convert value into a JSON string: ", value);
            callback(null, e);
          }
        }
      }
      function deserialize(value) {
        if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
          return JSON.parse(value);
        }
        var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
        var type3 = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
        var blobType;
        if (type3 === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
          var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
          blobType = matcher[1];
          serializedString = serializedString.substring(matcher[0].length);
        }
        var buffer = stringToBuffer(serializedString);
        switch (type3) {
          case TYPE_ARRAYBUFFER:
            return buffer;
          case TYPE_BLOB:
            return createBlob([buffer], { type: blobType });
          case TYPE_INT8ARRAY:
            return new Int8Array(buffer);
          case TYPE_UINT8ARRAY:
            return new Uint8Array(buffer);
          case TYPE_UINT8CLAMPEDARRAY:
            return new Uint8ClampedArray(buffer);
          case TYPE_INT16ARRAY:
            return new Int16Array(buffer);
          case TYPE_UINT16ARRAY:
            return new Uint16Array(buffer);
          case TYPE_INT32ARRAY:
            return new Int32Array(buffer);
          case TYPE_UINT32ARRAY:
            return new Uint32Array(buffer);
          case TYPE_FLOAT32ARRAY:
            return new Float32Array(buffer);
          case TYPE_FLOAT64ARRAY:
            return new Float64Array(buffer);
          default:
            throw new Error("Unkown type: " + type3);
        }
      }
      var localforageSerializer = {
        serialize,
        deserialize,
        stringToBuffer,
        bufferToString
      };
      function createDbTable(t, dbInfo, callback, errorCallback) {
        t.executeSql("CREATE TABLE IF NOT EXISTS " + dbInfo.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], callback, errorCallback);
      }
      function _initStorage$1(options2) {
        var self2 = this;
        var dbInfo = {
          db: null
        };
        if (options2) {
          for (var i in options2) {
            dbInfo[i] = typeof options2[i] !== "string" ? options2[i].toString() : options2[i];
          }
        }
        var dbInfoPromise = new Promise$1(function(resolve2, reject3) {
          try {
            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
          } catch (e) {
            return reject3(e);
          }
          dbInfo.db.transaction(function(t) {
            createDbTable(t, dbInfo, function() {
              self2._dbInfo = dbInfo;
              resolve2();
            }, function(t2, error) {
              reject3(error);
            });
          }, reject3);
        });
        dbInfo.serializer = localforageSerializer;
        return dbInfoPromise;
      }
      function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
        t.executeSql(sqlStatement, args, callback, function(t2, error) {
          if (error.code === error.SYNTAX_ERR) {
            t2.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [dbInfo.storeName], function(t3, results) {
              if (!results.rows.length) {
                createDbTable(t3, dbInfo, function() {
                  t3.executeSql(sqlStatement, args, callback, errorCallback);
                }, errorCallback);
              } else {
                errorCallback(t3, error);
              }
            }, errorCallback);
          } else {
            errorCallback(t2, error);
          }
        }, errorCallback);
      }
      function getItem$1(key2, callback) {
        var self2 = this;
        key2 = normalizeKey2(key2);
        var promise = new Promise$1(function(resolve2, reject3) {
          self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            dbInfo.db.transaction(function(t) {
              tryExecuteSql(t, dbInfo, "SELECT * FROM " + dbInfo.storeName + " WHERE key = ? LIMIT 1", [key2], function(t2, results) {
                var result = results.rows.length ? results.rows.item(0).value : null;
                if (result) {
                  result = dbInfo.serializer.deserialize(result);
                }
                resolve2(result);
              }, function(t2, error) {
                reject3(error);
              });
            });
          })["catch"](reject3);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function iterate$1(iterator, callback) {
        var self2 = this;
        var promise = new Promise$1(function(resolve2, reject3) {
          self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            dbInfo.db.transaction(function(t) {
              tryExecuteSql(t, dbInfo, "SELECT * FROM " + dbInfo.storeName, [], function(t2, results) {
                var rows = results.rows;
                var length2 = rows.length;
                for (var i = 0; i < length2; i++) {
                  var item = rows.item(i);
                  var result = item.value;
                  if (result) {
                    result = dbInfo.serializer.deserialize(result);
                  }
                  result = iterator(result, item.key, i + 1);
                  if (result !== void 0) {
                    resolve2(result);
                    return;
                  }
                }
                resolve2();
              }, function(t2, error) {
                reject3(error);
              });
            });
          })["catch"](reject3);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function _setItem(key2, value, callback, retriesLeft) {
        var self2 = this;
        key2 = normalizeKey2(key2);
        var promise = new Promise$1(function(resolve2, reject3) {
          self2.ready().then(function() {
            if (value === void 0) {
              value = null;
            }
            var originalValue = value;
            var dbInfo = self2._dbInfo;
            dbInfo.serializer.serialize(value, function(value2, error) {
              if (error) {
                reject3(error);
              } else {
                dbInfo.db.transaction(function(t) {
                  tryExecuteSql(t, dbInfo, "INSERT OR REPLACE INTO " + dbInfo.storeName + " (key, value) VALUES (?, ?)", [key2, value2], function() {
                    resolve2(originalValue);
                  }, function(t2, error2) {
                    reject3(error2);
                  });
                }, function(sqlError) {
                  if (sqlError.code === sqlError.QUOTA_ERR) {
                    if (retriesLeft > 0) {
                      resolve2(_setItem.apply(self2, [key2, originalValue, callback, retriesLeft - 1]));
                      return;
                    }
                    reject3(sqlError);
                  }
                });
              }
            });
          })["catch"](reject3);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function setItem$1(key2, value, callback) {
        return _setItem.apply(this, [key2, value, callback, 1]);
      }
      function removeItem$1(key2, callback) {
        var self2 = this;
        key2 = normalizeKey2(key2);
        var promise = new Promise$1(function(resolve2, reject3) {
          self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            dbInfo.db.transaction(function(t) {
              tryExecuteSql(t, dbInfo, "DELETE FROM " + dbInfo.storeName + " WHERE key = ?", [key2], function() {
                resolve2();
              }, function(t2, error) {
                reject3(error);
              });
            });
          })["catch"](reject3);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function clear$1(callback) {
        var self2 = this;
        var promise = new Promise$1(function(resolve2, reject3) {
          self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            dbInfo.db.transaction(function(t) {
              tryExecuteSql(t, dbInfo, "DELETE FROM " + dbInfo.storeName, [], function() {
                resolve2();
              }, function(t2, error) {
                reject3(error);
              });
            });
          })["catch"](reject3);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function length$1(callback) {
        var self2 = this;
        var promise = new Promise$1(function(resolve2, reject3) {
          self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            dbInfo.db.transaction(function(t) {
              tryExecuteSql(t, dbInfo, "SELECT COUNT(key) as c FROM " + dbInfo.storeName, [], function(t2, results) {
                var result = results.rows.item(0).c;
                resolve2(result);
              }, function(t2, error) {
                reject3(error);
              });
            });
          })["catch"](reject3);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function key$1(n, callback) {
        var self2 = this;
        var promise = new Promise$1(function(resolve2, reject3) {
          self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            dbInfo.db.transaction(function(t) {
              tryExecuteSql(t, dbInfo, "SELECT key FROM " + dbInfo.storeName + " WHERE id = ? LIMIT 1", [n + 1], function(t2, results) {
                var result = results.rows.length ? results.rows.item(0).key : null;
                resolve2(result);
              }, function(t2, error) {
                reject3(error);
              });
            });
          })["catch"](reject3);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function keys$12(callback) {
        var self2 = this;
        var promise = new Promise$1(function(resolve2, reject3) {
          self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            dbInfo.db.transaction(function(t) {
              tryExecuteSql(t, dbInfo, "SELECT key FROM " + dbInfo.storeName, [], function(t2, results) {
                var keys5 = [];
                for (var i = 0; i < results.rows.length; i++) {
                  keys5.push(results.rows.item(i).key);
                }
                resolve2(keys5);
              }, function(t2, error) {
                reject3(error);
              });
            });
          })["catch"](reject3);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function getAllStoreNames(db) {
        return new Promise$1(function(resolve2, reject3) {
          db.transaction(function(t) {
            t.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(t2, results) {
              var storeNames = [];
              for (var i = 0; i < results.rows.length; i++) {
                storeNames.push(results.rows.item(i).name);
              }
              resolve2({
                db,
                storeNames
              });
            }, function(t2, error) {
              reject3(error);
            });
          }, function(sqlError) {
            reject3(sqlError);
          });
        });
      }
      function dropInstance$1(options2, callback) {
        callback = getCallback.apply(this, arguments);
        var currentConfig = this.config();
        options2 = typeof options2 !== "function" && options2 || {};
        if (!options2.name) {
          options2.name = options2.name || currentConfig.name;
          options2.storeName = options2.storeName || currentConfig.storeName;
        }
        var self2 = this;
        var promise;
        if (!options2.name) {
          promise = Promise$1.reject("Invalid arguments");
        } else {
          promise = new Promise$1(function(resolve2) {
            var db;
            if (options2.name === currentConfig.name) {
              db = self2._dbInfo.db;
            } else {
              db = openDatabase(options2.name, "", "", 0);
            }
            if (!options2.storeName) {
              resolve2(getAllStoreNames(db));
            } else {
              resolve2({
                db,
                storeNames: [options2.storeName]
              });
            }
          }).then(function(operationInfo) {
            return new Promise$1(function(resolve2, reject3) {
              operationInfo.db.transaction(function(t) {
                function dropTable(storeName) {
                  return new Promise$1(function(resolve3, reject4) {
                    t.executeSql("DROP TABLE IF EXISTS " + storeName, [], function() {
                      resolve3();
                    }, function(t2, error) {
                      reject4(error);
                    });
                  });
                }
                var operations = [];
                for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                  operations.push(dropTable(operationInfo.storeNames[i]));
                }
                Promise$1.all(operations).then(function() {
                  resolve2();
                })["catch"](function(e) {
                  reject3(e);
                });
              }, function(sqlError) {
                reject3(sqlError);
              });
            });
          });
        }
        executeCallback(promise, callback);
        return promise;
      }
      var webSQLStorage = {
        _driver: "webSQLStorage",
        _initStorage: _initStorage$1,
        _support: isWebSQLValid(),
        iterate: iterate$1,
        getItem: getItem$1,
        setItem: setItem$1,
        removeItem: removeItem$1,
        clear: clear$1,
        length: length$1,
        key: key$1,
        keys: keys$12,
        dropInstance: dropInstance$1
      };
      function isLocalStorageValid() {
        try {
          return typeof localStorage !== "undefined" && "setItem" in localStorage && !!localStorage.setItem;
        } catch (e) {
          return false;
        }
      }
      function _getKeyPrefix(options2, defaultConfig) {
        var keyPrefix = options2.name + "/";
        if (options2.storeName !== defaultConfig.storeName) {
          keyPrefix += options2.storeName + "/";
        }
        return keyPrefix;
      }
      function checkIfLocalStorageThrows() {
        var localStorageTestKey = "_localforage_support_test";
        try {
          localStorage.setItem(localStorageTestKey, true);
          localStorage.removeItem(localStorageTestKey);
          return false;
        } catch (e) {
          return true;
        }
      }
      function _isLocalStorageUsable() {
        return !checkIfLocalStorageThrows() || localStorage.length > 0;
      }
      function _initStorage$2(options2) {
        var self2 = this;
        var dbInfo = {};
        if (options2) {
          for (var i in options2) {
            dbInfo[i] = options2[i];
          }
        }
        dbInfo.keyPrefix = _getKeyPrefix(options2, self2._defaultConfig);
        if (!_isLocalStorageUsable()) {
          return Promise$1.reject();
        }
        self2._dbInfo = dbInfo;
        dbInfo.serializer = localforageSerializer;
        return Promise$1.resolve();
      }
      function clear$2(callback) {
        var self2 = this;
        var promise = self2.ready().then(function() {
          var keyPrefix = self2._dbInfo.keyPrefix;
          for (var i = localStorage.length - 1; i >= 0; i--) {
            var key2 = localStorage.key(i);
            if (key2.indexOf(keyPrefix) === 0) {
              localStorage.removeItem(key2);
            }
          }
        });
        executeCallback(promise, callback);
        return promise;
      }
      function getItem$2(key2, callback) {
        var self2 = this;
        key2 = normalizeKey2(key2);
        var promise = self2.ready().then(function() {
          var dbInfo = self2._dbInfo;
          var result = localStorage.getItem(dbInfo.keyPrefix + key2);
          if (result) {
            result = dbInfo.serializer.deserialize(result);
          }
          return result;
        });
        executeCallback(promise, callback);
        return promise;
      }
      function iterate$2(iterator, callback) {
        var self2 = this;
        var promise = self2.ready().then(function() {
          var dbInfo = self2._dbInfo;
          var keyPrefix = dbInfo.keyPrefix;
          var keyPrefixLength = keyPrefix.length;
          var length2 = localStorage.length;
          var iterationNumber = 1;
          for (var i = 0; i < length2; i++) {
            var key2 = localStorage.key(i);
            if (key2.indexOf(keyPrefix) !== 0) {
              continue;
            }
            var value = localStorage.getItem(key2);
            if (value) {
              value = dbInfo.serializer.deserialize(value);
            }
            value = iterator(value, key2.substring(keyPrefixLength), iterationNumber++);
            if (value !== void 0) {
              return value;
            }
          }
        });
        executeCallback(promise, callback);
        return promise;
      }
      function key$2(n, callback) {
        var self2 = this;
        var promise = self2.ready().then(function() {
          var dbInfo = self2._dbInfo;
          var result;
          try {
            result = localStorage.key(n);
          } catch (error) {
            result = null;
          }
          if (result) {
            result = result.substring(dbInfo.keyPrefix.length);
          }
          return result;
        });
        executeCallback(promise, callback);
        return promise;
      }
      function keys$2(callback) {
        var self2 = this;
        var promise = self2.ready().then(function() {
          var dbInfo = self2._dbInfo;
          var length2 = localStorage.length;
          var keys5 = [];
          for (var i = 0; i < length2; i++) {
            var itemKey = localStorage.key(i);
            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
              keys5.push(itemKey.substring(dbInfo.keyPrefix.length));
            }
          }
          return keys5;
        });
        executeCallback(promise, callback);
        return promise;
      }
      function length$2(callback) {
        var self2 = this;
        var promise = self2.keys().then(function(keys5) {
          return keys5.length;
        });
        executeCallback(promise, callback);
        return promise;
      }
      function removeItem$2(key2, callback) {
        var self2 = this;
        key2 = normalizeKey2(key2);
        var promise = self2.ready().then(function() {
          var dbInfo = self2._dbInfo;
          localStorage.removeItem(dbInfo.keyPrefix + key2);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function setItem$2(key2, value, callback) {
        var self2 = this;
        key2 = normalizeKey2(key2);
        var promise = self2.ready().then(function() {
          if (value === void 0) {
            value = null;
          }
          var originalValue = value;
          return new Promise$1(function(resolve2, reject3) {
            var dbInfo = self2._dbInfo;
            dbInfo.serializer.serialize(value, function(value2, error) {
              if (error) {
                reject3(error);
              } else {
                try {
                  localStorage.setItem(dbInfo.keyPrefix + key2, value2);
                  resolve2(originalValue);
                } catch (e) {
                  if (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED") {
                    reject3(e);
                  }
                  reject3(e);
                }
              }
            });
          });
        });
        executeCallback(promise, callback);
        return promise;
      }
      function dropInstance$2(options2, callback) {
        callback = getCallback.apply(this, arguments);
        options2 = typeof options2 !== "function" && options2 || {};
        if (!options2.name) {
          var currentConfig = this.config();
          options2.name = options2.name || currentConfig.name;
          options2.storeName = options2.storeName || currentConfig.storeName;
        }
        var self2 = this;
        var promise;
        if (!options2.name) {
          promise = Promise$1.reject("Invalid arguments");
        } else {
          promise = new Promise$1(function(resolve2) {
            if (!options2.storeName) {
              resolve2(options2.name + "/");
            } else {
              resolve2(_getKeyPrefix(options2, self2._defaultConfig));
            }
          }).then(function(keyPrefix) {
            for (var i = localStorage.length - 1; i >= 0; i--) {
              var key2 = localStorage.key(i);
              if (key2.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key2);
              }
            }
          });
        }
        executeCallback(promise, callback);
        return promise;
      }
      var localStorageWrapper = {
        _driver: "localStorageWrapper",
        _initStorage: _initStorage$2,
        _support: isLocalStorageValid(),
        iterate: iterate$2,
        getItem: getItem$2,
        setItem: setItem$2,
        removeItem: removeItem$2,
        clear: clear$2,
        length: length$2,
        key: key$2,
        keys: keys$2,
        dropInstance: dropInstance$2
      };
      var sameValue = function sameValue2(x, y) {
        return x === y || typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y);
      };
      var includes = function includes2(array, searchElement) {
        var len = array.length;
        var i = 0;
        while (i < len) {
          if (sameValue(array[i], searchElement)) {
            return true;
          }
          i++;
        }
        return false;
      };
      var isArray2 = Array.isArray || function(arg) {
        return Object.prototype.toString.call(arg) === "[object Array]";
      };
      var DefinedDrivers = {};
      var DriverSupport = {};
      var DefaultDrivers = {
        INDEXEDDB: asyncStorage,
        WEBSQL: webSQLStorage,
        LOCALSTORAGE: localStorageWrapper
      };
      var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];
      var OptionalDriverMethods = ["dropInstance"];
      var LibraryMethods = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(OptionalDriverMethods);
      var DefaultConfig = {
        description: "",
        driver: DefaultDriverOrder.slice(),
        name: "localforage",
        size: 4980736,
        storeName: "keyvaluepairs",
        version: 1
      };
      function callWhenReady(localForageInstance, libraryMethod) {
        localForageInstance[libraryMethod] = function() {
          var _args = arguments;
          return localForageInstance.ready().then(function() {
            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
          });
        };
      }
      function extend2() {
        for (var i = 1; i < arguments.length; i++) {
          var arg = arguments[i];
          if (arg) {
            for (var _key in arg) {
              if (arg.hasOwnProperty(_key)) {
                if (isArray2(arg[_key])) {
                  arguments[0][_key] = arg[_key].slice();
                } else {
                  arguments[0][_key] = arg[_key];
                }
              }
            }
          }
        }
        return arguments[0];
      }
      var LocalForage = function() {
        function LocalForage2(options2) {
          _classCallCheck(this, LocalForage2);
          for (var driverTypeKey in DefaultDrivers) {
            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
              var driver = DefaultDrivers[driverTypeKey];
              var driverName = driver._driver;
              this[driverTypeKey] = driverName;
              if (!DefinedDrivers[driverName]) {
                this.defineDriver(driver);
              }
            }
          }
          this._defaultConfig = extend2({}, DefaultConfig);
          this._config = extend2({}, this._defaultConfig, options2);
          this._driverSet = null;
          this._initDriver = null;
          this._ready = false;
          this._dbInfo = null;
          this._wrapLibraryMethodsWithReady();
          this.setDriver(this._config.driver)["catch"](function() {
          });
        }
        LocalForage2.prototype.config = function config(options2) {
          if ((typeof options2 === "undefined" ? "undefined" : _typeof(options2)) === "object") {
            if (this._ready) {
              return new Error("Can't call config() after localforage has been used.");
            }
            for (var i in options2) {
              if (i === "storeName") {
                options2[i] = options2[i].replace(/\W/g, "_");
              }
              if (i === "version" && typeof options2[i] !== "number") {
                return new Error("Database version must be a number.");
              }
              this._config[i] = options2[i];
            }
            if ("driver" in options2 && options2.driver) {
              return this.setDriver(this._config.driver);
            }
            return true;
          } else if (typeof options2 === "string") {
            return this._config[options2];
          } else {
            return this._config;
          }
        };
        LocalForage2.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
          var promise = new Promise$1(function(resolve2, reject3) {
            try {
              var driverName = driverObject._driver;
              var complianceError = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
              if (!driverObject._driver) {
                reject3(complianceError);
                return;
              }
              var driverMethods = LibraryMethods.concat("_initStorage");
              for (var i = 0, len = driverMethods.length; i < len; i++) {
                var driverMethodName = driverMethods[i];
                var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== "function") {
                  reject3(complianceError);
                  return;
                }
              }
              var configureMissingMethods = function configureMissingMethods2() {
                var methodNotImplementedFactory = function methodNotImplementedFactory2(methodName) {
                  return function() {
                    var error = new Error("Method " + methodName + " is not implemented by the current driver");
                    var promise2 = Promise$1.reject(error);
                    executeCallback(promise2, arguments[arguments.length - 1]);
                    return promise2;
                  };
                };
                for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                  var optionalDriverMethod = OptionalDriverMethods[_i];
                  if (!driverObject[optionalDriverMethod]) {
                    driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                  }
                }
              };
              configureMissingMethods();
              var setDriverSupport = function setDriverSupport2(support) {
                if (DefinedDrivers[driverName]) {
                  console.info("Redefining LocalForage driver: " + driverName);
                }
                DefinedDrivers[driverName] = driverObject;
                DriverSupport[driverName] = support;
                resolve2();
              };
              if ("_support" in driverObject) {
                if (driverObject._support && typeof driverObject._support === "function") {
                  driverObject._support().then(setDriverSupport, reject3);
                } else {
                  setDriverSupport(!!driverObject._support);
                }
              } else {
                setDriverSupport(true);
              }
            } catch (e) {
              reject3(e);
            }
          });
          executeTwoCallbacks(promise, callback, errorCallback);
          return promise;
        };
        LocalForage2.prototype.driver = function driver() {
          return this._driver || null;
        };
        LocalForage2.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
          var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error("Driver not found."));
          executeTwoCallbacks(getDriverPromise, callback, errorCallback);
          return getDriverPromise;
        };
        LocalForage2.prototype.getSerializer = function getSerializer(callback) {
          var serializerPromise = Promise$1.resolve(localforageSerializer);
          executeTwoCallbacks(serializerPromise, callback);
          return serializerPromise;
        };
        LocalForage2.prototype.ready = function ready(callback) {
          var self2 = this;
          var promise = self2._driverSet.then(function() {
            if (self2._ready === null) {
              self2._ready = self2._initDriver();
            }
            return self2._ready;
          });
          executeTwoCallbacks(promise, callback, callback);
          return promise;
        };
        LocalForage2.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
          var self2 = this;
          if (!isArray2(drivers)) {
            drivers = [drivers];
          }
          var supportedDrivers = this._getSupportedDrivers(drivers);
          function setDriverToConfig() {
            self2._config.driver = self2.driver();
          }
          function extendSelfWithDriver(driver) {
            self2._extend(driver);
            setDriverToConfig();
            self2._ready = self2._initStorage(self2._config);
            return self2._ready;
          }
          function initDriver(supportedDrivers2) {
            return function() {
              var currentDriverIndex = 0;
              function driverPromiseLoop() {
                while (currentDriverIndex < supportedDrivers2.length) {
                  var driverName = supportedDrivers2[currentDriverIndex];
                  currentDriverIndex++;
                  self2._dbInfo = null;
                  self2._ready = null;
                  return self2.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                }
                setDriverToConfig();
                var error = new Error("No available storage method found.");
                self2._driverSet = Promise$1.reject(error);
                return self2._driverSet;
              }
              return driverPromiseLoop();
            };
          }
          var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function() {
            return Promise$1.resolve();
          }) : Promise$1.resolve();
          this._driverSet = oldDriverSetDone.then(function() {
            var driverName = supportedDrivers[0];
            self2._dbInfo = null;
            self2._ready = null;
            return self2.getDriver(driverName).then(function(driver) {
              self2._driver = driver._driver;
              setDriverToConfig();
              self2._wrapLibraryMethodsWithReady();
              self2._initDriver = initDriver(supportedDrivers);
            });
          })["catch"](function() {
            setDriverToConfig();
            var error = new Error("No available storage method found.");
            self2._driverSet = Promise$1.reject(error);
            return self2._driverSet;
          });
          executeTwoCallbacks(this._driverSet, callback, errorCallback);
          return this._driverSet;
        };
        LocalForage2.prototype.supports = function supports(driverName) {
          return !!DriverSupport[driverName];
        };
        LocalForage2.prototype._extend = function _extend(libraryMethodsAndProperties) {
          extend2(this, libraryMethodsAndProperties);
        };
        LocalForage2.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
          var supportedDrivers = [];
          for (var i = 0, len = drivers.length; i < len; i++) {
            var driverName = drivers[i];
            if (this.supports(driverName)) {
              supportedDrivers.push(driverName);
            }
          }
          return supportedDrivers;
        };
        LocalForage2.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
          for (var i = 0, len = LibraryMethods.length; i < len; i++) {
            callWhenReady(this, LibraryMethods[i]);
          }
        };
        LocalForage2.prototype.createInstance = function createInstance(options2) {
          return new LocalForage2(options2);
        };
        return LocalForage2;
      }();
      var localforage_js = new LocalForage();
      module2.exports = localforage_js;
    }, { "3": 3 }] }, {}, [4])(4);
  });
})(localforage);
const keepUnique = (content) => [
  ...new Set(content)
];
const withoutChars = (chars, charsToExclude) => chars.filter((char) => !charsToExclude.includes(char));
const onlyChars = (chars, keepChars) => chars.filter((char) => keepChars.includes(char));
const isIntegerNumber = (n) => typeof n === "bigint" || !Number.isNaN(Number(n)) && Math.floor(Number(n)) === n;
const isPositiveAndFinite = (n) => typeof n === "bigint" || n >= 0 && Number.isSafeInteger(n);
function shuffle(alphabetChars, saltChars) {
  if (saltChars.length === 0) {
    return alphabetChars;
  }
  let integer;
  const transformed = [...alphabetChars];
  for (let i = transformed.length - 1, v = 0, p2 = 0; i > 0; i--, v++) {
    v %= saltChars.length;
    p2 += integer = saltChars[v].codePointAt(0);
    const j = (integer + v + p2) % i;
    const a = transformed[i];
    const b = transformed[j];
    transformed[j] = a;
    transformed[i] = b;
  }
  return transformed;
}
const toAlphabet = (input, alphabetChars) => {
  const id = [];
  let value = input;
  if (typeof value === "bigint") {
    const alphabetLength = BigInt(alphabetChars.length);
    do {
      id.unshift(alphabetChars[Number(value % alphabetLength)]);
      value /= alphabetLength;
    } while (value > BigInt(0));
  } else {
    do {
      id.unshift(alphabetChars[value % alphabetChars.length]);
      value = Math.floor(value / alphabetChars.length);
    } while (value > 0);
  }
  return id;
};
const fromAlphabet = (inputChars, alphabetChars) => inputChars.reduce((carry, item) => {
  const index = alphabetChars.indexOf(item);
  if (index === -1) {
    throw new Error(`The provided ID (${inputChars.join("")}) is invalid, as it contains characters that do not exist in the alphabet (${alphabetChars.join("")})`);
  }
  if (typeof carry === "bigint") {
    return carry * BigInt(alphabetChars.length) + BigInt(index);
  }
  const value = carry * alphabetChars.length + index;
  const isSafeValue = Number.isSafeInteger(value);
  if (isSafeValue) {
    return value;
  }
  if (typeof BigInt === "function") {
    return BigInt(carry) * BigInt(alphabetChars.length) + BigInt(index);
  }
  throw new Error(`Unable to decode the provided string, due to lack of support for BigInt numbers in the current environment`);
}, 0);
const safeToParseNumberRegExp = /^\+?\d+$/;
const safeParseInt10 = (str) => safeToParseNumberRegExp.test(str) ? Number.parseInt(str, 10) : Number.NaN;
const splitAtIntervalAndMap = (str, nth3, map3) => Array.from({ length: Math.ceil(str.length / nth3) }, (_, index) => map3(str.slice(index * nth3, (index + 1) * nth3)));
const makeAnyOfCharsRegExp = (chars) => new RegExp(chars.map((char) => escapeRegExp(char)).sort((a, b) => b.length - a.length).join("|"));
const makeAtLeastSomeCharRegExp = (chars) => new RegExp(`^[${chars.map((char) => escapeRegExp(char)).sort((a, b) => b.length - a.length).join("")}]+$`);
const escapeRegExp = (text) => text.replace(/[\s#$()*+,.?[\\\]^{|}-]/g, "\\$&");
const MIN_ALPHABET_LENGTH = 16;
const SEPARATOR_DIV = 3.5;
const GUARD_DIV = 12;
const HEXADECIMAL = 16;
const SPLIT_AT_EVERY_NTH = 12;
const MODULO_PART = 100;
class Hashids {
  constructor(salt = "", minLength = 0, alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", seps = "cfhistuCFHISTU") {
    this.minLength = minLength;
    if (typeof minLength !== "number") {
      throw new TypeError(`Hashids: Provided 'minLength' has to be a number (is ${typeof minLength})`);
    }
    if (typeof salt !== "string") {
      throw new TypeError(`Hashids: Provided 'salt' has to be a string (is ${typeof salt})`);
    }
    if (typeof alphabet !== "string") {
      throw new TypeError(`Hashids: Provided alphabet has to be a string (is ${typeof alphabet})`);
    }
    const saltChars = Array.from(salt);
    const alphabetChars = Array.from(alphabet);
    const sepsChars = Array.from(seps);
    this.salt = saltChars;
    const uniqueAlphabet = keepUnique(alphabetChars);
    if (uniqueAlphabet.length < MIN_ALPHABET_LENGTH) {
      throw new Error(`Hashids: alphabet must contain at least ${MIN_ALPHABET_LENGTH} unique characters, provided: ${uniqueAlphabet.join("")}`);
    }
    this.alphabet = withoutChars(uniqueAlphabet, sepsChars);
    const filteredSeps = onlyChars(sepsChars, uniqueAlphabet);
    this.seps = shuffle(filteredSeps, saltChars);
    let sepsLength;
    let diff;
    if (this.seps.length === 0 || this.alphabet.length / this.seps.length > SEPARATOR_DIV) {
      sepsLength = Math.ceil(this.alphabet.length / SEPARATOR_DIV);
      if (sepsLength > this.seps.length) {
        diff = sepsLength - this.seps.length;
        this.seps.push(...this.alphabet.slice(0, diff));
        this.alphabet = this.alphabet.slice(diff);
      }
    }
    this.alphabet = shuffle(this.alphabet, saltChars);
    const guardCount = Math.ceil(this.alphabet.length / GUARD_DIV);
    if (this.alphabet.length < 3) {
      this.guards = this.seps.slice(0, guardCount);
      this.seps = this.seps.slice(guardCount);
    } else {
      this.guards = this.alphabet.slice(0, guardCount);
      this.alphabet = this.alphabet.slice(guardCount);
    }
    this.guardsRegExp = makeAnyOfCharsRegExp(this.guards);
    this.sepsRegExp = makeAnyOfCharsRegExp(this.seps);
    this.allowedCharsRegExp = makeAtLeastSomeCharRegExp([
      ...this.alphabet,
      ...this.guards,
      ...this.seps
    ]);
  }
  encode(first, ...inputNumbers) {
    const ret = "";
    let numbers = Array.isArray(first) ? first : [...first != null ? [first] : [], ...inputNumbers];
    if (numbers.length === 0) {
      return ret;
    }
    if (!numbers.every(isIntegerNumber)) {
      numbers = numbers.map((n) => typeof n === "bigint" || typeof n === "number" ? n : safeParseInt10(String(n)));
    }
    if (!numbers.every(isPositiveAndFinite)) {
      return ret;
    }
    return this._encode(numbers).join("");
  }
  decode(id) {
    if (!id || typeof id !== "string" || id.length === 0)
      return [];
    return this._decode(id);
  }
  encodeHex(inputHex) {
    let hex = inputHex;
    switch (typeof hex) {
      case "bigint":
        hex = hex.toString(HEXADECIMAL);
        break;
      case "string":
        if (!/^[\dA-Fa-f]+$/.test(hex))
          return "";
        break;
      default:
        throw new Error(`Hashids: The provided value is neither a string, nor a BigInt (got: ${typeof hex})`);
    }
    const numbers = splitAtIntervalAndMap(hex, SPLIT_AT_EVERY_NTH, (part) => Number.parseInt(`1${part}`, 16));
    return this.encode(numbers);
  }
  decodeHex(id) {
    return this.decode(id).map((number) => number.toString(HEXADECIMAL).slice(1)).join("");
  }
  isValidId(id) {
    return this.allowedCharsRegExp.test(id);
  }
  _encode(numbers) {
    let { alphabet } = this;
    const numbersIdInt = numbers.reduce((last, number, i) => last + (typeof number === "bigint" ? Number(number % BigInt(i + MODULO_PART)) : number % (i + MODULO_PART)), 0);
    let ret = [alphabet[numbersIdInt % alphabet.length]];
    const lottery = [...ret];
    const { seps } = this;
    const { guards: guards2 } = this;
    numbers.forEach((number, i) => {
      const buffer = lottery.concat(this.salt, alphabet);
      alphabet = shuffle(alphabet, buffer);
      const last = toAlphabet(number, alphabet);
      ret.push(...last);
      if (i + 1 < numbers.length) {
        const charCode = last[0].codePointAt(0) + i;
        const extraNumber = typeof number === "bigint" ? Number(number % BigInt(charCode)) : number % charCode;
        ret.push(seps[extraNumber % seps.length]);
      }
    });
    if (ret.length < this.minLength) {
      const prefixGuardIndex = (numbersIdInt + ret[0].codePointAt(0)) % guards2.length;
      ret.unshift(guards2[prefixGuardIndex]);
      if (ret.length < this.minLength) {
        const suffixGuardIndex = (numbersIdInt + ret[2].codePointAt(0)) % guards2.length;
        ret.push(guards2[suffixGuardIndex]);
      }
    }
    const halfLength = Math.floor(alphabet.length / 2);
    while (ret.length < this.minLength) {
      alphabet = shuffle(alphabet, alphabet);
      ret.unshift(...alphabet.slice(halfLength));
      ret.push(...alphabet.slice(0, halfLength));
      const excess = ret.length - this.minLength;
      if (excess > 0) {
        const halfOfExcess = excess / 2;
        ret = ret.slice(halfOfExcess, halfOfExcess + this.minLength);
      }
    }
    return ret;
  }
  _decode(id) {
    if (!this.isValidId(id)) {
      throw new Error(`The provided ID (${id}) is invalid, as it contains characters that do not exist in the alphabet (${this.guards.join("")}${this.seps.join("")}${this.alphabet.join("")})`);
    }
    const idGuardsArray = id.split(this.guardsRegExp);
    const splitIndex = idGuardsArray.length === 3 || idGuardsArray.length === 2 ? 1 : 0;
    const idBreakdown = idGuardsArray[splitIndex];
    if (idBreakdown.length === 0)
      return [];
    const lotteryChar = idBreakdown[Symbol.iterator]().next().value;
    const idArray = idBreakdown.slice(lotteryChar.length).split(this.sepsRegExp);
    let lastAlphabet = this.alphabet;
    const result = [];
    for (const subId of idArray) {
      const buffer = [lotteryChar, ...this.salt, ...lastAlphabet];
      const nextAlphabet = shuffle(lastAlphabet, buffer.slice(0, lastAlphabet.length));
      result.push(fromAlphabet(Array.from(subId), nextAlphabet));
      lastAlphabet = nextAlphabet;
    }
    if (this._encode(result).join("") !== id)
      return [];
    return result;
  }
}
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect$1;
(function(Reflect2) {
  (function(factory) {
    var root = typeof commonjsGlobal === "object" ? commonjsGlobal : typeof self === "object" ? self : typeof this === "object" ? this : Function("return this;")();
    var exporter = makeExporter(Reflect2);
    if (typeof root.Reflect === "undefined") {
      root.Reflect = Reflect2;
    } else {
      exporter = makeExporter(root.Reflect, exporter);
    }
    factory(exporter);
    function makeExporter(target, previous) {
      return function(key, value) {
        if (typeof target[key] !== "function") {
          Object.defineProperty(target, key, { configurable: true, writable: true, value });
        }
        if (previous)
          previous(key, value);
      };
    }
  })(function(exporter) {
    var hasOwn2 = Object.prototype.hasOwnProperty;
    var supportsSymbol = typeof Symbol === "function";
    var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
    var supportsCreate = typeof Object.create === "function";
    var supportsProto = { __proto__: [] } instanceof Array;
    var downLevel = !supportsCreate && !supportsProto;
    var HashMap = {
      create: supportsCreate ? function() {
        return MakeDictionary(Object.create(null));
      } : supportsProto ? function() {
        return MakeDictionary({ __proto__: null });
      } : function() {
        return MakeDictionary({});
      },
      has: downLevel ? function(map3, key) {
        return hasOwn2.call(map3, key);
      } : function(map3, key) {
        return key in map3;
      },
      get: downLevel ? function(map3, key) {
        return hasOwn2.call(map3, key) ? map3[key] : void 0;
      } : function(map3, key) {
        return map3[key];
      }
    };
    var functionPrototype = Object.getPrototypeOf(Function);
    var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
    var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
    var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
    var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
    var Metadata = new _WeakMap();
    function decorate(decorators, target, propertyKey, attributes) {
      if (!IsUndefined(propertyKey)) {
        if (!IsArray(decorators))
          throw new TypeError();
        if (!IsObject(target))
          throw new TypeError();
        if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
          throw new TypeError();
        if (IsNull(attributes))
          attributes = void 0;
        propertyKey = ToPropertyKey(propertyKey);
        return DecorateProperty(decorators, target, propertyKey, attributes);
      } else {
        if (!IsArray(decorators))
          throw new TypeError();
        if (!IsConstructor(target))
          throw new TypeError();
        return DecorateConstructor(decorators, target);
      }
    }
    exporter("decorate", decorate);
    function metadata(metadataKey, metadataValue) {
      function decorator(target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
          throw new TypeError();
        OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
      }
      return decorator;
    }
    exporter("metadata", metadata);
    function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
    }
    exporter("defineMetadata", defineMetadata);
    function hasMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasMetadata(metadataKey, target, propertyKey);
    }
    exporter("hasMetadata", hasMetadata);
    function hasOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
    }
    exporter("hasOwnMetadata", hasOwnMetadata);
    function getMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetMetadata(metadataKey, target, propertyKey);
    }
    exporter("getMetadata", getMetadata);
    function getOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
    }
    exporter("getOwnMetadata", getOwnMetadata);
    function getMetadataKeys(target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryMetadataKeys(target, propertyKey);
    }
    exporter("getMetadataKeys", getMetadataKeys);
    function getOwnMetadataKeys(target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryOwnMetadataKeys(target, propertyKey);
    }
    exporter("getOwnMetadataKeys", getOwnMetadataKeys);
    function deleteMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      var metadataMap = GetOrCreateMetadataMap(target, propertyKey, false);
      if (IsUndefined(metadataMap))
        return false;
      if (!metadataMap.delete(metadataKey))
        return false;
      if (metadataMap.size > 0)
        return true;
      var targetMetadata = Metadata.get(target);
      targetMetadata.delete(propertyKey);
      if (targetMetadata.size > 0)
        return true;
      Metadata.delete(target);
      return true;
    }
    exporter("deleteMetadata", deleteMetadata);
    function DecorateConstructor(decorators, target) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target);
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsConstructor(decorated))
            throw new TypeError();
          target = decorated;
        }
      }
      return target;
    }
    function DecorateProperty(decorators, target, propertyKey, descriptor) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target, propertyKey, descriptor);
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsObject(decorated))
            throw new TypeError();
          descriptor = decorated;
        }
      }
      return descriptor;
    }
    function GetOrCreateMetadataMap(O, P, Create) {
      var targetMetadata = Metadata.get(O);
      if (IsUndefined(targetMetadata)) {
        if (!Create)
          return void 0;
        targetMetadata = new _Map();
        Metadata.set(O, targetMetadata);
      }
      var metadataMap = targetMetadata.get(P);
      if (IsUndefined(metadataMap)) {
        if (!Create)
          return void 0;
        metadataMap = new _Map();
        targetMetadata.set(P, metadataMap);
      }
      return metadataMap;
    }
    function OrdinaryHasMetadata(MetadataKey, O, P) {
      var hasOwn3 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn3)
        return true;
      var parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent))
        return OrdinaryHasMetadata(MetadataKey, parent, P);
      return false;
    }
    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
      var metadataMap = GetOrCreateMetadataMap(O, P, false);
      if (IsUndefined(metadataMap))
        return false;
      return ToBoolean(metadataMap.has(MetadataKey));
    }
    function OrdinaryGetMetadata(MetadataKey, O, P) {
      var hasOwn3 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn3)
        return OrdinaryGetOwnMetadata(MetadataKey, O, P);
      var parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent))
        return OrdinaryGetMetadata(MetadataKey, parent, P);
      return void 0;
    }
    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
      var metadataMap = GetOrCreateMetadataMap(O, P, false);
      if (IsUndefined(metadataMap))
        return void 0;
      return metadataMap.get(MetadataKey);
    }
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
      var metadataMap = GetOrCreateMetadataMap(O, P, true);
      metadataMap.set(MetadataKey, MetadataValue);
    }
    function OrdinaryMetadataKeys(O, P) {
      var ownKeys2 = OrdinaryOwnMetadataKeys(O, P);
      var parent = OrdinaryGetPrototypeOf(O);
      if (parent === null)
        return ownKeys2;
      var parentKeys = OrdinaryMetadataKeys(parent, P);
      if (parentKeys.length <= 0)
        return ownKeys2;
      if (ownKeys2.length <= 0)
        return parentKeys;
      var set3 = new _Set();
      var keys4 = [];
      for (var _i = 0, ownKeys_1 = ownKeys2; _i < ownKeys_1.length; _i++) {
        var key = ownKeys_1[_i];
        var hasKey = set3.has(key);
        if (!hasKey) {
          set3.add(key);
          keys4.push(key);
        }
      }
      for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
        var key = parentKeys_1[_a];
        var hasKey = set3.has(key);
        if (!hasKey) {
          set3.add(key);
          keys4.push(key);
        }
      }
      return keys4;
    }
    function OrdinaryOwnMetadataKeys(O, P) {
      var keys4 = [];
      var metadataMap = GetOrCreateMetadataMap(O, P, false);
      if (IsUndefined(metadataMap))
        return keys4;
      var keysObj = metadataMap.keys();
      var iterator = GetIterator(keysObj);
      var k = 0;
      while (true) {
        var next = IteratorStep(iterator);
        if (!next) {
          keys4.length = k;
          return keys4;
        }
        var nextValue = IteratorValue(next);
        try {
          keys4[k] = nextValue;
        } catch (e) {
          try {
            IteratorClose(iterator);
          } finally {
            throw e;
          }
        }
        k++;
      }
    }
    function Type(x) {
      if (x === null)
        return 1;
      switch (typeof x) {
        case "undefined":
          return 0;
        case "boolean":
          return 2;
        case "string":
          return 3;
        case "symbol":
          return 4;
        case "number":
          return 5;
        case "object":
          return x === null ? 1 : 6;
        default:
          return 6;
      }
    }
    function IsUndefined(x) {
      return x === void 0;
    }
    function IsNull(x) {
      return x === null;
    }
    function IsSymbol(x) {
      return typeof x === "symbol";
    }
    function IsObject(x) {
      return typeof x === "object" ? x !== null : typeof x === "function";
    }
    function ToPrimitive(input, PreferredType) {
      switch (Type(input)) {
        case 0:
          return input;
        case 1:
          return input;
        case 2:
          return input;
        case 3:
          return input;
        case 4:
          return input;
        case 5:
          return input;
      }
      var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
      var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
      if (exoticToPrim !== void 0) {
        var result = exoticToPrim.call(input, hint);
        if (IsObject(result))
          throw new TypeError();
        return result;
      }
      return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
    }
    function OrdinaryToPrimitive(O, hint) {
      if (hint === "string") {
        var toString_1 = O.toString;
        if (IsCallable(toString_1)) {
          var result = toString_1.call(O);
          if (!IsObject(result))
            return result;
        }
        var valueOf = O.valueOf;
        if (IsCallable(valueOf)) {
          var result = valueOf.call(O);
          if (!IsObject(result))
            return result;
        }
      } else {
        var valueOf = O.valueOf;
        if (IsCallable(valueOf)) {
          var result = valueOf.call(O);
          if (!IsObject(result))
            return result;
        }
        var toString_2 = O.toString;
        if (IsCallable(toString_2)) {
          var result = toString_2.call(O);
          if (!IsObject(result))
            return result;
        }
      }
      throw new TypeError();
    }
    function ToBoolean(argument) {
      return !!argument;
    }
    function ToString(argument) {
      return "" + argument;
    }
    function ToPropertyKey(argument) {
      var key = ToPrimitive(argument, 3);
      if (IsSymbol(key))
        return key;
      return ToString(key);
    }
    function IsArray(argument) {
      return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
    }
    function IsCallable(argument) {
      return typeof argument === "function";
    }
    function IsConstructor(argument) {
      return typeof argument === "function";
    }
    function IsPropertyKey(argument) {
      switch (Type(argument)) {
        case 3:
          return true;
        case 4:
          return true;
        default:
          return false;
      }
    }
    function GetMethod(V, P) {
      var func = V[P];
      if (func === void 0 || func === null)
        return void 0;
      if (!IsCallable(func))
        throw new TypeError();
      return func;
    }
    function GetIterator(obj) {
      var method = GetMethod(obj, iteratorSymbol);
      if (!IsCallable(method))
        throw new TypeError();
      var iterator = method.call(obj);
      if (!IsObject(iterator))
        throw new TypeError();
      return iterator;
    }
    function IteratorValue(iterResult) {
      return iterResult.value;
    }
    function IteratorStep(iterator) {
      var result = iterator.next();
      return result.done ? false : result;
    }
    function IteratorClose(iterator) {
      var f = iterator["return"];
      if (f)
        f.call(iterator);
    }
    function OrdinaryGetPrototypeOf(O) {
      var proto = Object.getPrototypeOf(O);
      if (typeof O !== "function" || O === functionPrototype)
        return proto;
      if (proto !== functionPrototype)
        return proto;
      var prototype = O.prototype;
      var prototypeProto = prototype && Object.getPrototypeOf(prototype);
      if (prototypeProto == null || prototypeProto === Object.prototype)
        return proto;
      var constructor = prototypeProto.constructor;
      if (typeof constructor !== "function")
        return proto;
      if (constructor === O)
        return proto;
      return constructor;
    }
    function CreateMapPolyfill() {
      var cacheSentinel = {};
      var arraySentinel = [];
      var MapIterator = function() {
        function MapIterator2(keys4, values, selector) {
          this._index = 0;
          this._keys = keys4;
          this._values = values;
          this._selector = selector;
        }
        MapIterator2.prototype["@@iterator"] = function() {
          return this;
        };
        MapIterator2.prototype[iteratorSymbol] = function() {
          return this;
        };
        MapIterator2.prototype.next = function() {
          var index = this._index;
          if (index >= 0 && index < this._keys.length) {
            var result = this._selector(this._keys[index], this._values[index]);
            if (index + 1 >= this._keys.length) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            } else {
              this._index++;
            }
            return { value: result, done: false };
          }
          return { value: void 0, done: true };
        };
        MapIterator2.prototype.throw = function(error) {
          if (this._index >= 0) {
            this._index = -1;
            this._keys = arraySentinel;
            this._values = arraySentinel;
          }
          throw error;
        };
        MapIterator2.prototype.return = function(value) {
          if (this._index >= 0) {
            this._index = -1;
            this._keys = arraySentinel;
            this._values = arraySentinel;
          }
          return { value, done: true };
        };
        return MapIterator2;
      }();
      return function() {
        function Map2() {
          this._keys = [];
          this._values = [];
          this._cacheKey = cacheSentinel;
          this._cacheIndex = -2;
        }
        Object.defineProperty(Map2.prototype, "size", {
          get: function() {
            return this._keys.length;
          },
          enumerable: true,
          configurable: true
        });
        Map2.prototype.has = function(key) {
          return this._find(key, false) >= 0;
        };
        Map2.prototype.get = function(key) {
          var index = this._find(key, false);
          return index >= 0 ? this._values[index] : void 0;
        };
        Map2.prototype.set = function(key, value) {
          var index = this._find(key, true);
          this._values[index] = value;
          return this;
        };
        Map2.prototype.delete = function(key) {
          var index = this._find(key, false);
          if (index >= 0) {
            var size2 = this._keys.length;
            for (var i = index + 1; i < size2; i++) {
              this._keys[i - 1] = this._keys[i];
              this._values[i - 1] = this._values[i];
            }
            this._keys.length--;
            this._values.length--;
            if (key === this._cacheKey) {
              this._cacheKey = cacheSentinel;
              this._cacheIndex = -2;
            }
            return true;
          }
          return false;
        };
        Map2.prototype.clear = function() {
          this._keys.length = 0;
          this._values.length = 0;
          this._cacheKey = cacheSentinel;
          this._cacheIndex = -2;
        };
        Map2.prototype.keys = function() {
          return new MapIterator(this._keys, this._values, getKey);
        };
        Map2.prototype.values = function() {
          return new MapIterator(this._keys, this._values, getValue2);
        };
        Map2.prototype.entries = function() {
          return new MapIterator(this._keys, this._values, getEntry);
        };
        Map2.prototype["@@iterator"] = function() {
          return this.entries();
        };
        Map2.prototype[iteratorSymbol] = function() {
          return this.entries();
        };
        Map2.prototype._find = function(key, insert) {
          if (this._cacheKey !== key) {
            this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
          }
          if (this._cacheIndex < 0 && insert) {
            this._cacheIndex = this._keys.length;
            this._keys.push(key);
            this._values.push(void 0);
          }
          return this._cacheIndex;
        };
        return Map2;
      }();
      function getKey(key, _) {
        return key;
      }
      function getValue2(_, value) {
        return value;
      }
      function getEntry(key, value) {
        return [key, value];
      }
    }
    function CreateSetPolyfill() {
      return function() {
        function Set2() {
          this._map = new _Map();
        }
        Object.defineProperty(Set2.prototype, "size", {
          get: function() {
            return this._map.size;
          },
          enumerable: true,
          configurable: true
        });
        Set2.prototype.has = function(value) {
          return this._map.has(value);
        };
        Set2.prototype.add = function(value) {
          return this._map.set(value, value), this;
        };
        Set2.prototype.delete = function(value) {
          return this._map.delete(value);
        };
        Set2.prototype.clear = function() {
          this._map.clear();
        };
        Set2.prototype.keys = function() {
          return this._map.keys();
        };
        Set2.prototype.values = function() {
          return this._map.values();
        };
        Set2.prototype.entries = function() {
          return this._map.entries();
        };
        Set2.prototype["@@iterator"] = function() {
          return this.keys();
        };
        Set2.prototype[iteratorSymbol] = function() {
          return this.keys();
        };
        return Set2;
      }();
    }
    function CreateWeakMapPolyfill() {
      var UUID_SIZE = 16;
      var keys4 = HashMap.create();
      var rootKey = CreateUniqueKey();
      return function() {
        function WeakMap2() {
          this._key = CreateUniqueKey();
        }
        WeakMap2.prototype.has = function(target) {
          var table = GetOrCreateWeakMapTable(target, false);
          return table !== void 0 ? HashMap.has(table, this._key) : false;
        };
        WeakMap2.prototype.get = function(target) {
          var table = GetOrCreateWeakMapTable(target, false);
          return table !== void 0 ? HashMap.get(table, this._key) : void 0;
        };
        WeakMap2.prototype.set = function(target, value) {
          var table = GetOrCreateWeakMapTable(target, true);
          table[this._key] = value;
          return this;
        };
        WeakMap2.prototype.delete = function(target) {
          var table = GetOrCreateWeakMapTable(target, false);
          return table !== void 0 ? delete table[this._key] : false;
        };
        WeakMap2.prototype.clear = function() {
          this._key = CreateUniqueKey();
        };
        return WeakMap2;
      }();
      function CreateUniqueKey() {
        var key;
        do
          key = "@@WeakMap@@" + CreateUUID();
        while (HashMap.has(keys4, key));
        keys4[key] = true;
        return key;
      }
      function GetOrCreateWeakMapTable(target, create) {
        if (!hasOwn2.call(target, rootKey)) {
          if (!create)
            return void 0;
          Object.defineProperty(target, rootKey, { value: HashMap.create() });
        }
        return target[rootKey];
      }
      function FillRandomBytes(buffer, size2) {
        for (var i = 0; i < size2; ++i)
          buffer[i] = Math.random() * 255 | 0;
        return buffer;
      }
      function GenRandomBytes(size2) {
        if (typeof Uint8Array === "function") {
          if (typeof crypto !== "undefined")
            return crypto.getRandomValues(new Uint8Array(size2));
          if (typeof msCrypto !== "undefined")
            return msCrypto.getRandomValues(new Uint8Array(size2));
          return FillRandomBytes(new Uint8Array(size2), size2);
        }
        return FillRandomBytes(new Array(size2), size2);
      }
      function CreateUUID() {
        var data = GenRandomBytes(UUID_SIZE);
        data[6] = data[6] & 79 | 64;
        data[8] = data[8] & 191 | 128;
        var result = "";
        for (var offset2 = 0; offset2 < UUID_SIZE; ++offset2) {
          var byte = data[offset2];
          if (offset2 === 4 || offset2 === 6 || offset2 === 8)
            result += "-";
          if (byte < 16)
            result += "0";
          result += byte.toString(16).toLowerCase();
        }
        return result;
      }
    }
    function MakeDictionary(obj) {
      obj.__ = void 0;
      delete obj.__;
      return obj;
    }
  });
})(Reflect$1 || (Reflect$1 = {}));
var lib = {};
var symbols = {};
Object.defineProperty(symbols, "__esModule", { value: true });
symbols.AnonymousSelectKey = symbols.Select = symbols.Not = symbols.Guard = symbols.PatternKind = void 0;
symbols.PatternKind = Symbol("@ts-pattern/pattern-kind");
symbols.Guard = Symbol("@ts-pattern/guard");
symbols.Not = Symbol("@ts-pattern/not");
symbols.Select = Symbol("@ts-pattern/select");
symbols.AnonymousSelectKey = "@ts-pattern/__anonymous-select-key";
var guards = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.instanceOf = exports.select = exports.not = exports.when = void 0;
  const symbols$1 = symbols;
  const when = (predicate) => ({
    [symbols$1.PatternKind]: symbols$1.Guard,
    [symbols$1.Guard]: predicate
  });
  exports.when = when;
  const not = (pattern) => ({
    [symbols$1.PatternKind]: symbols$1.Not,
    [symbols$1.Not]: pattern
  });
  exports.not = not;
  function select(key) {
    return key === void 0 ? {
      [symbols$1.PatternKind]: symbols$1.Select,
      [symbols$1.Select]: symbols$1.AnonymousSelectKey
    } : {
      [symbols$1.PatternKind]: symbols$1.Select,
      [symbols$1.Select]: key
    };
  }
  exports.select = select;
  function isInstanceOf(classConstructor) {
    return (val) => val instanceof classConstructor;
  }
  const instanceOf = (classConstructor) => (0, exports.when)(isInstanceOf(classConstructor));
  exports.instanceOf = instanceOf;
})(guards);
var wildcards = {};
Object.defineProperty(wildcards, "__esModule", { value: true });
var __ = wildcards.__ = void 0;
const guards_1 = guards;
function isUnknown(x) {
  return true;
}
function isNumber(x) {
  return typeof x === "number";
}
function numberIsNaN(x) {
  return Number.isNaN(x);
}
function isString(x) {
  return typeof x === "string";
}
function isBoolean(x) {
  return typeof x === "boolean";
}
function isNullish(x) {
  return x === null || x === void 0;
}
const unknownGuard = (0, guards_1.when)(isUnknown);
const stringGuard = (0, guards_1.when)(isString);
const numberGuard = (0, guards_1.when)(isNumber);
const NaNGuard = (0, guards_1.when)(numberIsNaN);
const booleanGuard = (0, guards_1.when)(isBoolean);
const nullishGuard = (0, guards_1.when)(isNullish);
__ = wildcards.__ = Object.assign(unknownGuard, {
  string: stringGuard,
  number: numberGuard,
  NaN: NaNGuard,
  boolean: booleanGuard,
  nullish: nullishGuard
});
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.isMatching = exports.match = exports.instanceOf = exports.select = exports.not = exports.when = exports.__ = void 0;
  const symbols$1 = symbols;
  const guards_12 = guards;
  Object.defineProperty(exports, "when", { enumerable: true, get: function() {
    return guards_12.when;
  } });
  Object.defineProperty(exports, "not", { enumerable: true, get: function() {
    return guards_12.not;
  } });
  Object.defineProperty(exports, "select", { enumerable: true, get: function() {
    return guards_12.select;
  } });
  Object.defineProperty(exports, "instanceOf", { enumerable: true, get: function() {
    return guards_12.instanceOf;
  } });
  const wildcards_1 = wildcards;
  Object.defineProperty(exports, "__", { enumerable: true, get: function() {
    return wildcards_1.__;
  } });
  const match3 = (value) => builder(value, []);
  exports.match = match3;
  const builder = (value, cases) => {
    const run = () => {
      const entry = cases.find(({ test: test3 }) => test3(value));
      if (!entry) {
        let displayedValue;
        try {
          displayedValue = JSON.stringify(value);
        } catch (e) {
          displayedValue = value;
        }
        throw new Error(`Pattern matching error: no pattern matches value ${displayedValue}`);
      }
      return entry.handler(entry.select(value), value);
    };
    return {
      with(...args) {
        const handler = args[args.length - 1];
        const patterns = [];
        const predicates = [];
        for (let i = 0; i < args.length - 1; i++) {
          const arg = args[i];
          if (typeof arg === "function") {
            predicates.push(arg);
          } else {
            patterns.push(arg);
          }
        }
        let selected = {};
        const doesMatch = (value2) => Boolean(patterns.some((pattern) => matchPattern(pattern, value2, (key, value3) => {
          selected[key] = value3;
        })) && predicates.every((predicate) => predicate(value2)));
        return builder(value, cases.concat([
          {
            test: doesMatch,
            handler,
            select: (value2) => Object.keys(selected).length ? symbols$1.AnonymousSelectKey in selected ? selected[symbols$1.AnonymousSelectKey] : selected : value2
          }
        ]));
      },
      when: (predicate, handler) => builder(value, cases.concat([
        {
          test: predicate,
          handler,
          select: (value2) => value2
        }
      ])),
      otherwise: (handler) => builder(value, cases.concat([
        {
          test: () => true,
          handler,
          select: (value2) => value2
        }
      ])).run(),
      exhaustive: () => run(),
      run
    };
  };
  const isObject2 = (value) => Boolean(value && typeof value === "object");
  const isGuardPattern = (x) => {
    const pattern = x;
    return pattern && pattern[symbols$1.PatternKind] === symbols$1.Guard;
  };
  const isNotPattern = (x) => {
    const pattern = x;
    return pattern && pattern[symbols$1.PatternKind] === symbols$1.Not;
  };
  const isSelectPattern = (x) => {
    const pattern = x;
    return pattern && pattern[symbols$1.PatternKind] === symbols$1.Select;
  };
  const matchPattern = (pattern, value, select) => {
    if (isObject2(pattern)) {
      if (isGuardPattern(pattern))
        return Boolean(pattern[symbols$1.Guard](value));
      if (isSelectPattern(pattern)) {
        select(pattern[symbols$1.Select], value);
        return true;
      }
      if (isNotPattern(pattern))
        return !matchPattern(pattern[symbols$1.Not], value, select);
      if (!isObject2(value))
        return false;
      if (Array.isArray(pattern)) {
        if (!Array.isArray(value))
          return false;
        if (pattern.length === 1) {
          const selected = {};
          const listSelect = (key, value2) => {
            selected[key] = (selected[key] || []).concat([value2]);
          };
          const doesMatch = value.every((v) => matchPattern(pattern[0], v, listSelect));
          if (doesMatch) {
            Object.keys(selected).forEach((key) => select(key, selected[key]));
          }
          return doesMatch;
        }
        return pattern.length === value.length ? pattern.every((subPattern, i) => matchPattern(subPattern, value[i], select)) : false;
      }
      if (pattern instanceof Map) {
        if (!(value instanceof Map))
          return false;
        return [...pattern.keys()].every((key) => matchPattern(pattern.get(key), value.get(key), select));
      }
      if (pattern instanceof Set) {
        if (!(value instanceof Set))
          return false;
        if (pattern.size === 0)
          return value.size === 0;
        if (pattern.size === 1) {
          const [subPattern] = [...pattern.values()];
          return Object.values(wildcards_1.__).includes(subPattern) ? matchPattern([subPattern], [...value.values()], select) : value.has(subPattern);
        }
        return [...pattern.values()].every((subPattern) => value.has(subPattern));
      }
      return Object.keys(pattern).every((k) => k in value && matchPattern(pattern[k], value[k], select));
    }
    return value === pattern;
  };
  function isMatching(...args) {
    if (args.length === 1) {
      const [pattern] = args;
      return (value) => matchPattern(pattern, value, () => {
      });
    }
    if (args.length === 2) {
      const [pattern, value] = args;
      return matchPattern(pattern, value, () => {
      });
    }
    throw new Error(`isMatching wasn't given enough arguments: expected 1 or 2, received ${args.length}.`);
  }
  exports.isMatching = isMatching;
})(lib);
/*!
  * vue-router v4.0.12
  * (c) 2021 Eduardo San Martin Morote
  * @license MIT
  */
const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
const PolySymbol = (name) => hasSymbol ? Symbol(name) : "_vr_" + name;
const matchedRouteKey = /* @__PURE__ */ PolySymbol("rvlm");
const viewDepthKey = /* @__PURE__ */ PolySymbol("rvd");
const routerKey = /* @__PURE__ */ PolySymbol("r");
const routeLocationKey = /* @__PURE__ */ PolySymbol("rl");
const routerViewLocationKey = /* @__PURE__ */ PolySymbol("rvl");
const isBrowser = typeof window !== "undefined";
function isESModule(obj) {
  return obj.__esModule || hasSymbol && obj[Symbol.toStringTag] === "Module";
}
const assign = Object.assign;
function applyToParams(fn2, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = Array.isArray(value) ? value.map(fn2) : fn2(value);
  }
  return newParams;
}
const noop$1 = () => {
};
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path3) => path3.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path3, query = {}, searchString = "", hash2 = "";
  const searchPos = location2.indexOf("?");
  const hashPos = location2.indexOf("#", searchPos > -1 ? searchPos : 0);
  if (searchPos > -1) {
    path3 = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
    query = parseQuery2(searchString);
  }
  if (hashPos > -1) {
    path3 = path3 || location2.slice(0, hashPos);
    hash2 = location2.slice(hashPos, location2.length);
  }
  path3 = resolveRelativePath(path3 != null ? path3 : location2, currentLocation);
  return {
    fullPath: path3 + (searchString && "?") + searchString + hash2,
    path: path3,
    query,
    hash: hash2
  };
}
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function stripBase(pathname, base) {
  if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
    return pathname;
  return pathname.slice(base.length) || "/";
}
function isSameRouteLocation(stringifyQuery2, a, b) {
  const aLastIndex = a.matched.length - 1;
  const bLastIndex = b.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery2(a.query) === stringifyQuery2(b.query) && a.hash === b.hash;
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length)
    return false;
  for (const key in a) {
    if (!isSameRouteLocationParamsValue(a[key], b[key]))
      return false;
  }
  return true;
}
function isSameRouteLocationParamsValue(a, b) {
  return Array.isArray(a) ? isEquivalentArray(a, b) : Array.isArray(b) ? isEquivalentArray(b, a) : a === b;
}
function isEquivalentArray(a, b) {
  return Array.isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/"))
    return to;
  if (!to)
    return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (position === 1 || segment === ".")
      continue;
    if (segment === "..")
      position--;
    else
      break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join("/");
}
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
function normalizeBase(base) {
  if (!base) {
    if (isBrowser) {
      const baseEl = document.querySelector("base");
      base = baseEl && baseEl.getAttribute("href") || "/";
      base = base.replace(/^\w+:\/\/[^\/]+/, "");
    } else {
      base = "/";
    }
  }
  if (base[0] !== "/" && base[0] !== "#")
    base = "/" + base;
  return removeTrailingSlash(base);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location2) {
  return base.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset2) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset2.behavior,
    left: elRect.left - docRect.left - (offset2.left || 0),
    top: elRect.top - docRect.top - (offset2.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else {
    scrollToOptions = position;
  }
  if ("scrollBehavior" in document.documentElement.style)
    window.scrollTo(scrollToOptions);
  else {
    window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.pageXOffset, scrollToOptions.top != null ? scrollToOptions.top : window.pageYOffset);
  }
}
function getScrollKey(path3, delta) {
  const position = history.state ? history.state.position - delta : -1;
  return position + path3;
}
const scrollPositions = new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation(base, location2) {
  const { pathname, search, hash: hash2 } = location2;
  const hashPos = base.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash2.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash2.slice(slicePos);
    if (pathFromHash[0] !== "/")
      pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  const path3 = stripBase(pathname, base);
  return path3 + search + hash2;
}
function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else {
      replace(to);
    }
    listeners.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index = listeners.indexOf(callback);
      if (index > -1)
        listeners.splice(index, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    const { history: history2 } = window;
    if (!history2.state)
      return;
    history2.replaceState(assign({}, history2.state, { scroll: computeScrollPosition() }), "");
  }
  function destroy() {
    for (const teardown of teardowns)
      teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("beforeunload", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("beforeunload", beforeUnloadListener);
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base) {
  const { history: history2, location: location2 } = window;
  const currentLocation = {
    value: createCurrentLocation(base, location2)
  };
  const historyState = { value: history2.state };
  if (!historyState.value) {
    changeLocation(currentLocation.value, {
      back: null,
      current: currentLocation.value,
      forward: null,
      position: history2.length - 1,
      replaced: true,
      scroll: null
    }, true);
  }
  function changeLocation(to, state, replace2) {
    const hashIndex = base.indexOf("#");
    const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
    try {
      history2[replace2 ? "replaceState" : "pushState"](state, "", url);
      historyState.value = state;
    } catch (err) {
      {
        console.error(err);
      }
      location2[replace2 ? "replace" : "assign"](url);
    }
  }
  function replace(to, data) {
    const state = assign({}, history2.state, buildState(historyState.value.back, to, historyState.value.forward, true), data, { position: historyState.value.position });
    changeLocation(to, state, true);
    currentLocation.value = to;
  }
  function push(to, data) {
    const currentState = assign({}, historyState.value, history2.state, {
      forward: to,
      scroll: computeScrollPosition()
    });
    changeLocation(currentState.current, currentState, true);
    const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
    changeLocation(to, state, false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
function createWebHistory(base) {
  base = normalizeBase(base);
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners)
      historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign({
    location: "",
    base,
    go,
    createHref: createHref.bind(null, base)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
function createWebHashHistory(base) {
  base = location.host ? base || location.pathname + location.search : "";
  if (!base.includes("#"))
    base += "#";
  return createWebHistory(base);
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
const NavigationFailureSymbol = /* @__PURE__ */ PolySymbol("nf");
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
function createRouterError(type3, params) {
  {
    return assign(new Error(), {
      type: type3,
      [NavigationFailureSymbol]: true
    }, params);
  }
}
function isNavigationFailure(error, type3) {
  return error instanceof Error && NavigationFailureSymbol in error && (type3 == null || !!(error.type & type3));
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options2 = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options2.start ? "^" : "";
  const keys4 = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [90];
    if (options2.strict && !segment.length)
      pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = 40 + (options2.sensitive ? 0.25 : 0);
      if (token.type === 0) {
        if (!tokenIndex)
          pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += 40;
      } else if (token.type === 1) {
        const { value, repeatable, optional, regexp } = token;
        keys4.push({
          name: value,
          repeatable,
          optional
        });
        const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re2 !== BASE_PARAM_PATTERN) {
          subSegmentScore += 10;
          try {
            new RegExp(`(${re2})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
        if (!tokenIndex)
          subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional)
          subPattern += "?";
        pattern += subPattern;
        subSegmentScore += 20;
        if (optional)
          subSegmentScore += -8;
        if (repeatable)
          subSegmentScore += -20;
        if (re2 === ".*")
          subSegmentScore += -50;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options2.strict && options2.end) {
    const i = score.length - 1;
    score[i][score[i].length - 1] += 0.7000000000000001;
  }
  if (!options2.strict)
    pattern += "/?";
  if (options2.end)
    pattern += "$";
  else if (options2.strict)
    pattern += "(?:/|$)";
  const re = new RegExp(pattern, options2.sensitive ? "" : "i");
  function parse(path3) {
    const match3 = path3.match(re);
    const params = {};
    if (!match3)
      return null;
    for (let i = 1; i < match3.length; i++) {
      const value = match3[i] || "";
      const key = keys4[i - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path3 = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path3.endsWith("/"))
        path3 += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) {
        if (token.type === 0) {
          path3 += token.value;
        } else if (token.type === 1) {
          const { value, repeatable, optional } = token;
          const param = value in params ? params[value] : "";
          if (Array.isArray(param) && !repeatable)
            throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
          const text = Array.isArray(param) ? param.join("/") : param;
          if (!text) {
            if (optional) {
              if (segment.length < 2) {
                if (path3.endsWith("/"))
                  path3 = path3.slice(0, -1);
                else
                  avoidDuplicatedSlash = true;
              }
            } else
              throw new Error(`Missing required param "${value}"`);
          }
          path3 += text;
        }
      }
    }
    return path3;
  }
  return {
    re,
    score,
    keys: keys4,
    parse,
    stringify
  };
}
function compareScoreArray(a, b) {
  let i = 0;
  while (i < a.length && i < b.length) {
    const diff = b[i] - a[i];
    if (diff)
      return diff;
    i++;
  }
  if (a.length < b.length) {
    return a.length === 1 && a[0] === 40 + 40 ? -1 : 1;
  } else if (a.length > b.length) {
    return b.length === 1 && b[0] === 40 + 40 ? 1 : -1;
  }
  return 0;
}
function comparePathParserScore(a, b) {
  let i = 0;
  const aScore = a.score;
  const bScore = b.score;
  while (i < aScore.length && i < bScore.length) {
    const comp = compareScoreArray(aScore[i], bScore[i]);
    if (comp)
      return comp;
    i++;
  }
  return bScore.length - aScore.length;
}
const ROOT_TOKEN = {
  type: 0,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path3) {
  if (!path3)
    return [[]];
  if (path3 === "/")
    return [[ROOT_TOKEN]];
  if (!path3.startsWith("/")) {
    throw new Error(`Invalid path "${path3}"`);
  }
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer}": ${message}`);
  }
  let state = 0;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment)
      tokens.push(segment);
    segment = [];
  }
  let i = 0;
  let char;
  let buffer = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer)
      return;
    if (state === 0) {
      segment.push({
        type: 0,
        value: buffer
      });
    } else if (state === 1 || state === 2 || state === 3) {
      if (segment.length > 1 && (char === "*" || char === "+"))
        crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: 1,
        value: buffer,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else {
      crash("Invalid state to consume buffer");
    }
    buffer = "";
  }
  function addCharToBuffer() {
    buffer += char;
  }
  while (i < path3.length) {
    char = path3[i++];
    if (char === "\\" && state !== 2) {
      previousState = state;
      state = 4;
      continue;
    }
    switch (state) {
      case 0:
        if (char === "/") {
          if (buffer) {
            consumeBuffer();
          }
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = 1;
        } else {
          addCharToBuffer();
        }
        break;
      case 4:
        addCharToBuffer();
        state = previousState;
        break;
      case 1:
        if (char === "(") {
          state = 2;
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer();
        } else {
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i--;
        }
        break;
      case 2:
        if (char === ")") {
          if (customRe[customRe.length - 1] == "\\")
            customRe = customRe.slice(0, -1) + char;
          else
            state = 3;
        } else {
          customRe += char;
        }
        break;
      case 3:
        consumeBuffer();
        state = 0;
        if (char !== "*" && char !== "?" && char !== "+")
          i--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === 2)
    crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
function createRouteRecordMatcher(record, parent, options2) {
  const parser = tokensToParser(tokenizePath(record.path), options2);
  const matcher = assign(parser, {
    record,
    parent,
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes, globalOptions) {
  const matchers = [];
  const matcherMap = new Map();
  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options2 = mergeOptions(globalOptions, record);
    const normalizedRecords = [
      mainNormalizedRecord
    ];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) {
        normalizedRecords.push(assign({}, mainNormalizedRecord, {
          components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
          path: alias,
          aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
        }));
      }
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path: path3 } = normalizedRecord;
      if (parent && path3[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path3 && connectingSlash + path3);
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options2);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher)
          originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher))
          removeRoute(record.name);
      }
      if ("children" in mainNormalizedRecord) {
        const children = mainNormalizedRecord.children;
        for (let i = 0; i < children.length; i++) {
          addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
        }
      }
      originalRecord = originalRecord || matcher;
      insertMatcher(matcher);
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop$1;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index = matchers.indexOf(matcherRef);
      if (index > -1) {
        matchers.splice(index, 1);
        if (matcherRef.record.name)
          matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    let i = 0;
    while (i < matchers.length && comparePathParserScore(matcher, matchers[i]) >= 0)
      i++;
    matchers.splice(i, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher))
      matcherMap.set(matcher.record.name, matcher);
  }
  function resolve2(location2, currentLocation) {
    let matcher;
    let params = {};
    let path3;
    let name;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher)
        throw createRouterError(1, {
          location: location2
        });
      name = matcher.record.name;
      params = assign(paramsFromLocation(currentLocation.params, matcher.keys.filter((k) => !k.optional).map((k) => k.name)), location2.params);
      path3 = matcher.stringify(params);
    } else if ("path" in location2) {
      path3 = location2.path;
      matcher = matchers.find((m) => m.re.test(path3));
      if (matcher) {
        params = matcher.parse(path3);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
      if (!matcher)
        throw createRouterError(1, {
          location: location2,
          currentLocation
        });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location2.params);
      path3 = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path: path3,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes.forEach((route) => addRoute(route));
  return { addRoute, resolve: resolve2, removeRoute, getRoutes, getRecordMatcher };
}
function paramsFromLocation(params, keys4) {
  const newParams = {};
  for (const key of keys4) {
    if (key in params)
      newParams[key] = params[key];
  }
  return newParams;
}
function normalizeRouteRecord(record) {
  return {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: void 0,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || {} : { default: record.component }
  };
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) {
    propsObject.default = props;
  } else {
    for (const name in record.components)
      propsObject[name] = typeof props === "boolean" ? props : props[name];
  }
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf)
      return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function mergeOptions(defaults2, partialOptions) {
  const options2 = {};
  for (const key in defaults2) {
    options2[key] = key in partialOptions ? partialOptions[key] : defaults2[key];
  }
  return options2;
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
  }
  return "" + text;
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?")
    return query;
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
  for (let i = 0; i < searchParams.length; ++i) {
    const searchParam = searchParams[i].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!Array.isArray(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) {
        search += (search.length ? "&" : "") + key;
      }
      continue;
    }
    const values = Array.isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)];
    values.forEach((value2) => {
      if (value2 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value2 != null)
          search += "=" + value2;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) {
      normalizedQuery[key] = Array.isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
    }
  }
  return normalizedQuery;
}
function useCallbacks() {
  let handlers = [];
  function add2(handler) {
    handlers.push(handler);
    return () => {
      const i = handlers.indexOf(handler);
      if (i > -1)
        handlers.splice(i, 1);
    };
  }
  function reset2() {
    handlers = [];
  }
  return {
    add: add2,
    list: () => handlers,
    reset: reset2
  };
}
function guardToPromiseFn(guard, to, from, record, name) {
  const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve2, reject3) => {
    const next = (valid) => {
      if (valid === false)
        reject3(createRouterError(4, {
          from,
          to
        }));
      else if (valid instanceof Error) {
        reject3(valid);
      } else if (isRouteLocation(valid)) {
        reject3(createRouterError(2, {
          from: to,
          to: valid
        }));
      } else {
        if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function")
          enterCallbackArray.push(valid);
        resolve2();
      }
    };
    const guardReturn = guard.call(record && record.instances[name], to, from, next);
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3)
      guardCall = guardCall.then(next);
    guardCall.catch((err) => reject3(err));
  });
}
function extractComponentsGuards(matched, guardType, to, from) {
  const guards2 = [];
  for (const record of matched) {
    for (const name in record.components) {
      let rawComponent = record.components[name];
      if (guardType !== "beforeRouteEnter" && !record.instances[name])
        continue;
      if (isRouteComponent(rawComponent)) {
        const options2 = rawComponent.__vccOpts || rawComponent;
        const guard = options2[guardType];
        guard && guards2.push(guardToPromiseFn(guard, to, from, record, name));
      } else {
        let componentPromise = rawComponent();
        guards2.push(() => componentPromise.then((resolved) => {
          if (!resolved)
            return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.components[name] = resolvedComponent;
          const options2 = resolvedComponent.__vccOpts || resolvedComponent;
          const guard = options2[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name)();
        }));
      }
    }
  }
  return guards2;
}
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function useLink(props) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  const route = computed(() => router.resolve(unref(props.to)));
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length)
      return -1;
    const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1)
      return index;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e = {}) {
    if (guardEvent(e)) {
      return router[unref(props.replace) ? "replace" : "push"](unref(props.to)).catch(noop$1);
    }
    return Promise.resolve();
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options: options2 } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options2.linkActiveClass, "router-link-active")]: link.isActive,
      [getLinkClass(props.exactActiveClass, options2.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && slots.default(link);
      return props.custom ? children : h("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
    return;
  if (e.defaultPrevented)
    return;
  if (e.button !== void 0 && e.button !== 0)
    return;
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target))
      return;
  }
  if (e.preventDefault)
    e.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue)
        return false;
    } else {
      if (!Array.isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i]))
        return false;
    }
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  setup(props, { attrs, slots }) {
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const depth = inject(viewDepthKey, 0);
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth]);
    provide(viewDepthKey, depth + 1);
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) {
            to.leaveGuards = from.leaveGuards;
          }
          if (!to.updateGuards.size) {
            to.updateGuards = from.updateGuards;
          }
        }
      }
      if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
        (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
      }
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[props.name];
      const currentName = props.name;
      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route });
      }
      const routePropsOption = matchedRoute.props[props.name];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = h(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      return normalizeSlot(slots.default, { Component: component, route }) || component;
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot)
    return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function createRouter(options2) {
  const matcher = createRouterMatcher(options2.routes, options2);
  const parseQuery$1 = options2.parseQuery || parseQuery;
  const stringifyQuery$1 = options2.stringifyQuery || stringifyQuery;
  const routerHistory = options2.history;
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options2.scrollBehavior && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const normalizeParams2 = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = applyToParams.bind(null, decode);
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    }
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve2(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href2 = routerHistory.createHref(locationNormalized.fullPath);
      return assign(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href2
      });
    }
    let matcherLocation;
    if ("path" in rawLocation) {
      matcherLocation = assign({}, rawLocation, {
        path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
      });
    } else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key];
        }
      }
      matcherLocation = assign({}, rawLocation, {
        params: encodeParams(rawLocation.params)
      });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash2 = rawLocation.hash || "";
    matchedRoute.params = normalizeParams2(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
      hash: encodeHash(hash2),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    return assign({
      fullPath,
      hash: hash2,
      query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) {
      return createRouterError(8, {
        from,
        to
      });
    }
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
        newTargetLocation.params = {};
      }
      return assign({
        query: to.query,
        hash: to.hash,
        params: to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve2(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace2 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation);
    if (shouldRedirect)
      return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
        state: data,
        force,
        replace: replace2
      }), redirectedFrom || targetLocation);
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(16, { to: toLocation, from });
      handleScroll(from, from, true, false);
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? error : triggerError(error, toLocation, from)).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(failure2, 2)) {
          return pushWithRedirect(assign(locationAsObject(failure2.to), {
            state: data,
            force,
            replace: replace2
          }), redirectedFrom || toLocation);
        }
      } else {
        failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
      }
      triggerAfterEach(toLocation, from, failure2);
      return failure2;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function navigate(to, from) {
    let guards2;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards2 = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) {
      record.leaveGuards.forEach((guard) => {
        guards2.push(guardToPromiseFn(guard, to, from));
      });
    }
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards2.push(canceledNavigationCheck);
    return runGuardQueue(guards2).then(() => {
      guards2 = [];
      for (const guard of beforeGuards.list()) {
        guards2.push(guardToPromiseFn(guard, to, from));
      }
      guards2.push(canceledNavigationCheck);
      return runGuardQueue(guards2);
    }).then(() => {
      guards2 = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) {
        record.updateGuards.forEach((guard) => {
          guards2.push(guardToPromiseFn(guard, to, from));
        });
      }
      guards2.push(canceledNavigationCheck);
      return runGuardQueue(guards2);
    }).then(() => {
      guards2 = [];
      for (const record of to.matched) {
        if (record.beforeEnter && !from.matched.includes(record)) {
          if (Array.isArray(record.beforeEnter)) {
            for (const beforeEnter of record.beforeEnter)
              guards2.push(guardToPromiseFn(beforeEnter, to, from));
          } else {
            guards2.push(guardToPromiseFn(record.beforeEnter, to, from));
          }
        }
      }
      guards2.push(canceledNavigationCheck);
      return runGuardQueue(guards2);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards2 = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from);
      guards2.push(canceledNavigationCheck);
      return runGuardQueue(guards2);
    }).then(() => {
      guards2 = [];
      for (const guard of beforeResolveGuards.list()) {
        guards2.push(guardToPromiseFn(guard, to, from));
      }
      guards2.push(canceledNavigationCheck);
      return runGuardQueue(guards2);
    }).catch((err) => isNavigationFailure(err, 8) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    for (const guard of afterGuards.list())
      guard(to, from, failure);
  }
  function finalizeNavigation(toLocation, from, isPush, replace2, data) {
    const error = checkCanceledNavigation(toLocation, from);
    if (error)
      return error;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) {
      if (replace2 || isFirstNavigation)
        routerHistory.replace(toLocation.fullPath, assign({
          scroll: isFirstNavigation && state && state.scroll
        }, data));
      else
        routerHistory.push(toLocation.fullPath, data);
    }
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      const toLocation = resolve2(to);
      const shouldRedirect = handleRedirectRecord(toLocation);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop$1);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) {
        saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      }
      navigate(toLocation, from).catch((error) => {
        if (isNavigationFailure(error, 4 | 8)) {
          return error;
        }
        if (isNavigationFailure(error, 2)) {
          pushWithRedirect(error.to, toLocation).then((failure) => {
            if (isNavigationFailure(failure, 4 | 16) && !info.delta && info.type === NavigationType.pop) {
              routerHistory.go(-1, false);
            }
          }).catch(noop$1);
          return Promise.reject();
        }
        if (info.delta)
          routerHistory.go(-info.delta, false);
        return triggerError(error, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(toLocation, from, false);
        if (failure) {
          if (info.delta) {
            routerHistory.go(-info.delta, false);
          } else if (info.type === NavigationType.pop && isNavigationFailure(failure, 4 | 16)) {
            routerHistory.go(-1, false);
          }
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop$1);
    });
  }
  let readyHandlers = useCallbacks();
  let errorHandlers = useCallbacks();
  let ready;
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorHandlers.list();
    if (list.length) {
      list.forEach((handler) => handler(error, to, from));
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
      return Promise.resolve();
    return new Promise((resolve3, reject3) => {
      readyHandlers.add([resolve3, reject3]);
    });
  }
  function markAsReady(err) {
    if (ready)
      return;
    ready = true;
    setupListeners();
    readyHandlers.list().forEach(([resolve3, reject3]) => err ? reject3(err) : resolve3());
    readyHandlers.reset();
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options2;
    if (!isBrowser || !scrollBehavior)
      return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = new Set();
  const router = {
    currentRoute,
    addRoute,
    removeRoute,
    hasRoute,
    getRoutes,
    resolve: resolve2,
    options: options2,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorHandlers.add,
    isReady,
    install(app) {
      const router2 = this;
      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);
      app.config.globalProperties.$router = router2;
      Object.defineProperty(app.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) {
        reactiveRoute[key] = computed(() => currentRoute.value[key]);
      }
      app.provide(routerKey, router2);
      app.provide(routeLocationKey, reactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app.unmount;
      installedApps.add(app);
      app.unmount = function() {
        installedApps.delete(app);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
    }
  };
  return router;
}
function runGuardQueue(guards2) {
  return guards2.reduce((promise, guard) => promise.then(() => guard()), Promise.resolve());
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i = 0; i < len; i++) {
    const recordFrom = from.matched[i];
    if (recordFrom) {
      if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
        updatingRecords.push(recordFrom);
      else
        leavingRecords.push(recordFrom);
    }
    const recordTo = to.matched[i];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
        enteringRecords.push(recordTo);
      }
    }
  }
  return [leavingRecords, updatingRecords, enteringRecords];
}
function useRouter() {
  return inject(routerKey);
}
function useRoute() {
  return inject(routeLocationKey);
}
function getDefaults() {
  return {
    baseUrl: null,
    breaks: false,
    extensions: null,
    gfm: true,
    headerIds: true,
    headerPrefix: "",
    highlight: null,
    langPrefix: "language-",
    mangle: true,
    pedantic: false,
    renderer: null,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartLists: false,
    smartypants: false,
    tokenizer: null,
    walkTokens: null,
    xhtml: false
  };
}
let defaults = getDefaults();
function changeDefaults(newDefaults) {
  defaults = newDefaults;
}
const escapeTest = /[&<>"']/;
const escapeReplace = /[&<>"']/g;
const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
const escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html;
}
const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function unescape(html) {
  return html.replace(unescapeTest, (_, n) => {
    n = n.toLowerCase();
    if (n === "colon")
      return ":";
    if (n.charAt(0) === "#") {
      return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
    }
    return "";
  });
}
const caret = /(^|[^\[])\^/g;
function edit(regex, opt) {
  regex = regex.source || regex;
  opt = opt || "";
  const obj = {
    replace: (name, val) => {
      val = val.source || val;
      val = val.replace(caret, "$1");
      regex = regex.replace(name, val);
      return obj;
    },
    getRegex: () => {
      return new RegExp(regex, opt);
    }
  };
  return obj;
}
const nonWordAndColonTest = /[^\w:]/g;
const originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function cleanUrl(sanitize, base, href) {
  if (sanitize) {
    let prot;
    try {
      prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, "").toLowerCase();
    } catch (e) {
      return null;
    }
    if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
      return null;
    }
  }
  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e) {
    return null;
  }
  return href;
}
const baseUrls = {};
const justDomain = /^[^:]+:\/*[^/]*$/;
const protocol = /^([^:]+:)[\s\S]*$/;
const domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;
function resolveUrl(base, href) {
  if (!baseUrls[" " + base]) {
    if (justDomain.test(base)) {
      baseUrls[" " + base] = base + "/";
    } else {
      baseUrls[" " + base] = rtrim(base, "/", true);
    }
  }
  base = baseUrls[" " + base];
  const relativeBase = base.indexOf(":") === -1;
  if (href.substring(0, 2) === "//") {
    if (relativeBase) {
      return href;
    }
    return base.replace(protocol, "$1") + href;
  } else if (href.charAt(0) === "/") {
    if (relativeBase) {
      return href;
    }
    return base.replace(domain, "$1") + href;
  } else {
    return base + href;
  }
}
const noopTest = { exec: function noopTest2() {
} };
function merge(obj) {
  let i = 1, target, key;
  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }
  return obj;
}
function splitCells(tableRow, count) {
  const row = tableRow.replace(/\|/g, (match3, offset2, str) => {
    let escaped = false, curr = offset2;
    while (--curr >= 0 && str[curr] === "\\")
      escaped = !escaped;
    if (escaped) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(/ \|/);
  let i = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (cells.length > 0 && !cells[cells.length - 1].trim()) {
    cells.pop();
  }
  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count)
      cells.push("");
  }
  for (; i < cells.length; i++) {
    cells[i] = cells[i].trim().replace(/\\\|/g, "|");
  }
  return cells;
}
function rtrim(str, c, invert) {
  const l = str.length;
  if (l === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.substr(0, l - suffLen);
}
function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  const l = str.length;
  let level = 0, i = 0;
  for (; i < l; i++) {
    if (str[i] === "\\") {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}
function checkSanitizeDeprecation(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
  }
}
function repeatString(pattern, count) {
  if (count < 1) {
    return "";
  }
  let result = "";
  while (count > 1) {
    if (count & 1) {
      result += pattern;
    }
    count >>= 1;
    pattern += pattern;
  }
  return result + pattern;
}
function outputLink(cap, link, raw, lexer) {
  const href = link.href;
  const title = link.title ? escape(link.title) : null;
  const text = cap[1].replace(/\\([\[\]])/g, "$1");
  if (cap[0].charAt(0) !== "!") {
    lexer.state.inLink = true;
    const token = {
      type: "link",
      raw,
      href,
      title,
      text,
      tokens: lexer.inlineTokens(text, [])
    };
    lexer.state.inLink = false;
    return token;
  } else {
    return {
      type: "image",
      raw,
      href,
      title,
      text: escape(text)
    };
  }
}
function indentCodeCompensation(raw, text) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
  if (matchIndentToCode === null) {
    return text;
  }
  const indentToCode = matchIndentToCode[1];
  return text.split("\n").map((node) => {
    const matchIndentInNode = node.match(/^\s+/);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
class Tokenizer {
  constructor(options2) {
    this.options = options2 || defaults;
  }
  space(src) {
    const cap = this.rules.block.newline.exec(src);
    if (cap && cap[0].length > 0) {
      return {
        type: "space",
        raw: cap[0]
      };
    }
  }
  code(src) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: cap[0],
        codeBlockStyle: "indented",
        text: !this.options.pedantic ? rtrim(text, "\n") : text
      };
    }
  }
  fences(src) {
    const cap = this.rules.block.fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text = indentCodeCompensation(raw, cap[3] || "");
      return {
        type: "code",
        raw,
        lang: cap[2] ? cap[2].trim() : cap[2],
        text
      };
    }
  }
  heading(src) {
    const cap = this.rules.block.heading.exec(src);
    if (cap) {
      let text = cap[2].trim();
      if (/#$/.test(text)) {
        const trimmed = rtrim(text, "#");
        if (this.options.pedantic) {
          text = trimmed.trim();
        } else if (!trimmed || / $/.test(trimmed)) {
          text = trimmed.trim();
        }
      }
      const token = {
        type: "heading",
        raw: cap[0],
        depth: cap[1].length,
        text,
        tokens: []
      };
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  }
  hr(src) {
    const cap = this.rules.block.hr.exec(src);
    if (cap) {
      return {
        type: "hr",
        raw: cap[0]
      };
    }
  }
  blockquote(src) {
    const cap = this.rules.block.blockquote.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ *> ?/gm, "");
      return {
        type: "blockquote",
        raw: cap[0],
        tokens: this.lexer.blockTokens(text, []),
        text
      };
    }
  }
  list(src) {
    let cap = this.rules.block.list.exec(src);
    if (cap) {
      let raw, istask, ischecked, indent, i, blankLine, endsWithBlankLine, line, nextLine, rawLine, itemContents, endEarly;
      let bull = cap[1].trim();
      const isordered = bull.length > 1;
      const list = {
        type: "list",
        raw: "",
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : "",
        loose: false,
        items: []
      };
      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
      if (this.options.pedantic) {
        bull = isordered ? bull : "[*+-]";
      }
      const itemRegex = new RegExp(`^( {0,3}${bull})((?: [^\\n]*)?(?:\\n|$))`);
      while (src) {
        endEarly = false;
        if (!(cap = itemRegex.exec(src))) {
          break;
        }
        if (this.rules.block.hr.test(src)) {
          break;
        }
        raw = cap[0];
        src = src.substring(raw.length);
        line = cap[2].split("\n", 1)[0];
        nextLine = src.split("\n", 1)[0];
        if (this.options.pedantic) {
          indent = 2;
          itemContents = line.trimLeft();
        } else {
          indent = cap[2].search(/[^ ]/);
          indent = indent > 4 ? 1 : indent;
          itemContents = line.slice(indent);
          indent += cap[1].length;
        }
        blankLine = false;
        if (!line && /^ *$/.test(nextLine)) {
          raw += nextLine + "\n";
          src = src.substring(nextLine.length + 1);
          endEarly = true;
        }
        if (!endEarly) {
          const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])`);
          while (src) {
            rawLine = src.split("\n", 1)[0];
            line = rawLine;
            if (this.options.pedantic) {
              line = line.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
            }
            if (nextBulletRegex.test(line)) {
              break;
            }
            if (line.search(/[^ ]/) >= indent || !line.trim()) {
              itemContents += "\n" + line.slice(indent);
            } else if (!blankLine) {
              itemContents += "\n" + line;
            } else {
              break;
            }
            if (!blankLine && !line.trim()) {
              blankLine = true;
            }
            raw += rawLine + "\n";
            src = src.substring(rawLine.length + 1);
          }
        }
        if (!list.loose) {
          if (endsWithBlankLine) {
            list.loose = true;
          } else if (/\n *\n *$/.test(raw)) {
            endsWithBlankLine = true;
          }
        }
        if (this.options.gfm) {
          istask = /^\[[ xX]\] /.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== "[ ] ";
            itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
          }
        }
        list.items.push({
          type: "list_item",
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents
        });
        list.raw += raw;
      }
      list.items[list.items.length - 1].raw = raw.trimRight();
      list.items[list.items.length - 1].text = itemContents.trimRight();
      list.raw = list.raw.trimRight();
      const l = list.items.length;
      for (i = 0; i < l; i++) {
        this.lexer.state.top = false;
        list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
        const spacers = list.items[i].tokens.filter((t) => t.type === "space");
        const hasMultipleLineBreaks = spacers.every((t) => {
          const chars = t.raw.split("");
          let lineBreaks = 0;
          for (const char of chars) {
            if (char === "\n") {
              lineBreaks += 1;
            }
            if (lineBreaks > 1) {
              return true;
            }
          }
          return false;
        });
        if (!list.loose && spacers.length && hasMultipleLineBreaks) {
          list.loose = true;
          list.items[i].loose = true;
        }
      }
      return list;
    }
  }
  html(src) {
    const cap = this.rules.block.html.exec(src);
    if (cap) {
      const token = {
        type: "html",
        raw: cap[0],
        pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
        text: cap[0]
      };
      if (this.options.sanitize) {
        token.type = "paragraph";
        token.text = this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]);
        token.tokens = [];
        this.lexer.inline(token.text, token.tokens);
      }
      return token;
    }
  }
  def(src) {
    const cap = this.rules.block.def.exec(src);
    if (cap) {
      if (cap[3])
        cap[3] = cap[3].substring(1, cap[3].length - 1);
      const tag = cap[1].toLowerCase().replace(/\s+/g, " ");
      return {
        type: "def",
        tag,
        raw: cap[0],
        href: cap[2],
        title: cap[3]
      };
    }
  }
  table(src) {
    const cap = this.rules.block.table.exec(src);
    if (cap) {
      const item = {
        type: "table",
        header: splitCells(cap[1]).map((c) => {
          return { text: c };
        }),
        align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
        rows: cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : []
      };
      if (item.header.length === item.align.length) {
        item.raw = cap[0];
        let l = item.align.length;
        let i, j, k, row;
        for (i = 0; i < l; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = "right";
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = "center";
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = "left";
          } else {
            item.align[i] = null;
          }
        }
        l = item.rows.length;
        for (i = 0; i < l; i++) {
          item.rows[i] = splitCells(item.rows[i], item.header.length).map((c) => {
            return { text: c };
          });
        }
        l = item.header.length;
        for (j = 0; j < l; j++) {
          item.header[j].tokens = [];
          this.lexer.inlineTokens(item.header[j].text, item.header[j].tokens);
        }
        l = item.rows.length;
        for (j = 0; j < l; j++) {
          row = item.rows[j];
          for (k = 0; k < row.length; k++) {
            row[k].tokens = [];
            this.lexer.inlineTokens(row[k].text, row[k].tokens);
          }
        }
        return item;
      }
    }
  }
  lheading(src) {
    const cap = this.rules.block.lheading.exec(src);
    if (cap) {
      const token = {
        type: "heading",
        raw: cap[0],
        depth: cap[2].charAt(0) === "=" ? 1 : 2,
        text: cap[1],
        tokens: []
      };
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  }
  paragraph(src) {
    const cap = this.rules.block.paragraph.exec(src);
    if (cap) {
      const token = {
        type: "paragraph",
        raw: cap[0],
        text: cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1],
        tokens: []
      };
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  }
  text(src) {
    const cap = this.rules.block.text.exec(src);
    if (cap) {
      const token = {
        type: "text",
        raw: cap[0],
        text: cap[0],
        tokens: []
      };
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  }
  escape(src) {
    const cap = this.rules.inline.escape.exec(src);
    if (cap) {
      return {
        type: "escape",
        raw: cap[0],
        text: escape(cap[1])
      };
    }
  }
  tag(src) {
    const cap = this.rules.inline.tag.exec(src);
    if (cap) {
      if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = false;
      }
      return {
        type: this.options.sanitize ? "text" : "html",
        raw: cap[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0]
      };
    }
  }
  link(src) {
    const cap = this.rules.inline.link.exec(src);
    if (cap) {
      const trimmedUrl = cap[2].trim();
      if (!this.options.pedantic && /^</.test(trimmedUrl)) {
        if (!/>$/.test(trimmedUrl)) {
          return;
        }
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        const lastParenIndex = findClosingBracket(cap[2], "()");
        if (lastParenIndex > -1) {
          const start2 = cap[0].indexOf("!") === 0 ? 5 : 4;
          const linkLen = start2 + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = "";
        }
      }
      let href = cap[2];
      let title = "";
      if (this.options.pedantic) {
        const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
        if (link) {
          href = link[1];
          title = link[3];
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : "";
      }
      href = href.trim();
      if (/^</.test(href)) {
        if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap, {
        href: href ? href.replace(this.rules.inline._escapes, "$1") : href,
        title: title ? title.replace(this.rules.inline._escapes, "$1") : title
      }, cap[0], this.lexer);
    }
  }
  reflink(src, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
      let link = (cap[2] || cap[1]).replace(/\s+/g, " ");
      link = links[link.toLowerCase()];
      if (!link || !link.href) {
        const text = cap[0].charAt(0);
        return {
          type: "text",
          raw: text,
          text
        };
      }
      return outputLink(cap, link, cap[0], this.lexer);
    }
  }
  emStrong(src, maskedSrc, prevChar = "") {
    let match3 = this.rules.inline.emStrong.lDelim.exec(src);
    if (!match3)
      return;
    if (match3[3] && prevChar.match(/[\p{L}\p{N}]/u))
      return;
    const nextChar = match3[1] || match3[2] || "";
    if (!nextChar || nextChar && (prevChar === "" || this.rules.inline.punctuation.exec(prevChar))) {
      const lLength = match3[0].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
      const endReg = match3[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
      endReg.lastIndex = 0;
      maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
      while ((match3 = endReg.exec(maskedSrc)) != null) {
        rDelim = match3[1] || match3[2] || match3[3] || match3[4] || match3[5] || match3[6];
        if (!rDelim)
          continue;
        rLength = rDelim.length;
        if (match3[3] || match3[4]) {
          delimTotal += rLength;
          continue;
        } else if (match3[5] || match3[6]) {
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue;
          }
        }
        delimTotal -= rLength;
        if (delimTotal > 0)
          continue;
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
        if (Math.min(lLength, rLength) % 2) {
          const text2 = src.slice(1, lLength + match3.index + rLength);
          return {
            type: "em",
            raw: src.slice(0, lLength + match3.index + rLength + 1),
            text: text2,
            tokens: this.lexer.inlineTokens(text2, [])
          };
        }
        const text = src.slice(2, lLength + match3.index + rLength - 1);
        return {
          type: "strong",
          raw: src.slice(0, lLength + match3.index + rLength + 1),
          text,
          tokens: this.lexer.inlineTokens(text, [])
        };
      }
    }
  }
  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text = cap[2].replace(/\n/g, " ");
      const hasNonSpaceChars = /[^ ]/.test(text);
      const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1);
      }
      text = escape(text, true);
      return {
        type: "codespan",
        raw: cap[0],
        text
      };
    }
  }
  br(src) {
    const cap = this.rules.inline.br.exec(src);
    if (cap) {
      return {
        type: "br",
        raw: cap[0]
      };
    }
  }
  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: "del",
        raw: cap[0],
        text: cap[2],
        tokens: this.lexer.inlineTokens(cap[2], [])
      };
    }
  }
  autolink(src, mangle2) {
    const cap = this.rules.inline.autolink.exec(src);
    if (cap) {
      let text, href;
      if (cap[2] === "@") {
        text = escape(this.options.mangle ? mangle2(cap[1]) : cap[1]);
        href = "mailto:" + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  url(src, mangle2) {
    let cap;
    if (cap = this.rules.inline.url.exec(src)) {
      let text, href;
      if (cap[2] === "@") {
        text = escape(this.options.mangle ? mangle2(cap[0]) : cap[0]);
        href = "mailto:" + text;
      } else {
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
        } while (prevCapZero !== cap[0]);
        text = escape(cap[0]);
        if (cap[1] === "www.") {
          href = "http://" + text;
        } else {
          href = text;
        }
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  inlineText(src, smartypants2) {
    const cap = this.rules.inline.text.exec(src);
    if (cap) {
      let text;
      if (this.lexer.state.inRawBlock) {
        text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0];
      } else {
        text = escape(this.options.smartypants ? smartypants2(cap[0]) : cap[0]);
      }
      return {
        type: "text",
        raw: cap[0],
        text
      };
    }
  }
}
const block = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)( [^\n]+?)?(?:\n|$)/,
  html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
  def: /^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
  table: noopTest,
  lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  text: /^[^\n]+/
};
block._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit(block.def).replace("label", block._label).replace("title", block._title).getRegex();
block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
block.listItemStart = edit(/^( *)(bull) */).replace("bull", block.bullet).getRegex();
block.list = edit(block.list).replace(/bull/g, block.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
block._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
block.html = edit(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
block.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.blockquote = edit(block.blockquote).replace("paragraph", block.paragraph).getRegex();
block.normal = merge({}, block);
block.gfm = merge({}, block.normal, {
  table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
});
block.gfm.table = edit(block.gfm.table).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.gfm.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", block.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.pedantic = merge({}, block.normal, {
  html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", block._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest,
  paragraph: edit(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
});
const inline = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noopTest,
  tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(ref)\]/,
  nolink: /^!?\[(ref)\](?:\[\])?/,
  reflinkSearch: "reflink|nolink(?!\\()",
  emStrong: {
    lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
    rDelimAst: /^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
    rDelimUnd: /^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noopTest,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^([\spunctuation])/
};
inline._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";
inline.punctuation = edit(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex();
inline.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
inline.escapedEmSt = /\\\*|\\_/g;
inline._comment = edit(block._comment).replace("(?:-->|$)", "-->").getRegex();
inline.emStrong.lDelim = edit(inline.emStrong.lDelim).replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimAst = edit(inline.emStrong.rDelimAst, "g").replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimUnd = edit(inline.emStrong.rDelimUnd, "g").replace(/punct/g, inline._punctuation).getRegex();
inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
inline.tag = edit(inline.tag).replace("comment", inline._comment).replace("attribute", inline._attribute).getRegex();
inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
inline.link = edit(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
inline.reflink = edit(inline.reflink).replace("label", inline._label).replace("ref", block._label).getRegex();
inline.nolink = edit(inline.nolink).replace("ref", block._label).getRegex();
inline.reflinkSearch = edit(inline.reflinkSearch, "g").replace("reflink", inline.reflink).replace("nolink", inline.nolink).getRegex();
inline.normal = merge({}, inline);
inline.pedantic = merge({}, inline.normal, {
  strong: {
    start: /^__|\*\*/,
    middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    endAst: /\*\*(?!\*)/g,
    endUnd: /__(?!_)/g
  },
  em: {
    start: /^_|\*/,
    middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
    endAst: /\*(?!\*)/g,
    endUnd: /_(?!_)/g
  },
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex()
});
inline.gfm = merge({}, inline.normal, {
  escape: edit(inline.escape).replace("])", "~|])").getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
});
inline.gfm.url = edit(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
inline.breaks = merge({}, inline.gfm, {
  br: edit(inline.br).replace("{2,}", "*").getRegex(),
  text: edit(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
});
function smartypants(text) {
  return text.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C").replace(/"/g, "\u201D").replace(/\.{3}/g, "\u2026");
}
function mangle(text) {
  let out = "", i, ch;
  const l = text.length;
  for (i = 0; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = "x" + ch.toString(16);
    }
    out += "&#" + ch + ";";
  }
  return out;
}
class Lexer {
  constructor(options2) {
    this.tokens = [];
    this.tokens.links = Object.create(null);
    this.options = options2 || defaults;
    this.options.tokenizer = this.options.tokenizer || new Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };
    const rules = {
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }
  static get rules() {
    return {
      block,
      inline
    };
  }
  static lex(src, options2) {
    const lexer = new Lexer(options2);
    return lexer.lex(src);
  }
  static lexInline(src, options2) {
    const lexer = new Lexer(options2);
    return lexer.inlineTokens(src);
  }
  lex(src) {
    src = src.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ");
    this.blockTokens(src, this.tokens);
    let next;
    while (next = this.inlineQueue.shift()) {
      this.inlineTokens(next.src, next.tokens);
    }
    return this.tokens;
  }
  blockTokens(src, tokens = []) {
    if (this.options.pedantic) {
      src = src.replace(/^ +$/gm, "");
    }
    let token, lastToken, cutSrc, lastParagraphClipped;
    while (src) {
      if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
        if (token.raw.length === 1 && tokens.length > 0) {
          tokens[tokens.length - 1].raw += "\n";
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.code(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.def(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.raw;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
        lastToken = tokens[tokens.length - 1];
        if (lastParagraphClipped && lastToken.type === "paragraph") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        lastParagraphClipped = cutSrc.length !== src.length;
        src = src.substring(token.raw.length);
        continue;
      }
      if (token = this.tokenizer.text(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    this.state.top = true;
    return tokens;
  }
  inline(src, tokens) {
    this.inlineQueue.push({ src, tokens });
  }
  inlineTokens(src, tokens = []) {
    let token, lastToken, cutSrc;
    let maskedSrc = src;
    let match3;
    let keepPrevChar, prevChar;
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match3 = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match3[0].slice(match3[0].lastIndexOf("[") + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match3.index) + "[" + repeatString("a", match3[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    while ((match3 = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match3.index) + "[" + repeatString("a", match3[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }
    while ((match3 = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match3.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
    }
    while (src) {
      if (!keepPrevChar) {
        prevChar = "";
      }
      keepPrevChar = false;
      if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.tag(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.codespan(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.br(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.del(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.autolink(src, mangle)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (!this.state.inLink && (token = this.tokenizer.url(src, mangle))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startInline) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (token = this.tokenizer.inlineText(cutSrc, smartypants)) {
        src = src.substring(token.raw.length);
        if (token.raw.slice(-1) !== "_") {
          prevChar = token.raw.slice(-1);
        }
        keepPrevChar = true;
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    return tokens;
  }
}
class Renderer {
  constructor(options2) {
    this.options = options2 || defaults;
  }
  code(code, infostring, escaped) {
    const lang = (infostring || "").match(/\S*/)[0];
    if (this.options.highlight) {
      const out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }
    code = code.replace(/\n$/, "") + "\n";
    if (!lang) {
      return "<pre><code>" + (escaped ? code : escape(code, true)) + "</code></pre>\n";
    }
    return '<pre><code class="' + this.options.langPrefix + escape(lang, true) + '">' + (escaped ? code : escape(code, true)) + "</code></pre>\n";
  }
  blockquote(quote) {
    return "<blockquote>\n" + quote + "</blockquote>\n";
  }
  html(html) {
    return html;
  }
  heading(text, level, raw, slugger) {
    if (this.options.headerIds) {
      return "<h" + level + ' id="' + this.options.headerPrefix + slugger.slug(raw) + '">' + text + "</h" + level + ">\n";
    }
    return "<h" + level + ">" + text + "</h" + level + ">\n";
  }
  hr() {
    return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
  }
  list(body, ordered, start2) {
    const type3 = ordered ? "ol" : "ul", startatt = ordered && start2 !== 1 ? ' start="' + start2 + '"' : "";
    return "<" + type3 + startatt + ">\n" + body + "</" + type3 + ">\n";
  }
  listitem(text) {
    return "<li>" + text + "</li>\n";
  }
  checkbox(checked) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
  }
  paragraph(text) {
    return "<p>" + text + "</p>\n";
  }
  table(header, body) {
    if (body)
      body = "<tbody>" + body + "</tbody>";
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  }
  tablerow(content) {
    return "<tr>\n" + content + "</tr>\n";
  }
  tablecell(content, flags) {
    const type3 = flags.header ? "th" : "td";
    const tag = flags.align ? "<" + type3 + ' align="' + flags.align + '">' : "<" + type3 + ">";
    return tag + content + "</" + type3 + ">\n";
  }
  strong(text) {
    return "<strong>" + text + "</strong>";
  }
  em(text) {
    return "<em>" + text + "</em>";
  }
  codespan(text) {
    return "<code>" + text + "</code>";
  }
  br() {
    return this.options.xhtml ? "<br/>" : "<br>";
  }
  del(text) {
    return "<del>" + text + "</del>";
  }
  link(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = '<a href="' + escape(href) + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ">" + text + "</a>";
    return out;
  }
  image(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = '<img src="' + href + '" alt="' + text + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += this.options.xhtml ? "/>" : ">";
    return out;
  }
  text(text) {
    return text;
  }
}
class TextRenderer {
  strong(text) {
    return text;
  }
  em(text) {
    return text;
  }
  codespan(text) {
    return text;
  }
  del(text) {
    return text;
  }
  html(text) {
    return text;
  }
  text(text) {
    return text;
  }
  link(href, title, text) {
    return "" + text;
  }
  image(href, title, text) {
    return "" + text;
  }
  br() {
    return "";
  }
}
class Slugger {
  constructor() {
    this.seen = {};
  }
  serialize(value) {
    return value.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
  }
  getNextSafeSlug(originalSlug, isDryRun) {
    let slug = originalSlug;
    let occurenceAccumulator = 0;
    if (this.seen.hasOwnProperty(slug)) {
      occurenceAccumulator = this.seen[originalSlug];
      do {
        occurenceAccumulator++;
        slug = originalSlug + "-" + occurenceAccumulator;
      } while (this.seen.hasOwnProperty(slug));
    }
    if (!isDryRun) {
      this.seen[originalSlug] = occurenceAccumulator;
      this.seen[slug] = 0;
    }
    return slug;
  }
  slug(value, options2 = {}) {
    const slug = this.serialize(value);
    return this.getNextSafeSlug(slug, options2.dryrun);
  }
}
class Parser {
  constructor(options2) {
    this.options = options2 || defaults;
    this.options.renderer = this.options.renderer || new Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.textRenderer = new TextRenderer();
    this.slugger = new Slugger();
  }
  static parse(tokens, options2) {
    const parser = new Parser(options2);
    return parser.parse(tokens);
  }
  static parseInline(tokens, options2) {
    const parser = new Parser(options2);
    return parser.parseInline(tokens);
  }
  parse(tokens, top2 = true) {
    let out = "", i, j, k, l2, l3, row, cell, header, body, token, ordered, start2, loose, itemBody, item, checked, task, checkbox, ret;
    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "space": {
          continue;
        }
        case "hr": {
          out += this.renderer.hr();
          continue;
        }
        case "heading": {
          out += this.renderer.heading(this.parseInline(token.tokens), token.depth, unescape(this.parseInline(token.tokens, this.textRenderer)), this.slugger);
          continue;
        }
        case "code": {
          out += this.renderer.code(token.text, token.lang, token.escaped);
          continue;
        }
        case "table": {
          header = "";
          cell = "";
          l2 = token.header.length;
          for (j = 0; j < l2; j++) {
            cell += this.renderer.tablecell(this.parseInline(token.header[j].tokens), { header: true, align: token.align[j] });
          }
          header += this.renderer.tablerow(cell);
          body = "";
          l2 = token.rows.length;
          for (j = 0; j < l2; j++) {
            row = token.rows[j];
            cell = "";
            l3 = row.length;
            for (k = 0; k < l3; k++) {
              cell += this.renderer.tablecell(this.parseInline(row[k].tokens), { header: false, align: token.align[k] });
            }
            body += this.renderer.tablerow(cell);
          }
          out += this.renderer.table(header, body);
          continue;
        }
        case "blockquote": {
          body = this.parse(token.tokens);
          out += this.renderer.blockquote(body);
          continue;
        }
        case "list": {
          ordered = token.ordered;
          start2 = token.start;
          loose = token.loose;
          l2 = token.items.length;
          body = "";
          for (j = 0; j < l2; j++) {
            item = token.items[j];
            checked = item.checked;
            task = item.task;
            itemBody = "";
            if (item.task) {
              checkbox = this.renderer.checkbox(checked);
              if (loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                  item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                  if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                    item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                  }
                } else {
                  item.tokens.unshift({
                    type: "text",
                    text: checkbox
                  });
                }
              } else {
                itemBody += checkbox;
              }
            }
            itemBody += this.parse(item.tokens, loose);
            body += this.renderer.listitem(itemBody, task, checked);
          }
          out += this.renderer.list(body, ordered, start2);
          continue;
        }
        case "html": {
          out += this.renderer.html(token.text);
          continue;
        }
        case "paragraph": {
          out += this.renderer.paragraph(this.parseInline(token.tokens));
          continue;
        }
        case "text": {
          body = token.tokens ? this.parseInline(token.tokens) : token.text;
          while (i + 1 < l && tokens[i + 1].type === "text") {
            token = tokens[++i];
            body += "\n" + (token.tokens ? this.parseInline(token.tokens) : token.text);
          }
          out += top2 ? this.renderer.paragraph(body) : body;
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
  parseInline(tokens, renderer2) {
    renderer2 = renderer2 || this.renderer;
    let out = "", i, token, ret;
    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "escape": {
          out += renderer2.text(token.text);
          break;
        }
        case "html": {
          out += renderer2.html(token.text);
          break;
        }
        case "link": {
          out += renderer2.link(token.href, token.title, this.parseInline(token.tokens, renderer2));
          break;
        }
        case "image": {
          out += renderer2.image(token.href, token.title, token.text);
          break;
        }
        case "strong": {
          out += renderer2.strong(this.parseInline(token.tokens, renderer2));
          break;
        }
        case "em": {
          out += renderer2.em(this.parseInline(token.tokens, renderer2));
          break;
        }
        case "codespan": {
          out += renderer2.codespan(token.text);
          break;
        }
        case "br": {
          out += renderer2.br();
          break;
        }
        case "del": {
          out += renderer2.del(this.parseInline(token.tokens, renderer2));
          break;
        }
        case "text": {
          out += renderer2.text(token.text);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
}
function marked(src, opt, callback) {
  if (typeof src === "undefined" || src === null) {
    throw new Error("marked(): input parameter is undefined or null");
  }
  if (typeof src !== "string") {
    throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected");
  }
  if (typeof opt === "function") {
    callback = opt;
    opt = null;
  }
  opt = merge({}, marked.defaults, opt || {});
  checkSanitizeDeprecation(opt);
  if (callback) {
    const highlight = opt.highlight;
    let tokens;
    try {
      tokens = Lexer.lex(src, opt);
    } catch (e) {
      return callback(e);
    }
    const done = function(err) {
      let out;
      if (!err) {
        try {
          if (opt.walkTokens) {
            marked.walkTokens(tokens, opt.walkTokens);
          }
          out = Parser.parse(tokens, opt);
        } catch (e) {
          err = e;
        }
      }
      opt.highlight = highlight;
      return err ? callback(err) : callback(null, out);
    };
    if (!highlight || highlight.length < 3) {
      return done();
    }
    delete opt.highlight;
    if (!tokens.length)
      return done();
    let pending = 0;
    marked.walkTokens(tokens, function(token) {
      if (token.type === "code") {
        pending++;
        setTimeout(() => {
          highlight(token.text, token.lang, function(err, code) {
            if (err) {
              return done(err);
            }
            if (code != null && code !== token.text) {
              token.text = code;
              token.escaped = true;
            }
            pending--;
            if (pending === 0) {
              done();
            }
          });
        }, 0);
      }
    });
    if (pending === 0) {
      done();
    }
    return;
  }
  try {
    const tokens = Lexer.lex(src, opt);
    if (opt.walkTokens) {
      marked.walkTokens(tokens, opt.walkTokens);
    }
    return Parser.parse(tokens, opt);
  } catch (e) {
    e.message += "\nPlease report this to https://github.com/markedjs/marked.";
    if (opt.silent) {
      return "<p>An error occurred:</p><pre>" + escape(e.message + "", true) + "</pre>";
    }
    throw e;
  }
}
marked.options = marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  changeDefaults(marked.defaults);
  return marked;
};
marked.getDefaults = getDefaults;
marked.defaults = defaults;
marked.use = function(...args) {
  const opts = merge({}, ...args);
  const extensions = marked.defaults.extensions || { renderers: {}, childTokens: {} };
  let hasExtensions;
  args.forEach((pack) => {
    if (pack.extensions) {
      hasExtensions = true;
      pack.extensions.forEach((ext) => {
        if (!ext.name) {
          throw new Error("extension name required");
        }
        if (ext.renderer) {
          const prevRenderer = extensions.renderers ? extensions.renderers[ext.name] : null;
          if (prevRenderer) {
            extensions.renderers[ext.name] = function(...args2) {
              let ret = ext.renderer.apply(this, args2);
              if (ret === false) {
                ret = prevRenderer.apply(this, args2);
              }
              return ret;
            };
          } else {
            extensions.renderers[ext.name] = ext.renderer;
          }
        }
        if (ext.tokenizer) {
          if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
            throw new Error("extension level must be 'block' or 'inline'");
          }
          if (extensions[ext.level]) {
            extensions[ext.level].unshift(ext.tokenizer);
          } else {
            extensions[ext.level] = [ext.tokenizer];
          }
          if (ext.start) {
            if (ext.level === "block") {
              if (extensions.startBlock) {
                extensions.startBlock.push(ext.start);
              } else {
                extensions.startBlock = [ext.start];
              }
            } else if (ext.level === "inline") {
              if (extensions.startInline) {
                extensions.startInline.push(ext.start);
              } else {
                extensions.startInline = [ext.start];
              }
            }
          }
        }
        if (ext.childTokens) {
          extensions.childTokens[ext.name] = ext.childTokens;
        }
      });
    }
    if (pack.renderer) {
      const renderer2 = marked.defaults.renderer || new Renderer();
      for (const prop3 in pack.renderer) {
        const prevRenderer = renderer2[prop3];
        renderer2[prop3] = (...args2) => {
          let ret = pack.renderer[prop3].apply(renderer2, args2);
          if (ret === false) {
            ret = prevRenderer.apply(renderer2, args2);
          }
          return ret;
        };
      }
      opts.renderer = renderer2;
    }
    if (pack.tokenizer) {
      const tokenizer = marked.defaults.tokenizer || new Tokenizer();
      for (const prop3 in pack.tokenizer) {
        const prevTokenizer = tokenizer[prop3];
        tokenizer[prop3] = (...args2) => {
          let ret = pack.tokenizer[prop3].apply(tokenizer, args2);
          if (ret === false) {
            ret = prevTokenizer.apply(tokenizer, args2);
          }
          return ret;
        };
      }
      opts.tokenizer = tokenizer;
    }
    if (pack.walkTokens) {
      const walkTokens = marked.defaults.walkTokens;
      opts.walkTokens = function(token) {
        pack.walkTokens.call(this, token);
        if (walkTokens) {
          walkTokens.call(this, token);
        }
      };
    }
    if (hasExtensions) {
      opts.extensions = extensions;
    }
    marked.setOptions(opts);
  });
};
marked.walkTokens = function(tokens, callback) {
  for (const token of tokens) {
    callback.call(marked, token);
    switch (token.type) {
      case "table": {
        for (const cell of token.header) {
          marked.walkTokens(cell.tokens, callback);
        }
        for (const row of token.rows) {
          for (const cell of row) {
            marked.walkTokens(cell.tokens, callback);
          }
        }
        break;
      }
      case "list": {
        marked.walkTokens(token.items, callback);
        break;
      }
      default: {
        if (marked.defaults.extensions && marked.defaults.extensions.childTokens && marked.defaults.extensions.childTokens[token.type]) {
          marked.defaults.extensions.childTokens[token.type].forEach(function(childTokens) {
            marked.walkTokens(token[childTokens], callback);
          });
        } else if (token.tokens) {
          marked.walkTokens(token.tokens, callback);
        }
      }
    }
  }
};
marked.parseInline = function(src, opt) {
  if (typeof src === "undefined" || src === null) {
    throw new Error("marked.parseInline(): input parameter is undefined or null");
  }
  if (typeof src !== "string") {
    throw new Error("marked.parseInline(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected");
  }
  opt = merge({}, marked.defaults, opt || {});
  checkSanitizeDeprecation(opt);
  try {
    const tokens = Lexer.lexInline(src, opt);
    if (opt.walkTokens) {
      marked.walkTokens(tokens, opt.walkTokens);
    }
    return Parser.parseInline(tokens, opt);
  } catch (e) {
    e.message += "\nPlease report this to https://github.com/markedjs/marked.";
    if (opt.silent) {
      return "<p>An error occurred:</p><pre>" + escape(e.message + "", true) + "</pre>";
    }
    throw e;
  }
};
marked.Parser = Parser;
marked.parser = Parser.parse;
marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;
marked.Lexer = Lexer;
marked.lexer = Lexer.lex;
marked.Tokenizer = Tokenizer;
marked.Slugger = Slugger;
marked.parse = marked;
Parser.parse;
Lexer.lex;
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
function isElement$1(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles$1 = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect$2,
  requires: ["computeStyles"]
};
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
var max = Math.max;
var min = Math.min;
var round = Math.round;
function getBoundingClientRect(element, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (isHTMLElement(element) && includeScale) {
    var offsetHeight = element.offsetHeight;
    var offsetWidth = element.offsetWidth;
    if (offsetWidth > 0) {
      scaleX = round(rect.width) / offsetWidth || 1;
    }
    if (offsetHeight > 0) {
      scaleY = round(rect.height) / offsetHeight || 1;
    }
  }
  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}
function contains2(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
function getDocumentElement(element) {
  return ((isElement$1(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
  var isIE = navigator.userAgent.indexOf("Trident") !== -1;
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle$1(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle$1(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
function expandToHashMap(value, keys4) {
  return keys4.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options2 = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options2.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect$1(_ref2) {
  var state = _ref2.state, options2 = _ref2.options;
  var _options$element = options2.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains2(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow$1 = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect$1,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function getVariation(placement) {
  return placement.split("-")[1];
}
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle$1(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options2 = _ref5.options;
  var _options$gpuAccelerat = options2.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options2.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options2.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles$1 = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state, instance = _ref.instance, options2 = _ref.options;
  var _options$scroll = options2.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options2.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect,
  data: {}
};
var hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash$1[matched];
  });
}
var hash = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash[matched];
  });
}
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle$1(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle$1(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement$1(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle$1(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement$1(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement$1(clippingParent) && contains2(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
    }
  }
  return offsets;
}
function detectOverflow(state, options2) {
  if (options2 === void 0) {
    options2 = {};
  }
  var _options = options2, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}
function computeAutoPlacement(state, options2) {
  if (options2 === void 0) {
    options2 = {};
  }
  var _options = options2, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options2 = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options2.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options2.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options2.fallbackPlacements, padding = options2.padding, boundary = options2.boundary, rootBoundary = options2.rootBoundary, altBoundary = options2.altBoundary, _options$flipVariatio = options2.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options2.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip$1 = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide$1 = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options2 = _ref2.options, name = _ref2.name;
  var _options$offset = options2.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset$1 = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets$1 = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function preventOverflow(_ref) {
  var state = _ref.state, options2 = _ref.options, name = _ref.name;
  var _options$mainAxis = options2.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options2.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options2.boundary, rootBoundary = options2.rootBoundary, altBoundary = options2.altBoundary, padding = options2.padding, _options$tether = options2.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options2.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min$1 = offset2 + overflow[mainSide];
    var max$1 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow$1 = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function order(modifiers) {
  var map3 = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map3.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map3.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve2) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve2(fn2());
        });
      });
    }
    return pending;
  };
}
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options2) {
    if (options2 === void 0) {
      options2 = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options3 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options3);
        state.scrollParents = {
          reference: isElement$1(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce(function() {
        return new Promise(function(resolve2) {
          instance.forceUpdate();
          resolve2(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options2).then(function(state2) {
      if (!isDestroyed && options2.onFirstUpdate) {
        options2.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options3 = _ref3$options === void 0 ? {} : _ref3$options, effect2 = _ref3.effect;
        if (typeof effect2 === "function") {
          var cleanupFn = effect2({
            state,
            name,
            instance,
            options: options3
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var createPopper$2 = /* @__PURE__ */ popperGenerator();
var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
var createPopper$1 = /* @__PURE__ */ popperGenerator({
  defaultModifiers: defaultModifiers$1
});
var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});
var Popper = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  popperGenerator,
  detectOverflow,
  createPopperBase: createPopper$2,
  createPopper,
  createPopperLite: createPopper$1,
  top,
  bottom,
  right,
  left,
  auto,
  basePlacements,
  start,
  end,
  clippingParents,
  viewport,
  popper,
  reference,
  variationPlacements,
  placements,
  beforeRead,
  read,
  afterRead,
  beforeMain,
  main,
  afterMain,
  beforeWrite,
  write,
  afterWrite,
  modifierPhases,
  applyStyles: applyStyles$1,
  arrow: arrow$1,
  computeStyles: computeStyles$1,
  eventListeners,
  flip: flip$1,
  hide: hide$1,
  offset: offset$1,
  popperOffsets: popperOffsets$1,
  preventOverflow: preventOverflow$1
});
/*!
  * Bootstrap v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
const MAX_UID = 1e6;
const MILLISECONDS_MULTIPLIER = 1e3;
const TRANSITION_END = "transitionend";
const toType = (obj) => {
  if (obj === null || obj === void 0) {
    return `${obj}`;
  }
  return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
};
const getUID = (prefix) => {
  do {
    prefix += Math.floor(Math.random() * MAX_UID);
  } while (document.getElementById(prefix));
  return prefix;
};
const getSelector = (element) => {
  let selector = element.getAttribute("data-bs-target");
  if (!selector || selector === "#") {
    let hrefAttr = element.getAttribute("href");
    if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
      return null;
    }
    if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
      hrefAttr = `#${hrefAttr.split("#")[1]}`;
    }
    selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
  }
  return selector;
};
const getSelectorFromElement = (element) => {
  const selector = getSelector(element);
  if (selector) {
    return document.querySelector(selector) ? selector : null;
  }
  return null;
};
const getElementFromSelector = (element) => {
  const selector = getSelector(element);
  return selector ? document.querySelector(selector) : null;
};
const getTransitionDurationFromElement = (element) => {
  if (!element) {
    return 0;
  }
  let {
    transitionDuration,
    transitionDelay
  } = window.getComputedStyle(element);
  const floatTransitionDuration = Number.parseFloat(transitionDuration);
  const floatTransitionDelay = Number.parseFloat(transitionDelay);
  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0;
  }
  transitionDuration = transitionDuration.split(",")[0];
  transitionDelay = transitionDelay.split(",")[0];
  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
};
const triggerTransitionEnd = (element) => {
  element.dispatchEvent(new Event(TRANSITION_END));
};
const isElement = (obj) => {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  if (typeof obj.jquery !== "undefined") {
    obj = obj[0];
  }
  return typeof obj.nodeType !== "undefined";
};
const getElement = (obj) => {
  if (isElement(obj)) {
    return obj.jquery ? obj[0] : obj;
  }
  if (typeof obj === "string" && obj.length > 0) {
    return document.querySelector(obj);
  }
  return null;
};
const typeCheckConfig = (componentName, config, configTypes) => {
  Object.keys(configTypes).forEach((property) => {
    const expectedTypes = configTypes[property];
    const value = config[property];
    const valueType = value && isElement(value) ? "element" : toType(value);
    if (!new RegExp(expectedTypes).test(valueType)) {
      throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
    }
  });
};
const isVisible = (element) => {
  if (!isElement(element) || element.getClientRects().length === 0) {
    return false;
  }
  return getComputedStyle(element).getPropertyValue("visibility") === "visible";
};
const isDisabled = (element) => {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return true;
  }
  if (element.classList.contains("disabled")) {
    return true;
  }
  if (typeof element.disabled !== "undefined") {
    return element.disabled;
  }
  return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
};
const findShadowRoot = (element) => {
  if (!document.documentElement.attachShadow) {
    return null;
  }
  if (typeof element.getRootNode === "function") {
    const root = element.getRootNode();
    return root instanceof ShadowRoot ? root : null;
  }
  if (element instanceof ShadowRoot) {
    return element;
  }
  if (!element.parentNode) {
    return null;
  }
  return findShadowRoot(element.parentNode);
};
const noop = () => {
};
const reflow = (element) => {
  element.offsetHeight;
};
const getjQuery = () => {
  const {
    jQuery
  } = window;
  if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
    return jQuery;
  }
  return null;
};
const DOMContentLoadedCallbacks = [];
const onDOMContentLoaded = (callback) => {
  if (document.readyState === "loading") {
    if (!DOMContentLoadedCallbacks.length) {
      document.addEventListener("DOMContentLoaded", () => {
        DOMContentLoadedCallbacks.forEach((callback2) => callback2());
      });
    }
    DOMContentLoadedCallbacks.push(callback);
  } else {
    callback();
  }
};
const isRTL = () => document.documentElement.dir === "rtl";
const defineJQueryPlugin = (plugin) => {
  onDOMContentLoaded(() => {
    const $ = getjQuery();
    if ($) {
      const name = plugin.NAME;
      const JQUERY_NO_CONFLICT = $.fn[name];
      $.fn[name] = plugin.jQueryInterface;
      $.fn[name].Constructor = plugin;
      $.fn[name].noConflict = () => {
        $.fn[name] = JQUERY_NO_CONFLICT;
        return plugin.jQueryInterface;
      };
    }
  });
};
const execute = (callback) => {
  if (typeof callback === "function") {
    callback();
  }
};
const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
  if (!waitForTransition) {
    execute(callback);
    return;
  }
  const durationPadding = 5;
  const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
  let called = false;
  const handler = ({
    target
  }) => {
    if (target !== transitionElement) {
      return;
    }
    called = true;
    transitionElement.removeEventListener(TRANSITION_END, handler);
    execute(callback);
  };
  transitionElement.addEventListener(TRANSITION_END, handler);
  setTimeout(() => {
    if (!called) {
      triggerTransitionEnd(transitionElement);
    }
  }, emulatedDuration);
};
const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
  let index = list.indexOf(activeElement);
  if (index === -1) {
    return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
  }
  const listLength = list.length;
  index += shouldGetNext ? 1 : -1;
  if (isCycleAllowed) {
    index = (index + listLength) % listLength;
  }
  return list[Math.max(0, Math.min(index, listLength - 1))];
};
const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
const stripNameRegex = /\..*/;
const stripUidRegex = /::\d+$/;
const eventRegistry = {};
let uidEvent = 1;
const customEvents = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
};
const customEventsRegex = /^(mouseenter|mouseleave)/i;
const nativeEvents = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function getUidEvent(element, uid2) {
  return uid2 && `${uid2}::${uidEvent++}` || element.uidEvent || uidEvent++;
}
function getEvent(element) {
  const uid2 = getUidEvent(element);
  element.uidEvent = uid2;
  eventRegistry[uid2] = eventRegistry[uid2] || {};
  return eventRegistry[uid2];
}
function bootstrapHandler(element, fn2) {
  return function handler(event) {
    event.delegateTarget = element;
    if (handler.oneOff) {
      EventHandler.off(element, event.type, fn2);
    }
    return fn2.apply(element, [event]);
  };
}
function bootstrapDelegationHandler(element, selector, fn2) {
  return function handler(event) {
    const domElements = element.querySelectorAll(selector);
    for (let {
      target
    } = event; target && target !== this; target = target.parentNode) {
      for (let i = domElements.length; i--; ) {
        if (domElements[i] === target) {
          event.delegateTarget = target;
          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn2);
          }
          return fn2.apply(target, [event]);
        }
      }
    }
    return null;
  };
}
function findHandler(events, handler, delegationSelector = null) {
  const uidEventList = Object.keys(events);
  for (let i = 0, len = uidEventList.length; i < len; i++) {
    const event = events[uidEventList[i]];
    if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
      return event;
    }
  }
  return null;
}
function normalizeParams(originalTypeEvent, handler, delegationFn) {
  const delegation = typeof handler === "string";
  const originalHandler = delegation ? delegationFn : handler;
  let typeEvent = getTypeEvent(originalTypeEvent);
  const isNative = nativeEvents.has(typeEvent);
  if (!isNative) {
    typeEvent = originalTypeEvent;
  }
  return [delegation, originalHandler, typeEvent];
}
function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
  if (typeof originalTypeEvent !== "string" || !element) {
    return;
  }
  if (!handler) {
    handler = delegationFn;
    delegationFn = null;
  }
  if (customEventsRegex.test(originalTypeEvent)) {
    const wrapFn = (fn3) => {
      return function(event) {
        if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
          return fn3.call(this, event);
        }
      };
    };
    if (delegationFn) {
      delegationFn = wrapFn(delegationFn);
    } else {
      handler = wrapFn(handler);
    }
  }
  const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
  const events = getEvent(element);
  const handlers = events[typeEvent] || (events[typeEvent] = {});
  const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);
  if (previousFn) {
    previousFn.oneOff = previousFn.oneOff && oneOff;
    return;
  }
  const uid2 = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ""));
  const fn2 = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
  fn2.delegationSelector = delegation ? handler : null;
  fn2.originalHandler = originalHandler;
  fn2.oneOff = oneOff;
  fn2.uidEvent = uid2;
  handlers[uid2] = fn2;
  element.addEventListener(typeEvent, fn2, delegation);
}
function removeHandler(element, events, typeEvent, handler, delegationSelector) {
  const fn2 = findHandler(events[typeEvent], handler, delegationSelector);
  if (!fn2) {
    return;
  }
  element.removeEventListener(typeEvent, fn2, Boolean(delegationSelector));
  delete events[typeEvent][fn2.uidEvent];
}
function removeNamespacedHandlers(element, events, typeEvent, namespace) {
  const storeElementEvent = events[typeEvent] || {};
  Object.keys(storeElementEvent).forEach((handlerKey) => {
    if (handlerKey.includes(namespace)) {
      const event = storeElementEvent[handlerKey];
      removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
    }
  });
}
function getTypeEvent(event) {
  event = event.replace(stripNameRegex, "");
  return customEvents[event] || event;
}
const EventHandler = {
  on(element, event, handler, delegationFn) {
    addHandler(element, event, handler, delegationFn, false);
  },
  one(element, event, handler, delegationFn) {
    addHandler(element, event, handler, delegationFn, true);
  },
  off(element, originalTypeEvent, handler, delegationFn) {
    if (typeof originalTypeEvent !== "string" || !element) {
      return;
    }
    const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
    const inNamespace = typeEvent !== originalTypeEvent;
    const events = getEvent(element);
    const isNamespace = originalTypeEvent.startsWith(".");
    if (typeof originalHandler !== "undefined") {
      if (!events || !events[typeEvent]) {
        return;
      }
      removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
      return;
    }
    if (isNamespace) {
      Object.keys(events).forEach((elementEvent) => {
        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
      });
    }
    const storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach((keyHandlers) => {
      const handlerKey = keyHandlers.replace(stripUidRegex, "");
      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
        const event = storeElementEvent[keyHandlers];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  },
  trigger(element, event, args) {
    if (typeof event !== "string" || !element) {
      return null;
    }
    const $ = getjQuery();
    const typeEvent = getTypeEvent(event);
    const inNamespace = event !== typeEvent;
    const isNative = nativeEvents.has(typeEvent);
    let jQueryEvent;
    let bubbles = true;
    let nativeDispatch = true;
    let defaultPrevented = false;
    let evt = null;
    if (inNamespace && $) {
      jQueryEvent = $.Event(event, args);
      $(element).trigger(jQueryEvent);
      bubbles = !jQueryEvent.isPropagationStopped();
      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
      defaultPrevented = jQueryEvent.isDefaultPrevented();
    }
    if (isNative) {
      evt = document.createEvent("HTMLEvents");
      evt.initEvent(typeEvent, bubbles, true);
    } else {
      evt = new CustomEvent(event, {
        bubbles,
        cancelable: true
      });
    }
    if (typeof args !== "undefined") {
      Object.keys(args).forEach((key) => {
        Object.defineProperty(evt, key, {
          get() {
            return args[key];
          }
        });
      });
    }
    if (defaultPrevented) {
      evt.preventDefault();
    }
    if (nativeDispatch) {
      element.dispatchEvent(evt);
    }
    if (evt.defaultPrevented && typeof jQueryEvent !== "undefined") {
      jQueryEvent.preventDefault();
    }
    return evt;
  }
};
const elementMap = new Map();
const Data = {
  set(element, key, instance) {
    if (!elementMap.has(element)) {
      elementMap.set(element, new Map());
    }
    const instanceMap = elementMap.get(element);
    if (!instanceMap.has(key) && instanceMap.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
      return;
    }
    instanceMap.set(key, instance);
  },
  get(element, key) {
    if (elementMap.has(element)) {
      return elementMap.get(element).get(key) || null;
    }
    return null;
  },
  remove(element, key) {
    if (!elementMap.has(element)) {
      return;
    }
    const instanceMap = elementMap.get(element);
    instanceMap.delete(key);
    if (instanceMap.size === 0) {
      elementMap.delete(element);
    }
  }
};
const VERSION = "5.1.3";
class BaseComponent {
  constructor(element) {
    element = getElement(element);
    if (!element) {
      return;
    }
    this._element = element;
    Data.set(this._element, this.constructor.DATA_KEY, this);
  }
  dispose() {
    Data.remove(this._element, this.constructor.DATA_KEY);
    EventHandler.off(this._element, this.constructor.EVENT_KEY);
    Object.getOwnPropertyNames(this).forEach((propertyName) => {
      this[propertyName] = null;
    });
  }
  _queueCallback(callback, element, isAnimated = true) {
    executeAfterTransition(callback, element, isAnimated);
  }
  static getInstance(element) {
    return Data.get(getElement(element), this.DATA_KEY);
  }
  static getOrCreateInstance(element, config = {}) {
    return this.getInstance(element) || new this(element, typeof config === "object" ? config : null);
  }
  static get VERSION() {
    return VERSION;
  }
  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!');
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
}
const enableDismissTrigger = (component, method = "hide") => {
  const clickEvent = `click.dismiss${component.EVENT_KEY}`;
  const name = component.NAME;
  EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function(event) {
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    const target = getElementFromSelector(this) || this.closest(`.${name}`);
    const instance = component.getOrCreateInstance(target);
    instance[method]();
  });
};
const NAME$d = "alert";
const DATA_KEY$c = "bs.alert";
const EVENT_KEY$c = `.${DATA_KEY$c}`;
const EVENT_CLOSE = `close${EVENT_KEY$c}`;
const EVENT_CLOSED = `closed${EVENT_KEY$c}`;
const CLASS_NAME_FADE$5 = "fade";
const CLASS_NAME_SHOW$8 = "show";
class Alert extends BaseComponent {
  static get NAME() {
    return NAME$d;
  }
  close() {
    const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
    if (closeEvent.defaultPrevented) {
      return;
    }
    this._element.classList.remove(CLASS_NAME_SHOW$8);
    const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
    this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
  }
  _destroyElement() {
    this._element.remove();
    EventHandler.trigger(this._element, EVENT_CLOSED);
    this.dispose();
  }
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Alert.getOrCreateInstance(this);
      if (typeof config !== "string") {
        return;
      }
      if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](this);
    });
  }
}
enableDismissTrigger(Alert, "close");
defineJQueryPlugin(Alert);
const NAME$c = "button";
const DATA_KEY$b = "bs.button";
const EVENT_KEY$b = `.${DATA_KEY$b}`;
const DATA_API_KEY$7 = ".data-api";
const CLASS_NAME_ACTIVE$3 = "active";
const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$b}${DATA_API_KEY$7}`;
class Button extends BaseComponent {
  static get NAME() {
    return NAME$c;
  }
  toggle() {
    this._element.setAttribute("aria-pressed", this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
  }
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Button.getOrCreateInstance(this);
      if (config === "toggle") {
        data[config]();
      }
    });
  }
}
EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, (event) => {
  event.preventDefault();
  const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
  const data = Button.getOrCreateInstance(button);
  data.toggle();
});
defineJQueryPlugin(Button);
function normalizeData(val) {
  if (val === "true") {
    return true;
  }
  if (val === "false") {
    return false;
  }
  if (val === Number(val).toString()) {
    return Number(val);
  }
  if (val === "" || val === "null") {
    return null;
  }
  return val;
}
function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
}
const Manipulator = {
  setDataAttribute(element, key, value) {
    element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
  },
  removeDataAttribute(element, key) {
    element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
  },
  getDataAttributes(element) {
    if (!element) {
      return {};
    }
    const attributes = {};
    Object.keys(element.dataset).filter((key) => key.startsWith("bs")).forEach((key) => {
      let pureKey = key.replace(/^bs/, "");
      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
      attributes[pureKey] = normalizeData(element.dataset[key]);
    });
    return attributes;
  },
  getDataAttribute(element, key) {
    return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
  },
  offset(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    };
  },
  position(element) {
    return {
      top: element.offsetTop,
      left: element.offsetLeft
    };
  }
};
const NODE_TEXT = 3;
const SelectorEngine = {
  find(selector, element = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
  },
  findOne(selector, element = document.documentElement) {
    return Element.prototype.querySelector.call(element, selector);
  },
  children(element, selector) {
    return [].concat(...element.children).filter((child) => child.matches(selector));
  },
  parents(element, selector) {
    const parents = [];
    let ancestor = element.parentNode;
    while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
      if (ancestor.matches(selector)) {
        parents.push(ancestor);
      }
      ancestor = ancestor.parentNode;
    }
    return parents;
  },
  prev(element, selector) {
    let previous = element.previousElementSibling;
    while (previous) {
      if (previous.matches(selector)) {
        return [previous];
      }
      previous = previous.previousElementSibling;
    }
    return [];
  },
  next(element, selector) {
    let next = element.nextElementSibling;
    while (next) {
      if (next.matches(selector)) {
        return [next];
      }
      next = next.nextElementSibling;
    }
    return [];
  },
  focusableChildren(element) {
    const focusables = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((selector) => `${selector}:not([tabindex^="-"])`).join(", ");
    return this.find(focusables, element).filter((el) => !isDisabled(el) && isVisible(el));
  }
};
const NAME$b = "carousel";
const DATA_KEY$a = "bs.carousel";
const EVENT_KEY$a = `.${DATA_KEY$a}`;
const DATA_API_KEY$6 = ".data-api";
const ARROW_LEFT_KEY = "ArrowLeft";
const ARROW_RIGHT_KEY = "ArrowRight";
const TOUCHEVENT_COMPAT_WAIT = 500;
const SWIPE_THRESHOLD = 40;
const Default$a = {
  interval: 5e3,
  keyboard: true,
  slide: false,
  pause: "hover",
  wrap: true,
  touch: true
};
const DefaultType$a = {
  interval: "(number|boolean)",
  keyboard: "boolean",
  slide: "(boolean|string)",
  pause: "(string|boolean)",
  wrap: "boolean",
  touch: "boolean"
};
const ORDER_NEXT = "next";
const ORDER_PREV = "prev";
const DIRECTION_LEFT = "left";
const DIRECTION_RIGHT = "right";
const KEY_TO_DIRECTION = {
  [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
  [ARROW_RIGHT_KEY]: DIRECTION_LEFT
};
const EVENT_SLIDE = `slide${EVENT_KEY$a}`;
const EVENT_SLID = `slid${EVENT_KEY$a}`;
const EVENT_KEYDOWN = `keydown${EVENT_KEY$a}`;
const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY$a}`;
const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY$a}`;
const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$a}`;
const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$a}`;
const EVENT_TOUCHEND = `touchend${EVENT_KEY$a}`;
const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$a}`;
const EVENT_POINTERUP = `pointerup${EVENT_KEY$a}`;
const EVENT_DRAG_START = `dragstart${EVENT_KEY$a}`;
const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$a}${DATA_API_KEY$6}`;
const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;
const CLASS_NAME_CAROUSEL = "carousel";
const CLASS_NAME_ACTIVE$2 = "active";
const CLASS_NAME_SLIDE = "slide";
const CLASS_NAME_END = "carousel-item-end";
const CLASS_NAME_START = "carousel-item-start";
const CLASS_NAME_NEXT = "carousel-item-next";
const CLASS_NAME_PREV = "carousel-item-prev";
const CLASS_NAME_POINTER_EVENT = "pointer-event";
const SELECTOR_ACTIVE$1 = ".active";
const SELECTOR_ACTIVE_ITEM = ".active.carousel-item";
const SELECTOR_ITEM = ".carousel-item";
const SELECTOR_ITEM_IMG = ".carousel-item img";
const SELECTOR_NEXT_PREV = ".carousel-item-next, .carousel-item-prev";
const SELECTOR_INDICATORS = ".carousel-indicators";
const SELECTOR_INDICATOR = "[data-bs-target]";
const SELECTOR_DATA_SLIDE = "[data-bs-slide], [data-bs-slide-to]";
const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
const POINTER_TYPE_TOUCH = "touch";
const POINTER_TYPE_PEN = "pen";
class Carousel extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._items = null;
    this._interval = null;
    this._activeElement = null;
    this._isPaused = false;
    this._isSliding = false;
    this.touchTimeout = null;
    this.touchStartX = 0;
    this.touchDeltaX = 0;
    this._config = this._getConfig(config);
    this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
    this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
    this._pointerEvent = Boolean(window.PointerEvent);
    this._addEventListeners();
  }
  static get Default() {
    return Default$a;
  }
  static get NAME() {
    return NAME$b;
  }
  next() {
    this._slide(ORDER_NEXT);
  }
  nextWhenVisible() {
    if (!document.hidden && isVisible(this._element)) {
      this.next();
    }
  }
  prev() {
    this._slide(ORDER_PREV);
  }
  pause(event) {
    if (!event) {
      this._isPaused = true;
    }
    if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
      triggerTransitionEnd(this._element);
      this.cycle(true);
    }
    clearInterval(this._interval);
    this._interval = null;
  }
  cycle(event) {
    if (!event) {
      this._isPaused = false;
    }
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
    if (this._config && this._config.interval && !this._isPaused) {
      this._updateInterval();
      this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
    }
  }
  to(index) {
    this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
    const activeIndex = this._getItemIndex(this._activeElement);
    if (index > this._items.length - 1 || index < 0) {
      return;
    }
    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
      return;
    }
    if (activeIndex === index) {
      this.pause();
      this.cycle();
      return;
    }
    const order2 = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
    this._slide(order2, this._items[index]);
  }
  _getConfig(config) {
    config = __spreadValues(__spreadValues(__spreadValues({}, Default$a), Manipulator.getDataAttributes(this._element)), typeof config === "object" ? config : {});
    typeCheckConfig(NAME$b, config, DefaultType$a);
    return config;
  }
  _handleSwipe() {
    const absDeltax = Math.abs(this.touchDeltaX);
    if (absDeltax <= SWIPE_THRESHOLD) {
      return;
    }
    const direction = absDeltax / this.touchDeltaX;
    this.touchDeltaX = 0;
    if (!direction) {
      return;
    }
    this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
  }
  _addEventListeners() {
    if (this._config.keyboard) {
      EventHandler.on(this._element, EVENT_KEYDOWN, (event) => this._keydown(event));
    }
    if (this._config.pause === "hover") {
      EventHandler.on(this._element, EVENT_MOUSEENTER, (event) => this.pause(event));
      EventHandler.on(this._element, EVENT_MOUSELEAVE, (event) => this.cycle(event));
    }
    if (this._config.touch && this._touchSupported) {
      this._addTouchEventListeners();
    }
  }
  _addTouchEventListeners() {
    const hasPointerPenTouch = (event) => {
      return this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
    };
    const start2 = (event) => {
      if (hasPointerPenTouch(event)) {
        this.touchStartX = event.clientX;
      } else if (!this._pointerEvent) {
        this.touchStartX = event.touches[0].clientX;
      }
    };
    const move = (event) => {
      this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this.touchStartX;
    };
    const end2 = (event) => {
      if (hasPointerPenTouch(event)) {
        this.touchDeltaX = event.clientX - this.touchStartX;
      }
      this._handleSwipe();
      if (this._config.pause === "hover") {
        this.pause();
        if (this.touchTimeout) {
          clearTimeout(this.touchTimeout);
        }
        this.touchTimeout = setTimeout((event2) => this.cycle(event2), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
      }
    };
    SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach((itemImg) => {
      EventHandler.on(itemImg, EVENT_DRAG_START, (event) => event.preventDefault());
    });
    if (this._pointerEvent) {
      EventHandler.on(this._element, EVENT_POINTERDOWN, (event) => start2(event));
      EventHandler.on(this._element, EVENT_POINTERUP, (event) => end2(event));
      this._element.classList.add(CLASS_NAME_POINTER_EVENT);
    } else {
      EventHandler.on(this._element, EVENT_TOUCHSTART, (event) => start2(event));
      EventHandler.on(this._element, EVENT_TOUCHMOVE, (event) => move(event));
      EventHandler.on(this._element, EVENT_TOUCHEND, (event) => end2(event));
    }
  }
  _keydown(event) {
    if (/input|textarea/i.test(event.target.tagName)) {
      return;
    }
    const direction = KEY_TO_DIRECTION[event.key];
    if (direction) {
      event.preventDefault();
      this._slide(direction);
    }
  }
  _getItemIndex(element) {
    this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
    return this._items.indexOf(element);
  }
  _getItemByOrder(order2, activeElement) {
    const isNext = order2 === ORDER_NEXT;
    return getNextActiveElement(this._items, activeElement, isNext, this._config.wrap);
  }
  _triggerSlideEvent(relatedTarget, eventDirectionName) {
    const targetIndex = this._getItemIndex(relatedTarget);
    const fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));
    return EventHandler.trigger(this._element, EVENT_SLIDE, {
      relatedTarget,
      direction: eventDirectionName,
      from: fromIndex,
      to: targetIndex
    });
  }
  _setActiveIndicatorElement(element) {
    if (this._indicatorsElement) {
      const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE$1, this._indicatorsElement);
      activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
      activeIndicator.removeAttribute("aria-current");
      const indicators = SelectorEngine.find(SELECTOR_INDICATOR, this._indicatorsElement);
      for (let i = 0; i < indicators.length; i++) {
        if (Number.parseInt(indicators[i].getAttribute("data-bs-slide-to"), 10) === this._getItemIndex(element)) {
          indicators[i].classList.add(CLASS_NAME_ACTIVE$2);
          indicators[i].setAttribute("aria-current", "true");
          break;
        }
      }
    }
  }
  _updateInterval() {
    const element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
    if (!element) {
      return;
    }
    const elementInterval = Number.parseInt(element.getAttribute("data-bs-interval"), 10);
    if (elementInterval) {
      this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
      this._config.interval = elementInterval;
    } else {
      this._config.interval = this._config.defaultInterval || this._config.interval;
    }
  }
  _slide(directionOrOrder, element) {
    const order2 = this._directionToOrder(directionOrOrder);
    const activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
    const activeElementIndex = this._getItemIndex(activeElement);
    const nextElement = element || this._getItemByOrder(order2, activeElement);
    const nextElementIndex = this._getItemIndex(nextElement);
    const isCycling = Boolean(this._interval);
    const isNext = order2 === ORDER_NEXT;
    const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
    const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
    const eventDirectionName = this._orderToDirection(order2);
    if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$2)) {
      this._isSliding = false;
      return;
    }
    if (this._isSliding) {
      return;
    }
    const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
    if (slideEvent.defaultPrevented) {
      return;
    }
    if (!activeElement || !nextElement) {
      return;
    }
    this._isSliding = true;
    if (isCycling) {
      this.pause();
    }
    this._setActiveIndicatorElement(nextElement);
    this._activeElement = nextElement;
    const triggerSlidEvent = () => {
      EventHandler.trigger(this._element, EVENT_SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });
    };
    if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
      nextElement.classList.add(orderClassName);
      reflow(nextElement);
      activeElement.classList.add(directionalClassName);
      nextElement.classList.add(directionalClassName);
      const completeCallBack = () => {
        nextElement.classList.remove(directionalClassName, orderClassName);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
        this._isSliding = false;
        setTimeout(triggerSlidEvent, 0);
      };
      this._queueCallback(completeCallBack, activeElement, true);
    } else {
      activeElement.classList.remove(CLASS_NAME_ACTIVE$2);
      nextElement.classList.add(CLASS_NAME_ACTIVE$2);
      this._isSliding = false;
      triggerSlidEvent();
    }
    if (isCycling) {
      this.cycle();
    }
  }
  _directionToOrder(direction) {
    if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
      return direction;
    }
    if (isRTL()) {
      return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
    }
    return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
  }
  _orderToDirection(order2) {
    if (![ORDER_NEXT, ORDER_PREV].includes(order2)) {
      return order2;
    }
    if (isRTL()) {
      return order2 === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return order2 === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
  }
  static carouselInterface(element, config) {
    const data = Carousel.getOrCreateInstance(element, config);
    let {
      _config
    } = data;
    if (typeof config === "object") {
      _config = __spreadValues(__spreadValues({}, _config), config);
    }
    const action = typeof config === "string" ? config : _config.slide;
    if (typeof config === "number") {
      data.to(config);
    } else if (typeof action === "string") {
      if (typeof data[action] === "undefined") {
        throw new TypeError(`No method named "${action}"`);
      }
      data[action]();
    } else if (_config.interval && _config.ride) {
      data.pause();
      data.cycle();
    }
  }
  static jQueryInterface(config) {
    return this.each(function() {
      Carousel.carouselInterface(this, config);
    });
  }
  static dataApiClickHandler(event) {
    const target = getElementFromSelector(this);
    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
      return;
    }
    const config = __spreadValues(__spreadValues({}, Manipulator.getDataAttributes(target)), Manipulator.getDataAttributes(this));
    const slideIndex = this.getAttribute("data-bs-slide-to");
    if (slideIndex) {
      config.interval = false;
    }
    Carousel.carouselInterface(target, config);
    if (slideIndex) {
      Carousel.getInstance(target).to(slideIndex);
    }
    event.preventDefault();
  }
}
EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
  const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
  for (let i = 0, len = carousels.length; i < len; i++) {
    Carousel.carouselInterface(carousels[i], Carousel.getInstance(carousels[i]));
  }
});
defineJQueryPlugin(Carousel);
const NAME$a = "collapse";
const DATA_KEY$9 = "bs.collapse";
const EVENT_KEY$9 = `.${DATA_KEY$9}`;
const DATA_API_KEY$5 = ".data-api";
const Default$9 = {
  toggle: true,
  parent: null
};
const DefaultType$9 = {
  toggle: "boolean",
  parent: "(null|element)"
};
const EVENT_SHOW$5 = `show${EVENT_KEY$9}`;
const EVENT_SHOWN$5 = `shown${EVENT_KEY$9}`;
const EVENT_HIDE$5 = `hide${EVENT_KEY$9}`;
const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$9}`;
const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$9}${DATA_API_KEY$5}`;
const CLASS_NAME_SHOW$7 = "show";
const CLASS_NAME_COLLAPSE = "collapse";
const CLASS_NAME_COLLAPSING = "collapsing";
const CLASS_NAME_COLLAPSED = "collapsed";
const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
const CLASS_NAME_HORIZONTAL = "collapse-horizontal";
const WIDTH = "width";
const HEIGHT = "height";
const SELECTOR_ACTIVES = ".collapse.show, .collapse.collapsing";
const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
class Collapse extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._isTransitioning = false;
    this._config = this._getConfig(config);
    this._triggerArray = [];
    const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
    for (let i = 0, len = toggleList.length; i < len; i++) {
      const elem = toggleList[i];
      const selector = getSelectorFromElement(elem);
      const filterElement = SelectorEngine.find(selector).filter((foundElem) => foundElem === this._element);
      if (selector !== null && filterElement.length) {
        this._selector = selector;
        this._triggerArray.push(elem);
      }
    }
    this._initializeChildren();
    if (!this._config.parent) {
      this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
    }
    if (this._config.toggle) {
      this.toggle();
    }
  }
  static get Default() {
    return Default$9;
  }
  static get NAME() {
    return NAME$a;
  }
  toggle() {
    if (this._isShown()) {
      this.hide();
    } else {
      this.show();
    }
  }
  show() {
    if (this._isTransitioning || this._isShown()) {
      return;
    }
    let actives = [];
    let activesData;
    if (this._config.parent) {
      const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
      actives = SelectorEngine.find(SELECTOR_ACTIVES, this._config.parent).filter((elem) => !children.includes(elem));
    }
    const container = SelectorEngine.findOne(this._selector);
    if (actives.length) {
      const tempActiveData = actives.find((elem) => container !== elem);
      activesData = tempActiveData ? Collapse.getInstance(tempActiveData) : null;
      if (activesData && activesData._isTransitioning) {
        return;
      }
    }
    const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$5);
    if (startEvent.defaultPrevented) {
      return;
    }
    actives.forEach((elemActive) => {
      if (container !== elemActive) {
        Collapse.getOrCreateInstance(elemActive, {
          toggle: false
        }).hide();
      }
      if (!activesData) {
        Data.set(elemActive, DATA_KEY$9, null);
      }
    });
    const dimension = this._getDimension();
    this._element.classList.remove(CLASS_NAME_COLLAPSE);
    this._element.classList.add(CLASS_NAME_COLLAPSING);
    this._element.style[dimension] = 0;
    this._addAriaAndCollapsedClass(this._triggerArray, true);
    this._isTransitioning = true;
    const complete = () => {
      this._isTransitioning = false;
      this._element.classList.remove(CLASS_NAME_COLLAPSING);
      this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
      this._element.style[dimension] = "";
      EventHandler.trigger(this._element, EVENT_SHOWN$5);
    };
    const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
    const scrollSize = `scroll${capitalizedDimension}`;
    this._queueCallback(complete, this._element, true);
    this._element.style[dimension] = `${this._element[scrollSize]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown()) {
      return;
    }
    const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$5);
    if (startEvent.defaultPrevented) {
      return;
    }
    const dimension = this._getDimension();
    this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_COLLAPSING);
    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
    const triggerArrayLength = this._triggerArray.length;
    for (let i = 0; i < triggerArrayLength; i++) {
      const trigger2 = this._triggerArray[i];
      const elem = getElementFromSelector(trigger2);
      if (elem && !this._isShown(elem)) {
        this._addAriaAndCollapsedClass([trigger2], false);
      }
    }
    this._isTransitioning = true;
    const complete = () => {
      this._isTransitioning = false;
      this._element.classList.remove(CLASS_NAME_COLLAPSING);
      this._element.classList.add(CLASS_NAME_COLLAPSE);
      EventHandler.trigger(this._element, EVENT_HIDDEN$5);
    };
    this._element.style[dimension] = "";
    this._queueCallback(complete, this._element, true);
  }
  _isShown(element = this._element) {
    return element.classList.contains(CLASS_NAME_SHOW$7);
  }
  _getConfig(config) {
    config = __spreadValues(__spreadValues(__spreadValues({}, Default$9), Manipulator.getDataAttributes(this._element)), config);
    config.toggle = Boolean(config.toggle);
    config.parent = getElement(config.parent);
    typeCheckConfig(NAME$a, config, DefaultType$9);
    return config;
  }
  _getDimension() {
    return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
  }
  _initializeChildren() {
    if (!this._config.parent) {
      return;
    }
    const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
    SelectorEngine.find(SELECTOR_DATA_TOGGLE$4, this._config.parent).filter((elem) => !children.includes(elem)).forEach((element) => {
      const selected = getElementFromSelector(element);
      if (selected) {
        this._addAriaAndCollapsedClass([element], this._isShown(selected));
      }
    });
  }
  _addAriaAndCollapsedClass(triggerArray, isOpen) {
    if (!triggerArray.length) {
      return;
    }
    triggerArray.forEach((elem) => {
      if (isOpen) {
        elem.classList.remove(CLASS_NAME_COLLAPSED);
      } else {
        elem.classList.add(CLASS_NAME_COLLAPSED);
      }
      elem.setAttribute("aria-expanded", isOpen);
    });
  }
  static jQueryInterface(config) {
    return this.each(function() {
      const _config = {};
      if (typeof config === "string" && /show|hide/.test(config)) {
        _config.toggle = false;
      }
      const data = Collapse.getOrCreateInstance(this, _config);
      if (typeof config === "string") {
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    });
  }
}
EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function(event) {
  if (event.target.tagName === "A" || event.delegateTarget && event.delegateTarget.tagName === "A") {
    event.preventDefault();
  }
  const selector = getSelectorFromElement(this);
  const selectorElements = SelectorEngine.find(selector);
  selectorElements.forEach((element) => {
    Collapse.getOrCreateInstance(element, {
      toggle: false
    }).toggle();
  });
});
defineJQueryPlugin(Collapse);
const NAME$9 = "dropdown";
const DATA_KEY$8 = "bs.dropdown";
const EVENT_KEY$8 = `.${DATA_KEY$8}`;
const DATA_API_KEY$4 = ".data-api";
const ESCAPE_KEY$2 = "Escape";
const SPACE_KEY = "Space";
const TAB_KEY$1 = "Tab";
const ARROW_UP_KEY = "ArrowUp";
const ARROW_DOWN_KEY = "ArrowDown";
const RIGHT_MOUSE_BUTTON = 2;
const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY$2}`);
const EVENT_HIDE$4 = `hide${EVENT_KEY$8}`;
const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$8}`;
const EVENT_SHOW$4 = `show${EVENT_KEY$8}`;
const EVENT_SHOWN$4 = `shown${EVENT_KEY$8}`;
const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$8}${DATA_API_KEY$4}`;
const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$8}${DATA_API_KEY$4}`;
const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$8}${DATA_API_KEY$4}`;
const CLASS_NAME_SHOW$6 = "show";
const CLASS_NAME_DROPUP = "dropup";
const CLASS_NAME_DROPEND = "dropend";
const CLASS_NAME_DROPSTART = "dropstart";
const CLASS_NAME_NAVBAR = "navbar";
const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]';
const SELECTOR_MENU = ".dropdown-menu";
const SELECTOR_NAVBAR_NAV = ".navbar-nav";
const SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
const PLACEMENT_TOP = isRTL() ? "top-end" : "top-start";
const PLACEMENT_TOPEND = isRTL() ? "top-start" : "top-end";
const PLACEMENT_BOTTOM = isRTL() ? "bottom-end" : "bottom-start";
const PLACEMENT_BOTTOMEND = isRTL() ? "bottom-start" : "bottom-end";
const PLACEMENT_RIGHT = isRTL() ? "left-start" : "right-start";
const PLACEMENT_LEFT = isRTL() ? "right-start" : "left-start";
const Default$8 = {
  offset: [0, 2],
  boundary: "clippingParents",
  reference: "toggle",
  display: "dynamic",
  popperConfig: null,
  autoClose: true
};
const DefaultType$8 = {
  offset: "(array|string|function)",
  boundary: "(string|element)",
  reference: "(string|element|object)",
  display: "string",
  popperConfig: "(null|object|function)",
  autoClose: "(boolean|string)"
};
class Dropdown extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._popper = null;
    this._config = this._getConfig(config);
    this._menu = this._getMenuElement();
    this._inNavbar = this._detectNavbar();
  }
  static get Default() {
    return Default$8;
  }
  static get DefaultType() {
    return DefaultType$8;
  }
  static get NAME() {
    return NAME$9;
  }
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (isDisabled(this._element) || this._isShown(this._menu)) {
      return;
    }
    const relatedTarget = {
      relatedTarget: this._element
    };
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, relatedTarget);
    if (showEvent.defaultPrevented) {
      return;
    }
    const parent = Dropdown.getParentFromElement(this._element);
    if (this._inNavbar) {
      Manipulator.setDataAttribute(this._menu, "popper", "none");
    } else {
      this._createPopper(parent);
    }
    if ("ontouchstart" in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
      [].concat(...document.body.children).forEach((elem) => EventHandler.on(elem, "mouseover", noop));
    }
    this._element.focus();
    this._element.setAttribute("aria-expanded", true);
    this._menu.classList.add(CLASS_NAME_SHOW$6);
    this._element.classList.add(CLASS_NAME_SHOW$6);
    EventHandler.trigger(this._element, EVENT_SHOWN$4, relatedTarget);
  }
  hide() {
    if (isDisabled(this._element) || !this._isShown(this._menu)) {
      return;
    }
    const relatedTarget = {
      relatedTarget: this._element
    };
    this._completeHide(relatedTarget);
  }
  dispose() {
    if (this._popper) {
      this._popper.destroy();
    }
    super.dispose();
  }
  update() {
    this._inNavbar = this._detectNavbar();
    if (this._popper) {
      this._popper.update();
    }
  }
  _completeHide(relatedTarget) {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4, relatedTarget);
    if (hideEvent.defaultPrevented) {
      return;
    }
    if ("ontouchstart" in document.documentElement) {
      [].concat(...document.body.children).forEach((elem) => EventHandler.off(elem, "mouseover", noop));
    }
    if (this._popper) {
      this._popper.destroy();
    }
    this._menu.classList.remove(CLASS_NAME_SHOW$6);
    this._element.classList.remove(CLASS_NAME_SHOW$6);
    this._element.setAttribute("aria-expanded", "false");
    Manipulator.removeDataAttribute(this._menu, "popper");
    EventHandler.trigger(this._element, EVENT_HIDDEN$4, relatedTarget);
  }
  _getConfig(config) {
    config = __spreadValues(__spreadValues(__spreadValues({}, this.constructor.Default), Manipulator.getDataAttributes(this._element)), config);
    typeCheckConfig(NAME$9, config, this.constructor.DefaultType);
    if (typeof config.reference === "object" && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== "function") {
      throw new TypeError(`${NAME$9.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    }
    return config;
  }
  _createPopper(parent) {
    if (typeof Popper === "undefined") {
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    }
    let referenceElement = this._element;
    if (this._config.reference === "parent") {
      referenceElement = parent;
    } else if (isElement(this._config.reference)) {
      referenceElement = getElement(this._config.reference);
    } else if (typeof this._config.reference === "object") {
      referenceElement = this._config.reference;
    }
    const popperConfig = this._getPopperConfig();
    const isDisplayStatic = popperConfig.modifiers.find((modifier) => modifier.name === "applyStyles" && modifier.enabled === false);
    this._popper = createPopper(referenceElement, this._menu, popperConfig);
    if (isDisplayStatic) {
      Manipulator.setDataAttribute(this._menu, "popper", "static");
    }
  }
  _isShown(element = this._element) {
    return element.classList.contains(CLASS_NAME_SHOW$6);
  }
  _getMenuElement() {
    return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
  }
  _getPlacement() {
    const parentDropdown = this._element.parentNode;
    if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
      return PLACEMENT_RIGHT;
    }
    if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
      return PLACEMENT_LEFT;
    }
    const isEnd = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
      return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
    }
    return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
  }
  _detectNavbar() {
    return this._element.closest(`.${CLASS_NAME_NAVBAR}`) !== null;
  }
  _getOffset() {
    const {
      offset: offset2
    } = this._config;
    if (typeof offset2 === "string") {
      return offset2.split(",").map((val) => Number.parseInt(val, 10));
    }
    if (typeof offset2 === "function") {
      return (popperData) => offset2(popperData, this._element);
    }
    return offset2;
  }
  _getPopperConfig() {
    const defaultBsPopperConfig = {
      placement: this._getPlacement(),
      modifiers: [{
        name: "preventOverflow",
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: "offset",
        options: {
          offset: this._getOffset()
        }
      }]
    };
    if (this._config.display === "static") {
      defaultBsPopperConfig.modifiers = [{
        name: "applyStyles",
        enabled: false
      }];
    }
    return __spreadValues(__spreadValues({}, defaultBsPopperConfig), typeof this._config.popperConfig === "function" ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig);
  }
  _selectMenuItem({
    key,
    target
  }) {
    const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);
    if (!items.length) {
      return;
    }
    getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
  }
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Dropdown.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (typeof data[config] === "undefined") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
  static clearMenus(event) {
    if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === "keyup" && event.key !== TAB_KEY$1)) {
      return;
    }
    const toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$3);
    for (let i = 0, len = toggles.length; i < len; i++) {
      const context = Dropdown.getInstance(toggles[i]);
      if (!context || context._config.autoClose === false) {
        continue;
      }
      if (!context._isShown()) {
        continue;
      }
      const relatedTarget = {
        relatedTarget: context._element
      };
      if (event) {
        const composedPath = event.composedPath();
        const isMenuTarget = composedPath.includes(context._menu);
        if (composedPath.includes(context._element) || context._config.autoClose === "inside" && !isMenuTarget || context._config.autoClose === "outside" && isMenuTarget) {
          continue;
        }
        if (context._menu.contains(event.target) && (event.type === "keyup" && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
          continue;
        }
        if (event.type === "click") {
          relatedTarget.clickEvent = event;
        }
      }
      context._completeHide(relatedTarget);
    }
  }
  static getParentFromElement(element) {
    return getElementFromSelector(element) || element.parentNode;
  }
  static dataApiKeydownHandler(event) {
    if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY$2 && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
      return;
    }
    const isActive = this.classList.contains(CLASS_NAME_SHOW$6);
    if (!isActive && event.key === ESCAPE_KEY$2) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (isDisabled(this)) {
      return;
    }
    const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0];
    const instance = Dropdown.getOrCreateInstance(getToggleButton);
    if (event.key === ESCAPE_KEY$2) {
      instance.hide();
      return;
    }
    if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
      if (!isActive) {
        instance.show();
      }
      instance._selectMenuItem(event);
      return;
    }
    if (!isActive || event.key === SPACE_KEY) {
      Dropdown.clearMenus();
    }
  }
}
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function(event) {
  event.preventDefault();
  Dropdown.getOrCreateInstance(this).toggle();
});
defineJQueryPlugin(Dropdown);
const SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
const SELECTOR_STICKY_CONTENT = ".sticky-top";
class ScrollBarHelper {
  constructor() {
    this._element = document.body;
  }
  getWidth() {
    const documentWidth = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - documentWidth);
  }
  hide() {
    const width = this.getWidth();
    this._disableOverFlow();
    this._setElementAttributes(this._element, "paddingRight", (calculatedValue) => calculatedValue + width);
    this._setElementAttributes(SELECTOR_FIXED_CONTENT, "paddingRight", (calculatedValue) => calculatedValue + width);
    this._setElementAttributes(SELECTOR_STICKY_CONTENT, "marginRight", (calculatedValue) => calculatedValue - width);
  }
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, "overflow");
    this._element.style.overflow = "hidden";
  }
  _setElementAttributes(selector, styleProp, callback) {
    const scrollbarWidth = this.getWidth();
    const manipulationCallBack = (element) => {
      if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
        return;
      }
      this._saveInitialAttribute(element, styleProp);
      const calculatedValue = window.getComputedStyle(element)[styleProp];
      element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
    };
    this._applyManipulationCallback(selector, manipulationCallBack);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow");
    this._resetElementAttributes(this._element, "paddingRight");
    this._resetElementAttributes(SELECTOR_FIXED_CONTENT, "paddingRight");
    this._resetElementAttributes(SELECTOR_STICKY_CONTENT, "marginRight");
  }
  _saveInitialAttribute(element, styleProp) {
    const actualValue = element.style[styleProp];
    if (actualValue) {
      Manipulator.setDataAttribute(element, styleProp, actualValue);
    }
  }
  _resetElementAttributes(selector, styleProp) {
    const manipulationCallBack = (element) => {
      const value = Manipulator.getDataAttribute(element, styleProp);
      if (typeof value === "undefined") {
        element.style.removeProperty(styleProp);
      } else {
        Manipulator.removeDataAttribute(element, styleProp);
        element.style[styleProp] = value;
      }
    };
    this._applyManipulationCallback(selector, manipulationCallBack);
  }
  _applyManipulationCallback(selector, callBack) {
    if (isElement(selector)) {
      callBack(selector);
    } else {
      SelectorEngine.find(selector, this._element).forEach(callBack);
    }
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }
}
const Default$7 = {
  className: "modal-backdrop",
  isVisible: true,
  isAnimated: false,
  rootElement: "body",
  clickCallback: null
};
const DefaultType$7 = {
  className: "string",
  isVisible: "boolean",
  isAnimated: "boolean",
  rootElement: "(element|string)",
  clickCallback: "(function|null)"
};
const NAME$8 = "backdrop";
const CLASS_NAME_FADE$4 = "fade";
const CLASS_NAME_SHOW$5 = "show";
const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$8}`;
class Backdrop {
  constructor(config) {
    this._config = this._getConfig(config);
    this._isAppended = false;
    this._element = null;
  }
  show(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }
    this._append();
    if (this._config.isAnimated) {
      reflow(this._getElement());
    }
    this._getElement().classList.add(CLASS_NAME_SHOW$5);
    this._emulateAnimation(() => {
      execute(callback);
    });
  }
  hide(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }
    this._getElement().classList.remove(CLASS_NAME_SHOW$5);
    this._emulateAnimation(() => {
      this.dispose();
      execute(callback);
    });
  }
  _getElement() {
    if (!this._element) {
      const backdrop = document.createElement("div");
      backdrop.className = this._config.className;
      if (this._config.isAnimated) {
        backdrop.classList.add(CLASS_NAME_FADE$4);
      }
      this._element = backdrop;
    }
    return this._element;
  }
  _getConfig(config) {
    config = __spreadValues(__spreadValues({}, Default$7), typeof config === "object" ? config : {});
    config.rootElement = getElement(config.rootElement);
    typeCheckConfig(NAME$8, config, DefaultType$7);
    return config;
  }
  _append() {
    if (this._isAppended) {
      return;
    }
    this._config.rootElement.append(this._getElement());
    EventHandler.on(this._getElement(), EVENT_MOUSEDOWN, () => {
      execute(this._config.clickCallback);
    });
    this._isAppended = true;
  }
  dispose() {
    if (!this._isAppended) {
      return;
    }
    EventHandler.off(this._element, EVENT_MOUSEDOWN);
    this._element.remove();
    this._isAppended = false;
  }
  _emulateAnimation(callback) {
    executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
  }
}
const Default$6 = {
  trapElement: null,
  autofocus: true
};
const DefaultType$6 = {
  trapElement: "element",
  autofocus: "boolean"
};
const NAME$7 = "focustrap";
const DATA_KEY$7 = "bs.focustrap";
const EVENT_KEY$7 = `.${DATA_KEY$7}`;
const EVENT_FOCUSIN$1 = `focusin${EVENT_KEY$7}`;
const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$7}`;
const TAB_KEY = "Tab";
const TAB_NAV_FORWARD = "forward";
const TAB_NAV_BACKWARD = "backward";
class FocusTrap {
  constructor(config) {
    this._config = this._getConfig(config);
    this._isActive = false;
    this._lastTabNavDirection = null;
  }
  activate() {
    const {
      trapElement,
      autofocus
    } = this._config;
    if (this._isActive) {
      return;
    }
    if (autofocus) {
      trapElement.focus();
    }
    EventHandler.off(document, EVENT_KEY$7);
    EventHandler.on(document, EVENT_FOCUSIN$1, (event) => this._handleFocusin(event));
    EventHandler.on(document, EVENT_KEYDOWN_TAB, (event) => this._handleKeydown(event));
    this._isActive = true;
  }
  deactivate() {
    if (!this._isActive) {
      return;
    }
    this._isActive = false;
    EventHandler.off(document, EVENT_KEY$7);
  }
  _handleFocusin(event) {
    const {
      target
    } = event;
    const {
      trapElement
    } = this._config;
    if (target === document || target === trapElement || trapElement.contains(target)) {
      return;
    }
    const elements = SelectorEngine.focusableChildren(trapElement);
    if (elements.length === 0) {
      trapElement.focus();
    } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
      elements[elements.length - 1].focus();
    } else {
      elements[0].focus();
    }
  }
  _handleKeydown(event) {
    if (event.key !== TAB_KEY) {
      return;
    }
    this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
  }
  _getConfig(config) {
    config = __spreadValues(__spreadValues({}, Default$6), typeof config === "object" ? config : {});
    typeCheckConfig(NAME$7, config, DefaultType$6);
    return config;
  }
}
const NAME$6 = "modal";
const DATA_KEY$6 = "bs.modal";
const EVENT_KEY$6 = `.${DATA_KEY$6}`;
const DATA_API_KEY$3 = ".data-api";
const ESCAPE_KEY$1 = "Escape";
const Default$5 = {
  backdrop: true,
  keyboard: true,
  focus: true
};
const DefaultType$5 = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  focus: "boolean"
};
const EVENT_HIDE$3 = `hide${EVENT_KEY$6}`;
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$6}`;
const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$6}`;
const EVENT_SHOW$3 = `show${EVENT_KEY$6}`;
const EVENT_SHOWN$3 = `shown${EVENT_KEY$6}`;
const EVENT_RESIZE = `resize${EVENT_KEY$6}`;
const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$6}`;
const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$6}`;
const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY$6}`;
const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$6}`;
const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
const CLASS_NAME_OPEN = "modal-open";
const CLASS_NAME_FADE$3 = "fade";
const CLASS_NAME_SHOW$4 = "show";
const CLASS_NAME_STATIC = "modal-static";
const OPEN_SELECTOR$1 = ".modal.show";
const SELECTOR_DIALOG = ".modal-dialog";
const SELECTOR_MODAL_BODY = ".modal-body";
const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
class Modal extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._config = this._getConfig(config);
    this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();
    this._isShown = false;
    this._ignoreBackdropClick = false;
    this._isTransitioning = false;
    this._scrollBar = new ScrollBarHelper();
  }
  static get Default() {
    return Default$5;
  }
  static get NAME() {
    return NAME$6;
  }
  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }
  show(relatedTarget) {
    if (this._isShown || this._isTransitioning) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
      relatedTarget
    });
    if (showEvent.defaultPrevented) {
      return;
    }
    this._isShown = true;
    if (this._isAnimated()) {
      this._isTransitioning = true;
    }
    this._scrollBar.hide();
    document.body.classList.add(CLASS_NAME_OPEN);
    this._adjustDialog();
    this._setEscapeEvent();
    this._setResizeEvent();
    EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
      EventHandler.one(this._element, EVENT_MOUSEUP_DISMISS, (event) => {
        if (event.target === this._element) {
          this._ignoreBackdropClick = true;
        }
      });
    });
    this._showBackdrop(() => this._showElement(relatedTarget));
  }
  hide() {
    if (!this._isShown || this._isTransitioning) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
    if (hideEvent.defaultPrevented) {
      return;
    }
    this._isShown = false;
    const isAnimated = this._isAnimated();
    if (isAnimated) {
      this._isTransitioning = true;
    }
    this._setEscapeEvent();
    this._setResizeEvent();
    this._focustrap.deactivate();
    this._element.classList.remove(CLASS_NAME_SHOW$4);
    EventHandler.off(this._element, EVENT_CLICK_DISMISS);
    EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);
    this._queueCallback(() => this._hideModal(), this._element, isAnimated);
  }
  dispose() {
    [window, this._dialog].forEach((htmlElement) => EventHandler.off(htmlElement, EVENT_KEY$6));
    this._backdrop.dispose();
    this._focustrap.deactivate();
    super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  _initializeBackDrop() {
    return new Backdrop({
      isVisible: Boolean(this._config.backdrop),
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new FocusTrap({
      trapElement: this._element
    });
  }
  _getConfig(config) {
    config = __spreadValues(__spreadValues(__spreadValues({}, Default$5), Manipulator.getDataAttributes(this._element)), typeof config === "object" ? config : {});
    typeCheckConfig(NAME$6, config, DefaultType$5);
    return config;
  }
  _showElement(relatedTarget) {
    const isAnimated = this._isAnimated();
    const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
    if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
      document.body.append(this._element);
    }
    this._element.style.display = "block";
    this._element.removeAttribute("aria-hidden");
    this._element.setAttribute("aria-modal", true);
    this._element.setAttribute("role", "dialog");
    this._element.scrollTop = 0;
    if (modalBody) {
      modalBody.scrollTop = 0;
    }
    if (isAnimated) {
      reflow(this._element);
    }
    this._element.classList.add(CLASS_NAME_SHOW$4);
    const transitionComplete = () => {
      if (this._config.focus) {
        this._focustrap.activate();
      }
      this._isTransitioning = false;
      EventHandler.trigger(this._element, EVENT_SHOWN$3, {
        relatedTarget
      });
    };
    this._queueCallback(transitionComplete, this._dialog, isAnimated);
  }
  _setEscapeEvent() {
    if (this._isShown) {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, (event) => {
        if (this._config.keyboard && event.key === ESCAPE_KEY$1) {
          event.preventDefault();
          this.hide();
        } else if (!this._config.keyboard && event.key === ESCAPE_KEY$1) {
          this._triggerBackdropTransition();
        }
      });
    } else {
      EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS$1);
    }
  }
  _setResizeEvent() {
    if (this._isShown) {
      EventHandler.on(window, EVENT_RESIZE, () => this._adjustDialog());
    } else {
      EventHandler.off(window, EVENT_RESIZE);
    }
  }
  _hideModal() {
    this._element.style.display = "none";
    this._element.setAttribute("aria-hidden", true);
    this._element.removeAttribute("aria-modal");
    this._element.removeAttribute("role");
    this._isTransitioning = false;
    this._backdrop.hide(() => {
      document.body.classList.remove(CLASS_NAME_OPEN);
      this._resetAdjustments();
      this._scrollBar.reset();
      EventHandler.trigger(this._element, EVENT_HIDDEN$3);
    });
  }
  _showBackdrop(callback) {
    EventHandler.on(this._element, EVENT_CLICK_DISMISS, (event) => {
      if (this._ignoreBackdropClick) {
        this._ignoreBackdropClick = false;
        return;
      }
      if (event.target !== event.currentTarget) {
        return;
      }
      if (this._config.backdrop === true) {
        this.hide();
      } else if (this._config.backdrop === "static") {
        this._triggerBackdropTransition();
      }
    });
    this._backdrop.show(callback);
  }
  _isAnimated() {
    return this._element.classList.contains(CLASS_NAME_FADE$3);
  }
  _triggerBackdropTransition() {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
    if (hideEvent.defaultPrevented) {
      return;
    }
    const {
      classList,
      scrollHeight,
      style
    } = this._element;
    const isModalOverflowing = scrollHeight > document.documentElement.clientHeight;
    if (!isModalOverflowing && style.overflowY === "hidden" || classList.contains(CLASS_NAME_STATIC)) {
      return;
    }
    if (!isModalOverflowing) {
      style.overflowY = "hidden";
    }
    classList.add(CLASS_NAME_STATIC);
    this._queueCallback(() => {
      classList.remove(CLASS_NAME_STATIC);
      if (!isModalOverflowing) {
        this._queueCallback(() => {
          style.overflowY = "";
        }, this._dialog);
      }
    }, this._dialog);
    this._element.focus();
  }
  _adjustDialog() {
    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
    const scrollbarWidth = this._scrollBar.getWidth();
    const isBodyOverflowing = scrollbarWidth > 0;
    if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
      this._element.style.paddingLeft = `${scrollbarWidth}px`;
    }
    if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
      this._element.style.paddingRight = `${scrollbarWidth}px`;
    }
  }
  _resetAdjustments() {
    this._element.style.paddingLeft = "";
    this._element.style.paddingRight = "";
  }
  static jQueryInterface(config, relatedTarget) {
    return this.each(function() {
      const data = Modal.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (typeof data[config] === "undefined") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](relatedTarget);
    });
  }
}
EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function(event) {
  const target = getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName)) {
    event.preventDefault();
  }
  EventHandler.one(target, EVENT_SHOW$3, (showEvent) => {
    if (showEvent.defaultPrevented) {
      return;
    }
    EventHandler.one(target, EVENT_HIDDEN$3, () => {
      if (isVisible(this)) {
        this.focus();
      }
    });
  });
  const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
  if (allReadyOpen) {
    Modal.getInstance(allReadyOpen).hide();
  }
  const data = Modal.getOrCreateInstance(target);
  data.toggle(this);
});
enableDismissTrigger(Modal);
defineJQueryPlugin(Modal);
const NAME$5 = "offcanvas";
const DATA_KEY$5 = "bs.offcanvas";
const EVENT_KEY$5 = `.${DATA_KEY$5}`;
const DATA_API_KEY$2 = ".data-api";
const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$5}${DATA_API_KEY$2}`;
const ESCAPE_KEY = "Escape";
const Default$4 = {
  backdrop: true,
  keyboard: true,
  scroll: false
};
const DefaultType$4 = {
  backdrop: "boolean",
  keyboard: "boolean",
  scroll: "boolean"
};
const CLASS_NAME_SHOW$3 = "show";
const CLASS_NAME_BACKDROP = "offcanvas-backdrop";
const OPEN_SELECTOR = ".offcanvas.show";
const EVENT_SHOW$2 = `show${EVENT_KEY$5}`;
const EVENT_SHOWN$2 = `shown${EVENT_KEY$5}`;
const EVENT_HIDE$2 = `hide${EVENT_KEY$5}`;
const EVENT_HIDDEN$2 = `hidden${EVENT_KEY$5}`;
const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$5}${DATA_API_KEY$2}`;
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$5}`;
const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
class Offcanvas extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._config = this._getConfig(config);
    this._isShown = false;
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();
    this._addEventListeners();
  }
  static get NAME() {
    return NAME$5;
  }
  static get Default() {
    return Default$4;
  }
  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }
  show(relatedTarget) {
    if (this._isShown) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
      relatedTarget
    });
    if (showEvent.defaultPrevented) {
      return;
    }
    this._isShown = true;
    this._element.style.visibility = "visible";
    this._backdrop.show();
    if (!this._config.scroll) {
      new ScrollBarHelper().hide();
    }
    this._element.removeAttribute("aria-hidden");
    this._element.setAttribute("aria-modal", true);
    this._element.setAttribute("role", "dialog");
    this._element.classList.add(CLASS_NAME_SHOW$3);
    const completeCallBack = () => {
      if (!this._config.scroll) {
        this._focustrap.activate();
      }
      EventHandler.trigger(this._element, EVENT_SHOWN$2, {
        relatedTarget
      });
    };
    this._queueCallback(completeCallBack, this._element, true);
  }
  hide() {
    if (!this._isShown) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);
    if (hideEvent.defaultPrevented) {
      return;
    }
    this._focustrap.deactivate();
    this._element.blur();
    this._isShown = false;
    this._element.classList.remove(CLASS_NAME_SHOW$3);
    this._backdrop.hide();
    const completeCallback = () => {
      this._element.setAttribute("aria-hidden", true);
      this._element.removeAttribute("aria-modal");
      this._element.removeAttribute("role");
      this._element.style.visibility = "hidden";
      if (!this._config.scroll) {
        new ScrollBarHelper().reset();
      }
      EventHandler.trigger(this._element, EVENT_HIDDEN$2);
    };
    this._queueCallback(completeCallback, this._element, true);
  }
  dispose() {
    this._backdrop.dispose();
    this._focustrap.deactivate();
    super.dispose();
  }
  _getConfig(config) {
    config = __spreadValues(__spreadValues(__spreadValues({}, Default$4), Manipulator.getDataAttributes(this._element)), typeof config === "object" ? config : {});
    typeCheckConfig(NAME$5, config, DefaultType$4);
    return config;
  }
  _initializeBackDrop() {
    return new Backdrop({
      className: CLASS_NAME_BACKDROP,
      isVisible: this._config.backdrop,
      isAnimated: true,
      rootElement: this._element.parentNode,
      clickCallback: () => this.hide()
    });
  }
  _initializeFocusTrap() {
    return new FocusTrap({
      trapElement: this._element
    });
  }
  _addEventListeners() {
    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
      if (this._config.keyboard && event.key === ESCAPE_KEY) {
        this.hide();
      }
    });
  }
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Offcanvas.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](this);
    });
  }
}
EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function(event) {
  const target = getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName)) {
    event.preventDefault();
  }
  if (isDisabled(this)) {
    return;
  }
  EventHandler.one(target, EVENT_HIDDEN$2, () => {
    if (isVisible(this)) {
      this.focus();
    }
  });
  const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
  if (allReadyOpen && allReadyOpen !== target) {
    Offcanvas.getInstance(allReadyOpen).hide();
  }
  const data = Offcanvas.getOrCreateInstance(target);
  data.toggle(this);
});
EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => SelectorEngine.find(OPEN_SELECTOR).forEach((el) => Offcanvas.getOrCreateInstance(el).show()));
enableDismissTrigger(Offcanvas);
defineJQueryPlugin(Offcanvas);
const uriAttributes = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]);
const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
const allowedAttribute = (attribute, allowedAttributeList) => {
  const attributeName = attribute.nodeName.toLowerCase();
  if (allowedAttributeList.includes(attributeName)) {
    if (uriAttributes.has(attributeName)) {
      return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
    }
    return true;
  }
  const regExp = allowedAttributeList.filter((attributeRegex) => attributeRegex instanceof RegExp);
  for (let i = 0, len = regExp.length; i < len; i++) {
    if (regExp[i].test(attributeName)) {
      return true;
    }
  }
  return false;
};
const DefaultAllowlist = {
  "*": ["class", "dir", "id", "lang", "role", ARIA_ATTRIBUTE_PATTERN],
  a: ["target", "href", "title", "rel"],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  div: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ["src", "srcset", "alt", "title", "width", "height"],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
};
function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
  if (!unsafeHtml.length) {
    return unsafeHtml;
  }
  if (sanitizeFn && typeof sanitizeFn === "function") {
    return sanitizeFn(unsafeHtml);
  }
  const domParser = new window.DOMParser();
  const createdDocument = domParser.parseFromString(unsafeHtml, "text/html");
  const elements = [].concat(...createdDocument.body.querySelectorAll("*"));
  for (let i = 0, len = elements.length; i < len; i++) {
    const element = elements[i];
    const elementName = element.nodeName.toLowerCase();
    if (!Object.keys(allowList).includes(elementName)) {
      element.remove();
      continue;
    }
    const attributeList = [].concat(...element.attributes);
    const allowedAttributes = [].concat(allowList["*"] || [], allowList[elementName] || []);
    attributeList.forEach((attribute) => {
      if (!allowedAttribute(attribute, allowedAttributes)) {
        element.removeAttribute(attribute.nodeName);
      }
    });
  }
  return createdDocument.body.innerHTML;
}
const NAME$4 = "tooltip";
const DATA_KEY$4 = "bs.tooltip";
const EVENT_KEY$4 = `.${DATA_KEY$4}`;
const CLASS_PREFIX$1 = "bs-tooltip";
const DISALLOWED_ATTRIBUTES = new Set(["sanitize", "allowList", "sanitizeFn"]);
const DefaultType$3 = {
  animation: "boolean",
  template: "string",
  title: "(string|element|function)",
  trigger: "string",
  delay: "(number|object)",
  html: "boolean",
  selector: "(string|boolean)",
  placement: "(string|function)",
  offset: "(array|string|function)",
  container: "(string|element|boolean)",
  fallbackPlacements: "array",
  boundary: "(string|element)",
  customClass: "(string|function)",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  allowList: "object",
  popperConfig: "(null|object|function)"
};
const AttachmentMap = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: isRTL() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: isRTL() ? "right" : "left"
};
const Default$3 = {
  animation: true,
  template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  trigger: "hover focus",
  title: "",
  delay: 0,
  html: false,
  selector: false,
  placement: "top",
  offset: [0, 0],
  container: false,
  fallbackPlacements: ["top", "right", "bottom", "left"],
  boundary: "clippingParents",
  customClass: "",
  sanitize: true,
  sanitizeFn: null,
  allowList: DefaultAllowlist,
  popperConfig: null
};
const Event$2 = {
  HIDE: `hide${EVENT_KEY$4}`,
  HIDDEN: `hidden${EVENT_KEY$4}`,
  SHOW: `show${EVENT_KEY$4}`,
  SHOWN: `shown${EVENT_KEY$4}`,
  INSERTED: `inserted${EVENT_KEY$4}`,
  CLICK: `click${EVENT_KEY$4}`,
  FOCUSIN: `focusin${EVENT_KEY$4}`,
  FOCUSOUT: `focusout${EVENT_KEY$4}`,
  MOUSEENTER: `mouseenter${EVENT_KEY$4}`,
  MOUSELEAVE: `mouseleave${EVENT_KEY$4}`
};
const CLASS_NAME_FADE$2 = "fade";
const CLASS_NAME_MODAL = "modal";
const CLASS_NAME_SHOW$2 = "show";
const HOVER_STATE_SHOW = "show";
const HOVER_STATE_OUT = "out";
const SELECTOR_TOOLTIP_INNER = ".tooltip-inner";
const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
const EVENT_MODAL_HIDE = "hide.bs.modal";
const TRIGGER_HOVER = "hover";
const TRIGGER_FOCUS = "focus";
const TRIGGER_CLICK = "click";
const TRIGGER_MANUAL = "manual";
class Tooltip extends BaseComponent {
  constructor(element, config) {
    if (typeof Popper === "undefined") {
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
    }
    super(element);
    this._isEnabled = true;
    this._timeout = 0;
    this._hoverState = "";
    this._activeTrigger = {};
    this._popper = null;
    this._config = this._getConfig(config);
    this.tip = null;
    this._setListeners();
  }
  static get Default() {
    return Default$3;
  }
  static get NAME() {
    return NAME$4;
  }
  static get Event() {
    return Event$2;
  }
  static get DefaultType() {
    return DefaultType$3;
  }
  enable() {
    this._isEnabled = true;
  }
  disable() {
    this._isEnabled = false;
  }
  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }
  toggle(event) {
    if (!this._isEnabled) {
      return;
    }
    if (event) {
      const context = this._initializeOnDelegatedTarget(event);
      context._activeTrigger.click = !context._activeTrigger.click;
      if (context._isWithActiveTrigger()) {
        context._enter(null, context);
      } else {
        context._leave(null, context);
      }
    } else {
      if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$2)) {
        this._leave(null, this);
        return;
      }
      this._enter(null, this);
    }
  }
  dispose() {
    clearTimeout(this._timeout);
    EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    if (this.tip) {
      this.tip.remove();
    }
    this._disposePopper();
    super.dispose();
  }
  show() {
    if (this._element.style.display === "none") {
      throw new Error("Please use show on visible elements");
    }
    if (!(this.isWithContent() && this._isEnabled)) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, this.constructor.Event.SHOW);
    const shadowRoot = findShadowRoot(this._element);
    const isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);
    if (showEvent.defaultPrevented || !isInTheDom) {
      return;
    }
    if (this.constructor.NAME === "tooltip" && this.tip && this.getTitle() !== this.tip.querySelector(SELECTOR_TOOLTIP_INNER).innerHTML) {
      this._disposePopper();
      this.tip.remove();
      this.tip = null;
    }
    const tip = this.getTipElement();
    const tipId = getUID(this.constructor.NAME);
    tip.setAttribute("id", tipId);
    this._element.setAttribute("aria-describedby", tipId);
    if (this._config.animation) {
      tip.classList.add(CLASS_NAME_FADE$2);
    }
    const placement = typeof this._config.placement === "function" ? this._config.placement.call(this, tip, this._element) : this._config.placement;
    const attachment = this._getAttachment(placement);
    this._addAttachmentClass(attachment);
    const {
      container
    } = this._config;
    Data.set(tip, this.constructor.DATA_KEY, this);
    if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
      container.append(tip);
      EventHandler.trigger(this._element, this.constructor.Event.INSERTED);
    }
    if (this._popper) {
      this._popper.update();
    } else {
      this._popper = createPopper(this._element, tip, this._getPopperConfig(attachment));
    }
    tip.classList.add(CLASS_NAME_SHOW$2);
    const customClass = this._resolvePossibleFunction(this._config.customClass);
    if (customClass) {
      tip.classList.add(...customClass.split(" "));
    }
    if ("ontouchstart" in document.documentElement) {
      [].concat(...document.body.children).forEach((element) => {
        EventHandler.on(element, "mouseover", noop);
      });
    }
    const complete = () => {
      const prevHoverState = this._hoverState;
      this._hoverState = null;
      EventHandler.trigger(this._element, this.constructor.Event.SHOWN);
      if (prevHoverState === HOVER_STATE_OUT) {
        this._leave(null, this);
      }
    };
    const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$2);
    this._queueCallback(complete, this.tip, isAnimated);
  }
  hide() {
    if (!this._popper) {
      return;
    }
    const tip = this.getTipElement();
    const complete = () => {
      if (this._isWithActiveTrigger()) {
        return;
      }
      if (this._hoverState !== HOVER_STATE_SHOW) {
        tip.remove();
      }
      this._cleanTipClass();
      this._element.removeAttribute("aria-describedby");
      EventHandler.trigger(this._element, this.constructor.Event.HIDDEN);
      this._disposePopper();
    };
    const hideEvent = EventHandler.trigger(this._element, this.constructor.Event.HIDE);
    if (hideEvent.defaultPrevented) {
      return;
    }
    tip.classList.remove(CLASS_NAME_SHOW$2);
    if ("ontouchstart" in document.documentElement) {
      [].concat(...document.body.children).forEach((element) => EventHandler.off(element, "mouseover", noop));
    }
    this._activeTrigger[TRIGGER_CLICK] = false;
    this._activeTrigger[TRIGGER_FOCUS] = false;
    this._activeTrigger[TRIGGER_HOVER] = false;
    const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$2);
    this._queueCallback(complete, this.tip, isAnimated);
    this._hoverState = "";
  }
  update() {
    if (this._popper !== null) {
      this._popper.update();
    }
  }
  isWithContent() {
    return Boolean(this.getTitle());
  }
  getTipElement() {
    if (this.tip) {
      return this.tip;
    }
    const element = document.createElement("div");
    element.innerHTML = this._config.template;
    const tip = element.children[0];
    this.setContent(tip);
    tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
    this.tip = tip;
    return this.tip;
  }
  setContent(tip) {
    this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TOOLTIP_INNER);
  }
  _sanitizeAndSetContent(template, content, selector) {
    const templateElement = SelectorEngine.findOne(selector, template);
    if (!content && templateElement) {
      templateElement.remove();
      return;
    }
    this.setElementContent(templateElement, content);
  }
  setElementContent(element, content) {
    if (element === null) {
      return;
    }
    if (isElement(content)) {
      content = getElement(content);
      if (this._config.html) {
        if (content.parentNode !== element) {
          element.innerHTML = "";
          element.append(content);
        }
      } else {
        element.textContent = content.textContent;
      }
      return;
    }
    if (this._config.html) {
      if (this._config.sanitize) {
        content = sanitizeHtml(content, this._config.allowList, this._config.sanitizeFn);
      }
      element.innerHTML = content;
    } else {
      element.textContent = content;
    }
  }
  getTitle() {
    const title = this._element.getAttribute("data-bs-original-title") || this._config.title;
    return this._resolvePossibleFunction(title);
  }
  updateAttachment(attachment) {
    if (attachment === "right") {
      return "end";
    }
    if (attachment === "left") {
      return "start";
    }
    return attachment;
  }
  _initializeOnDelegatedTarget(event, context) {
    return context || this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
  }
  _getOffset() {
    const {
      offset: offset2
    } = this._config;
    if (typeof offset2 === "string") {
      return offset2.split(",").map((val) => Number.parseInt(val, 10));
    }
    if (typeof offset2 === "function") {
      return (popperData) => offset2(popperData, this._element);
    }
    return offset2;
  }
  _resolvePossibleFunction(content) {
    return typeof content === "function" ? content.call(this._element) : content;
  }
  _getPopperConfig(attachment) {
    const defaultBsPopperConfig = {
      placement: attachment,
      modifiers: [{
        name: "flip",
        options: {
          fallbackPlacements: this._config.fallbackPlacements
        }
      }, {
        name: "offset",
        options: {
          offset: this._getOffset()
        }
      }, {
        name: "preventOverflow",
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: "arrow",
        options: {
          element: `.${this.constructor.NAME}-arrow`
        }
      }, {
        name: "onChange",
        enabled: true,
        phase: "afterWrite",
        fn: (data) => this._handlePopperPlacementChange(data)
      }],
      onFirstUpdate: (data) => {
        if (data.options.placement !== data.placement) {
          this._handlePopperPlacementChange(data);
        }
      }
    };
    return __spreadValues(__spreadValues({}, defaultBsPopperConfig), typeof this._config.popperConfig === "function" ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig);
  }
  _addAttachmentClass(attachment) {
    this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(attachment)}`);
  }
  _getAttachment(placement) {
    return AttachmentMap[placement.toUpperCase()];
  }
  _setListeners() {
    const triggers = this._config.trigger.split(" ");
    triggers.forEach((trigger2) => {
      if (trigger2 === "click") {
        EventHandler.on(this._element, this.constructor.Event.CLICK, this._config.selector, (event) => this.toggle(event));
      } else if (trigger2 !== TRIGGER_MANUAL) {
        const eventIn = trigger2 === TRIGGER_HOVER ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN;
        const eventOut = trigger2 === TRIGGER_HOVER ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
        EventHandler.on(this._element, eventIn, this._config.selector, (event) => this._enter(event));
        EventHandler.on(this._element, eventOut, this._config.selector, (event) => this._leave(event));
      }
    });
    this._hideModalHandler = () => {
      if (this._element) {
        this.hide();
      }
    };
    EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    if (this._config.selector) {
      this._config = __spreadProps(__spreadValues({}, this._config), {
        trigger: "manual",
        selector: ""
      });
    } else {
      this._fixTitle();
    }
  }
  _fixTitle() {
    const title = this._element.getAttribute("title");
    const originalTitleType = typeof this._element.getAttribute("data-bs-original-title");
    if (title || originalTitleType !== "string") {
      this._element.setAttribute("data-bs-original-title", title || "");
      if (title && !this._element.getAttribute("aria-label") && !this._element.textContent) {
        this._element.setAttribute("aria-label", title);
      }
      this._element.setAttribute("title", "");
    }
  }
  _enter(event, context) {
    context = this._initializeOnDelegatedTarget(event, context);
    if (event) {
      context._activeTrigger[event.type === "focusin" ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
    }
    if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$2) || context._hoverState === HOVER_STATE_SHOW) {
      context._hoverState = HOVER_STATE_SHOW;
      return;
    }
    clearTimeout(context._timeout);
    context._hoverState = HOVER_STATE_SHOW;
    if (!context._config.delay || !context._config.delay.show) {
      context.show();
      return;
    }
    context._timeout = setTimeout(() => {
      if (context._hoverState === HOVER_STATE_SHOW) {
        context.show();
      }
    }, context._config.delay.show);
  }
  _leave(event, context) {
    context = this._initializeOnDelegatedTarget(event, context);
    if (event) {
      context._activeTrigger[event.type === "focusout" ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
    }
    if (context._isWithActiveTrigger()) {
      return;
    }
    clearTimeout(context._timeout);
    context._hoverState = HOVER_STATE_OUT;
    if (!context._config.delay || !context._config.delay.hide) {
      context.hide();
      return;
    }
    context._timeout = setTimeout(() => {
      if (context._hoverState === HOVER_STATE_OUT) {
        context.hide();
      }
    }, context._config.delay.hide);
  }
  _isWithActiveTrigger() {
    for (const trigger2 in this._activeTrigger) {
      if (this._activeTrigger[trigger2]) {
        return true;
      }
    }
    return false;
  }
  _getConfig(config) {
    const dataAttributes = Manipulator.getDataAttributes(this._element);
    Object.keys(dataAttributes).forEach((dataAttr) => {
      if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
        delete dataAttributes[dataAttr];
      }
    });
    config = __spreadValues(__spreadValues(__spreadValues({}, this.constructor.Default), dataAttributes), typeof config === "object" && config ? config : {});
    config.container = config.container === false ? document.body : getElement(config.container);
    if (typeof config.delay === "number") {
      config.delay = {
        show: config.delay,
        hide: config.delay
      };
    }
    if (typeof config.title === "number") {
      config.title = config.title.toString();
    }
    if (typeof config.content === "number") {
      config.content = config.content.toString();
    }
    typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
    if (config.sanitize) {
      config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
    }
    return config;
  }
  _getDelegateConfig() {
    const config = {};
    for (const key in this._config) {
      if (this.constructor.Default[key] !== this._config[key]) {
        config[key] = this._config[key];
      }
    }
    return config;
  }
  _cleanTipClass() {
    const tip = this.getTipElement();
    const basicClassPrefixRegex = new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`, "g");
    const tabClass = tip.getAttribute("class").match(basicClassPrefixRegex);
    if (tabClass !== null && tabClass.length > 0) {
      tabClass.map((token) => token.trim()).forEach((tClass) => tip.classList.remove(tClass));
    }
  }
  _getBasicClassPrefix() {
    return CLASS_PREFIX$1;
  }
  _handlePopperPlacementChange(popperData) {
    const {
      state
    } = popperData;
    if (!state) {
      return;
    }
    this.tip = state.elements.popper;
    this._cleanTipClass();
    this._addAttachmentClass(this._getAttachment(state.placement));
  }
  _disposePopper() {
    if (this._popper) {
      this._popper.destroy();
      this._popper = null;
    }
  }
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Tooltip.getOrCreateInstance(this, config);
      if (typeof config === "string") {
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    });
  }
}
defineJQueryPlugin(Tooltip);
const NAME$3 = "popover";
const DATA_KEY$3 = "bs.popover";
const EVENT_KEY$3 = `.${DATA_KEY$3}`;
const CLASS_PREFIX = "bs-popover";
const Default$2 = __spreadProps(__spreadValues({}, Tooltip.Default), {
  placement: "right",
  offset: [0, 8],
  trigger: "click",
  content: "",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
});
const DefaultType$2 = __spreadProps(__spreadValues({}, Tooltip.DefaultType), {
  content: "(string|element|function)"
});
const Event$1 = {
  HIDE: `hide${EVENT_KEY$3}`,
  HIDDEN: `hidden${EVENT_KEY$3}`,
  SHOW: `show${EVENT_KEY$3}`,
  SHOWN: `shown${EVENT_KEY$3}`,
  INSERTED: `inserted${EVENT_KEY$3}`,
  CLICK: `click${EVENT_KEY$3}`,
  FOCUSIN: `focusin${EVENT_KEY$3}`,
  FOCUSOUT: `focusout${EVENT_KEY$3}`,
  MOUSEENTER: `mouseenter${EVENT_KEY$3}`,
  MOUSELEAVE: `mouseleave${EVENT_KEY$3}`
};
const SELECTOR_TITLE = ".popover-header";
const SELECTOR_CONTENT = ".popover-body";
class Popover extends Tooltip {
  static get Default() {
    return Default$2;
  }
  static get NAME() {
    return NAME$3;
  }
  static get Event() {
    return Event$1;
  }
  static get DefaultType() {
    return DefaultType$2;
  }
  isWithContent() {
    return this.getTitle() || this._getContent();
  }
  setContent(tip) {
    this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TITLE);
    this._sanitizeAndSetContent(tip, this._getContent(), SELECTOR_CONTENT);
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  _getBasicClassPrefix() {
    return CLASS_PREFIX;
  }
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Popover.getOrCreateInstance(this, config);
      if (typeof config === "string") {
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    });
  }
}
defineJQueryPlugin(Popover);
const NAME$2 = "scrollspy";
const DATA_KEY$2 = "bs.scrollspy";
const EVENT_KEY$2 = `.${DATA_KEY$2}`;
const DATA_API_KEY$1 = ".data-api";
const Default$1 = {
  offset: 10,
  method: "auto",
  target: ""
};
const DefaultType$1 = {
  offset: "number",
  method: "string",
  target: "(string|element)"
};
const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
const EVENT_SCROLL = `scroll${EVENT_KEY$2}`;
const EVENT_LOAD_DATA_API = `load${EVENT_KEY$2}${DATA_API_KEY$1}`;
const CLASS_NAME_DROPDOWN_ITEM = "dropdown-item";
const CLASS_NAME_ACTIVE$1 = "active";
const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
const SELECTOR_NAV_LIST_GROUP$1 = ".nav, .list-group";
const SELECTOR_NAV_LINKS = ".nav-link";
const SELECTOR_NAV_ITEMS = ".nav-item";
const SELECTOR_LIST_ITEMS = ".list-group-item";
const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}, .${CLASS_NAME_DROPDOWN_ITEM}`;
const SELECTOR_DROPDOWN$1 = ".dropdown";
const SELECTOR_DROPDOWN_TOGGLE$1 = ".dropdown-toggle";
const METHOD_OFFSET = "offset";
const METHOD_POSITION = "position";
class ScrollSpy extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._scrollElement = this._element.tagName === "BODY" ? window : this._element;
    this._config = this._getConfig(config);
    this._offsets = [];
    this._targets = [];
    this._activeTarget = null;
    this._scrollHeight = 0;
    EventHandler.on(this._scrollElement, EVENT_SCROLL, () => this._process());
    this.refresh();
    this._process();
  }
  static get Default() {
    return Default$1;
  }
  static get NAME() {
    return NAME$2;
  }
  refresh() {
    const autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
    const offsetMethod = this._config.method === "auto" ? autoMethod : this._config.method;
    const offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
    this._offsets = [];
    this._targets = [];
    this._scrollHeight = this._getScrollHeight();
    const targets = SelectorEngine.find(SELECTOR_LINK_ITEMS, this._config.target);
    targets.map((element) => {
      const targetSelector = getSelectorFromElement(element);
      const target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;
      if (target) {
        const targetBCR = target.getBoundingClientRect();
        if (targetBCR.width || targetBCR.height) {
          return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
        }
      }
      return null;
    }).filter((item) => item).sort((a, b) => a[0] - b[0]).forEach((item) => {
      this._offsets.push(item[0]);
      this._targets.push(item[1]);
    });
  }
  dispose() {
    EventHandler.off(this._scrollElement, EVENT_KEY$2);
    super.dispose();
  }
  _getConfig(config) {
    config = __spreadValues(__spreadValues(__spreadValues({}, Default$1), Manipulator.getDataAttributes(this._element)), typeof config === "object" && config ? config : {});
    config.target = getElement(config.target) || document.documentElement;
    typeCheckConfig(NAME$2, config, DefaultType$1);
    return config;
  }
  _getScrollTop() {
    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
  }
  _getScrollHeight() {
    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  }
  _getOffsetHeight() {
    return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
  }
  _process() {
    const scrollTop = this._getScrollTop() + this._config.offset;
    const scrollHeight = this._getScrollHeight();
    const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();
    if (this._scrollHeight !== scrollHeight) {
      this.refresh();
    }
    if (scrollTop >= maxScroll) {
      const target = this._targets[this._targets.length - 1];
      if (this._activeTarget !== target) {
        this._activate(target);
      }
      return;
    }
    if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
      this._activeTarget = null;
      this._clear();
      return;
    }
    for (let i = this._offsets.length; i--; ) {
      const isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === "undefined" || scrollTop < this._offsets[i + 1]);
      if (isActiveTarget) {
        this._activate(this._targets[i]);
      }
    }
  }
  _activate(target) {
    this._activeTarget = target;
    this._clear();
    const queries = SELECTOR_LINK_ITEMS.split(",").map((selector) => `${selector}[data-bs-target="${target}"],${selector}[href="${target}"]`);
    const link = SelectorEngine.findOne(queries.join(","), this._config.target);
    link.classList.add(CLASS_NAME_ACTIVE$1);
    if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
      SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, link.closest(SELECTOR_DROPDOWN$1)).classList.add(CLASS_NAME_ACTIVE$1);
    } else {
      SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP$1).forEach((listGroup) => {
        SelectorEngine.prev(listGroup, `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`).forEach((item) => item.classList.add(CLASS_NAME_ACTIVE$1));
        SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach((navItem) => {
          SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach((item) => item.classList.add(CLASS_NAME_ACTIVE$1));
        });
      });
    }
    EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
      relatedTarget: target
    });
  }
  _clear() {
    SelectorEngine.find(SELECTOR_LINK_ITEMS, this._config.target).filter((node) => node.classList.contains(CLASS_NAME_ACTIVE$1)).forEach((node) => node.classList.remove(CLASS_NAME_ACTIVE$1));
  }
  static jQueryInterface(config) {
    return this.each(function() {
      const data = ScrollSpy.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (typeof data[config] === "undefined") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
}
EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  SelectorEngine.find(SELECTOR_DATA_SPY).forEach((spy) => new ScrollSpy(spy));
});
defineJQueryPlugin(ScrollSpy);
const NAME$1 = "tab";
const DATA_KEY$1 = "bs.tab";
const EVENT_KEY$1 = `.${DATA_KEY$1}`;
const DATA_API_KEY = ".data-api";
const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}${DATA_API_KEY}`;
const CLASS_NAME_DROPDOWN_MENU = "dropdown-menu";
const CLASS_NAME_ACTIVE = "active";
const CLASS_NAME_FADE$1 = "fade";
const CLASS_NAME_SHOW$1 = "show";
const SELECTOR_DROPDOWN = ".dropdown";
const SELECTOR_NAV_LIST_GROUP = ".nav, .list-group";
const SELECTOR_ACTIVE = ".active";
const SELECTOR_ACTIVE_UL = ":scope > li > .active";
const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
const SELECTOR_DROPDOWN_TOGGLE = ".dropdown-toggle";
const SELECTOR_DROPDOWN_ACTIVE_CHILD = ":scope > .dropdown-menu .active";
class Tab extends BaseComponent {
  static get NAME() {
    return NAME$1;
  }
  show() {
    if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
      return;
    }
    let previous;
    const target = getElementFromSelector(this._element);
    const listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);
    if (listElement) {
      const itemSelector = listElement.nodeName === "UL" || listElement.nodeName === "OL" ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
      previous = SelectorEngine.find(itemSelector, listElement);
      previous = previous[previous.length - 1];
    }
    const hideEvent = previous ? EventHandler.trigger(previous, EVENT_HIDE$1, {
      relatedTarget: this._element
    }) : null;
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, {
      relatedTarget: previous
    });
    if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
      return;
    }
    this._activate(this._element, listElement);
    const complete = () => {
      EventHandler.trigger(previous, EVENT_HIDDEN$1, {
        relatedTarget: this._element
      });
      EventHandler.trigger(this._element, EVENT_SHOWN$1, {
        relatedTarget: previous
      });
    };
    if (target) {
      this._activate(target, target.parentNode, complete);
    } else {
      complete();
    }
  }
  _activate(element, container, callback) {
    const activeElements = container && (container.nodeName === "UL" || container.nodeName === "OL") ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE);
    const active = activeElements[0];
    const isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$1);
    const complete = () => this._transitionComplete(element, active, callback);
    if (active && isTransitioning) {
      active.classList.remove(CLASS_NAME_SHOW$1);
      this._queueCallback(complete, element, true);
    } else {
      complete();
    }
  }
  _transitionComplete(element, active, callback) {
    if (active) {
      active.classList.remove(CLASS_NAME_ACTIVE);
      const dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);
      if (dropdownChild) {
        dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
      }
      if (active.getAttribute("role") === "tab") {
        active.setAttribute("aria-selected", false);
      }
    }
    element.classList.add(CLASS_NAME_ACTIVE);
    if (element.getAttribute("role") === "tab") {
      element.setAttribute("aria-selected", true);
    }
    reflow(element);
    if (element.classList.contains(CLASS_NAME_FADE$1)) {
      element.classList.add(CLASS_NAME_SHOW$1);
    }
    let parent = element.parentNode;
    if (parent && parent.nodeName === "LI") {
      parent = parent.parentNode;
    }
    if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
      const dropdownElement = element.closest(SELECTOR_DROPDOWN);
      if (dropdownElement) {
        SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach((dropdown) => dropdown.classList.add(CLASS_NAME_ACTIVE));
      }
      element.setAttribute("aria-expanded", true);
    }
    if (callback) {
      callback();
    }
  }
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Tab.getOrCreateInstance(this);
      if (typeof config === "string") {
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    });
  }
}
EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
  if (["A", "AREA"].includes(this.tagName)) {
    event.preventDefault();
  }
  if (isDisabled(this)) {
    return;
  }
  const data = Tab.getOrCreateInstance(this);
  data.show();
});
defineJQueryPlugin(Tab);
const NAME = "toast";
const DATA_KEY = "bs.toast";
const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const CLASS_NAME_FADE = "fade";
const CLASS_NAME_HIDE = "hide";
const CLASS_NAME_SHOW = "show";
const CLASS_NAME_SHOWING = "showing";
const DefaultType = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
};
const Default = {
  animation: true,
  autohide: true,
  delay: 5e3
};
class Toast extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._config = this._getConfig(config);
    this._timeout = null;
    this._hasMouseInteraction = false;
    this._hasKeyboardInteraction = false;
    this._setListeners();
  }
  static get DefaultType() {
    return DefaultType;
  }
  static get Default() {
    return Default;
  }
  static get NAME() {
    return NAME;
  }
  show() {
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
    if (showEvent.defaultPrevented) {
      return;
    }
    this._clearTimeout();
    if (this._config.animation) {
      this._element.classList.add(CLASS_NAME_FADE);
    }
    const complete = () => {
      this._element.classList.remove(CLASS_NAME_SHOWING);
      EventHandler.trigger(this._element, EVENT_SHOWN);
      this._maybeScheduleHide();
    };
    this._element.classList.remove(CLASS_NAME_HIDE);
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_SHOW);
    this._element.classList.add(CLASS_NAME_SHOWING);
    this._queueCallback(complete, this._element, this._config.animation);
  }
  hide() {
    if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
    if (hideEvent.defaultPrevented) {
      return;
    }
    const complete = () => {
      this._element.classList.add(CLASS_NAME_HIDE);
      this._element.classList.remove(CLASS_NAME_SHOWING);
      this._element.classList.remove(CLASS_NAME_SHOW);
      EventHandler.trigger(this._element, EVENT_HIDDEN);
    };
    this._element.classList.add(CLASS_NAME_SHOWING);
    this._queueCallback(complete, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout();
    if (this._element.classList.contains(CLASS_NAME_SHOW)) {
      this._element.classList.remove(CLASS_NAME_SHOW);
    }
    super.dispose();
  }
  _getConfig(config) {
    config = __spreadValues(__spreadValues(__spreadValues({}, Default), Manipulator.getDataAttributes(this._element)), typeof config === "object" && config ? config : {});
    typeCheckConfig(NAME, config, this.constructor.DefaultType);
    return config;
  }
  _maybeScheduleHide() {
    if (!this._config.autohide) {
      return;
    }
    if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
      return;
    }
    this._timeout = setTimeout(() => {
      this.hide();
    }, this._config.delay);
  }
  _onInteraction(event, isInteracting) {
    switch (event.type) {
      case "mouseover":
      case "mouseout":
        this._hasMouseInteraction = isInteracting;
        break;
      case "focusin":
      case "focusout":
        this._hasKeyboardInteraction = isInteracting;
        break;
    }
    if (isInteracting) {
      this._clearTimeout();
      return;
    }
    const nextElement = event.relatedTarget;
    if (this._element === nextElement || this._element.contains(nextElement)) {
      return;
    }
    this._maybeScheduleHide();
  }
  _setListeners() {
    EventHandler.on(this._element, EVENT_MOUSEOVER, (event) => this._onInteraction(event, true));
    EventHandler.on(this._element, EVENT_MOUSEOUT, (event) => this._onInteraction(event, false));
    EventHandler.on(this._element, EVENT_FOCUSIN, (event) => this._onInteraction(event, true));
    EventHandler.on(this._element, EVENT_FOCUSOUT, (event) => this._onInteraction(event, false));
  }
  _clearTimeout() {
    clearTimeout(this._timeout);
    this._timeout = null;
  }
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Toast.getOrCreateInstance(this, config);
      if (typeof config === "string") {
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      }
    });
  }
}
enableDismissTrigger(Toast);
defineJQueryPlugin(Toast);
export { normalizeStyle as $, withCtx as A, pushScopeId as B, popScopeId as C, createTextVNode as D, useRouter as E, Fragment as F, watch as G, Hashids as H, onMounted as I, onUnmounted as J, view$1 as K, ref as L, lensProp$1 as M, withDirectives as N, vModelText as O, isRef as P, marked as Q, toRefs as R, h as S, vShow as T, createBlock as U, VuexPersistence$1 as V, mergeWith$1 as W, mergeAll$1 as X, match$1 as Y, vModelSelect as Z, __$1 as _, createStore as a, __ as a0, test$1 as a1, useRoute as a2, createStaticVNode as a3, withModifiers as a4, createRouter as a5, createWebHashHistory as a6, createApp as a7, createLogger as b, clone$1 as c, lensPath$1 as d, lib as e, always$1 as f, omit$1 as g, defineComponent as h, openBlock as i, createElementBlock as j, createBaseVNode as k, localforage as l, mergeRight$1 as m, createCommentVNode as n, over$1 as o, normalizeClass as p, reactive as q, renderSlot as r, set$1 as s, toDisplayString as t, useStore as u, computed as v, resolveComponent as w, renderList as x, unref as y, createVNode as z };
