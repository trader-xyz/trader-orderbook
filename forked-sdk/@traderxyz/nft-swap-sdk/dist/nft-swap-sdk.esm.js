import invariant from 'tiny-invariant';
import warning from 'tiny-warning';
import flatten from 'lodash-es/flatten';
import { hexConcat, hexDataLength, hexDataSlice, splitSignature, hexlify, joinSignature, arrayify } from '@ethersproject/bytes';
import { verifyTypedData } from '@ethersproject/wallet';
import { _TypedDataEncoder } from '@ethersproject/hash';
import { BigNumber } from '@ethersproject/bignumber';
import { defaultAbiCoder, Interface } from '@ethersproject/abi';
import getUnixTime from 'date-fns/getUnixTime';
import '@ethersproject/address';
import { utils, Contract, BigNumber as BigNumber$1 } from 'ethers';
import { v4 } from 'uuid';
import padEnd from 'lodash-es/padEnd';
import padStart from 'lodash-es/padStart';
import unfetch from 'isomorphic-unfetch';
import { stringify } from 'query-string';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

var ZERO_AMOUNT = /*#__PURE__*/BigNumber.from(0);
var NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
var NULL_BYTES = '0x';

var AssetProxyId;

(function (AssetProxyId) {
  AssetProxyId["ERC20"] = "0xf47261b0";
  AssetProxyId["ERC721"] = "0x02571792";
  AssetProxyId["MultiAsset"] = "0x94cfcdd7";
  AssetProxyId["ERC1155"] = "0xa7cb5fb7";
  AssetProxyId["StaticCall"] = "0xc339d10a";
  AssetProxyId["ERC20Bridge"] = "0xdc1600f3";
})(AssetProxyId || (AssetProxyId = {}));

var SupportedChainIdsV3;

(function (SupportedChainIdsV3) {
  SupportedChainIdsV3[SupportedChainIdsV3["Mainnet"] = 1] = "Mainnet";
  SupportedChainIdsV3[SupportedChainIdsV3["Ropsten"] = 3] = "Ropsten";
  SupportedChainIdsV3[SupportedChainIdsV3["Rinkeby"] = 4] = "Rinkeby";
  SupportedChainIdsV3[SupportedChainIdsV3["Kovan"] = 42] = "Kovan";
  SupportedChainIdsV3[SupportedChainIdsV3["Ganache"] = 1337] = "Ganache";
  SupportedChainIdsV3[SupportedChainIdsV3["BSC"] = 56] = "BSC";
  SupportedChainIdsV3[SupportedChainIdsV3["Polygon"] = 137] = "Polygon";
  SupportedChainIdsV3[SupportedChainIdsV3["PolygonMumbai"] = 80001] = "PolygonMumbai";
  SupportedChainIdsV3[SupportedChainIdsV3["Avalanche"] = 43114] = "Avalanche";
  SupportedChainIdsV3[SupportedChainIdsV3["GaussMainnet"] = 1777] = "GaussMainnet";
  SupportedChainIdsV3[SupportedChainIdsV3["GILTestnet"] = 1452] = "GILTestnet";
})(SupportedChainIdsV3 || (SupportedChainIdsV3 = {}));

var OrderStatusV3;

(function (OrderStatusV3) {
  OrderStatusV3[OrderStatusV3["Invalid"] = 0] = "Invalid";
  OrderStatusV3[OrderStatusV3["InvalidMakerAssetAmount"] = 1] = "InvalidMakerAssetAmount";
  OrderStatusV3[OrderStatusV3["InvalidTakerAssetAmount"] = 2] = "InvalidTakerAssetAmount";
  OrderStatusV3[OrderStatusV3["Fillable"] = 3] = "Fillable";
  OrderStatusV3[OrderStatusV3["Expired"] = 4] = "Expired";
  OrderStatusV3[OrderStatusV3["FullyFilled"] = 5] = "FullyFilled";
  OrderStatusV3[OrderStatusV3["Cancelled"] = 6] = "Cancelled";
})(OrderStatusV3 || (OrderStatusV3 = {}));

var OrderStatusCodeLookup = {
  0: 'Invalid',
  1: 'InvalidMakerAssetAmount',
  2: 'InvalidTakerAssetAmount',
  3: 'Fillable',
  4: 'Expired',
  5: 'FullyFilled',
  6: 'Cancelled'
};
var ORDER_BUILDER_ERROR_CODES;

(function (ORDER_BUILDER_ERROR_CODES) {
  ORDER_BUILDER_ERROR_CODES["MISSING_CONTRACT_WRAPPERS_ERROR"] = "MISSING_CONTRACT_WRAPPERS_ERROR";
})(ORDER_BUILDER_ERROR_CODES || (ORDER_BUILDER_ERROR_CODES = {}));

var SupportedTokenTypes;

(function (SupportedTokenTypes) {
  SupportedTokenTypes["ERC20"] = "ERC20";
  SupportedTokenTypes["ERC721"] = "ERC721";
  SupportedTokenTypes["ERC1155"] = "ERC1155";
})(SupportedTokenTypes || (SupportedTokenTypes = {}));

var EIP712_TYPES = {
  Order: [{
    name: 'makerAddress',
    type: 'address'
  }, {
    name: 'takerAddress',
    type: 'address'
  }, {
    name: 'feeRecipientAddress',
    type: 'address'
  }, {
    name: 'senderAddress',
    type: 'address'
  }, {
    name: 'makerAssetAmount',
    type: 'uint256'
  }, {
    name: 'takerAssetAmount',
    type: 'uint256'
  }, {
    name: 'makerFee',
    type: 'uint256'
  }, {
    name: 'takerFee',
    type: 'uint256'
  }, {
    name: 'expirationTimeSeconds',
    type: 'uint256'
  }, {
    name: 'salt',
    type: 'uint256'
  }, {
    name: 'makerAssetData',
    type: 'bytes'
  }, {
    name: 'takerAssetData',
    type: 'bytes'
  }, {
    name: 'makerFeeAssetData',
    type: 'bytes'
  }, {
    name: 'takerFeeAssetData',
    type: 'bytes'
  }]
};
var RevertReason;

(function (RevertReason) {
  RevertReason["OrderUnfillable"] = "ORDER_UNFILLABLE";
  RevertReason["InvalidMaker"] = "INVALID_MAKER";
  RevertReason["InvalidTaker"] = "INVALID_TAKER";
  RevertReason["InvalidSender"] = "INVALID_SENDER";
  RevertReason["InvalidOrderSignature"] = "INVALID_ORDER_SIGNATURE";
  RevertReason["InvalidTakerAmount"] = "INVALID_TAKER_AMOUNT";
  RevertReason["DivisionByZero"] = "DIVISION_BY_ZERO";
  RevertReason["RoundingError"] = "ROUNDING_ERROR";
  RevertReason["InvalidSignature"] = "INVALID_SIGNATURE";
  RevertReason["SignatureIllegal"] = "SIGNATURE_ILLEGAL";
  RevertReason["SignatureInvalid"] = "SIGNATURE_INVALID";
  RevertReason["SignatureUnsupported"] = "SIGNATURE_UNSUPPORTED";
  RevertReason["TakerOverpay"] = "TAKER_OVERPAY";
  RevertReason["OrderOverfill"] = "ORDER_OVERFILL";
  RevertReason["InvalidFillPrice"] = "INVALID_FILL_PRICE";
  RevertReason["InvalidNewOrderEpoch"] = "INVALID_NEW_ORDER_EPOCH";
  RevertReason["CompleteFillFailed"] = "COMPLETE_FILL_FAILED";
  RevertReason["NegativeSpreadRequired"] = "NEGATIVE_SPREAD_REQUIRED";
  RevertReason["ReentrancyIllegal"] = "REENTRANCY_ILLEGAL";
  RevertReason["InvalidTxHash"] = "INVALID_TX_HASH";
  RevertReason["InvalidTxSignature"] = "INVALID_TX_SIGNATURE";
  RevertReason["FailedExecution"] = "FAILED_EXECUTION";
  RevertReason["LengthGreaterThan0Required"] = "LENGTH_GREATER_THAN_0_REQUIRED";
  RevertReason["LengthGreaterThan3Required"] = "LENGTH_GREATER_THAN_3_REQUIRED";
  RevertReason["LengthGreaterThan131Required"] = "LENGTH_GREATER_THAN_131_REQUIRED";
  RevertReason["Length0Required"] = "LENGTH_0_REQUIRED";
  RevertReason["Length65Required"] = "LENGTH_65_REQUIRED";
  RevertReason["InvalidAmount"] = "INVALID_AMOUNT";
  RevertReason["TransferFailed"] = "TRANSFER_FAILED";
  RevertReason["SenderNotAuthorized"] = "SENDER_NOT_AUTHORIZED";
  RevertReason["TargetNotAuthorized"] = "TARGET_NOT_AUTHORIZED";
  RevertReason["TargetAlreadyAuthorized"] = "TARGET_ALREADY_AUTHORIZED";
  RevertReason["IndexOutOfBounds"] = "INDEX_OUT_OF_BOUNDS";
  RevertReason["AuthorizedAddressMismatch"] = "AUTHORIZED_ADDRESS_MISMATCH";
  RevertReason["OnlyContractOwner"] = "ONLY_CONTRACT_OWNER";
  RevertReason["MakerNotWhitelisted"] = "MAKER_NOT_WHITELISTED";
  RevertReason["TakerNotWhitelisted"] = "TAKER_NOT_WHITELISTED";
  RevertReason["AssetProxyDoesNotExist"] = "ASSET_PROXY_DOES_NOT_EXIST";
  RevertReason["LengthMismatch"] = "LENGTH_MISMATCH";
  RevertReason["LibBytesGreaterThanZeroLengthRequired"] = "GREATER_THAN_ZERO_LENGTH_REQUIRED";
  RevertReason["LibBytesGreaterOrEqualTo4LengthRequired"] = "GREATER_OR_EQUAL_TO_4_LENGTH_REQUIRED";
  RevertReason["LibBytesGreaterOrEqualTo20LengthRequired"] = "GREATER_OR_EQUAL_TO_20_LENGTH_REQUIRED";
  RevertReason["LibBytesGreaterOrEqualTo32LengthRequired"] = "GREATER_OR_EQUAL_TO_32_LENGTH_REQUIRED";
  RevertReason["LibBytesGreaterOrEqualToNestedBytesLengthRequired"] = "GREATER_OR_EQUAL_TO_NESTED_BYTES_LENGTH_REQUIRED";
  RevertReason["LibBytesGreaterOrEqualToSourceBytesLengthRequired"] = "GREATER_OR_EQUAL_TO_SOURCE_BYTES_LENGTH_REQUIRED";
  RevertReason["Erc20InsufficientBalance"] = "ERC20_INSUFFICIENT_BALANCE";
  RevertReason["Erc20InsufficientAllowance"] = "ERC20_INSUFFICIENT_ALLOWANCE";
  RevertReason["FeePercentageTooLarge"] = "FEE_PERCENTAGE_TOO_LARGE";
  RevertReason["ValueGreaterThanZero"] = "VALUE_GREATER_THAN_ZERO";
  RevertReason["InvalidMsgValue"] = "INVALID_MSG_VALUE";
  RevertReason["InsufficientEthRemaining"] = "INSUFFICIENT_ETH_REMAINING";
  RevertReason["Uint256Overflow"] = "UINT256_OVERFLOW";
  RevertReason["Erc721ZeroToAddress"] = "ERC721_ZERO_TO_ADDRESS";
  RevertReason["Erc721OwnerMismatch"] = "ERC721_OWNER_MISMATCH";
  RevertReason["Erc721InvalidSpender"] = "ERC721_INVALID_SPENDER";
  RevertReason["Erc721ZeroOwner"] = "ERC721_ZERO_OWNER";
  RevertReason["Erc721InvalidSelector"] = "ERC721_INVALID_SELECTOR";
  RevertReason["WalletError"] = "WALLET_ERROR";
  RevertReason["ValidatorError"] = "VALIDATOR_ERROR";
  RevertReason["InvalidFunctionSelector"] = "INVALID_FUNCTION_SELECTOR";
  RevertReason["InvalidAssetData"] = "INVALID_ASSET_DATA";
  RevertReason["InvalidAssetProxy"] = "INVALID_ASSET_PROXY";
  RevertReason["UnregisteredAssetProxy"] = "UNREGISTERED_ASSET_PROXY";
  RevertReason["TxFullyConfirmed"] = "TX_FULLY_CONFIRMED";
  RevertReason["TxNotFullyConfirmed"] = "TX_NOT_FULLY_CONFIRMED";
  RevertReason["TimeLockIncomplete"] = "TIME_LOCK_INCOMPLETE";
  RevertReason["InvalidFreeMemoryPtr"] = "INVALID_FREE_MEMORY_PTR";
  RevertReason["AuctionInvalidAmount"] = "INVALID_AMOUNT";
  RevertReason["AuctionExpired"] = "AUCTION_EXPIRED";
  RevertReason["AuctionNotStarted"] = "AUCTION_NOT_STARTED";
  RevertReason["AuctionInvalidBeginTime"] = "INVALID_BEGIN_TIME";
  RevertReason["InvalidAssetDataEnd"] = "INVALID_ASSET_DATA_END";
  RevertReason["InvalidOrBlockedExchangeSelector"] = "INVALID_OR_BLOCKED_EXCHANGE_SELECTOR";
  RevertReason["BalanceQueryFailed"] = "BALANCE_QUERY_FAILED";
  RevertReason["AtLeastOneAddressDoesNotMeetBalanceThreshold"] = "AT_LEAST_ONE_ADDRESS_DOES_NOT_MEET_BALANCE_THRESHOLD";
  RevertReason["FromLessThanToRequired"] = "FROM_LESS_THAN_TO_REQUIRED";
  RevertReason["ToLessThanLengthRequired"] = "TO_LESS_THAN_LENGTH_REQUIRED";
  RevertReason["InvalidApprovalSignature"] = "INVALID_APPROVAL_SIGNATURE";
  RevertReason["ApprovalExpired"] = "APPROVAL_EXPIRED";
  RevertReason["InvalidOrigin"] = "INVALID_ORIGIN";
  RevertReason["AmountEqualToOneRequired"] = "AMOUNT_EQUAL_TO_ONE_REQUIRED";
  RevertReason["BadReceiverReturnValue"] = "BAD_RECEIVER_RETURN_VALUE";
  RevertReason["CannotTransferToAddressZero"] = "CANNOT_TRANSFER_TO_ADDRESS_ZERO";
  RevertReason["InsufficientAllowance"] = "INSUFFICIENT_ALLOWANCE";
  RevertReason["NFTNotOwnedByFromAddress"] = "NFT_NOT_OWNED_BY_FROM_ADDRESS";
  RevertReason["OwnersAndIdsMustHaveSameLength"] = "OWNERS_AND_IDS_MUST_HAVE_SAME_LENGTH";
  RevertReason["TokenAndValuesLengthMismatch"] = "TOKEN_AND_VALUES_LENGTH_MISMATCH";
  RevertReason["TransferRejected"] = "TRANSFER_REJECTED";
  RevertReason["Uint256Underflow"] = "UINT256_UNDERFLOW";
  RevertReason["InvalidIdsOffset"] = "INVALID_IDS_OFFSET";
  RevertReason["InvalidValuesOffset"] = "INVALID_VALUES_OFFSET";
  RevertReason["InvalidDataOffset"] = "INVALID_DATA_OFFSET";
  RevertReason["InvalidAssetDataLength"] = "INVALID_ASSET_DATA_LENGTH";
  RevertReason["InvalidStaticCallDataOffset"] = "INVALID_STATIC_CALL_DATA_OFFSET";
  RevertReason["TargetNotEven"] = "TARGET_NOT_EVEN";
  RevertReason["UnexpectedStaticCallResult"] = "UNEXPECTED_STATIC_CALL_RESULT";
  RevertReason["TransfersSuccessful"] = "TRANSFERS_SUCCESSFUL";
  RevertReason["InsufficientFunds"] = "INSUFFICIENT_FUNDS";
  RevertReason["TxAlreadyExecuted"] = "TX_ALREADY_EXECUTED";
  RevertReason["DefaultTimeLockIncomplete"] = "DEFAULT_TIME_LOCK_INCOMPLETE";
  RevertReason["CustomTimeLockIncomplete"] = "CUSTOM_TIME_LOCK_INCOMPLETE";
  RevertReason["EqualLengthsRequired"] = "EQUAL_LENGTHS_REQUIRED";
  RevertReason["OnlyCallableByWallet"] = "ONLY_CALLABLE_BY_WALLET";
})(RevertReason || (RevertReason = {}));

var TRADER_ADDRESS_IDENTIFIER = '0xBCC02a155c374263321155555Ccf41070017649e';
var INFINITE_TIMESTAMP_SEC = /*#__PURE__*/BigNumber.from(2524604400);
var getEipDomain = function getEipDomain(chainId, exchangeContractAddress) {
  return {
    name: '0x Protocol',
    version: '3.0.0',
    chainId: chainId.toString(10),
    verifyingContract: exchangeContractAddress
  };
};
var normalizeOrder = function normalizeOrder(order) {
  var _order$signature;

  return {
    makerAddress: order.makerAddress.toLowerCase(),
    takerAddress: order.takerAddress.toLowerCase(),
    feeRecipientAddress: order.feeRecipientAddress.toLowerCase(),
    senderAddress: order.senderAddress.toLowerCase(),
    makerAssetAmount: order.makerAssetAmount.toString(),
    takerAssetAmount: order.takerAssetAmount.toString(),
    makerFee: order.makerFee.toString(),
    takerFee: order.takerFee.toString(),
    expirationTimeSeconds: order.expirationTimeSeconds.toString(),
    salt: order.salt.toString(),
    makerAssetData: order.makerAssetData.toLowerCase(),
    takerAssetData: order.takerAssetData.toLowerCase(),
    makerFeeAssetData: order.makerFeeAssetData.toLowerCase(),
    takerFeeAssetData: order.takerFeeAssetData.toLowerCase(),
    signature: (_order$signature = order.signature) == null ? void 0 : _order$signature.toLowerCase()
  };
};
var generateOrderFromAssetDatas = function generateOrderFromAssetDatas(orderConfig) {
  var makerAssetAmount = orderConfig.makerAssetAmount,
      takerAssetAmount = orderConfig.takerAssetAmount,
      makerAddress = orderConfig.makerAddress,
      makerAssetData = orderConfig.makerAssetData,
      takerAssetData = orderConfig.takerAssetData,
      takerAddress = orderConfig.takerAddress,
      expiration = orderConfig.expiration,
      salt = orderConfig.salt,
      feeRecipientAddress = orderConfig.feeRecipientAddress,
      makerFeeAssetData = orderConfig.makerFeeAssetData,
      takerFeeAssetData = orderConfig.takerFeeAssetData,
      makerFee = orderConfig.makerFee,
      takerFee = orderConfig.takerFee;
  var expirationTimeSeconds = expiration ? BigNumber.from(getUnixTime(expiration)) : INFINITE_TIMESTAMP_SEC;
  var order = {
    makerAddress: makerAddress,
    makerAssetAmount: makerAssetAmount.toString(),
    makerAssetData: makerAssetData,
    takerAddress: takerAddress || NULL_ADDRESS,
    takerAssetAmount: takerAssetAmount.toString(),
    takerAssetData: takerAssetData,
    expirationTimeSeconds: expirationTimeSeconds.toString(),
    // Stuff that doesn't really matter but is required
    senderAddress: NULL_ADDRESS,
    feeRecipientAddress: feeRecipientAddress != null ? feeRecipientAddress : TRADER_ADDRESS_IDENTIFIER,
    salt: salt != null ? salt : generateSaltHash(),
    makerFeeAssetData: makerFeeAssetData != null ? makerFeeAssetData : NULL_BYTES,
    takerFeeAssetData: takerFeeAssetData != null ? takerFeeAssetData : NULL_BYTES,
    makerFee: makerFee != null ? makerFee : ZERO_AMOUNT.toString(),
    takerFee: takerFee != null ? takerFee : ZERO_AMOUNT.toString()
  };
  return order;
};
var generateTimeBasedSalt = function generateTimeBasedSalt() {
  var unixTime = getUnixTime(new Date());
  return unixTime.toString(10);
};

var generateSaltHash = function generateSaltHash(manualSaltHashToUse) {
  if (manualSaltHashToUse) {
    return manualSaltHashToUse;
  }

  return generateTimeBasedSalt();
};

// Better error objects with codes
// Sourced from https://github.com/vweevers/module-error
var ModuleError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(ModuleError, _Error);

  /**
   * @param {string} message Error message
   * @param {{ code?: string, cause?: Error, expected?: boolean, transient?: boolean }} [options]
   */
  function ModuleError(message, options) {
    var _this;

    _this = _Error.call(this, message || '') || this;

    if (typeof options === 'object' && options !== null) {
      if (options.code) _this.code = String(options.code);
      if (options.expected) _this.expected = true;
      if (options["transient"]) _this["transient"] = true;
      if (options.cause) _this.cause = options.cause;
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized(_this), _this.constructor);
    }

    return _this;
  }

  return ModuleError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var UnexpectedAssetTypeError = /*#__PURE__*/function (_ModuleError) {
  _inheritsLoose(UnexpectedAssetTypeError, _ModuleError);

  function UnexpectedAssetTypeError(assetType) {
    var _this2;

    var code = 'UnexpectedAssetTypeError';
    _this2 = _ModuleError.call(this, "Unexpected asset type " + (assetType != null ? assetType : 'unknown'), {
      expected: true,
      code: code
    }) || this;
    _this2.name = code;
    return _this2;
  }

  return UnexpectedAssetTypeError;
}(ModuleError);

var UnsupportedChainId = /*#__PURE__*/function (_ModuleError2) {
  _inheritsLoose(UnsupportedChainId, _ModuleError2);

  function UnsupportedChainId(chainId) {
    var _this3;

    var code = 'UnsupportedChainId';
    _this3 = _ModuleError2.call(this, "Unexpected chainId " + chainId + ". If you want to use that chain, please provide custom zeroex addresses", {
      expected: true,
      code: code
    }) || this;
    _this3.name = code;
    return _this3;
  }

  return UnsupportedChainId;
}(ModuleError);

var convertStringToBN = function convertStringToBN(s) {
  return BigNumber.from(s);
};
var convertCollectionToBN = function convertCollectionToBN(arr) {
  return arr.map(convertStringToBN);
};

var encodeErc20AssetData = function encodeErc20AssetData(tokenAddress) {
  return hexConcat([AssetProxyId.ERC20, defaultAbiCoder.encode(['address'], [tokenAddress])]);
};
var decodeErc20AssetData = function decodeErc20AssetData(encodedAssetData) {
  var length = hexDataLength(encodedAssetData);
  var assetProxyId = hexDataSlice(encodedAssetData, 0, 4);
  var rest = hexDataSlice(encodedAssetData, 4);
  var data = defaultAbiCoder.decode(['address'], rest);
  var tokenAddress = data[0];
  return {
    assetProxyId: assetProxyId.toLowerCase(),
    tokenAddress: tokenAddress.toLowerCase()
  };
};
var encodeErc721AssetData = function encodeErc721AssetData(tokenAddress, tokenId) {
  return hexConcat([AssetProxyId.ERC721, defaultAbiCoder.encode(['address', 'uint256'], [tokenAddress, tokenId])]);
};
var decodeErc721AssetData = function decodeErc721AssetData(encodedAssetData) {
  var assetProxyId = hexDataSlice(encodedAssetData, 0, 4);
  var rest = hexDataSlice(encodedAssetData, 4);
  var data = defaultAbiCoder.decode(['address', 'uint256'], rest);
  var tokenAddress = data[0];
  var tokenId = data[1];
  return {
    assetProxyId: assetProxyId.toLowerCase(),
    tokenAddress: tokenAddress.toLowerCase(),
    tokenId: tokenId.toString()
  };
};
var encodeErc1155AssetData = function encodeErc1155AssetData(tokenAddress, tokenIds, values, callbackData) {
  return hexConcat([AssetProxyId.ERC1155, defaultAbiCoder.encode(['address', 'uint256[]', 'uint256[]', 'bytes'], [tokenAddress, tokenIds, values, callbackData])]);
};
var decodeErc1155AssetData = function decodeErc1155AssetData(encodedAssetData) {
  var assetProxyId = hexDataSlice(encodedAssetData, 0, 4);
  var rest = hexDataSlice(encodedAssetData, 4);
  var data = defaultAbiCoder.decode(['address', 'uint256[]', 'uint256[]', 'bytes'], rest);
  var tokenAddress = data[0];
  var tokenIds = data[1];
  var values = data[2];
  var callbackData = data[3];
  return {
    assetProxyId: assetProxyId.toLowerCase(),
    tokenAddress: tokenAddress.toLowerCase(),
    tokenIds: tokenIds.map(function (id) {
      return id.toString();
    }),
    tokenValues: values.map(function (val) {
      return val.toString();
    }),
    callbackData: callbackData
  };
};
var encodeMultiAssetAssetData = function encodeMultiAssetAssetData(values, nestedAssetData) {
  return hexConcat([AssetProxyId.MultiAsset, defaultAbiCoder.encode(['uint256[]', 'bytes[]'], [values, nestedAssetData])]);
};
var decodeMultiAssetData = function decodeMultiAssetData(encodedAssetData) {
  var assetProxyId = hexDataSlice(encodedAssetData, 0, 4);
  var rest = hexDataSlice(encodedAssetData, 4);
  var data = defaultAbiCoder.decode(['uint256[]', 'bytes[]'], rest);
  var values = data[0];
  var nestedAssetDatas = data[1];
  return {
    assetProxyId: assetProxyId.toLowerCase(),
    amounts: values.map(function (val) {
      return val.toString();
    }),
    nestedAssetData: nestedAssetDatas.map(function (nestedAssetData) {
      return decodeAssetData(nestedAssetData);
    } // Cast b/c multiasset can only happen at depth 0, only singe asset datas can be nested
    )
  };
};
var encodeAssetData = function encodeAssetData(assetData, // To express ERC1155 amounts inside a multiasset order, you cannot encode the amount on the indiviual asset data,
// It needs to be paired with the [asset, amount] tuple inside the Multiasset order format order array (I know, a bit confusing)
// But if you're encoding erc1155 asset data within the context of a multi-asset order, this boolean should be true
erc1155EncodingForMultiAssetOrder) {
  if (erc1155EncodingForMultiAssetOrder === void 0) {
    erc1155EncodingForMultiAssetOrder = false;
  }

  switch (assetData.type) {
    case SupportedTokenTypes.ERC20:
      var erc20AssetData = encodeErc20AssetData(assetData.tokenAddress);
      return erc20AssetData;

    case SupportedTokenTypes.ERC721:
      var erc721AssetData = encodeErc721AssetData(assetData.tokenAddress, BigNumber.from(assetData.tokenId));
      return erc721AssetData;

    case SupportedTokenTypes.ERC1155:
      var tokenIds = assetData.tokens.map(function (x) {
        return x.tokenId;
      });
      var tokenValues;

      if (erc1155EncodingForMultiAssetOrder) {
        tokenValues = assetData.tokens.map(function (_) {
          return '1';
        });
      } else {
        tokenValues = assetData.tokens.map(function (x) {
          return x.tokenValue;
        });
      }

      var erc1155AssetData = encodeErc1155AssetData(assetData.tokenAddress, convertCollectionToBN(tokenIds), convertCollectionToBN(tokenValues), '0x' // Needs to be '0x' (null bytes) (not empty string) or else it won't work lol
      );
      return erc1155AssetData;

    default:
      throw new Error("Unsupported type " + (assetData == null ? void 0 : assetData.type));
  }
};
var decodeAssetData = function decodeAssetData(encodedAssetData) {
  var assetProxyId = hexDataSlice(encodedAssetData, 0, 4);

  switch (assetProxyId) {
    case AssetProxyId.ERC20:
      var erc20AssetData = decodeErc20AssetData(encodedAssetData);
      return erc20AssetData;

    case AssetProxyId.ERC721:
      var erc721AssetData = decodeErc721AssetData(encodedAssetData);
      return erc721AssetData;

    case AssetProxyId.ERC1155:
      var erc1155AssetData = decodeErc1155AssetData(encodedAssetData);
      return erc1155AssetData;

    case AssetProxyId.MultiAsset:
      var multiAssetData = decodeMultiAssetData(encodedAssetData);
      return multiAssetData;

    default:
      throw new Error("Unsupported AssetProxyId " + (assetProxyId == null ? void 0 : assetProxyId.type));
  }
};
var getAmountFromAsset = function getAmountFromAsset(assetData) {
  var _assetData$tokens$0$t, _assetData$tokens$;

  switch (assetData.type) {
    case SupportedTokenTypes.ERC20:
      return assetData.amount;

    case SupportedTokenTypes.ERC721:
      return '1';

    case SupportedTokenTypes.ERC1155:
      // Trader.sdk only supports trading 1 ERC1155 per _asset_ at a time,
      // so we can access the 0th index for our token
      // (You can still trade multiple ERC1155s per _order_).
      return (_assetData$tokens$0$t = (_assetData$tokens$ = assetData.tokens[0]) == null ? void 0 : _assetData$tokens$.tokenValue) != null ? _assetData$tokens$0$t : '1';

    default:
      throw new Error("Unsupported type " + (assetData == null ? void 0 : assetData.type));
  }
};
var convertAssetToInternalFormat = function convertAssetToInternalFormat(swappable) {
  var _swappable$type;

  switch (swappable.type) {
    // No converting needed
    case 'ERC20':
      return swappable;
    // No converting needed

    case 'ERC721':
      return swappable;
    // Convert normalized public ERC1155 interface to 0x internal asset data format
    // We do this to reduce complexity for end user SDK (and keep api same with erc721)

    case 'ERC1155':
      var zeroExErc1155AssetFormat = {
        tokenAddress: swappable.tokenAddress,
        tokens: [{
          tokenId: swappable.tokenId,
          tokenValue: swappable.amount || '1'
        }],
        type: SupportedTokenTypes.ERC1155
      };
      return zeroExErc1155AssetFormat;

    default:
      throw new UnexpectedAssetTypeError((_swappable$type = swappable == null ? void 0 : swappable.type) != null ? _swappable$type : 'Unknown');
  }
};
var convertAssetsToInternalFormat = function convertAssetsToInternalFormat(assets) {
  return assets.map(convertAssetToInternalFormat);
};

/* Autogenerated file. Do not edit manually. */
var _abi = [{
  inputs: [{
    internalType: 'uint256',
    name: 'chainId',
    type: 'uint256'
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'constructor'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'bytes4',
    name: 'id',
    type: 'bytes4'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'assetProxy',
    type: 'address'
  }],
  name: 'AssetProxyRegistered',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: 'address',
    name: 'makerAddress',
    type: 'address'
  }, {
    indexed: true,
    internalType: 'address',
    name: 'feeRecipientAddress',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'bytes',
    name: 'makerAssetData',
    type: 'bytes'
  }, {
    indexed: false,
    internalType: 'bytes',
    name: 'takerAssetData',
    type: 'bytes'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'senderAddress',
    type: 'address'
  }, {
    indexed: true,
    internalType: 'bytes32',
    name: 'orderHash',
    type: 'bytes32'
  }],
  name: 'Cancel',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: 'address',
    name: 'makerAddress',
    type: 'address'
  }, {
    indexed: true,
    internalType: 'address',
    name: 'orderSenderAddress',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'orderEpoch',
    type: 'uint256'
  }],
  name: 'CancelUpTo',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: 'address',
    name: 'makerAddress',
    type: 'address'
  }, {
    indexed: true,
    internalType: 'address',
    name: 'feeRecipientAddress',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'bytes',
    name: 'makerAssetData',
    type: 'bytes'
  }, {
    indexed: false,
    internalType: 'bytes',
    name: 'takerAssetData',
    type: 'bytes'
  }, {
    indexed: false,
    internalType: 'bytes',
    name: 'makerFeeAssetData',
    type: 'bytes'
  }, {
    indexed: false,
    internalType: 'bytes',
    name: 'takerFeeAssetData',
    type: 'bytes'
  }, {
    indexed: true,
    internalType: 'bytes32',
    name: 'orderHash',
    type: 'bytes32'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'takerAddress',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'senderAddress',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'makerAssetFilledAmount',
    type: 'uint256'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'takerAssetFilledAmount',
    type: 'uint256'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'makerFeePaid',
    type: 'uint256'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'takerFeePaid',
    type: 'uint256'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'protocolFeePaid',
    type: 'uint256'
  }],
  name: 'Fill',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: 'address',
    name: 'previousOwner',
    type: 'address'
  }, {
    indexed: true,
    internalType: 'address',
    name: 'newOwner',
    type: 'address'
  }],
  name: 'OwnershipTransferred',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'address',
    name: 'oldProtocolFeeCollector',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'updatedProtocolFeeCollector',
    type: 'address'
  }],
  name: 'ProtocolFeeCollectorAddress',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'uint256',
    name: 'oldProtocolFeeMultiplier',
    type: 'uint256'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'updatedProtocolFeeMultiplier',
    type: 'uint256'
  }],
  name: 'ProtocolFeeMultiplier',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: 'address',
    name: 'signerAddress',
    type: 'address'
  }, {
    indexed: true,
    internalType: 'address',
    name: 'validatorAddress',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'bool',
    name: 'isApproved',
    type: 'bool'
  }],
  name: 'SignatureValidatorApproval',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: 'bytes32',
    name: 'transactionHash',
    type: 'bytes32'
  }],
  name: 'TransactionExecution',
  type: 'event'
}, {
  constant: true,
  inputs: [],
  name: 'EIP1271_MAGIC_VALUE',
  outputs: [{
    internalType: 'bytes4',
    name: '',
    type: 'bytes4'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'EIP712_EXCHANGE_DOMAIN_HASH',
  outputs: [{
    internalType: 'bytes32',
    name: '',
    type: 'bytes32'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    internalType: 'address',
    name: '',
    type: 'address'
  }, {
    internalType: 'address',
    name: '',
    type: 'address'
  }],
  name: 'allowedValidators',
  outputs: [{
    internalType: 'bool',
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order[]',
    name: 'orders',
    type: 'tuple[]'
  }],
  name: 'batchCancelOrders',
  outputs: [],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    components: [{
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'gasPrice',
      type: 'uint256'
    }, {
      internalType: 'address',
      name: 'signerAddress',
      type: 'address'
    }, {
      internalType: 'bytes',
      name: 'data',
      type: 'bytes'
    }],
    internalType: 'struct LibZeroExTransaction.ZeroExTransaction[]',
    name: 'transactions',
    type: 'tuple[]'
  }, {
    internalType: 'bytes[]',
    name: 'signatures',
    type: 'bytes[]'
  }],
  name: 'batchExecuteTransactions',
  outputs: [{
    internalType: 'bytes[]',
    name: '',
    type: 'bytes[]'
  }],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order[]',
    name: 'orders',
    type: 'tuple[]'
  }, {
    internalType: 'uint256[]',
    name: 'takerAssetFillAmounts',
    type: 'uint256[]'
  }, {
    internalType: 'bytes[]',
    name: 'signatures',
    type: 'bytes[]'
  }],
  name: 'batchFillOrKillOrders',
  outputs: [{
    components: [{
      internalType: 'uint256',
      name: 'makerAssetFilledAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetFilledAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFeePaid',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFeePaid',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'protocolFeePaid',
      type: 'uint256'
    }],
    internalType: 'struct LibFillResults.FillResults[]',
    name: 'fillResults',
    type: 'tuple[]'
  }],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order[]',
    name: 'orders',
    type: 'tuple[]'
  }, {
    internalType: 'uint256[]',
    name: 'takerAssetFillAmounts',
    type: 'uint256[]'
  }, {
    internalType: 'bytes[]',
    name: 'signatures',
    type: 'bytes[]'
  }],
  name: 'batchFillOrders',
  outputs: [{
    components: [{
      internalType: 'uint256',
      name: 'makerAssetFilledAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetFilledAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFeePaid',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFeePaid',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'protocolFeePaid',
      type: 'uint256'
    }],
    internalType: 'struct LibFillResults.FillResults[]',
    name: 'fillResults',
    type: 'tuple[]'
  }],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order[]',
    name: 'orders',
    type: 'tuple[]'
  }, {
    internalType: 'uint256[]',
    name: 'takerAssetFillAmounts',
    type: 'uint256[]'
  }, {
    internalType: 'bytes[]',
    name: 'signatures',
    type: 'bytes[]'
  }],
  name: 'batchFillOrdersNoThrow',
  outputs: [{
    components: [{
      internalType: 'uint256',
      name: 'makerAssetFilledAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetFilledAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFeePaid',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFeePaid',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'protocolFeePaid',
      type: 'uint256'
    }],
    internalType: 'struct LibFillResults.FillResults[]',
    name: 'fillResults',
    type: 'tuple[]'
  }],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order[]',
    name: 'leftOrders',
    type: 'tuple[]'
  }, {
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order[]',
    name: 'rightOrders',
    type: 'tuple[]'
  }, {
    internalType: 'bytes[]',
    name: 'leftSignatures',
    type: 'bytes[]'
  }, {
    internalType: 'bytes[]',
    name: 'rightSignatures',
    type: 'bytes[]'
  }],
  name: 'batchMatchOrders',
  outputs: [{
    components: [{
      components: [{
        internalType: 'uint256',
        name: 'makerAssetFilledAmount',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'takerAssetFilledAmount',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'makerFeePaid',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'takerFeePaid',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'protocolFeePaid',
        type: 'uint256'
      }],
      internalType: 'struct LibFillResults.FillResults[]',
      name: 'left',
      type: 'tuple[]'
    }, {
      components: [{
        internalType: 'uint256',
        name: 'makerAssetFilledAmount',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'takerAssetFilledAmount',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'makerFeePaid',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'takerFeePaid',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'protocolFeePaid',
        type: 'uint256'
      }],
      internalType: 'struct LibFillResults.FillResults[]',
      name: 'right',
      type: 'tuple[]'
    }, {
      internalType: 'uint256',
      name: 'profitInLeftMakerAsset',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'profitInRightMakerAsset',
      type: 'uint256'
    }],
    internalType: 'struct LibFillResults.BatchMatchedFillResults',
    name: 'batchMatchedFillResults',
    type: 'tuple'
  }],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order[]',
    name: 'leftOrders',
    type: 'tuple[]'
  }, {
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order[]',
    name: 'rightOrders',
    type: 'tuple[]'
  }, {
    internalType: 'bytes[]',
    name: 'leftSignatures',
    type: 'bytes[]'
  }, {
    internalType: 'bytes[]',
    name: 'rightSignatures',
    type: 'bytes[]'
  }],
  name: 'batchMatchOrdersWithMaximalFill',
  outputs: [{
    components: [{
      components: [{
        internalType: 'uint256',
        name: 'makerAssetFilledAmount',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'takerAssetFilledAmount',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'makerFeePaid',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'takerFeePaid',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'protocolFeePaid',
        type: 'uint256'
      }],
      internalType: 'struct LibFillResults.FillResults[]',
      name: 'left',
      type: 'tuple[]'
    }, {
      components: [{
        internalType: 'uint256',
        name: 'makerAssetFilledAmount',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'takerAssetFilledAmount',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'makerFeePaid',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'takerFeePaid',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'protocolFeePaid',
        type: 'uint256'
      }],
      internalType: 'struct LibFillResults.FillResults[]',
      name: 'right',
      type: 'tuple[]'
    }, {
      internalType: 'uint256',
      name: 'profitInLeftMakerAsset',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'profitInRightMakerAsset',
      type: 'uint256'
    }],
    internalType: 'struct LibFillResults.BatchMatchedFillResults',
    name: 'batchMatchedFillResults',
    type: 'tuple'
  }],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order',
    name: 'order',
    type: 'tuple'
  }],
  name: 'cancelOrder',
  outputs: [],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    internalType: 'uint256',
    name: 'targetOrderEpoch',
    type: 'uint256'
  }],
  name: 'cancelOrdersUpTo',
  outputs: [],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    internalType: 'bytes32',
    name: '',
    type: 'bytes32'
  }],
  name: 'cancelled',
  outputs: [{
    internalType: 'bool',
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'currentContextAddress',
  outputs: [{
    internalType: 'address',
    name: '',
    type: 'address'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [],
  name: 'detachProtocolFeeCollector',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    components: [{
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'gasPrice',
      type: 'uint256'
    }, {
      internalType: 'address',
      name: 'signerAddress',
      type: 'address'
    }, {
      internalType: 'bytes',
      name: 'data',
      type: 'bytes'
    }],
    internalType: 'struct LibZeroExTransaction.ZeroExTransaction',
    name: 'transaction',
    type: 'tuple'
  }, {
    internalType: 'bytes',
    name: 'signature',
    type: 'bytes'
  }],
  name: 'executeTransaction',
  outputs: [{
    internalType: 'bytes',
    name: '',
    type: 'bytes'
  }],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order',
    name: 'order',
    type: 'tuple'
  }, {
    internalType: 'uint256',
    name: 'takerAssetFillAmount',
    type: 'uint256'
  }, {
    internalType: 'bytes',
    name: 'signature',
    type: 'bytes'
  }],
  name: 'fillOrKillOrder',
  outputs: [{
    components: [{
      internalType: 'uint256',
      name: 'makerAssetFilledAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetFilledAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFeePaid',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFeePaid',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'protocolFeePaid',
      type: 'uint256'
    }],
    internalType: 'struct LibFillResults.FillResults',
    name: 'fillResults',
    type: 'tuple'
  }],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order',
    name: 'order',
    type: 'tuple'
  }, {
    internalType: 'uint256',
    name: 'takerAssetFillAmount',
    type: 'uint256'
  }, {
    internalType: 'bytes',
    name: 'signature',
    type: 'bytes'
  }],
  name: 'fillOrder',
  outputs: [{
    components: [{
      internalType: 'uint256',
      name: 'makerAssetFilledAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetFilledAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFeePaid',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFeePaid',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'protocolFeePaid',
      type: 'uint256'
    }],
    internalType: 'struct LibFillResults.FillResults',
    name: 'fillResults',
    type: 'tuple'
  }],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    internalType: 'bytes32',
    name: '',
    type: 'bytes32'
  }],
  name: 'filled',
  outputs: [{
    internalType: 'uint256',
    name: '',
    type: 'uint256'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    internalType: 'bytes4',
    name: 'assetProxyId',
    type: 'bytes4'
  }],
  name: 'getAssetProxy',
  outputs: [{
    internalType: 'address',
    name: '',
    type: 'address'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order',
    name: 'order',
    type: 'tuple'
  }],
  name: 'getOrderInfo',
  outputs: [{
    components: [{
      internalType: 'uint8',
      name: 'orderStatus',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'orderHash',
      type: 'bytes32'
    }, {
      internalType: 'uint256',
      name: 'orderTakerAssetFilledAmount',
      type: 'uint256'
    }],
    internalType: 'struct LibOrder.OrderInfo',
    name: 'orderInfo',
    type: 'tuple'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    internalType: 'bytes32',
    name: 'hash',
    type: 'bytes32'
  }, {
    internalType: 'address',
    name: 'signerAddress',
    type: 'address'
  }, {
    internalType: 'bytes',
    name: 'signature',
    type: 'bytes'
  }],
  name: 'isValidHashSignature',
  outputs: [{
    internalType: 'bool',
    name: 'isValid',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order',
    name: 'order',
    type: 'tuple'
  }, {
    internalType: 'bytes',
    name: 'signature',
    type: 'bytes'
  }],
  name: 'isValidOrderSignature',
  outputs: [{
    internalType: 'bool',
    name: 'isValid',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    components: [{
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'gasPrice',
      type: 'uint256'
    }, {
      internalType: 'address',
      name: 'signerAddress',
      type: 'address'
    }, {
      internalType: 'bytes',
      name: 'data',
      type: 'bytes'
    }],
    internalType: 'struct LibZeroExTransaction.ZeroExTransaction',
    name: 'transaction',
    type: 'tuple'
  }, {
    internalType: 'bytes',
    name: 'signature',
    type: 'bytes'
  }],
  name: 'isValidTransactionSignature',
  outputs: [{
    internalType: 'bool',
    name: 'isValid',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order[]',
    name: 'orders',
    type: 'tuple[]'
  }, {
    internalType: 'uint256',
    name: 'makerAssetFillAmount',
    type: 'uint256'
  }, {
    internalType: 'bytes[]',
    name: 'signatures',
    type: 'bytes[]'
  }],
  name: 'marketBuyOrdersFillOrKill',
  outputs: [{
    components: [{
      internalType: 'uint256',
      name: 'makerAssetFilledAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetFilledAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFeePaid',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFeePaid',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'protocolFeePaid',
      type: 'uint256'
    }],
    internalType: 'struct LibFillResults.FillResults',
    name: 'fillResults',
    type: 'tuple'
  }],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order[]',
    name: 'orders',
    type: 'tuple[]'
  }, {
    internalType: 'uint256',
    name: 'makerAssetFillAmount',
    type: 'uint256'
  }, {
    internalType: 'bytes[]',
    name: 'signatures',
    type: 'bytes[]'
  }],
  name: 'marketBuyOrdersNoThrow',
  outputs: [{
    components: [{
      internalType: 'uint256',
      name: 'makerAssetFilledAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetFilledAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFeePaid',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFeePaid',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'protocolFeePaid',
      type: 'uint256'
    }],
    internalType: 'struct LibFillResults.FillResults',
    name: 'fillResults',
    type: 'tuple'
  }],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order[]',
    name: 'orders',
    type: 'tuple[]'
  }, {
    internalType: 'uint256',
    name: 'takerAssetFillAmount',
    type: 'uint256'
  }, {
    internalType: 'bytes[]',
    name: 'signatures',
    type: 'bytes[]'
  }],
  name: 'marketSellOrdersFillOrKill',
  outputs: [{
    components: [{
      internalType: 'uint256',
      name: 'makerAssetFilledAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetFilledAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFeePaid',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFeePaid',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'protocolFeePaid',
      type: 'uint256'
    }],
    internalType: 'struct LibFillResults.FillResults',
    name: 'fillResults',
    type: 'tuple'
  }],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order[]',
    name: 'orders',
    type: 'tuple[]'
  }, {
    internalType: 'uint256',
    name: 'takerAssetFillAmount',
    type: 'uint256'
  }, {
    internalType: 'bytes[]',
    name: 'signatures',
    type: 'bytes[]'
  }],
  name: 'marketSellOrdersNoThrow',
  outputs: [{
    components: [{
      internalType: 'uint256',
      name: 'makerAssetFilledAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetFilledAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFeePaid',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFeePaid',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'protocolFeePaid',
      type: 'uint256'
    }],
    internalType: 'struct LibFillResults.FillResults',
    name: 'fillResults',
    type: 'tuple'
  }],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order',
    name: 'leftOrder',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order',
    name: 'rightOrder',
    type: 'tuple'
  }, {
    internalType: 'bytes',
    name: 'leftSignature',
    type: 'bytes'
  }, {
    internalType: 'bytes',
    name: 'rightSignature',
    type: 'bytes'
  }],
  name: 'matchOrders',
  outputs: [{
    components: [{
      components: [{
        internalType: 'uint256',
        name: 'makerAssetFilledAmount',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'takerAssetFilledAmount',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'makerFeePaid',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'takerFeePaid',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'protocolFeePaid',
        type: 'uint256'
      }],
      internalType: 'struct LibFillResults.FillResults',
      name: 'left',
      type: 'tuple'
    }, {
      components: [{
        internalType: 'uint256',
        name: 'makerAssetFilledAmount',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'takerAssetFilledAmount',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'makerFeePaid',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'takerFeePaid',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'protocolFeePaid',
        type: 'uint256'
      }],
      internalType: 'struct LibFillResults.FillResults',
      name: 'right',
      type: 'tuple'
    }, {
      internalType: 'uint256',
      name: 'profitInLeftMakerAsset',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'profitInRightMakerAsset',
      type: 'uint256'
    }],
    internalType: 'struct LibFillResults.MatchedFillResults',
    name: 'matchedFillResults',
    type: 'tuple'
  }],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order',
    name: 'leftOrder',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order',
    name: 'rightOrder',
    type: 'tuple'
  }, {
    internalType: 'bytes',
    name: 'leftSignature',
    type: 'bytes'
  }, {
    internalType: 'bytes',
    name: 'rightSignature',
    type: 'bytes'
  }],
  name: 'matchOrdersWithMaximalFill',
  outputs: [{
    components: [{
      components: [{
        internalType: 'uint256',
        name: 'makerAssetFilledAmount',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'takerAssetFilledAmount',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'makerFeePaid',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'takerFeePaid',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'protocolFeePaid',
        type: 'uint256'
      }],
      internalType: 'struct LibFillResults.FillResults',
      name: 'left',
      type: 'tuple'
    }, {
      components: [{
        internalType: 'uint256',
        name: 'makerAssetFilledAmount',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'takerAssetFilledAmount',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'makerFeePaid',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'takerFeePaid',
        type: 'uint256'
      }, {
        internalType: 'uint256',
        name: 'protocolFeePaid',
        type: 'uint256'
      }],
      internalType: 'struct LibFillResults.FillResults',
      name: 'right',
      type: 'tuple'
    }, {
      internalType: 'uint256',
      name: 'profitInLeftMakerAsset',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'profitInRightMakerAsset',
      type: 'uint256'
    }],
    internalType: 'struct LibFillResults.MatchedFillResults',
    name: 'matchedFillResults',
    type: 'tuple'
  }],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    internalType: 'address',
    name: '',
    type: 'address'
  }, {
    internalType: 'address',
    name: '',
    type: 'address'
  }],
  name: 'orderEpoch',
  outputs: [{
    internalType: 'uint256',
    name: '',
    type: 'uint256'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'owner',
  outputs: [{
    internalType: 'address',
    name: '',
    type: 'address'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    internalType: 'bytes32',
    name: 'hash',
    type: 'bytes32'
  }],
  name: 'preSign',
  outputs: [],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    internalType: 'bytes32',
    name: '',
    type: 'bytes32'
  }, {
    internalType: 'address',
    name: '',
    type: 'address'
  }],
  name: 'preSigned',
  outputs: [{
    internalType: 'bool',
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'protocolFeeCollector',
  outputs: [{
    internalType: 'address',
    name: '',
    type: 'address'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'protocolFeeMultiplier',
  outputs: [{
    internalType: 'uint256',
    name: '',
    type: 'uint256'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    internalType: 'address',
    name: 'assetProxy',
    type: 'address'
  }],
  name: 'registerAssetProxy',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    internalType: 'address',
    name: 'updatedProtocolFeeCollector',
    type: 'address'
  }],
  name: 'setProtocolFeeCollectorAddress',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    internalType: 'uint256',
    name: 'updatedProtocolFeeMultiplier',
    type: 'uint256'
  }],
  name: 'setProtocolFeeMultiplier',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    internalType: 'address',
    name: 'validatorAddress',
    type: 'address'
  }, {
    internalType: 'bool',
    name: 'approval',
    type: 'bool'
  }],
  name: 'setSignatureValidatorApproval',
  outputs: [],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    internalType: 'bytes[]',
    name: 'assetData',
    type: 'bytes[]'
  }, {
    internalType: 'address[]',
    name: 'fromAddresses',
    type: 'address[]'
  }, {
    internalType: 'address[]',
    name: 'toAddresses',
    type: 'address[]'
  }, {
    internalType: 'uint256[]',
    name: 'amounts',
    type: 'uint256[]'
  }],
  name: 'simulateDispatchTransferFromCalls',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    internalType: 'bytes32',
    name: '',
    type: 'bytes32'
  }],
  name: 'transactionsExecuted',
  outputs: [{
    internalType: 'bool',
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    internalType: 'address',
    name: 'newOwner',
    type: 'address'
  }],
  name: 'transferOwnership',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}];
var ExchangeContract__factory = /*#__PURE__*/function () {
  function ExchangeContract__factory() {}

  ExchangeContract__factory.createInterface = function createInterface() {
    return new utils.Interface(_abi);
  };

  ExchangeContract__factory.connect = function connect(address, signerOrProvider) {
    return new Contract(address, _abi, signerOrProvider);
  };

  return ExchangeContract__factory;
}();
ExchangeContract__factory.abi = _abi;

/* Autogenerated file. Do not edit manually. */
var _abi$1 = [{
  inputs: [{
    internalType: 'address',
    name: '_exchange',
    type: 'address'
  }, {
    internalType: 'address',
    name: '_exchangeV2',
    type: 'address'
  }, {
    internalType: 'address',
    name: '_weth',
    type: 'address'
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'constructor'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: 'address',
    name: 'previousOwner',
    type: 'address'
  }, {
    indexed: true,
    internalType: 'address',
    name: 'newOwner',
    type: 'address'
  }],
  name: 'OwnershipTransferred',
  type: 'event'
}, {
  payable: true,
  stateMutability: 'payable',
  type: 'fallback'
}, {
  constant: true,
  inputs: [],
  name: 'ERC1155_BATCH_RECEIVED',
  outputs: [{
    internalType: 'bytes4',
    name: '',
    type: 'bytes4'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'ERC1155_RECEIVED',
  outputs: [{
    internalType: 'bytes4',
    name: '',
    type: 'bytes4'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'EXCHANGE_V2_ORDER_ID',
  outputs: [{
    internalType: 'bytes4',
    name: '',
    type: 'bytes4'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    internalType: 'bytes',
    name: 'assetData',
    type: 'bytes'
  }],
  name: 'approveMakerAssetProxy',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order[]',
    name: 'orders',
    type: 'tuple[]'
  }, {
    internalType: 'uint256',
    name: 'makerAssetBuyAmount',
    type: 'uint256'
  }, {
    internalType: 'bytes[]',
    name: 'signatures',
    type: 'bytes[]'
  }, {
    internalType: 'uint256[]',
    name: 'ethFeeAmounts',
    type: 'uint256[]'
  }, {
    internalType: 'address payable[]',
    name: 'feeRecipients',
    type: 'address[]'
  }],
  name: 'marketBuyOrdersWithEth',
  outputs: [{
    internalType: 'uint256',
    name: 'wethSpentAmount',
    type: 'uint256'
  }, {
    internalType: 'uint256',
    name: 'makerAssetAcquiredAmount',
    type: 'uint256'
  }],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order[]',
    name: 'orders',
    type: 'tuple[]'
  }, {
    internalType: 'uint256',
    name: 'ethSellAmount',
    type: 'uint256'
  }, {
    internalType: 'bytes[]',
    name: 'signatures',
    type: 'bytes[]'
  }, {
    internalType: 'uint256[]',
    name: 'ethFeeAmounts',
    type: 'uint256[]'
  }, {
    internalType: 'address payable[]',
    name: 'feeRecipients',
    type: 'address[]'
  }],
  name: 'marketSellAmountWithEth',
  outputs: [{
    internalType: 'uint256',
    name: 'wethSpentAmount',
    type: 'uint256'
  }, {
    internalType: 'uint256',
    name: 'makerAssetAcquiredAmount',
    type: 'uint256'
  }],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct LibOrder.Order[]',
    name: 'orders',
    type: 'tuple[]'
  }, {
    internalType: 'bytes[]',
    name: 'signatures',
    type: 'bytes[]'
  }, {
    internalType: 'uint256[]',
    name: 'ethFeeAmounts',
    type: 'uint256[]'
  }, {
    internalType: 'address payable[]',
    name: 'feeRecipients',
    type: 'address[]'
  }],
  name: 'marketSellOrdersWithEth',
  outputs: [{
    internalType: 'uint256',
    name: 'wethSpentAmount',
    type: 'uint256'
  }, {
    internalType: 'uint256',
    name: 'makerAssetAcquiredAmount',
    type: 'uint256'
  }],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    internalType: 'address',
    name: 'operator',
    type: 'address'
  }, {
    internalType: 'address',
    name: 'from',
    type: 'address'
  }, {
    internalType: 'uint256[]',
    name: 'ids',
    type: 'uint256[]'
  }, {
    internalType: 'uint256[]',
    name: 'values',
    type: 'uint256[]'
  }, {
    internalType: 'bytes',
    name: 'data',
    type: 'bytes'
  }],
  name: 'onERC1155BatchReceived',
  outputs: [{
    internalType: 'bytes4',
    name: '',
    type: 'bytes4'
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    internalType: 'address',
    name: 'operator',
    type: 'address'
  }, {
    internalType: 'address',
    name: 'from',
    type: 'address'
  }, {
    internalType: 'uint256',
    name: 'id',
    type: 'uint256'
  }, {
    internalType: 'uint256',
    name: 'value',
    type: 'uint256'
  }, {
    internalType: 'bytes',
    name: 'data',
    type: 'bytes'
  }],
  name: 'onERC1155Received',
  outputs: [{
    internalType: 'bytes4',
    name: '',
    type: 'bytes4'
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'owner',
  outputs: [{
    internalType: 'address',
    name: '',
    type: 'address'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    internalType: 'address',
    name: 'newOwner',
    type: 'address'
  }],
  name: 'transferOwnership',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    internalType: 'bytes',
    name: 'assetData',
    type: 'bytes'
  }, {
    internalType: 'uint256',
    name: 'amount',
    type: 'uint256'
  }],
  name: 'withdrawAsset',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}];
var Forwarder__factory = /*#__PURE__*/function () {
  function Forwarder__factory() {}

  Forwarder__factory.createInterface = function createInterface() {
    return new utils.Interface(_abi$1);
  };

  Forwarder__factory.connect = function connect(address, signerOrProvider) {
    return new Contract(address, _abi$1, signerOrProvider);
  };

  return Forwarder__factory;
}();
Forwarder__factory.abi = _abi$1;

/* Autogenerated file. Do not edit manually. */
var _abi$2 = [{
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'address',
    name: 'maker',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'nonce',
    type: 'uint256'
  }],
  name: 'ERC1155OrderCancelled',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'enum LibNFTOrder.TradeDirection',
    name: 'direction',
    type: 'uint8'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'maker',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'taker',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'nonce',
    type: 'uint256'
  }, {
    indexed: false,
    internalType: 'contract IERC20TokenV06',
    name: 'erc20Token',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'erc20FillAmount',
    type: 'uint256'
  }, {
    indexed: false,
    internalType: 'contract IERC1155Token',
    name: 'erc1155Token',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'erc1155TokenId',
    type: 'uint256'
  }, {
    indexed: false,
    internalType: 'uint128',
    name: 'erc1155FillAmount',
    type: 'uint128'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'matcher',
    type: 'address'
  }],
  name: 'ERC1155OrderFilled',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'enum LibNFTOrder.TradeDirection',
    name: 'direction',
    type: 'uint8'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'maker',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'taker',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'expiry',
    type: 'uint256'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'nonce',
    type: 'uint256'
  }, {
    indexed: false,
    internalType: 'contract IERC20TokenV06',
    name: 'erc20Token',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'erc20TokenAmount',
    type: 'uint256'
  }, {
    components: [{
      internalType: 'address',
      name: 'recipient',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'amount',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'feeData',
      type: 'bytes'
    }],
    indexed: false,
    internalType: 'struct LibNFTOrder.Fee[]',
    name: 'fees',
    type: 'tuple[]'
  }, {
    indexed: false,
    internalType: 'contract IERC1155Token',
    name: 'erc1155Token',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'erc1155TokenId',
    type: 'uint256'
  }, {
    components: [{
      internalType: 'contract IPropertyValidator',
      name: 'propertyValidator',
      type: 'address'
    }, {
      internalType: 'bytes',
      name: 'propertyData',
      type: 'bytes'
    }],
    indexed: false,
    internalType: 'struct LibNFTOrder.Property[]',
    name: 'erc1155TokenProperties',
    type: 'tuple[]'
  }, {
    indexed: false,
    internalType: 'uint128',
    name: 'erc1155TokenAmount',
    type: 'uint128'
  }],
  name: 'ERC1155OrderPreSigned',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'address',
    name: 'maker',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'nonce',
    type: 'uint256'
  }],
  name: 'ERC721OrderCancelled',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'enum LibNFTOrder.TradeDirection',
    name: 'direction',
    type: 'uint8'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'maker',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'taker',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'nonce',
    type: 'uint256'
  }, {
    indexed: false,
    internalType: 'contract IERC20TokenV06',
    name: 'erc20Token',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'erc20TokenAmount',
    type: 'uint256'
  }, {
    indexed: false,
    internalType: 'contract IERC721Token',
    name: 'erc721Token',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'erc721TokenId',
    type: 'uint256'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'matcher',
    type: 'address'
  }],
  name: 'ERC721OrderFilled',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'enum LibNFTOrder.TradeDirection',
    name: 'direction',
    type: 'uint8'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'maker',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'taker',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'expiry',
    type: 'uint256'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'nonce',
    type: 'uint256'
  }, {
    indexed: false,
    internalType: 'contract IERC20TokenV06',
    name: 'erc20Token',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'erc20TokenAmount',
    type: 'uint256'
  }, {
    components: [{
      internalType: 'address',
      name: 'recipient',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'amount',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'feeData',
      type: 'bytes'
    }],
    indexed: false,
    internalType: 'struct LibNFTOrder.Fee[]',
    name: 'fees',
    type: 'tuple[]'
  }, {
    indexed: false,
    internalType: 'contract IERC721Token',
    name: 'erc721Token',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'erc721TokenId',
    type: 'uint256'
  }, {
    components: [{
      internalType: 'contract IPropertyValidator',
      name: 'propertyValidator',
      type: 'address'
    }, {
      internalType: 'bytes',
      name: 'propertyData',
      type: 'bytes'
    }],
    indexed: false,
    internalType: 'struct LibNFTOrder.Property[]',
    name: 'erc721TokenProperties',
    type: 'tuple[]'
  }],
  name: 'ERC721OrderPreSigned',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'bytes32',
    name: 'orderHash',
    type: 'bytes32'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'maker',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'taker',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'feeRecipient',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'makerToken',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'takerToken',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint128',
    name: 'takerTokenFilledAmount',
    type: 'uint128'
  }, {
    indexed: false,
    internalType: 'uint128',
    name: 'makerTokenFilledAmount',
    type: 'uint128'
  }, {
    indexed: false,
    internalType: 'uint128',
    name: 'takerTokenFeeFilledAmount',
    type: 'uint128'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'protocolFeePaid',
    type: 'uint256'
  }, {
    indexed: false,
    internalType: 'bytes32',
    name: 'pool',
    type: 'bytes32'
  }],
  name: 'LimitOrderFilled',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'contract IERC20TokenV06',
    name: 'inputToken',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'contract IERC20TokenV06',
    name: 'outputToken',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'inputTokenAmount',
    type: 'uint256'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'outputTokenAmount',
    type: 'uint256'
  }, {
    indexed: false,
    internalType: 'contract ILiquidityProvider',
    name: 'provider',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'recipient',
    type: 'address'
  }],
  name: 'LiquidityProviderSwap',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'bytes32',
    name: 'hash',
    type: 'bytes32'
  }, {
    indexed: true,
    internalType: 'bytes4',
    name: 'selector',
    type: 'bytes4'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'signer',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'sender',
    type: 'address'
  }],
  name: 'MetaTransactionExecuted',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'address',
    name: 'caller',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'migrator',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'newOwner',
    type: 'address'
  }],
  name: 'Migrated',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'bytes32',
    name: 'orderHash',
    type: 'bytes32'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'maker',
    type: 'address'
  }],
  name: 'OrderCancelled',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'address',
    name: 'maker',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'signer',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'bool',
    name: 'allowed',
    type: 'bool'
  }],
  name: 'OrderSignerRegistered',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'bytes32',
    name: 'orderHash',
    type: 'bytes32'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'maker',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'taker',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'makerToken',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'takerToken',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint128',
    name: 'makerTokenFilledAmount',
    type: 'uint128'
  }, {
    indexed: false,
    internalType: 'uint128',
    name: 'takerTokenFilledAmount',
    type: 'uint128'
  }],
  name: 'OtcOrderFilled',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: 'address',
    name: 'previousOwner',
    type: 'address'
  }, {
    indexed: true,
    internalType: 'address',
    name: 'newOwner',
    type: 'address'
  }],
  name: 'OwnershipTransferred',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'address',
    name: 'maker',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'makerToken',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'takerToken',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'minValidSalt',
    type: 'uint256'
  }],
  name: 'PairCancelledLimitOrders',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'address',
    name: 'maker',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'makerToken',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'takerToken',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'minValidSalt',
    type: 'uint256'
  }],
  name: 'PairCancelledRfqOrders',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: 'bytes4',
    name: 'selector',
    type: 'bytes4'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'oldImpl',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'newImpl',
    type: 'address'
  }],
  name: 'ProxyFunctionUpdated',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'address',
    name: 'quoteSigner',
    type: 'address'
  }],
  name: 'QuoteSignerUpdated',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'bytes32',
    name: 'orderHash',
    type: 'bytes32'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'maker',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'taker',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'makerToken',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'takerToken',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint128',
    name: 'takerTokenFilledAmount',
    type: 'uint128'
  }, {
    indexed: false,
    internalType: 'uint128',
    name: 'makerTokenFilledAmount',
    type: 'uint128'
  }, {
    indexed: false,
    internalType: 'bytes32',
    name: 'pool',
    type: 'bytes32'
  }],
  name: 'RfqOrderFilled',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'address',
    name: 'origin',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address[]',
    name: 'addrs',
    type: 'address[]'
  }, {
    indexed: false,
    internalType: 'bool',
    name: 'allowed',
    type: 'bool'
  }],
  name: 'RfqOrderOriginsAllowed',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: 'address',
    name: 'taker',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'inputToken',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'address',
    name: 'outputToken',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'inputTokenAmount',
    type: 'uint256'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: 'outputTokenAmount',
    type: 'uint256'
  }],
  name: 'TransformedERC20',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: 'address',
    name: 'transformerDeployer',
    type: 'address'
  }],
  name: 'TransformerDeployerUpdated',
  type: 'event'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerTokenFeeAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'sender',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipient',
      type: 'address'
    }, {
      internalType: 'bytes32',
      name: 'pool',
      type: 'bytes32'
    }, {
      internalType: 'uint64',
      name: 'expiry',
      type: 'uint64'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.LimitOrder',
    name: 'order',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'signature',
    type: 'tuple'
  }, {
    internalType: 'uint128',
    name: 'takerTokenFillAmount',
    type: 'uint128'
  }, {
    internalType: 'address',
    name: 'taker',
    type: 'address'
  }, {
    internalType: 'address',
    name: 'sender',
    type: 'address'
  }],
  name: '_fillLimitOrder',
  outputs: [{
    internalType: 'uint128',
    name: 'takerTokenFilledAmount',
    type: 'uint128'
  }, {
    internalType: 'uint128',
    name: 'makerTokenFilledAmount',
    type: 'uint128'
  }],
  stateMutability: 'payable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'txOrigin',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiryAndNonce',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.OtcOrder',
    name: 'order',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'makerSignature',
    type: 'tuple'
  }, {
    internalType: 'uint128',
    name: 'takerTokenFillAmount',
    type: 'uint128'
  }, {
    internalType: 'address',
    name: 'taker',
    type: 'address'
  }, {
    internalType: 'bool',
    name: 'useSelfBalance',
    type: 'bool'
  }, {
    internalType: 'address',
    name: 'recipient',
    type: 'address'
  }],
  name: '_fillOtcOrder',
  outputs: [{
    internalType: 'uint128',
    name: 'takerTokenFilledAmount',
    type: 'uint128'
  }, {
    internalType: 'uint128',
    name: 'makerTokenFilledAmount',
    type: 'uint128'
  }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'txOrigin',
      type: 'address'
    }, {
      internalType: 'bytes32',
      name: 'pool',
      type: 'bytes32'
    }, {
      internalType: 'uint64',
      name: 'expiry',
      type: 'uint64'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.RfqOrder',
    name: 'order',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'signature',
    type: 'tuple'
  }, {
    internalType: 'uint128',
    name: 'takerTokenFillAmount',
    type: 'uint128'
  }, {
    internalType: 'address',
    name: 'taker',
    type: 'address'
  }, {
    internalType: 'bool',
    name: 'useSelfBalance',
    type: 'bool'
  }, {
    internalType: 'address',
    name: 'recipient',
    type: 'address'
  }],
  name: '_fillRfqOrder',
  outputs: [{
    internalType: 'uint128',
    name: 'takerTokenFilledAmount',
    type: 'uint128'
  }, {
    internalType: 'uint128',
    name: 'makerTokenFilledAmount',
    type: 'uint128'
  }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'bytes',
    name: 'encodedPath',
    type: 'bytes'
  }, {
    internalType: 'uint256',
    name: 'sellAmount',
    type: 'uint256'
  }, {
    internalType: 'uint256',
    name: 'minBuyAmount',
    type: 'uint256'
  }, {
    internalType: 'address',
    name: 'recipient',
    type: 'address'
  }],
  name: '_sellHeldTokenForTokenToUniswapV3',
  outputs: [{
    internalType: 'uint256',
    name: 'buyAmount',
    type: 'uint256'
  }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'address payable',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'inputToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'outputToken',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'inputTokenAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'minOutputTokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'uint32',
        name: 'deploymentNonce',
        type: 'uint32'
      }, {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      }],
      internalType: 'struct ITransformERC20Feature.Transformation[]',
      name: 'transformations',
      type: 'tuple[]'
    }, {
      internalType: 'bool',
      name: 'useSelfBalance',
      type: 'bool'
    }, {
      internalType: 'address payable',
      name: 'recipient',
      type: 'address'
    }],
    internalType: 'struct ITransformERC20Feature.TransformERC20Args',
    name: 'args',
    type: 'tuple'
  }],
  name: '_transformERC20',
  outputs: [{
    internalType: 'uint256',
    name: 'outputTokenAmount',
    type: 'uint256'
  }],
  stateMutability: 'payable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC1155Token',
      name: 'erc1155Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc1155TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc1155TokenProperties',
      type: 'tuple[]'
    }, {
      internalType: 'uint128',
      name: 'erc1155TokenAmount',
      type: 'uint128'
    }],
    internalType: 'struct LibNFTOrder.ERC1155Order[]',
    name: 'sellOrders',
    type: 'tuple[]'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature[]',
    name: 'signatures',
    type: 'tuple[]'
  }, {
    internalType: 'uint128[]',
    name: 'erc1155TokenAmounts',
    type: 'uint128[]'
  }, {
    internalType: 'bytes[]',
    name: 'callbackData',
    type: 'bytes[]'
  }, {
    internalType: 'bool',
    name: 'revertIfIncomplete',
    type: 'bool'
  }],
  name: 'batchBuyERC1155s',
  outputs: [{
    internalType: 'bool[]',
    name: 'successes',
    type: 'bool[]'
  }],
  stateMutability: 'payable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC721Token',
      name: 'erc721Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc721TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc721TokenProperties',
      type: 'tuple[]'
    }],
    internalType: 'struct LibNFTOrder.ERC721Order[]',
    name: 'sellOrders',
    type: 'tuple[]'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature[]',
    name: 'signatures',
    type: 'tuple[]'
  }, {
    internalType: 'bytes[]',
    name: 'callbackData',
    type: 'bytes[]'
  }, {
    internalType: 'bool',
    name: 'revertIfIncomplete',
    type: 'bool'
  }],
  name: 'batchBuyERC721s',
  outputs: [{
    internalType: 'bool[]',
    name: 'successes',
    type: 'bool[]'
  }],
  stateMutability: 'payable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'uint256[]',
    name: 'orderNonces',
    type: 'uint256[]'
  }],
  name: 'batchCancelERC1155Orders',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'uint256[]',
    name: 'orderNonces',
    type: 'uint256[]'
  }],
  name: 'batchCancelERC721Orders',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerTokenFeeAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'sender',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipient',
      type: 'address'
    }, {
      internalType: 'bytes32',
      name: 'pool',
      type: 'bytes32'
    }, {
      internalType: 'uint64',
      name: 'expiry',
      type: 'uint64'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.LimitOrder[]',
    name: 'orders',
    type: 'tuple[]'
  }],
  name: 'batchCancelLimitOrders',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'contract IERC20TokenV06[]',
    name: 'makerTokens',
    type: 'address[]'
  }, {
    internalType: 'contract IERC20TokenV06[]',
    name: 'takerTokens',
    type: 'address[]'
  }, {
    internalType: 'uint256[]',
    name: 'minValidSalts',
    type: 'uint256[]'
  }],
  name: 'batchCancelPairLimitOrders',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address',
    name: 'maker',
    type: 'address'
  }, {
    internalType: 'contract IERC20TokenV06[]',
    name: 'makerTokens',
    type: 'address[]'
  }, {
    internalType: 'contract IERC20TokenV06[]',
    name: 'takerTokens',
    type: 'address[]'
  }, {
    internalType: 'uint256[]',
    name: 'minValidSalts',
    type: 'uint256[]'
  }],
  name: 'batchCancelPairLimitOrdersWithSigner',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'contract IERC20TokenV06[]',
    name: 'makerTokens',
    type: 'address[]'
  }, {
    internalType: 'contract IERC20TokenV06[]',
    name: 'takerTokens',
    type: 'address[]'
  }, {
    internalType: 'uint256[]',
    name: 'minValidSalts',
    type: 'uint256[]'
  }],
  name: 'batchCancelPairRfqOrders',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address',
    name: 'maker',
    type: 'address'
  }, {
    internalType: 'contract IERC20TokenV06[]',
    name: 'makerTokens',
    type: 'address[]'
  }, {
    internalType: 'contract IERC20TokenV06[]',
    name: 'takerTokens',
    type: 'address[]'
  }, {
    internalType: 'uint256[]',
    name: 'minValidSalts',
    type: 'uint256[]'
  }],
  name: 'batchCancelPairRfqOrdersWithSigner',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'txOrigin',
      type: 'address'
    }, {
      internalType: 'bytes32',
      name: 'pool',
      type: 'bytes32'
    }, {
      internalType: 'uint64',
      name: 'expiry',
      type: 'uint64'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.RfqOrder[]',
    name: 'orders',
    type: 'tuple[]'
  }],
  name: 'batchCancelRfqOrders',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'address payable',
      name: 'signer',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'sender',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'minGasPrice',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'maxGasPrice',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'callData',
      type: 'bytes'
    }, {
      internalType: 'uint256',
      name: 'value',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'feeToken',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'feeAmount',
      type: 'uint256'
    }],
    internalType: 'struct IMetaTransactionsFeature.MetaTransactionData[]',
    name: 'mtxs',
    type: 'tuple[]'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature[]',
    name: 'signatures',
    type: 'tuple[]'
  }],
  name: 'batchExecuteMetaTransactions',
  outputs: [{
    internalType: 'bytes[]',
    name: 'returnResults',
    type: 'bytes[]'
  }],
  stateMutability: 'payable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerTokenFeeAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'sender',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipient',
      type: 'address'
    }, {
      internalType: 'bytes32',
      name: 'pool',
      type: 'bytes32'
    }, {
      internalType: 'uint64',
      name: 'expiry',
      type: 'uint64'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.LimitOrder[]',
    name: 'orders',
    type: 'tuple[]'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature[]',
    name: 'signatures',
    type: 'tuple[]'
  }, {
    internalType: 'uint128[]',
    name: 'takerTokenFillAmounts',
    type: 'uint128[]'
  }, {
    internalType: 'bool',
    name: 'revertIfIncomplete',
    type: 'bool'
  }],
  name: 'batchFillLimitOrders',
  outputs: [{
    internalType: 'uint128[]',
    name: 'takerTokenFilledAmounts',
    type: 'uint128[]'
  }, {
    internalType: 'uint128[]',
    name: 'makerTokenFilledAmounts',
    type: 'uint128[]'
  }],
  stateMutability: 'payable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'txOrigin',
      type: 'address'
    }, {
      internalType: 'bytes32',
      name: 'pool',
      type: 'bytes32'
    }, {
      internalType: 'uint64',
      name: 'expiry',
      type: 'uint64'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.RfqOrder[]',
    name: 'orders',
    type: 'tuple[]'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature[]',
    name: 'signatures',
    type: 'tuple[]'
  }, {
    internalType: 'uint128[]',
    name: 'takerTokenFillAmounts',
    type: 'uint128[]'
  }, {
    internalType: 'bool',
    name: 'revertIfIncomplete',
    type: 'bool'
  }],
  name: 'batchFillRfqOrders',
  outputs: [{
    internalType: 'uint128[]',
    name: 'takerTokenFilledAmounts',
    type: 'uint128[]'
  }, {
    internalType: 'uint128[]',
    name: 'makerTokenFilledAmounts',
    type: 'uint128[]'
  }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'txOrigin',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiryAndNonce',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.OtcOrder[]',
    name: 'orders',
    type: 'tuple[]'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature[]',
    name: 'makerSignatures',
    type: 'tuple[]'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature[]',
    name: 'takerSignatures',
    type: 'tuple[]'
  }, {
    internalType: 'bool[]',
    name: 'unwrapWeth',
    type: 'bool[]'
  }],
  name: 'batchFillTakerSignedOtcOrders',
  outputs: [{
    internalType: 'bool[]',
    name: 'successes',
    type: 'bool[]'
  }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerTokenFeeAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'sender',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipient',
      type: 'address'
    }, {
      internalType: 'bytes32',
      name: 'pool',
      type: 'bytes32'
    }, {
      internalType: 'uint64',
      name: 'expiry',
      type: 'uint64'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.LimitOrder[]',
    name: 'orders',
    type: 'tuple[]'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature[]',
    name: 'signatures',
    type: 'tuple[]'
  }],
  name: 'batchGetLimitOrderRelevantStates',
  outputs: [{
    components: [{
      internalType: 'bytes32',
      name: 'orderHash',
      type: 'bytes32'
    }, {
      internalType: 'enum LibNativeOrder.OrderStatus',
      name: 'status',
      type: 'uint8'
    }, {
      internalType: 'uint128',
      name: 'takerTokenFilledAmount',
      type: 'uint128'
    }],
    internalType: 'struct LibNativeOrder.OrderInfo[]',
    name: 'orderInfos',
    type: 'tuple[]'
  }, {
    internalType: 'uint128[]',
    name: 'actualFillableTakerTokenAmounts',
    type: 'uint128[]'
  }, {
    internalType: 'bool[]',
    name: 'isSignatureValids',
    type: 'bool[]'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'txOrigin',
      type: 'address'
    }, {
      internalType: 'bytes32',
      name: 'pool',
      type: 'bytes32'
    }, {
      internalType: 'uint64',
      name: 'expiry',
      type: 'uint64'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.RfqOrder[]',
    name: 'orders',
    type: 'tuple[]'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature[]',
    name: 'signatures',
    type: 'tuple[]'
  }],
  name: 'batchGetRfqOrderRelevantStates',
  outputs: [{
    components: [{
      internalType: 'bytes32',
      name: 'orderHash',
      type: 'bytes32'
    }, {
      internalType: 'enum LibNativeOrder.OrderStatus',
      name: 'status',
      type: 'uint8'
    }, {
      internalType: 'uint128',
      name: 'takerTokenFilledAmount',
      type: 'uint128'
    }],
    internalType: 'struct LibNativeOrder.OrderInfo[]',
    name: 'orderInfos',
    type: 'tuple[]'
  }, {
    internalType: 'uint128[]',
    name: 'actualFillableTakerTokenAmounts',
    type: 'uint128[]'
  }, {
    internalType: 'bool[]',
    name: 'isSignatureValids',
    type: 'bool[]'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC721Token',
      name: 'erc721Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc721TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc721TokenProperties',
      type: 'tuple[]'
    }],
    internalType: 'struct LibNFTOrder.ERC721Order[]',
    name: 'sellOrders',
    type: 'tuple[]'
  }, {
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC721Token',
      name: 'erc721Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc721TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc721TokenProperties',
      type: 'tuple[]'
    }],
    internalType: 'struct LibNFTOrder.ERC721Order[]',
    name: 'buyOrders',
    type: 'tuple[]'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature[]',
    name: 'sellOrderSignatures',
    type: 'tuple[]'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature[]',
    name: 'buyOrderSignatures',
    type: 'tuple[]'
  }],
  name: 'batchMatchERC721Orders',
  outputs: [{
    internalType: 'uint256[]',
    name: 'profits',
    type: 'uint256[]'
  }, {
    internalType: 'bool[]',
    name: 'successes',
    type: 'bool[]'
  }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC1155Token',
      name: 'erc1155Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc1155TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc1155TokenProperties',
      type: 'tuple[]'
    }, {
      internalType: 'uint128',
      name: 'erc1155TokenAmount',
      type: 'uint128'
    }],
    internalType: 'struct LibNFTOrder.ERC1155Order',
    name: 'sellOrder',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'signature',
    type: 'tuple'
  }, {
    internalType: 'uint128',
    name: 'erc1155BuyAmount',
    type: 'uint128'
  }, {
    internalType: 'bytes',
    name: 'callbackData',
    type: 'bytes'
  }],
  name: 'buyERC1155',
  outputs: [],
  stateMutability: 'payable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC721Token',
      name: 'erc721Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc721TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc721TokenProperties',
      type: 'tuple[]'
    }],
    internalType: 'struct LibNFTOrder.ERC721Order',
    name: 'sellOrder',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'signature',
    type: 'tuple'
  }, {
    internalType: 'bytes',
    name: 'callbackData',
    type: 'bytes'
  }],
  name: 'buyERC721',
  outputs: [],
  stateMutability: 'payable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'uint256',
    name: 'orderNonce',
    type: 'uint256'
  }],
  name: 'cancelERC1155Order',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'uint256',
    name: 'orderNonce',
    type: 'uint256'
  }],
  name: 'cancelERC721Order',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerTokenFeeAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'sender',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipient',
      type: 'address'
    }, {
      internalType: 'bytes32',
      name: 'pool',
      type: 'bytes32'
    }, {
      internalType: 'uint64',
      name: 'expiry',
      type: 'uint64'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.LimitOrder',
    name: 'order',
    type: 'tuple'
  }],
  name: 'cancelLimitOrder',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'contract IERC20TokenV06',
    name: 'makerToken',
    type: 'address'
  }, {
    internalType: 'contract IERC20TokenV06',
    name: 'takerToken',
    type: 'address'
  }, {
    internalType: 'uint256',
    name: 'minValidSalt',
    type: 'uint256'
  }],
  name: 'cancelPairLimitOrders',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address',
    name: 'maker',
    type: 'address'
  }, {
    internalType: 'contract IERC20TokenV06',
    name: 'makerToken',
    type: 'address'
  }, {
    internalType: 'contract IERC20TokenV06',
    name: 'takerToken',
    type: 'address'
  }, {
    internalType: 'uint256',
    name: 'minValidSalt',
    type: 'uint256'
  }],
  name: 'cancelPairLimitOrdersWithSigner',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'contract IERC20TokenV06',
    name: 'makerToken',
    type: 'address'
  }, {
    internalType: 'contract IERC20TokenV06',
    name: 'takerToken',
    type: 'address'
  }, {
    internalType: 'uint256',
    name: 'minValidSalt',
    type: 'uint256'
  }],
  name: 'cancelPairRfqOrders',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address',
    name: 'maker',
    type: 'address'
  }, {
    internalType: 'contract IERC20TokenV06',
    name: 'makerToken',
    type: 'address'
  }, {
    internalType: 'contract IERC20TokenV06',
    name: 'takerToken',
    type: 'address'
  }, {
    internalType: 'uint256',
    name: 'minValidSalt',
    type: 'uint256'
  }],
  name: 'cancelPairRfqOrdersWithSigner',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'txOrigin',
      type: 'address'
    }, {
      internalType: 'bytes32',
      name: 'pool',
      type: 'bytes32'
    }, {
      internalType: 'uint64',
      name: 'expiry',
      type: 'uint64'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.RfqOrder',
    name: 'order',
    type: 'tuple'
  }],
  name: 'cancelRfqOrder',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [],
  name: 'createTransformWallet',
  outputs: [{
    internalType: 'contract IFlashWallet',
    name: 'wallet',
    type: 'address'
  }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'address payable',
      name: 'signer',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'sender',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'minGasPrice',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'maxGasPrice',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'callData',
      type: 'bytes'
    }, {
      internalType: 'uint256',
      name: 'value',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'feeToken',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'feeAmount',
      type: 'uint256'
    }],
    internalType: 'struct IMetaTransactionsFeature.MetaTransactionData',
    name: 'mtx',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'signature',
    type: 'tuple'
  }],
  name: 'executeMetaTransaction',
  outputs: [{
    internalType: 'bytes',
    name: 'returnResult',
    type: 'bytes'
  }],
  stateMutability: 'payable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'bytes4',
    name: 'selector',
    type: 'bytes4'
  }, {
    internalType: 'address',
    name: 'impl',
    type: 'address'
  }],
  name: 'extend',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerTokenFeeAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'sender',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipient',
      type: 'address'
    }, {
      internalType: 'bytes32',
      name: 'pool',
      type: 'bytes32'
    }, {
      internalType: 'uint64',
      name: 'expiry',
      type: 'uint64'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.LimitOrder',
    name: 'order',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'signature',
    type: 'tuple'
  }, {
    internalType: 'uint128',
    name: 'takerTokenFillAmount',
    type: 'uint128'
  }],
  name: 'fillLimitOrder',
  outputs: [{
    internalType: 'uint128',
    name: 'takerTokenFilledAmount',
    type: 'uint128'
  }, {
    internalType: 'uint128',
    name: 'makerTokenFilledAmount',
    type: 'uint128'
  }],
  stateMutability: 'payable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerTokenFeeAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'sender',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipient',
      type: 'address'
    }, {
      internalType: 'bytes32',
      name: 'pool',
      type: 'bytes32'
    }, {
      internalType: 'uint64',
      name: 'expiry',
      type: 'uint64'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.LimitOrder',
    name: 'order',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'signature',
    type: 'tuple'
  }, {
    internalType: 'uint128',
    name: 'takerTokenFillAmount',
    type: 'uint128'
  }],
  name: 'fillOrKillLimitOrder',
  outputs: [{
    internalType: 'uint128',
    name: 'makerTokenFilledAmount',
    type: 'uint128'
  }],
  stateMutability: 'payable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'txOrigin',
      type: 'address'
    }, {
      internalType: 'bytes32',
      name: 'pool',
      type: 'bytes32'
    }, {
      internalType: 'uint64',
      name: 'expiry',
      type: 'uint64'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.RfqOrder',
    name: 'order',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'signature',
    type: 'tuple'
  }, {
    internalType: 'uint128',
    name: 'takerTokenFillAmount',
    type: 'uint128'
  }],
  name: 'fillOrKillRfqOrder',
  outputs: [{
    internalType: 'uint128',
    name: 'makerTokenFilledAmount',
    type: 'uint128'
  }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'txOrigin',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiryAndNonce',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.OtcOrder',
    name: 'order',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'makerSignature',
    type: 'tuple'
  }, {
    internalType: 'uint128',
    name: 'takerTokenFillAmount',
    type: 'uint128'
  }],
  name: 'fillOtcOrder',
  outputs: [{
    internalType: 'uint128',
    name: 'takerTokenFilledAmount',
    type: 'uint128'
  }, {
    internalType: 'uint128',
    name: 'makerTokenFilledAmount',
    type: 'uint128'
  }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'txOrigin',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiryAndNonce',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.OtcOrder',
    name: 'order',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'makerSignature',
    type: 'tuple'
  }, {
    internalType: 'uint128',
    name: 'takerTokenFillAmount',
    type: 'uint128'
  }],
  name: 'fillOtcOrderForEth',
  outputs: [{
    internalType: 'uint128',
    name: 'takerTokenFilledAmount',
    type: 'uint128'
  }, {
    internalType: 'uint128',
    name: 'makerTokenFilledAmount',
    type: 'uint128'
  }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'txOrigin',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiryAndNonce',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.OtcOrder',
    name: 'order',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'makerSignature',
    type: 'tuple'
  }],
  name: 'fillOtcOrderWithEth',
  outputs: [{
    internalType: 'uint128',
    name: 'takerTokenFilledAmount',
    type: 'uint128'
  }, {
    internalType: 'uint128',
    name: 'makerTokenFilledAmount',
    type: 'uint128'
  }],
  stateMutability: 'payable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'txOrigin',
      type: 'address'
    }, {
      internalType: 'bytes32',
      name: 'pool',
      type: 'bytes32'
    }, {
      internalType: 'uint64',
      name: 'expiry',
      type: 'uint64'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.RfqOrder',
    name: 'order',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'signature',
    type: 'tuple'
  }, {
    internalType: 'uint128',
    name: 'takerTokenFillAmount',
    type: 'uint128'
  }],
  name: 'fillRfqOrder',
  outputs: [{
    internalType: 'uint128',
    name: 'takerTokenFilledAmount',
    type: 'uint128'
  }, {
    internalType: 'uint128',
    name: 'makerTokenFilledAmount',
    type: 'uint128'
  }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'txOrigin',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiryAndNonce',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.OtcOrder',
    name: 'order',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'makerSignature',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'takerSignature',
    type: 'tuple'
  }],
  name: 'fillTakerSignedOtcOrder',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'txOrigin',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiryAndNonce',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.OtcOrder',
    name: 'order',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'makerSignature',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'takerSignature',
    type: 'tuple'
  }],
  name: 'fillTakerSignedOtcOrderForEth',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC1155Token',
      name: 'erc1155Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc1155TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc1155TokenProperties',
      type: 'tuple[]'
    }, {
      internalType: 'uint128',
      name: 'erc1155TokenAmount',
      type: 'uint128'
    }],
    internalType: 'struct LibNFTOrder.ERC1155Order',
    name: 'order',
    type: 'tuple'
  }],
  name: 'getERC1155OrderHash',
  outputs: [{
    internalType: 'bytes32',
    name: 'orderHash',
    type: 'bytes32'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC1155Token',
      name: 'erc1155Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc1155TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc1155TokenProperties',
      type: 'tuple[]'
    }, {
      internalType: 'uint128',
      name: 'erc1155TokenAmount',
      type: 'uint128'
    }],
    internalType: 'struct LibNFTOrder.ERC1155Order',
    name: 'order',
    type: 'tuple'
  }],
  name: 'getERC1155OrderInfo',
  outputs: [{
    components: [{
      internalType: 'bytes32',
      name: 'orderHash',
      type: 'bytes32'
    }, {
      internalType: 'enum LibNFTOrder.OrderStatus',
      name: 'status',
      type: 'uint8'
    }, {
      internalType: 'uint128',
      name: 'orderAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'remainingAmount',
      type: 'uint128'
    }],
    internalType: 'struct LibNFTOrder.OrderInfo',
    name: 'orderInfo',
    type: 'tuple'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC721Token',
      name: 'erc721Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc721TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc721TokenProperties',
      type: 'tuple[]'
    }],
    internalType: 'struct LibNFTOrder.ERC721Order',
    name: 'order',
    type: 'tuple'
  }],
  name: 'getERC721OrderHash',
  outputs: [{
    internalType: 'bytes32',
    name: 'orderHash',
    type: 'bytes32'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC721Token',
      name: 'erc721Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc721TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc721TokenProperties',
      type: 'tuple[]'
    }],
    internalType: 'struct LibNFTOrder.ERC721Order',
    name: 'order',
    type: 'tuple'
  }],
  name: 'getERC721OrderStatus',
  outputs: [{
    internalType: 'enum LibNFTOrder.OrderStatus',
    name: 'status',
    type: 'uint8'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address',
    name: 'maker',
    type: 'address'
  }, {
    internalType: 'uint248',
    name: 'nonceRange',
    type: 'uint248'
  }],
  name: 'getERC721OrderStatusBitVector',
  outputs: [{
    internalType: 'uint256',
    name: 'bitVector',
    type: 'uint256'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerTokenFeeAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'sender',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipient',
      type: 'address'
    }, {
      internalType: 'bytes32',
      name: 'pool',
      type: 'bytes32'
    }, {
      internalType: 'uint64',
      name: 'expiry',
      type: 'uint64'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.LimitOrder',
    name: 'order',
    type: 'tuple'
  }],
  name: 'getLimitOrderHash',
  outputs: [{
    internalType: 'bytes32',
    name: 'orderHash',
    type: 'bytes32'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerTokenFeeAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'sender',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipient',
      type: 'address'
    }, {
      internalType: 'bytes32',
      name: 'pool',
      type: 'bytes32'
    }, {
      internalType: 'uint64',
      name: 'expiry',
      type: 'uint64'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.LimitOrder',
    name: 'order',
    type: 'tuple'
  }],
  name: 'getLimitOrderInfo',
  outputs: [{
    components: [{
      internalType: 'bytes32',
      name: 'orderHash',
      type: 'bytes32'
    }, {
      internalType: 'enum LibNativeOrder.OrderStatus',
      name: 'status',
      type: 'uint8'
    }, {
      internalType: 'uint128',
      name: 'takerTokenFilledAmount',
      type: 'uint128'
    }],
    internalType: 'struct LibNativeOrder.OrderInfo',
    name: 'orderInfo',
    type: 'tuple'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerTokenFeeAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'sender',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipient',
      type: 'address'
    }, {
      internalType: 'bytes32',
      name: 'pool',
      type: 'bytes32'
    }, {
      internalType: 'uint64',
      name: 'expiry',
      type: 'uint64'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.LimitOrder',
    name: 'order',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'signature',
    type: 'tuple'
  }],
  name: 'getLimitOrderRelevantState',
  outputs: [{
    components: [{
      internalType: 'bytes32',
      name: 'orderHash',
      type: 'bytes32'
    }, {
      internalType: 'enum LibNativeOrder.OrderStatus',
      name: 'status',
      type: 'uint8'
    }, {
      internalType: 'uint128',
      name: 'takerTokenFilledAmount',
      type: 'uint128'
    }],
    internalType: 'struct LibNativeOrder.OrderInfo',
    name: 'orderInfo',
    type: 'tuple'
  }, {
    internalType: 'uint128',
    name: 'actualFillableTakerTokenAmount',
    type: 'uint128'
  }, {
    internalType: 'bool',
    name: 'isSignatureValid',
    type: 'bool'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'address payable',
      name: 'signer',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'sender',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'minGasPrice',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'maxGasPrice',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'callData',
      type: 'bytes'
    }, {
      internalType: 'uint256',
      name: 'value',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'feeToken',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'feeAmount',
      type: 'uint256'
    }],
    internalType: 'struct IMetaTransactionsFeature.MetaTransactionData',
    name: 'mtx',
    type: 'tuple'
  }],
  name: 'getMetaTransactionExecutedBlock',
  outputs: [{
    internalType: 'uint256',
    name: 'blockNumber',
    type: 'uint256'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'address payable',
      name: 'signer',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'sender',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'minGasPrice',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'maxGasPrice',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'callData',
      type: 'bytes'
    }, {
      internalType: 'uint256',
      name: 'value',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'feeToken',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'feeAmount',
      type: 'uint256'
    }],
    internalType: 'struct IMetaTransactionsFeature.MetaTransactionData',
    name: 'mtx',
    type: 'tuple'
  }],
  name: 'getMetaTransactionHash',
  outputs: [{
    internalType: 'bytes32',
    name: 'mtxHash',
    type: 'bytes32'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    internalType: 'bytes32',
    name: 'mtxHash',
    type: 'bytes32'
  }],
  name: 'getMetaTransactionHashExecutedBlock',
  outputs: [{
    internalType: 'uint256',
    name: 'blockNumber',
    type: 'uint256'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'txOrigin',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiryAndNonce',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.OtcOrder',
    name: 'order',
    type: 'tuple'
  }],
  name: 'getOtcOrderHash',
  outputs: [{
    internalType: 'bytes32',
    name: 'orderHash',
    type: 'bytes32'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'txOrigin',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiryAndNonce',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.OtcOrder',
    name: 'order',
    type: 'tuple'
  }],
  name: 'getOtcOrderInfo',
  outputs: [{
    components: [{
      internalType: 'bytes32',
      name: 'orderHash',
      type: 'bytes32'
    }, {
      internalType: 'enum LibNativeOrder.OrderStatus',
      name: 'status',
      type: 'uint8'
    }],
    internalType: 'struct LibNativeOrder.OtcOrderInfo',
    name: 'orderInfo',
    type: 'tuple'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [],
  name: 'getProtocolFeeMultiplier',
  outputs: [{
    internalType: 'uint32',
    name: 'multiplier',
    type: 'uint32'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [],
  name: 'getQuoteSigner',
  outputs: [{
    internalType: 'address',
    name: 'signer',
    type: 'address'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'txOrigin',
      type: 'address'
    }, {
      internalType: 'bytes32',
      name: 'pool',
      type: 'bytes32'
    }, {
      internalType: 'uint64',
      name: 'expiry',
      type: 'uint64'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.RfqOrder',
    name: 'order',
    type: 'tuple'
  }],
  name: 'getRfqOrderHash',
  outputs: [{
    internalType: 'bytes32',
    name: 'orderHash',
    type: 'bytes32'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'txOrigin',
      type: 'address'
    }, {
      internalType: 'bytes32',
      name: 'pool',
      type: 'bytes32'
    }, {
      internalType: 'uint64',
      name: 'expiry',
      type: 'uint64'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.RfqOrder',
    name: 'order',
    type: 'tuple'
  }],
  name: 'getRfqOrderInfo',
  outputs: [{
    components: [{
      internalType: 'bytes32',
      name: 'orderHash',
      type: 'bytes32'
    }, {
      internalType: 'enum LibNativeOrder.OrderStatus',
      name: 'status',
      type: 'uint8'
    }, {
      internalType: 'uint128',
      name: 'takerTokenFilledAmount',
      type: 'uint128'
    }],
    internalType: 'struct LibNativeOrder.OrderInfo',
    name: 'orderInfo',
    type: 'tuple'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'contract IERC20TokenV06',
      name: 'makerToken',
      type: 'address'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'takerToken',
      type: 'address'
    }, {
      internalType: 'uint128',
      name: 'makerAmount',
      type: 'uint128'
    }, {
      internalType: 'uint128',
      name: 'takerAmount',
      type: 'uint128'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'txOrigin',
      type: 'address'
    }, {
      internalType: 'bytes32',
      name: 'pool',
      type: 'bytes32'
    }, {
      internalType: 'uint64',
      name: 'expiry',
      type: 'uint64'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }],
    internalType: 'struct LibNativeOrder.RfqOrder',
    name: 'order',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'signature',
    type: 'tuple'
  }],
  name: 'getRfqOrderRelevantState',
  outputs: [{
    components: [{
      internalType: 'bytes32',
      name: 'orderHash',
      type: 'bytes32'
    }, {
      internalType: 'enum LibNativeOrder.OrderStatus',
      name: 'status',
      type: 'uint8'
    }, {
      internalType: 'uint128',
      name: 'takerTokenFilledAmount',
      type: 'uint128'
    }],
    internalType: 'struct LibNativeOrder.OrderInfo',
    name: 'orderInfo',
    type: 'tuple'
  }, {
    internalType: 'uint128',
    name: 'actualFillableTakerTokenAmount',
    type: 'uint128'
  }, {
    internalType: 'bool',
    name: 'isSignatureValid',
    type: 'bool'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    internalType: 'bytes4',
    name: 'selector',
    type: 'bytes4'
  }, {
    internalType: 'uint256',
    name: 'idx',
    type: 'uint256'
  }],
  name: 'getRollbackEntryAtIndex',
  outputs: [{
    internalType: 'address',
    name: 'impl',
    type: 'address'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    internalType: 'bytes4',
    name: 'selector',
    type: 'bytes4'
  }],
  name: 'getRollbackLength',
  outputs: [{
    internalType: 'uint256',
    name: 'rollbackLength',
    type: 'uint256'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [],
  name: 'getTransformWallet',
  outputs: [{
    internalType: 'contract IFlashWallet',
    name: 'wallet',
    type: 'address'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [],
  name: 'getTransformerDeployer',
  outputs: [{
    internalType: 'address',
    name: 'deployer',
    type: 'address'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address',
    name: 'maker',
    type: 'address'
  }, {
    internalType: 'address',
    name: 'signer',
    type: 'address'
  }],
  name: 'isValidOrderSigner',
  outputs: [{
    internalType: 'bool',
    name: 'isAllowed',
    type: 'bool'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address',
    name: 'txOrigin',
    type: 'address'
  }, {
    internalType: 'uint64',
    name: 'nonceBucket',
    type: 'uint64'
  }],
  name: 'lastOtcTxOriginNonce',
  outputs: [{
    internalType: 'uint128',
    name: 'lastNonce',
    type: 'uint128'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC721Token',
      name: 'erc721Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc721TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc721TokenProperties',
      type: 'tuple[]'
    }],
    internalType: 'struct LibNFTOrder.ERC721Order',
    name: 'sellOrder',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC721Token',
      name: 'erc721Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc721TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc721TokenProperties',
      type: 'tuple[]'
    }],
    internalType: 'struct LibNFTOrder.ERC721Order',
    name: 'buyOrder',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'sellOrderSignature',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'buyOrderSignature',
    type: 'tuple'
  }],
  name: 'matchERC721Orders',
  outputs: [{
    internalType: 'uint256',
    name: 'profit',
    type: 'uint256'
  }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address',
    name: 'target',
    type: 'address'
  }, {
    internalType: 'bytes',
    name: 'data',
    type: 'bytes'
  }, {
    internalType: 'address',
    name: 'newOwner',
    type: 'address'
  }],
  name: 'migrate',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'contract IERC20TokenV06',
    name: 'outputToken',
    type: 'address'
  }, {
    components: [{
      internalType: 'enum IMultiplexFeature.MultiplexSubcall',
      name: 'id',
      type: 'uint8'
    }, {
      internalType: 'uint256',
      name: 'sellAmount',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'data',
      type: 'bytes'
    }],
    internalType: 'struct IMultiplexFeature.BatchSellSubcall[]',
    name: 'calls',
    type: 'tuple[]'
  }, {
    internalType: 'uint256',
    name: 'minBuyAmount',
    type: 'uint256'
  }],
  name: 'multiplexBatchSellEthForToken',
  outputs: [{
    internalType: 'uint256',
    name: 'boughtAmount',
    type: 'uint256'
  }],
  stateMutability: 'payable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'contract IERC20TokenV06',
    name: 'inputToken',
    type: 'address'
  }, {
    components: [{
      internalType: 'enum IMultiplexFeature.MultiplexSubcall',
      name: 'id',
      type: 'uint8'
    }, {
      internalType: 'uint256',
      name: 'sellAmount',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'data',
      type: 'bytes'
    }],
    internalType: 'struct IMultiplexFeature.BatchSellSubcall[]',
    name: 'calls',
    type: 'tuple[]'
  }, {
    internalType: 'uint256',
    name: 'sellAmount',
    type: 'uint256'
  }, {
    internalType: 'uint256',
    name: 'minBuyAmount',
    type: 'uint256'
  }],
  name: 'multiplexBatchSellTokenForEth',
  outputs: [{
    internalType: 'uint256',
    name: 'boughtAmount',
    type: 'uint256'
  }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'contract IERC20TokenV06',
    name: 'inputToken',
    type: 'address'
  }, {
    internalType: 'contract IERC20TokenV06',
    name: 'outputToken',
    type: 'address'
  }, {
    components: [{
      internalType: 'enum IMultiplexFeature.MultiplexSubcall',
      name: 'id',
      type: 'uint8'
    }, {
      internalType: 'uint256',
      name: 'sellAmount',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'data',
      type: 'bytes'
    }],
    internalType: 'struct IMultiplexFeature.BatchSellSubcall[]',
    name: 'calls',
    type: 'tuple[]'
  }, {
    internalType: 'uint256',
    name: 'sellAmount',
    type: 'uint256'
  }, {
    internalType: 'uint256',
    name: 'minBuyAmount',
    type: 'uint256'
  }],
  name: 'multiplexBatchSellTokenForToken',
  outputs: [{
    internalType: 'uint256',
    name: 'boughtAmount',
    type: 'uint256'
  }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address[]',
    name: 'tokens',
    type: 'address[]'
  }, {
    components: [{
      internalType: 'enum IMultiplexFeature.MultiplexSubcall',
      name: 'id',
      type: 'uint8'
    }, {
      internalType: 'bytes',
      name: 'data',
      type: 'bytes'
    }],
    internalType: 'struct IMultiplexFeature.MultiHopSellSubcall[]',
    name: 'calls',
    type: 'tuple[]'
  }, {
    internalType: 'uint256',
    name: 'minBuyAmount',
    type: 'uint256'
  }],
  name: 'multiplexMultiHopSellEthForToken',
  outputs: [{
    internalType: 'uint256',
    name: 'boughtAmount',
    type: 'uint256'
  }],
  stateMutability: 'payable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address[]',
    name: 'tokens',
    type: 'address[]'
  }, {
    components: [{
      internalType: 'enum IMultiplexFeature.MultiplexSubcall',
      name: 'id',
      type: 'uint8'
    }, {
      internalType: 'bytes',
      name: 'data',
      type: 'bytes'
    }],
    internalType: 'struct IMultiplexFeature.MultiHopSellSubcall[]',
    name: 'calls',
    type: 'tuple[]'
  }, {
    internalType: 'uint256',
    name: 'sellAmount',
    type: 'uint256'
  }, {
    internalType: 'uint256',
    name: 'minBuyAmount',
    type: 'uint256'
  }],
  name: 'multiplexMultiHopSellTokenForEth',
  outputs: [{
    internalType: 'uint256',
    name: 'boughtAmount',
    type: 'uint256'
  }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address[]',
    name: 'tokens',
    type: 'address[]'
  }, {
    components: [{
      internalType: 'enum IMultiplexFeature.MultiplexSubcall',
      name: 'id',
      type: 'uint8'
    }, {
      internalType: 'bytes',
      name: 'data',
      type: 'bytes'
    }],
    internalType: 'struct IMultiplexFeature.MultiHopSellSubcall[]',
    name: 'calls',
    type: 'tuple[]'
  }, {
    internalType: 'uint256',
    name: 'sellAmount',
    type: 'uint256'
  }, {
    internalType: 'uint256',
    name: 'minBuyAmount',
    type: 'uint256'
  }],
  name: 'multiplexMultiHopSellTokenForToken',
  outputs: [{
    internalType: 'uint256',
    name: 'boughtAmount',
    type: 'uint256'
  }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address',
    name: 'operator',
    type: 'address'
  }, {
    internalType: 'address',
    name: 'from',
    type: 'address'
  }, {
    internalType: 'uint256',
    name: 'tokenId',
    type: 'uint256'
  }, {
    internalType: 'uint256',
    name: 'value',
    type: 'uint256'
  }, {
    internalType: 'bytes',
    name: 'data',
    type: 'bytes'
  }],
  name: 'onERC1155Received',
  outputs: [{
    internalType: 'bytes4',
    name: 'success',
    type: 'bytes4'
  }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address',
    name: 'operator',
    type: 'address'
  }, {
    internalType: 'address',
    name: 'from',
    type: 'address'
  }, {
    internalType: 'uint256',
    name: 'tokenId',
    type: 'uint256'
  }, {
    internalType: 'bytes',
    name: 'data',
    type: 'bytes'
  }],
  name: 'onERC721Received',
  outputs: [{
    internalType: 'bytes4',
    name: 'success',
    type: 'bytes4'
  }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [],
  name: 'owner',
  outputs: [{
    internalType: 'address',
    name: 'ownerAddress',
    type: 'address'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC1155Token',
      name: 'erc1155Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc1155TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc1155TokenProperties',
      type: 'tuple[]'
    }, {
      internalType: 'uint128',
      name: 'erc1155TokenAmount',
      type: 'uint128'
    }],
    internalType: 'struct LibNFTOrder.ERC1155Order',
    name: 'order',
    type: 'tuple'
  }],
  name: 'preSignERC1155Order',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC721Token',
      name: 'erc721Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc721TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc721TokenProperties',
      type: 'tuple[]'
    }],
    internalType: 'struct LibNFTOrder.ERC721Order',
    name: 'order',
    type: 'tuple'
  }],
  name: 'preSignERC721Order',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address',
    name: 'signer',
    type: 'address'
  }, {
    internalType: 'bool',
    name: 'allowed',
    type: 'bool'
  }],
  name: 'registerAllowedOrderSigner',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address[]',
    name: 'origins',
    type: 'address[]'
  }, {
    internalType: 'bool',
    name: 'allowed',
    type: 'bool'
  }],
  name: 'registerAllowedRfqOrigins',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'bytes4',
    name: 'selector',
    type: 'bytes4'
  }, {
    internalType: 'address',
    name: 'targetImpl',
    type: 'address'
  }],
  name: 'rollback',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC1155Token',
      name: 'erc1155Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc1155TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc1155TokenProperties',
      type: 'tuple[]'
    }, {
      internalType: 'uint128',
      name: 'erc1155TokenAmount',
      type: 'uint128'
    }],
    internalType: 'struct LibNFTOrder.ERC1155Order',
    name: 'buyOrder',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'signature',
    type: 'tuple'
  }, {
    internalType: 'uint256',
    name: 'erc1155TokenId',
    type: 'uint256'
  }, {
    internalType: 'uint128',
    name: 'erc1155SellAmount',
    type: 'uint128'
  }, {
    internalType: 'bool',
    name: 'unwrapNativeToken',
    type: 'bool'
  }, {
    internalType: 'bytes',
    name: 'callbackData',
    type: 'bytes'
  }],
  name: 'sellERC1155',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC721Token',
      name: 'erc721Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc721TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc721TokenProperties',
      type: 'tuple[]'
    }],
    internalType: 'struct LibNFTOrder.ERC721Order',
    name: 'buyOrder',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'signature',
    type: 'tuple'
  }, {
    internalType: 'uint256',
    name: 'erc721TokenId',
    type: 'uint256'
  }, {
    internalType: 'bool',
    name: 'unwrapNativeToken',
    type: 'bool'
  }, {
    internalType: 'bytes',
    name: 'callbackData',
    type: 'bytes'
  }],
  name: 'sellERC721',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'bytes',
    name: 'encodedPath',
    type: 'bytes'
  }, {
    internalType: 'uint256',
    name: 'minBuyAmount',
    type: 'uint256'
  }, {
    internalType: 'address',
    name: 'recipient',
    type: 'address'
  }],
  name: 'sellEthForTokenToUniswapV3',
  outputs: [{
    internalType: 'uint256',
    name: 'buyAmount',
    type: 'uint256'
  }],
  stateMutability: 'payable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'contract IERC20TokenV06',
    name: 'inputToken',
    type: 'address'
  }, {
    internalType: 'contract IERC20TokenV06',
    name: 'outputToken',
    type: 'address'
  }, {
    internalType: 'contract ILiquidityProvider',
    name: 'provider',
    type: 'address'
  }, {
    internalType: 'address',
    name: 'recipient',
    type: 'address'
  }, {
    internalType: 'uint256',
    name: 'sellAmount',
    type: 'uint256'
  }, {
    internalType: 'uint256',
    name: 'minBuyAmount',
    type: 'uint256'
  }, {
    internalType: 'bytes',
    name: 'auxiliaryData',
    type: 'bytes'
  }],
  name: 'sellToLiquidityProvider',
  outputs: [{
    internalType: 'uint256',
    name: 'boughtAmount',
    type: 'uint256'
  }],
  stateMutability: 'payable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'contract IERC20TokenV06[]',
    name: 'tokens',
    type: 'address[]'
  }, {
    internalType: 'uint256',
    name: 'sellAmount',
    type: 'uint256'
  }, {
    internalType: 'uint256',
    name: 'minBuyAmount',
    type: 'uint256'
  }, {
    internalType: 'enum IPancakeSwapFeature.ProtocolFork',
    name: 'fork',
    type: 'uint8'
  }],
  name: 'sellToPancakeSwap',
  outputs: [{
    internalType: 'uint256',
    name: 'buyAmount',
    type: 'uint256'
  }],
  stateMutability: 'payable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'contract IERC20TokenV06[]',
    name: 'tokens',
    type: 'address[]'
  }, {
    internalType: 'uint256',
    name: 'sellAmount',
    type: 'uint256'
  }, {
    internalType: 'uint256',
    name: 'minBuyAmount',
    type: 'uint256'
  }, {
    internalType: 'bool',
    name: 'isSushi',
    type: 'bool'
  }],
  name: 'sellToUniswap',
  outputs: [{
    internalType: 'uint256',
    name: 'buyAmount',
    type: 'uint256'
  }],
  stateMutability: 'payable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'bytes',
    name: 'encodedPath',
    type: 'bytes'
  }, {
    internalType: 'uint256',
    name: 'sellAmount',
    type: 'uint256'
  }, {
    internalType: 'uint256',
    name: 'minBuyAmount',
    type: 'uint256'
  }, {
    internalType: 'address payable',
    name: 'recipient',
    type: 'address'
  }],
  name: 'sellTokenForEthToUniswapV3',
  outputs: [{
    internalType: 'uint256',
    name: 'buyAmount',
    type: 'uint256'
  }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'bytes',
    name: 'encodedPath',
    type: 'bytes'
  }, {
    internalType: 'uint256',
    name: 'sellAmount',
    type: 'uint256'
  }, {
    internalType: 'uint256',
    name: 'minBuyAmount',
    type: 'uint256'
  }, {
    internalType: 'address',
    name: 'recipient',
    type: 'address'
  }],
  name: 'sellTokenForTokenToUniswapV3',
  outputs: [{
    internalType: 'uint256',
    name: 'buyAmount',
    type: 'uint256'
  }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address',
    name: 'quoteSigner',
    type: 'address'
  }],
  name: 'setQuoteSigner',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address',
    name: 'transformerDeployer',
    type: 'address'
  }],
  name: 'setTransformerDeployer',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'bytes4',
    name: 'interfaceId',
    type: 'bytes4'
  }],
  name: 'supportInterface',
  outputs: [{
    internalType: 'bool',
    name: 'isSupported',
    type: 'bool'
  }],
  stateMutability: 'pure',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address',
    name: 'newOwner',
    type: 'address'
  }],
  name: 'transferOwnership',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'bytes32[]',
    name: 'poolIds',
    type: 'bytes32[]'
  }],
  name: 'transferProtocolFeesForPools',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'contract IERC20TokenV06',
    name: 'erc20',
    type: 'address'
  }, {
    internalType: 'uint256',
    name: 'amountOut',
    type: 'uint256'
  }, {
    internalType: 'address payable',
    name: 'recipientWallet',
    type: 'address'
  }],
  name: 'transferTrappedTokensTo',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'contract IERC20TokenV06',
    name: 'inputToken',
    type: 'address'
  }, {
    internalType: 'contract IERC20TokenV06',
    name: 'outputToken',
    type: 'address'
  }, {
    internalType: 'uint256',
    name: 'inputTokenAmount',
    type: 'uint256'
  }, {
    internalType: 'uint256',
    name: 'minOutputTokenAmount',
    type: 'uint256'
  }, {
    components: [{
      internalType: 'uint32',
      name: 'deploymentNonce',
      type: 'uint32'
    }, {
      internalType: 'bytes',
      name: 'data',
      type: 'bytes'
    }],
    internalType: 'struct ITransformERC20Feature.Transformation[]',
    name: 'transformations',
    type: 'tuple[]'
  }],
  name: 'transformERC20',
  outputs: [{
    internalType: 'uint256',
    name: 'outputTokenAmount',
    type: 'uint256'
  }],
  stateMutability: 'payable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'int256',
    name: 'amount0Delta',
    type: 'int256'
  }, {
    internalType: 'int256',
    name: 'amount1Delta',
    type: 'int256'
  }, {
    internalType: 'bytes',
    name: 'data',
    type: 'bytes'
  }],
  name: 'uniswapV3SwapCallback',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC1155Token',
      name: 'erc1155Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc1155TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc1155TokenProperties',
      type: 'tuple[]'
    }, {
      internalType: 'uint128',
      name: 'erc1155TokenAmount',
      type: 'uint128'
    }],
    internalType: 'struct LibNFTOrder.ERC1155Order',
    name: 'order',
    type: 'tuple'
  }, {
    internalType: 'uint256',
    name: 'erc1155TokenId',
    type: 'uint256'
  }],
  name: 'validateERC1155OrderProperties',
  outputs: [],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC1155Token',
      name: 'erc1155Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc1155TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc1155TokenProperties',
      type: 'tuple[]'
    }, {
      internalType: 'uint128',
      name: 'erc1155TokenAmount',
      type: 'uint128'
    }],
    internalType: 'struct LibNFTOrder.ERC1155Order',
    name: 'order',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'signature',
    type: 'tuple'
  }],
  name: 'validateERC1155OrderSignature',
  outputs: [],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC721Token',
      name: 'erc721Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc721TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc721TokenProperties',
      type: 'tuple[]'
    }],
    internalType: 'struct LibNFTOrder.ERC721Order',
    name: 'order',
    type: 'tuple'
  }, {
    internalType: 'uint256',
    name: 'erc721TokenId',
    type: 'uint256'
  }],
  name: 'validateERC721OrderProperties',
  outputs: [],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC721Token',
      name: 'erc721Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc721TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc721TokenProperties',
      type: 'tuple[]'
    }],
    internalType: 'struct LibNFTOrder.ERC721Order',
    name: 'order',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'signature',
    type: 'tuple'
  }],
  name: 'validateERC721OrderSignature',
  outputs: [],
  stateMutability: 'view',
  type: 'function'
}];
var IZeroEx__factory = /*#__PURE__*/function () {
  function IZeroEx__factory() {}

  IZeroEx__factory.createInterface = function createInterface() {
    return new utils.Interface(_abi$2);
  };

  IZeroEx__factory.connect = function connect(address, signerOrProvider) {
    return new Contract(address, _abi$2, signerOrProvider);
  };

  return IZeroEx__factory;
}();
IZeroEx__factory.abi = _abi$2;

/* Autogenerated file. Do not edit manually. */
var _abi$3 = [{
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: 'address',
    name: '_owner',
    type: 'address'
  }, {
    indexed: true,
    internalType: 'address',
    name: '_operator',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'bool',
    name: '_approved',
    type: 'bool'
  }],
  name: 'ApprovalForAll',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: 'address',
    name: '_operator',
    type: 'address'
  }, {
    indexed: true,
    internalType: 'address',
    name: '_from',
    type: 'address'
  }, {
    indexed: true,
    internalType: 'address',
    name: '_to',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256[]',
    name: '_ids',
    type: 'uint256[]'
  }, {
    indexed: false,
    internalType: 'uint256[]',
    name: '_amounts',
    type: 'uint256[]'
  }],
  name: 'TransferBatch',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: 'address',
    name: '_operator',
    type: 'address'
  }, {
    indexed: true,
    internalType: 'address',
    name: '_from',
    type: 'address'
  }, {
    indexed: true,
    internalType: 'address',
    name: '_to',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: '_id',
    type: 'uint256'
  }, {
    indexed: false,
    internalType: 'uint256',
    name: '_amount',
    type: 'uint256'
  }],
  name: 'TransferSingle',
  type: 'event'
}, {
  inputs: [{
    internalType: 'address',
    name: '_owner',
    type: 'address'
  }, {
    internalType: 'uint256',
    name: '_id',
    type: 'uint256'
  }],
  name: 'balanceOf',
  outputs: [{
    internalType: 'uint256',
    name: '',
    type: 'uint256'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address[]',
    name: '_owners',
    type: 'address[]'
  }, {
    internalType: 'uint256[]',
    name: '_ids',
    type: 'uint256[]'
  }],
  name: 'balanceOfBatch',
  outputs: [{
    internalType: 'uint256[]',
    name: '',
    type: 'uint256[]'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address',
    name: '_owner',
    type: 'address'
  }, {
    internalType: 'address',
    name: '_operator',
    type: 'address'
  }],
  name: 'isApprovedForAll',
  outputs: [{
    internalType: 'bool',
    name: 'isOperator',
    type: 'bool'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address',
    name: '_from',
    type: 'address'
  }, {
    internalType: 'address',
    name: '_to',
    type: 'address'
  }, {
    internalType: 'uint256[]',
    name: '_ids',
    type: 'uint256[]'
  }, {
    internalType: 'uint256[]',
    name: '_amounts',
    type: 'uint256[]'
  }, {
    internalType: 'bytes',
    name: '_data',
    type: 'bytes'
  }],
  name: 'safeBatchTransferFrom',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address',
    name: '_from',
    type: 'address'
  }, {
    internalType: 'address',
    name: '_to',
    type: 'address'
  }, {
    internalType: 'uint256',
    name: '_id',
    type: 'uint256'
  }, {
    internalType: 'uint256',
    name: '_amount',
    type: 'uint256'
  }, {
    internalType: 'bytes',
    name: '_data',
    type: 'bytes'
  }],
  name: 'safeTransferFrom',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'address',
    name: '_operator',
    type: 'address'
  }, {
    internalType: 'bool',
    name: '_approved',
    type: 'bool'
  }],
  name: 'setApprovalForAll',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{
    internalType: 'bytes4',
    name: '_interfaceID',
    type: 'bytes4'
  }],
  name: 'supportsInterface',
  outputs: [{
    internalType: 'bool',
    name: '',
    type: 'bool'
  }],
  stateMutability: 'pure',
  type: 'function'
}];
var ERC1155__factory = /*#__PURE__*/function () {
  function ERC1155__factory() {}

  ERC1155__factory.createInterface = function createInterface() {
    return new utils.Interface(_abi$3);
  };

  ERC1155__factory.connect = function connect(address, signerOrProvider) {
    return new Contract(address, _abi$3, signerOrProvider);
  };

  return ERC1155__factory;
}();
ERC1155__factory.abi = _abi$3;

/* Autogenerated file. Do not edit manually. */
var _abi$4 = [{
  constant: true,
  inputs: [],
  name: 'name',
  outputs: [{
    name: '',
    type: 'string'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_spender',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'approve',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'totalSupply',
  outputs: [{
    name: '',
    type: 'uint256'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_from',
    type: 'address'
  }, {
    name: '_to',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'transferFrom',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'decimals',
  outputs: [{
    name: '',
    type: 'uint8'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_owner',
    type: 'address'
  }],
  name: 'balanceOf',
  outputs: [{
    name: 'balance',
    type: 'uint256'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'symbol',
  outputs: [{
    name: '',
    type: 'string'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_to',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'transfer',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_owner',
    type: 'address'
  }, {
    name: '_spender',
    type: 'address'
  }],
  name: 'allowance',
  outputs: [{
    name: '',
    type: 'uint256'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  payable: true,
  stateMutability: 'payable',
  type: 'fallback'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'owner',
    type: 'address'
  }, {
    indexed: true,
    name: 'spender',
    type: 'address'
  }, {
    indexed: false,
    name: 'value',
    type: 'uint256'
  }],
  name: 'Approval',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'from',
    type: 'address'
  }, {
    indexed: true,
    name: 'to',
    type: 'address'
  }, {
    indexed: false,
    name: 'value',
    type: 'uint256'
  }],
  name: 'Transfer',
  type: 'event'
}];
var ERC20__factory = /*#__PURE__*/function () {
  function ERC20__factory() {}

  ERC20__factory.createInterface = function createInterface() {
    return new utils.Interface(_abi$4);
  };

  ERC20__factory.connect = function connect(address, signerOrProvider) {
    return new Contract(address, _abi$4, signerOrProvider);
  };

  return ERC20__factory;
}();
ERC20__factory.abi = _abi$4;

/* Autogenerated file. Do not edit manually. */
var _abi$5 = [{
  constant: false,
  inputs: [{
    internalType: 'address',
    name: 'to',
    type: 'address'
  }, {
    internalType: 'uint256',
    name: 'tokenId',
    type: 'uint256'
  }],
  name: 'approve',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    internalType: 'address',
    name: 'to',
    type: 'address'
  }, {
    internalType: 'uint256',
    name: 'tokenId',
    type: 'uint256'
  }],
  name: 'mint',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    internalType: 'address',
    name: 'from',
    type: 'address'
  }, {
    internalType: 'address',
    name: 'to',
    type: 'address'
  }, {
    internalType: 'uint256',
    name: 'tokenId',
    type: 'uint256'
  }],
  name: 'safeTransferFrom',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    internalType: 'address',
    name: 'from',
    type: 'address'
  }, {
    internalType: 'address',
    name: 'to',
    type: 'address'
  }, {
    internalType: 'uint256',
    name: 'tokenId',
    type: 'uint256'
  }, {
    internalType: 'bytes',
    name: '_data',
    type: 'bytes'
  }],
  name: 'safeTransferFrom',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    internalType: 'address',
    name: 'to',
    type: 'address'
  }, {
    internalType: 'bool',
    name: 'approved',
    type: 'bool'
  }],
  name: 'setApprovalForAll',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    internalType: 'address',
    name: 'from',
    type: 'address'
  }, {
    internalType: 'address',
    name: 'to',
    type: 'address'
  }, {
    internalType: 'uint256',
    name: 'tokenId',
    type: 'uint256'
  }],
  name: 'transferFrom',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'constructor'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: 'address',
    name: 'from',
    type: 'address'
  }, {
    indexed: true,
    internalType: 'address',
    name: 'to',
    type: 'address'
  }, {
    indexed: true,
    internalType: 'uint256',
    name: 'tokenId',
    type: 'uint256'
  }],
  name: 'Transfer',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: 'address',
    name: 'owner',
    type: 'address'
  }, {
    indexed: true,
    internalType: 'address',
    name: 'approved',
    type: 'address'
  }, {
    indexed: true,
    internalType: 'uint256',
    name: 'tokenId',
    type: 'uint256'
  }],
  name: 'Approval',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: 'address',
    name: 'owner',
    type: 'address'
  }, {
    indexed: true,
    internalType: 'address',
    name: 'operator',
    type: 'address'
  }, {
    indexed: false,
    internalType: 'bool',
    name: 'approved',
    type: 'bool'
  }],
  name: 'ApprovalForAll',
  type: 'event'
}, {
  constant: true,
  inputs: [{
    internalType: 'address',
    name: 'owner',
    type: 'address'
  }],
  name: 'balanceOf',
  outputs: [{
    internalType: 'uint256',
    name: '',
    type: 'uint256'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    internalType: 'uint256',
    name: 'tokenId',
    type: 'uint256'
  }],
  name: 'getApproved',
  outputs: [{
    internalType: 'address',
    name: '',
    type: 'address'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    internalType: 'address',
    name: 'owner',
    type: 'address'
  }, {
    internalType: 'address',
    name: 'operator',
    type: 'address'
  }],
  name: 'isApprovedForAll',
  outputs: [{
    internalType: 'bool',
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    internalType: 'uint256',
    name: 'tokenId',
    type: 'uint256'
  }],
  name: 'ownerOf',
  outputs: [{
    internalType: 'address',
    name: '',
    type: 'address'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    internalType: 'bytes4',
    name: 'interfaceId',
    type: 'bytes4'
  }],
  name: 'supportsInterface',
  outputs: [{
    internalType: 'bool',
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}];
var ERC721__factory = /*#__PURE__*/function () {
  function ERC721__factory() {}

  ERC721__factory.createInterface = function createInterface() {
    return new utils.Interface(_abi$5);
  };

  ERC721__factory.connect = function connect(address, signerOrProvider) {
    return new Contract(address, _abi$5, signerOrProvider);
  };

  return ERC721__factory;
}();
ERC721__factory.abi = _abi$5;

var encodeTypedDataHash = function encodeTypedDataHash(typedData) {
  var types = _extends({}, typedData.types); // remove EIP712Domain key from types as ethers will auto-gen it in
  // the hash encoder below


  delete types['EIP712Domain'];
  return _TypedDataEncoder.hash(typedData.domain, types, typedData.message);
};

var EIP1271ZeroExDataAbi = [{
  inputs: [{
    components: [{
      internalType: 'address',
      name: 'makerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'takerAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'senderAddress',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'makerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'takerFee',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'salt',
      type: 'uint256'
    }, {
      internalType: 'bytes',
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'makerFeeAssetData',
      type: 'bytes'
    }, {
      internalType: 'bytes',
      name: 'takerFeeAssetData',
      type: 'bytes'
    }],
    internalType: 'struct IEIP1271Data.Order',
    name: 'order',
    type: 'tuple'
  }, {
    internalType: 'bytes32',
    name: 'orderHash',
    type: 'bytes32'
  }],
  name: 'OrderWithHash',
  outputs: [],
  stateMutability: 'pure',
  type: 'function'
}];

var cancelOrder = function cancelOrder(exchangeContract, order) {
  return exchangeContract.cancelOrder(order);
};
var getOrderInfo = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(exchangeContract, order) {
    var orderInfo;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return exchangeContract.getOrderInfo(order);

          case 2:
            orderInfo = _context.sent;
            return _context.abrupt("return", orderInfo);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getOrderInfo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getOrderStatus = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(exchangeContract, order) {
    var orderInfo;
    return runtime_1.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return exchangeContract.getOrderInfo(order);

          case 2:
            orderInfo = _context2.sent;
            return _context2.abrupt("return", orderInfo.orderStatus);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getOrderStatus(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var cancelOrders = function cancelOrders(exchangeContract, orders, overrides) {
  return exchangeContract.batchCancelOrders(orders, overrides);
};
var cancelOrdersUpToNow = function cancelOrdersUpToNow(exchangeContract, unixTimestampAsSalt) {
  if (unixTimestampAsSalt === void 0) {
    unixTimestampAsSalt = generateTimeBasedSalt();
  }

  exchangeContract.cancelOrdersUpTo(unixTimestampAsSalt);
};
var hashOrder = function hashOrder(order, chainId, exchangeContractAddress) {
  var EIP712_DOMAIN = getEipDomain(chainId, exchangeContractAddress);
  return _TypedDataEncoder.hash(EIP712_DOMAIN, EIP712_TYPES, order);
};
var signOrderWithEip1271 = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(order, signer, chainId, exchangeContractAddress) {
    var domain, types, value, typedData, orderHash, msg, rawSignatureFromContractWallet;
    return runtime_1.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            domain = getEipDomain(chainId, exchangeContractAddress);
            types = EIP712_TYPES;
            value = order;
            typedData = {
              domain: domain,
              types: types,
              message: value
            };
            orderHash = encodeTypedDataHash(typedData);
            msg = new Interface(EIP1271ZeroExDataAbi).encodeFunctionData('OrderWithHash', [order, orderHash]);
            _context3.next = 8;
            return signer.signMessage(arrayify(msg));

          case 8:
            rawSignatureFromContractWallet = _context3.sent;
            return _context3.abrupt("return", rawSignatureFromContractWallet);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function signOrderWithEip1271(_x5, _x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
var signOrderWithEoaWallet = /*#__PURE__*/function () {
  var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(order, signer, chainId, exchangeContractAddress) {
    var domain, types, value, rawSignatureFromEoaWallet;
    return runtime_1.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            domain = getEipDomain(chainId, exchangeContractAddress);
            types = EIP712_TYPES;
            value = order;
            _context4.next = 5;
            return signer._signTypedData(domain, types, value);

          case 5:
            rawSignatureFromEoaWallet = _context4.sent;
            return _context4.abrupt("return", rawSignatureFromEoaWallet);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function signOrderWithEoaWallet(_x9, _x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var checkIfContractWallet = /*#__PURE__*/function () {
  var _ref5 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(provider, walletAddress) {
    var isContractWallet, walletCode, isSequence, providerToUse, _providerToUse$connec, _providerToUse$connec2, isSequenceViaWalletConnect;

    return runtime_1.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            isContractWallet = false;

            if (!provider.getCode) {
              _context5.next = 6;
              break;
            }

            _context5.next = 4;
            return provider.getCode(walletAddress);

          case 4:
            walletCode = _context5.sent;

            // Wallet Code returns '0x' if no contract address is associated with
            // Note: Lazy loaded contract wallets will show 0x initially, so we fall back to feature detection
            if (walletCode && walletCode != '0x') {
              isContractWallet = true;
            }

          case 6:
            isSequence = !!provider._isSequenceProvider;

            if (isSequence) {
              isContractWallet = true;
            } // Walletconnect hides the real provider in the provider (yo dawg)


            providerToUse = provider.provider;

            if (providerToUse != null && providerToUse.isWalletConnect) {
              isSequenceViaWalletConnect = !!(((_providerToUse$connec = providerToUse.connector) == null ? void 0 : (_providerToUse$connec2 = _providerToUse$connec._peerMeta) == null ? void 0 : _providerToUse$connec2.description) === 'Sequence');

              if (isSequenceViaWalletConnect) {
                isContractWallet = true;
              }
            }

            return _context5.abrupt("return", isContractWallet);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function checkIfContractWallet(_x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();
var signOrder = /*#__PURE__*/function () {
  var _ref6 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(order, signerAddress, signer, provider, chainId, exchangeContractAddress, signingOptions) {
    var method, isContractWallet, signature, rawEip712Signature, rawEip1271Signature, signedOrder;
    return runtime_1.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            method = 'eoa'; // If we have any specific signature type overrides, prefer those

            if (!((signingOptions == null ? void 0 : signingOptions.signatureType) === 'eip1271')) {
              _context6.next = 6;
              break;
            }

            method = 'eip1271';
            _context6.next = 18;
            break;

          case 6:
            if (!((signingOptions == null ? void 0 : signingOptions.signatureType) === 'eoa')) {
              _context6.next = 10;
              break;
            }

            method = 'eoa';
            _context6.next = 18;
            break;

          case 10:
            if (!((signingOptions == null ? void 0 : signingOptions.autodetectSignatureType) === false)) {
              _context6.next = 14;
              break;
            }

            method = 'eoa';
            _context6.next = 18;
            break;

          case 14:
            _context6.next = 16;
            return checkIfContractWallet(provider, signerAddress);

          case 16:
            isContractWallet = _context6.sent;

            if (isContractWallet) {
              method = 'eip1271';
            } else {
              method = 'eoa';
            }

          case 18:
            _context6.t0 = method;
            _context6.next = _context6.t0 === 'eoa' ? 21 : _context6.t0 === 'eip1271' ? 26 : 31;
            break;

          case 21:
            _context6.next = 23;
            return signOrderWithEoaWallet(order, signer, chainId, exchangeContractAddress);

          case 23:
            rawEip712Signature = _context6.sent;
            signature = prepareOrderSignatureFromEoaWallet(rawEip712Signature);
            return _context6.abrupt("break", 32);

          case 26:
            _context6.next = 28;
            return signOrderWithEip1271(order, signer, chainId, exchangeContractAddress);

          case 28:
            rawEip1271Signature = signature = _context6.sent;
            signature = prepareOrderSignatureFromContractWallet(rawEip1271Signature);
            return _context6.abrupt("break", 32);

          case 31:
            throw new Error("Unknown signature method chosen: " + method);

          case 32:
            signedOrder = _extends({}, order, {
              signature: signature
            });
            return _context6.abrupt("return", signedOrder);

          case 36:
            _context6.prev = 36;
            _context6.t1 = _context6["catch"](0);
            console.log('error signing order', _context6.t1);
            throw _context6.t1;

          case 40:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 36]]);
  }));

  return function signOrder(_x15, _x16, _x17, _x18, _x19, _x20, _x21) {
    return _ref6.apply(this, arguments);
  };
}(); // export const prepareOrderSignature = (
//   rawSignature: string,
//   method?: AvailableSignatureTypes
// ) => {
//   let preferredMethod = method ?? 'eoa';
//   try {
//     return prepareOrderSignatureFromEoaWallet(rawSignature);
//   } catch (e) {
//     console.log('prepareOrderSignature:Errror preparing order signature', e);
//     console.log('Attempting to decode contract wallet signature');
//     try {
//       return prepareOrderSignatureFromContractWallet(rawSignature);
//     } catch (e) {
//       throw e;
//     }
//   }
// };

var prepareOrderSignatureFromEoaWallet = function prepareOrderSignatureFromEoaWallet(rawSignature) {
  // Append the signature type (eg. "0x02" for EIP712 signatures)
  // at the end of the signature since this is what 0x expects
  var signature = splitSignature(rawSignature);
  return hexConcat([hexlify(signature.v), signature.r, signature.s, '0x02']);
};
var prepareOrderSignatureFromContractWallet = function prepareOrderSignatureFromContractWallet(rawSignature) {
  // Append the signature type (eg. "0x07" for EIP1271 signatures)
  // at the end of the signature since this is what 0x expects
  // See: https://github.com/0xProject/ZEIPs/issues/33
  return hexConcat([rawSignature, '0x07']);
};
var verifyOrderSignature = function verifyOrderSignature(order, signature, chainId, exchangeContractAddress) {
  var EIP712_DOMAIN = getEipDomain(chainId, exchangeContractAddress);

  try {
    var maker = order.makerAddress.toLowerCase();
    var length = hexDataLength(signature); // Grab the V (exists at index 0 for 0x orders)

    var slicedSigV = hexDataSlice(signature, 0, 1); // Grab the R and S (index 1 through length - 1 b/c the end hex is the signature type so we strip that too)

    var slicedSig = hexDataSlice(signature, 1, length - 1);
    var derivedSignatureHex = hexConcat([slicedSig, slicedSigV]);
    var derivedSignature = joinSignature(derivedSignatureHex);
    var signer = verifyTypedData(EIP712_DOMAIN, EIP712_TYPES, order, derivedSignature);
    return maker.toLowerCase() === signer.toLowerCase();
  } catch (e) {
    console.log(e);
    return false;
  }
};
var buildOrder = function buildOrder(makerAssets, takerAssets, orderConfig) {
  var _orderConfig$takerAdd, _orderConfig$exchange;

  // Encode maker assets
  var makerAssetAmount;
  var makerAssetData;
  var makerAssetEligibleForSingleAsset = makerAssets.length === 1;

  if (makerAssetEligibleForSingleAsset) {
    var makerAsset = makerAssets[0];
    makerAssetAmount = BigNumber.from(getAmountFromAsset(makerAsset));
    makerAssetData = encodeAssetData(makerAsset, false);
  } else {
    var makerAssetAmounts = makerAssets.map(function (ma) {
      return getAmountFromAsset(ma);
    });
    var makerAssetDatas = makerAssets.map(function (ma) {
      return encodeAssetData(ma, true);
    });
    var makerMultiAsset = encodeMultiAssetAssetData(makerAssetAmounts, makerAssetDatas);
    makerAssetData = makerMultiAsset;
    makerAssetAmount = BigNumber.from(1); // needs to be 1 for multiasset wrapper amount (actual amounts are nested)
  } // Encode taker assets


  var takerAssetAmount;
  var takerAssetData;
  var takerAssetEligibleForSingleAsset = takerAssets.length === 1; // If we only have one asset to swap

  if (takerAssetEligibleForSingleAsset) {
    var takerAsset = takerAssets[0];
    takerAssetAmount = BigNumber.from(getAmountFromAsset(takerAsset));
    takerAssetData = encodeAssetData(takerAsset, false);
  } else {
    var takerAssetAmounts = takerAssets.map(function (ta) {
      return getAmountFromAsset(ta);
    });
    var takerAssetDatas = takerAssets.map(function (ta) {
      return encodeAssetData(ta, true);
    });
    var takerMultiAsset = encodeMultiAssetAssetData(convertCollectionToBN(takerAssetAmounts), takerAssetDatas);
    takerAssetData = takerMultiAsset;
    takerAssetAmount = BigNumber.from(1); // needs to be 1 for multiasset wrapper amount (actual amounts are nested)
  }

  var order = generateOrderFromAssetDatas(_extends({
    makerAssetAmount: makerAssetAmount,
    makerAssetData: makerAssetData,
    takerAddress: (_orderConfig$takerAdd = orderConfig.takerAddress) != null ? _orderConfig$takerAdd : NULL_ADDRESS,
    takerAssetAmount: takerAssetAmount,
    takerAssetData: takerAssetData,
    exchangeAddress: (_orderConfig$exchange = orderConfig.exchangeAddress) != null ? _orderConfig$exchange : ''
  }, orderConfig));
  return order;
};
var fillSignedOrder = /*#__PURE__*/function () {
  var _ref7 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(signedOrder, exchangeContract, overrides) {
    return runtime_1.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", exchangeContract.fillOrKillOrder(normalizeOrder(signedOrder), signedOrder.takerAssetAmount, signedOrder.signature, overrides));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function fillSignedOrder(_x22, _x23, _x24) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 *
 * @param walletAddress Owner of the asset
 * @param exchangeProxyAddressForAsset Exchange Proxy address specific to the ERC type (e.g. use the 0x ERC721 Proxy if you're using a 721 asset). This is the address that will need approval & does the spending/swap.
 * @param asset
 * @param provider
 * @returns
 */

var getApprovalStatus = /*#__PURE__*/function () {
  var _ref8 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(walletAddress, exchangeProxyAddressForAsset, asset, provider) {
    var erc20, erc20AllowanceBigNumber, MAX_APPROVAL_WITH_BUFFER, approvedForMax, erc721, erc721ApprovalForAllPromise, erc721ApprovedAddressForIdPromise, _yield$Promise$all, erc721ApprovalForAll, erc721ApprovedAddressForId, tokenIdApproved, erc1155, erc1155ApprovalForAll;

    return runtime_1.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.t0 = asset.type;
            _context8.next = _context8.t0 === 'ERC20' ? 3 : _context8.t0 === 'ERC721' ? 10 : _context8.t0 === 'ERC1155' ? 20 : 25;
            break;

          case 3:
            erc20 = ERC20__factory.connect(asset.tokenAddress, provider);
            _context8.next = 6;
            return erc20.allowance(walletAddress, exchangeProxyAddressForAsset);

          case 6:
            erc20AllowanceBigNumber = _context8.sent;
            // Weird issue with BigNumber and approvals...need to look into it, adding buffer.
            MAX_APPROVAL_WITH_BUFFER = BigNumber.from(MAX_APPROVAL.toString()).sub('100000000000000000');
            approvedForMax = erc20AllowanceBigNumber.gte(MAX_APPROVAL_WITH_BUFFER);
            return _context8.abrupt("return", {
              contractApproved: approvedForMax
            });

          case 10:
            erc721 = ERC721__factory.connect(asset.tokenAddress, provider);
            erc721ApprovalForAllPromise = erc721.isApprovedForAll(walletAddress, exchangeProxyAddressForAsset);
            erc721ApprovedAddressForIdPromise = erc721.getApproved(asset.tokenId);
            _context8.next = 15;
            return Promise.all([erc721ApprovalForAllPromise, erc721ApprovedAddressForIdPromise]);

          case 15:
            _yield$Promise$all = _context8.sent;
            erc721ApprovalForAll = _yield$Promise$all[0];
            erc721ApprovedAddressForId = _yield$Promise$all[1];
            tokenIdApproved = erc721ApprovedAddressForId.toLowerCase() === exchangeProxyAddressForAsset.toLowerCase();
            return _context8.abrupt("return", {
              contractApproved: erc721ApprovalForAll != null ? erc721ApprovalForAll : false,
              tokenIdApproved: tokenIdApproved
            });

          case 20:
            erc1155 = ERC1155__factory.connect(asset.tokenAddress, provider);
            _context8.next = 23;
            return erc1155.isApprovedForAll(walletAddress, exchangeProxyAddressForAsset);

          case 23:
            erc1155ApprovalForAll = _context8.sent;
            return _context8.abrupt("return", {
              contractApproved: erc1155ApprovalForAll != null ? erc1155ApprovalForAll : false
            });

          case 25:
            throw new UnexpectedAssetTypeError(asset.type);

          case 26:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getApprovalStatus(_x25, _x26, _x27, _x28) {
    return _ref8.apply(this, arguments);
  };
}(); // Some arbitrarily high number.
// TODO(johnrjj) - Support custom ERC20 approval amounts

var MAX_APPROVAL = /*#__PURE__*/BigNumber.from(2).pow(118);
/**
 * @param exchangeProxyAddressForAsset Exchange Proxy address specific to the ERC type (e.g. use the 0x ERC721 Proxy if you're using a 721 asset). This is the address that will need approval & does the spending/swap.
 * @param asset
 * @param signer Signer, must be a signer not a provider, as signed transactions are needed to approve
 * @param approve Optional, can specify to unapprove asset when set to false
 * @returns
 */

var approveAsset = /*#__PURE__*/function () {
  var _ref9 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(exchangeProxyAddressForAsset, asset, signer, overrides, approve) {
    var erc20, erc20ApprovalTxPromise, erc721, erc721ApprovalForAllPromise, erc1155, erc1155ApprovalForAll;
    return runtime_1.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            if (overrides === void 0) {
              overrides = {};
            }

            if (approve === void 0) {
              approve = true;
            }

            _context9.t0 = asset.type;
            _context9.next = _context9.t0 === 'ERC20' ? 5 : _context9.t0 === 'ERC721' ? 8 : _context9.t0 === 'ERC1155' ? 11 : 16;
            break;

          case 5:
            erc20 = ERC20__factory.connect(asset.tokenAddress, signer);
            erc20ApprovalTxPromise = erc20.approve(exchangeProxyAddressForAsset, approve ? MAX_APPROVAL.toString() : 0, _extends({}, overrides));
            return _context9.abrupt("return", erc20ApprovalTxPromise);

          case 8:
            erc721 = ERC721__factory.connect(asset.tokenAddress, signer);
            erc721ApprovalForAllPromise = erc721.setApprovalForAll(exchangeProxyAddressForAsset, approve, _extends({}, overrides));
            return _context9.abrupt("return", erc721ApprovalForAllPromise);

          case 11:
            erc1155 = ERC1155__factory.connect(asset.tokenAddress, signer);
            _context9.next = 14;
            return erc1155.setApprovalForAll(exchangeProxyAddressForAsset, approve, _extends({}, overrides));

          case 14:
            erc1155ApprovalForAll = _context9.sent;
            return _context9.abrupt("return", erc1155ApprovalForAll);

          case 16:
            throw new UnexpectedAssetTypeError(asset.type);

          case 17:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function approveAsset(_x29, _x30, _x31, _x32, _x33) {
    return _ref9.apply(this, arguments);
  };
}();
/**
 * @param exchangeProxyAddressForAsset Exchange Proxy address specific to the ERC type (e.g. use the 0x ERC721 Proxy if you're using a 721 asset). This is the address that will need approval & does the spending/swap.
 * @param asset
 * @param signer Signer, must be a signer not a provider, as signed transactions are needed to approve
 * @param approve Optional, can specify to unapprove asset when set to false
 * @returns
 */

var estimateGasForApproval = /*#__PURE__*/function () {
  var _ref10 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(exchangeProxyAddressForAsset, asset, signer, overrides, approve) {
    var erc20, erc20ApprovalTxPromise, erc721, erc721ApprovalForAllPromise, erc1155, erc1155ApprovalForAll;
    return runtime_1.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:

            if (approve === void 0) {
              approve = true;
            }

            _context10.t0 = asset.type;
            _context10.next = _context10.t0 === 'ERC20' ? 5 : _context10.t0 === 'ERC721' ? 8 : _context10.t0 === 'ERC1155' ? 11 : 16;
            break;

          case 5:
            erc20 = ERC20__factory.connect(asset.tokenAddress, signer);
            erc20ApprovalTxPromise = erc20.estimateGas.approve(exchangeProxyAddressForAsset, approve ? MAX_APPROVAL : 0);
            return _context10.abrupt("return", erc20ApprovalTxPromise);

          case 8:
            erc721 = ERC721__factory.connect(asset.tokenAddress, signer);
            erc721ApprovalForAllPromise = erc721.estimateGas.setApprovalForAll(exchangeProxyAddressForAsset, approve);
            return _context10.abrupt("return", erc721ApprovalForAllPromise);

          case 11:
            erc1155 = ERC1155__factory.connect(asset.tokenAddress, signer);
            _context10.next = 14;
            return erc1155.estimateGas.setApprovalForAll(exchangeProxyAddressForAsset, approve);

          case 14:
            erc1155ApprovalForAll = _context10.sent;
            return _context10.abrupt("return", erc1155ApprovalForAll);

          case 16:
            throw new UnexpectedAssetTypeError(asset.type);

          case 17:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function estimateGasForApproval(_x34, _x35, _x36, _x37, _x38) {
    return _ref10.apply(this, arguments);
  };
}();
var getSignatureTypeFromSignature = function getSignatureTypeFromSignature(signature) {
  var length = hexDataLength(signature);
  var signatureType = hexDataSlice(signature, length - 1);
  return signatureType;
};
var estimateGasForFillOrder = /*#__PURE__*/function () {
  var _ref11 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee11(signedOrder, exchangeContract, _overrides) {
    var estimatedGasRequiredForFill;
    return runtime_1.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return exchangeContract.estimateGas.fillOrder(normalizeOrder(signedOrder), signedOrder.takerAssetAmount, signedOrder.signature);

          case 2:
            estimatedGasRequiredForFill = _context11.sent;
            return _context11.abrupt("return", estimatedGasRequiredForFill);

          case 4:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function estimateGasForFillOrder(_x39, _x40, _x41) {
    return _ref11.apply(this, arguments);
  };
}();
var convertDecodedAssetDataToUserFacingAssets = function convertDecodedAssetDataToUserFacingAssets(decodedAssetData, assetAmount) {
  var _decodedErc1155$token;

  var assetProxyId = decodedAssetData.assetProxyId;

  switch (assetProxyId) {
    case AssetProxyId.ERC20:
      var decodedErc20 = decodedAssetData;
      var swappableErc20 = {
        type: 'ERC20',
        amount: assetAmount,
        tokenAddress: decodedErc20.tokenAddress
      };
      return [swappableErc20];

    case AssetProxyId.ERC721:
      var decodedErc721 = decodedAssetData;
      var swappableErc721 = {
        type: 'ERC721',
        tokenAddress: decodedErc721.tokenAddress,
        tokenId: decodedErc721.tokenId
      };
      return [swappableErc721];

    case AssetProxyId.ERC1155:
      var decodedErc1155 = decodedAssetData;
      var swappableErc1155 = {
        type: 'ERC1155',
        tokenAddress: decodedErc1155.tokenAddress,
        tokenId: decodedErc1155.tokenIds[0],
        amount: (_decodedErc1155$token = decodedErc1155.tokenValues[0]) != null ? _decodedErc1155$token : '1'
      };
      return [swappableErc1155];

    case AssetProxyId.MultiAsset:
      var multiAssetDecodedData = decodedAssetData;
      var nestedAssets = flatten(multiAssetDecodedData.nestedAssetData.map(function (asset, idx) {
        return convertDecodedAssetDataToUserFacingAssets(asset, multiAssetDecodedData.amounts[idx]);
      }));
      var nestedAssetsWithCorrectAmounts = nestedAssets.map(function (nestedAsset, idx) {
        var nestedAssetValueFromMultiAsset = multiAssetDecodedData.amounts[idx]; // Overwrite original nested asset amount, b/c when its nested inside a multiasset encoding, the multiasset top level values take over.

        return _extends({}, nestedAsset, {
          amount: nestedAssetValueFromMultiAsset
        });
      });
      return nestedAssetsWithCorrectAmounts;

    default:
      throw new Error("Unsupported AssetProxyId " + (assetProxyId == null ? void 0 : assetProxyId.type));
  }
};
var getAssetsFromOrder = function getAssetsFromOrder(order) {
  var decodedMakerAssetData = decodeAssetData(order.makerAssetData);
  var decodedTakerAssetData = decodeAssetData(order.takerAssetData);
  var makerAssets = convertDecodedAssetDataToUserFacingAssets(decodedMakerAssetData, order.makerAssetAmount);
  var takerAssets = convertDecodedAssetDataToUserFacingAssets(decodedTakerAssetData, order.takerAssetAmount);
  return {
    makerAssets: makerAssets,
    takerAssets: takerAssets
  };
}; // export const loadApprovalStatusAll = async (assets: Array<InterallySupportedAsset>) => {
//   const assetsGroupedByContractAddress = groupBy(assets, (asset) => asset.tokenAddress)
//   const todoPromises = Object.entries(assetsGroupedByContractAddress).map(
//     ([contractAddress, assetsWithSameTakerAddress]) => {
//       const type = assetsWithSameTakerAddress[0]?.type
//       switch (type) {
//         case SupportedTokenTypes.ERC20:
//           break
//         case SupportedTokenTypes.ERC721:
//           break
//         case SupportedTokenTypes.ERC1155:
//           break
//         default:
//           break
//       }
//     },
//   )
// }

var addresses = {
	"1": {
	exchange: "0x61935cbdd02287b511119ddb11aeb42f1593b7ef",
	erc20Proxy: "0x95e6f48254609a6ee006f7d493c8e5fb97094cef",
	erc721Proxy: "0xefc70a1b18c432bdc64b596838b4d138f6bc6cad",
	erc1155Proxy: "0x7eefbd48fd63d441ec7435d024ec7c5131019add",
	multiAssetProxy: "0xef701d5389ae74503d633396c4d654eabedc9d78",
	forwarder: "0x6958f5e95332d93d21af0d7b9ca85b8212fee0a5",
	wrappedNativeToken: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
},
	"3": {
	exchange: "0x5d8c9ba74607d2cbc4176882a42d4ace891c1c00",
	erc20Proxy: "0xf1ec7d0ba42f15fb5c9e3adbe86431973e44764c",
	erc721Proxy: "0x070efeb7e5ffa3d1a59d03a219539551ae60ba43",
	erc1155Proxy: "0x7f10d80f2659aaae790ab03da12be11c4e6008c3",
	multiAssetProxy: "0x7b70a148e20b348c320208df84fdd642aab49fd0",
	forwarder: "0x2127a60bedfba1c01857b09b8f24094049c48493",
	wrappedNativeToken: null
},
	"4": {
	exchange: "0xf8becacec90bfc361c0a2c720839e08405a72f6d",
	erc20Proxy: "0x070efeb7e5ffa3d1a59d03a219539551ae60ba43",
	erc721Proxy: "0x7f10d80f2659aaae790ab03da12be11c4e6008c3",
	erc1155Proxy: "0xaa460127562482faa5df42f2c39a025cd4a1cc0a",
	multiAssetProxy: "0xb344afed348de15eb4a9e180205a2b0739628339",
	forwarder: "0x18571835c95a6d79b2f5c45b676ccd16f5fa34a1",
	wrappedNativeToken: "0xc778417e063141139fce010982780140aa0cd5ab"
},
	"42": {
	exchange: "0xf1ec7d0ba42f15fb5c9e3adbe86431973e44764c",
	erc20Proxy: "0xaa460127562482faa5df42f2c39a025cd4a1cc0a",
	erc721Proxy: "0x7b70a148e20b348c320208df84fdd642aab49fd0",
	erc1155Proxy: "0xb344afed348de15eb4a9e180205a2b0739628339",
	multiAssetProxy: "0x58a01e826e60731247e7de8b446ed4c8535a099c",
	forwarder: "0x01c0ecf5d1a22de07a2de84c322bfa2b5435990e",
	wrappedNativeToken: "0xd0a1e359811322d97991e03f863a0c30c2cf029c"
},
	"56": {
	exchange: "0x0000000000000000000000000000000000000000",
	erc20Proxy: "0x0000000000000000000000000000000000000000",
	erc721Proxy: "0x0000000000000000000000000000000000000000",
	erc1155Proxy: "0x0000000000000000000000000000000000000000",
	multiAssetProxy: "0x0000000000000000000000000000000000000000",
	forwarder: "0x0000000000000000000000000000000000000000",
	wrappedNativeToken: null
},
	"137": {
	exchange: "0x0C58C1170f1DEd633862A1166f52107490a9C594",
	erc20Proxy: "0xb9456408E12f3587Ed59E07CC6916768D1117907",
	erc721Proxy: "0x9F1949A5c3AC012fFcded5e93ffD97A86dBF98cC",
	erc1155Proxy: "0x633d89e0C08D3C482C4E0bEE674692A48cADD680",
	multiAssetProxy: "0x4f9b1eDAE8C75b9e1934ce21De598ff0D9f32aBD",
	forwarder: "0x163978F66E23bE5a64DBCd224dd90B78C2f71B98",
	wrappedNativeToken: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"
},
	"1337": {
	erc20Proxy: "0x1dc4c1cefef38a777b15aa20260a54e584b16c48",
	erc721Proxy: "0x0000000000000000000000000000000000000000",
	erc1155Proxy: "0x0000000000000000000000000000000000000000",
	exchange: "0x0000000000000000000000000000000000000000",
	multiAssetProxy: "0x0000000000000000000000000000000000000000",
	forwarder: "0x5d3ad3561a1235273cbcb4e82fce63a0073d19be",
	wrappedNativeToken: null
},
	"1452": {
	exchange: "0xEB3bB8D5279638CE97598584a7e6A6ca92916fE3",
	erc20Proxy: "0x5d8C875647da92c316faDb410C23027508e1d886",
	erc721Proxy: "0x73b78d84E1D9535B9EB4b51b4B59D4B272E000c6",
	erc1155Proxy: "0xBBE6004775b07692A73961b634F0e7fF472F9045",
	multiAssetProxy: "0x45139d8B75f0A76E6645209Fb8C6d89AdB6F9c68",
	forwarder: "0x0000000000000000000000000000000000000000",
	wrappedNativeToken: "0x624814Bca9A5d5620E350264f839b93f766B60a2"
},
	"1777": {
	exchange: "",
	erc20Proxy: "",
	erc721Proxy: "",
	erc1155Proxy: "",
	multiAssetProxy: "",
	forwarder: "",
	wrappedNativeToken: ""
},
	"43114": {
	exchange: "0x0000000000000000000000000000000000000000",
	erc20Proxy: "0x0000000000000000000000000000000000000000",
	erc721Proxy: "0x0000000000000000000000000000000000000000",
	erc1155Proxy: "0x0000000000000000000000000000000000000000",
	multiAssetProxy: "0x0000000000000000000000000000000000000000",
	forwarder: "0x0000000000000000000000000000000000000000",
	wrappedNativeToken: null
},
	"80001": {
	exchange: "0x9866c45224667061f8c9e66db38d9316a8d68951",
	erc20Proxy: "0xfcEB29377a6e0A86E9fa648016b459AB8Fbfcf5A",
	erc721Proxy: "0x0C58C1170f1DEd633862A1166f52107490a9C594",
	erc1155Proxy: "0x9F1949A5c3AC012fFcded5e93ffD97A86dBF98cC",
	multiAssetProxy: "0xA01Fae8743bb144D4411292a1e6e0B5bfF84Fc5A",
	forwarder: "0xEE9c5Ed9b1bbf9Bf66575Bcc0Eb37dBeC2C525F1",
	wrappedNativeToken: "0x9c3c9283d3e44854697cd22d3faa240cfb032889"
}
};

var getZeroExAddressesForChain = function getZeroExAddressesForChain(chainId, addresses$1) {
  if (addresses$1 === void 0) {
    addresses$1 = addresses;
  }

  var chainIdString = chainId.toString(10);
  var maybeAddressesForChain = addresses$1[chainIdString];
  return maybeAddressesForChain;
};

var getProxyAddressForErcType = function getProxyAddressForErcType(assetType, chainId, addresses$1) {
  if (addresses$1 === void 0) {
    addresses$1 = addresses;
  }

  var zeroExAddresses = getZeroExAddressesForChain(chainId, addresses$1);

  if (!zeroExAddresses) {
    throw new UnsupportedChainId(chainId);
  }

  switch (assetType) {
    case 'ERC20':
      return zeroExAddresses.erc20Proxy;

    case 'ERC721':
      return zeroExAddresses.erc721Proxy;

    case 'ERC1155':
      return zeroExAddresses.erc1155Proxy;

    default:
      throw new UnexpectedAssetTypeError(assetType);
  }
};
var getForwarderAddress = function getForwarderAddress(chainId, addresses$1) {
  if (addresses$1 === void 0) {
    addresses$1 = addresses;
  }

  var zeroExAddresses = getZeroExAddressesForChain(chainId, addresses$1);

  if (!zeroExAddresses) {
    throw new UnsupportedChainId(chainId);
  }

  return zeroExAddresses.forwarder;
};
var getWrappedNativeToken = function getWrappedNativeToken(chainId, addresses$1) {
  var _zeroExAddresses$wrap;

  if (addresses$1 === void 0) {
    addresses$1 = addresses;
  }

  var zeroExAddresses = getZeroExAddressesForChain(chainId, addresses$1);
  return (_zeroExAddresses$wrap = zeroExAddresses == null ? void 0 : zeroExAddresses.wrappedNativeToken) != null ? _zeroExAddresses$wrap : null;
};

var _DEFAUTLT_GAS_BUFFER_;
var DEFAUTLT_GAS_BUFFER_MULTIPLES = (_DEFAUTLT_GAS_BUFFER_ = {}, _DEFAUTLT_GAS_BUFFER_[SupportedChainIdsV3.Polygon] = 1.5, _DEFAUTLT_GAS_BUFFER_[SupportedChainIdsV3.PolygonMumbai] = 1.5, _DEFAUTLT_GAS_BUFFER_[SupportedChainIdsV3.Kovan] = 1.5, _DEFAUTLT_GAS_BUFFER_);

var sleep = function sleep(t) {
  return new Promise(function (resolve) {
    var timeout = setTimeout(function () {
      clearTimeout(timeout);
      resolve();
    }, t);
  });
};

/**
 * NftSwap Convenience class to swap between ERC20, ERC721, and ERC1155. Primary entrypoint for swapping.
 */

var NftSwapV3 = /*#__PURE__*/function () {
  function NftSwapV3(provider, signer, chainId, additionalConfig) {
    var _this = this,
        _additionalConfig$exc,
        _additionalConfig$erc,
        _additionalConfig$erc2,
        _additionalConfig$erc3,
        _ref12,
        _additionalConfig$for,
        _ref13,
        _additionalConfig$wra,
        _additionalConfig$gas;

    this.cancelOrder = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(order) {
        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", cancelOrder(_this.exchangeContract, order));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
    /**
     *
     * @param order : 0x Order;
     * @param timeoutInMs : Timeout in millisecond to give up listening for order fill
     * @param throwIfStatusOtherThanFillableOrFilled : Option to throw if status changes from fillable to anything other than 'filled' (e.g 'cancelled')
     * @returns OrderInfo if status change in order, or null if timed out
     */


    this.waitUntilOrderFilledOrCancelled = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(order, timeoutInMs, pollOrderStatusFrequencyInMs, throwIfStatusOtherThanFillableOrFilled) {
        var settled, timeoutPromise, orderStatusRefreshPromiseFn, fillEventListenerFn, orderStatusRefreshPromiseLoop, fillEventPromise, orderInfo;
        return runtime_1.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (timeoutInMs === void 0) {
                  timeoutInMs = 60 * 1000;
                }

                if (pollOrderStatusFrequencyInMs === void 0) {
                  pollOrderStatusFrequencyInMs = 10000;
                }

                if (throwIfStatusOtherThanFillableOrFilled === void 0) {
                  throwIfStatusOtherThanFillableOrFilled = false;
                }

                settled = false;
                timeoutPromise = sleep(timeoutInMs).then(function (_) {
                  return null;
                });

                orderStatusRefreshPromiseFn = /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
                    var _orderInfo, _ref4, _OrderStatusCodeLooku;

                    return runtime_1.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            if (settled) {
                              _context2.next = 19;
                              break;
                            }

                            _context2.next = 3;
                            return _this.getOrderInfo(order);

                          case 3:
                            _orderInfo = _context2.sent;

                            if (!(_orderInfo.orderStatus === OrderStatusV3.Fillable)) {
                              _context2.next = 10;
                              break;
                            }

                            _context2.next = 7;
                            return sleep(pollOrderStatusFrequencyInMs);

                          case 7:
                            return _context2.abrupt("continue", 0);

                          case 10:
                            if (!(_orderInfo.orderStatus === OrderStatusV3.FullyFilled)) {
                              _context2.next = 14;
                              break;
                            }

                            return _context2.abrupt("return", _orderInfo);

                          case 14:
                            if (!throwIfStatusOtherThanFillableOrFilled) {
                              _context2.next = 16;
                              break;
                            }

                            throw new Error((_ref4 = (_OrderStatusCodeLooku = OrderStatusCodeLookup[_orderInfo.orderStatus]) != null ? _OrderStatusCodeLooku : _orderInfo.orderStatus) != null ? _ref4 : 'Unknown status');

                          case 16:
                            return _context2.abrupt("return", _orderInfo);

                          case 17:
                            _context2.next = 0;
                            break;

                          case 19:
                            return _context2.abrupt("return", null);

                          case 20:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function orderStatusRefreshPromiseFn() {
                    return _ref3.apply(this, arguments);
                  };
                }();

                fillEventListenerFn = /*#__PURE__*/function () {
                  var _ref5 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3() {
                    return runtime_1.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return sleep(timeoutInMs * 2);

                          case 2:
                            return _context3.abrupt("return", null);

                          case 3:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function fillEventListenerFn() {
                    return _ref5.apply(this, arguments);
                  };
                }();

                orderStatusRefreshPromiseLoop = orderStatusRefreshPromiseFn();
                fillEventPromise = fillEventListenerFn();
                _context4.next = 11;
                return Promise.any([timeoutPromise, orderStatusRefreshPromiseLoop, fillEventPromise]);

              case 11:
                orderInfo = _context4.sent;
                settled = true;
                return _context4.abrupt("return", orderInfo);

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x2, _x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
      };
    }();

    this.getOrderInfo = /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(order) {
        return runtime_1.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", getOrderInfo(_this.exchangeContract, order));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x6) {
        return _ref6.apply(this, arguments);
      };
    }();

    this.getOrderStatus = /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(order) {
        var orderInfo;
        return runtime_1.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this.getOrderInfo(order);

              case 2:
                orderInfo = _context6.sent;
                return _context6.abrupt("return", orderInfo.orderStatus);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x7) {
        return _ref7.apply(this, arguments);
      };
    }();

    this.awaitTransactionHash = /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(txHash) {
        return runtime_1.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", _this.provider.waitForTransaction(txHash));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x8) {
        return _ref8.apply(this, arguments);
      };
    }();

    this.signOrder = /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(order, addressOfWalletSigningOrder, signerOverride, signingOptions) {
        var signerToUser;
        return runtime_1.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                signerToUser = signerOverride != null ? signerOverride : _this.signer;

                if (signerToUser) {
                  _context8.next = 3;
                  break;
                }

                throw new Error('signOrder:Signer undefined');

              case 3:
                return _context8.abrupt("return", signOrder(order, addressOfWalletSigningOrder, signerToUser, _this.provider, _this.chainId, _this.exchangeContract.address, signingOptions));

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      return function (_x9, _x10, _x11, _x12) {
        return _ref9.apply(this, arguments);
      };
    }();

    this.buildOrder = function (makerAssets, takerAssets, makerAddress, userConfig) {
      var defaultConfig = {
        chainId: _this.chainId,
        makerAddress: makerAddress
      };

      var config = _extends({}, defaultConfig, userConfig);

      return buildOrder(convertAssetsToInternalFormat(makerAssets), convertAssetsToInternalFormat(takerAssets), config);
    };

    this.loadApprovalStatus = /*#__PURE__*/function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(asset, walletAddress) {
        var exchangeProxyAddressForAsset, assetInternalFmt;
        return runtime_1.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                // TODO(johnrjj) - Fix this...
                exchangeProxyAddressForAsset = getProxyAddressForErcType(asset.type, _this.chainId);
                assetInternalFmt = convertAssetToInternalFormat(asset);
                return _context9.abrupt("return", getApprovalStatus(walletAddress, exchangeProxyAddressForAsset, assetInternalFmt, _this.provider));

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      return function (_x13, _x14) {
        return _ref10.apply(this, arguments);
      };
    }();

    this.getOrderHash = function (order) {
      return hashOrder(order, _this.chainId, _this.exchangeContract.address);
    };

    this.getTypedData = function (chainId, exchangeContractAddress, order) {
      var domain = getEipDomain(chainId, exchangeContractAddress);
      var types = EIP712_TYPES;
      var value = order;
      return {
        domain: domain,
        types: types,
        value: value
      };
    };
    /**
     * Decodes readable order data (maker and taker assets) from the Order's encoded asset data
     * @param order : 0x Order (or Signed Order);
     * @returns Maker and taker assets for the order
     */


    this.getAssetsFromOrder = function (order) {
      return getAssetsFromOrder(order);
    };

    this.checkIfOrderCanBeFilledWithNativeToken = function (order, wrappedNativeTokenContractAddress) {
      var _wrappedNativeTokenCo;

      if (wrappedNativeTokenContractAddress === void 0) {
        var _this$wrappedNativeTo;

        wrappedNativeTokenContractAddress = (_this$wrappedNativeTo = _this.wrappedNativeTokenContractAddress) != null ? _this$wrappedNativeTo : undefined;
      }

      process.env.NODE_ENV !== "production" ? warning(_this.wrappedNativeTokenContractAddress, 'Wrapped native token contract address not set. Cannot determine if order can be filled with native token') : void 0;
      var decodedAssetData = decodeAssetData(order.takerAssetData); // Can only fill with native token when taker asset is ERC20. (Multiasset is not supported)

      if (decodedAssetData.assetProxyId.toLowerCase() !== AssetProxyId.ERC20.toLowerCase()) {
        return false;
      } // If we get this far, we have a single asset (non-multiasset) ERC20 for the taker token.
      // Let's check if it is the wrapped native contract address for this chain (e.g. WETH on mainnet or rinkeby, WMATIC on polygon)


      var erc20TokenAddress = decodedAssetData.tokenAddress;
      !erc20TokenAddress ? process.env.NODE_ENV !== "production" ? invariant(false, 'ERC20 token address missing from detected ERC20 asset data') : invariant(false) : void 0;
      return erc20TokenAddress.toLowerCase() === ((_wrappedNativeTokenCo = wrappedNativeTokenContractAddress) == null ? void 0 : _wrappedNativeTokenCo.toLowerCase());
    };

    this.fillSignedOrder = /*#__PURE__*/function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(signedOrder, fillOverrides, transactionOverrides) {
        var _fillOverrides$exchan;

        var exchangeContract, gasBufferMultiple, _fillOverrides$gasAmo, maybeCustomGasLimit, estimatedGasAmount, allTxOverrides, _this$signer, eligibleForNativeTokenFill, forwarderContract, amountOfEthToFillWith;

        return runtime_1.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (transactionOverrides === void 0) {
                  transactionOverrides = {};
                }

                exchangeContract = (_fillOverrides$exchan = fillOverrides == null ? void 0 : fillOverrides.exchangeContract) != null ? _fillOverrides$exchan : _this.exchangeContract;
                gasBufferMultiple = undefined;

                if ((fillOverrides == null ? void 0 : fillOverrides.gasAmountBufferMultiple) === null) {
                  // keep gasBufferMultiple undefined, b/c user specifically specified null.
                  gasBufferMultiple = undefined;
                } else {
                  gasBufferMultiple = (_fillOverrides$gasAmo = fillOverrides == null ? void 0 : fillOverrides.gasAmountBufferMultiple) != null ? _fillOverrides$gasAmo : _this.getGasMultipleForChainId(_this.chainId);
                }

                if (!gasBufferMultiple) {
                  _context10.next = 9;
                  break;
                }

                _context10.next = 7;
                return estimateGasForFillOrder(signedOrder, exchangeContract);

              case 7:
                estimatedGasAmount = _context10.sent;
                // NOTE(johnrjj) - Underflow issues, so we convert to number. Gas amounts shouldn't overflow.
                maybeCustomGasLimit = Math.floor(estimatedGasAmount.toNumber() * gasBufferMultiple);

              case 9:
                allTxOverrides = _extends({
                  gasLimit: maybeCustomGasLimit
                }, transactionOverrides);

                if (!(fillOverrides != null && fillOverrides.fillOrderWithNativeTokenInsteadOfWrappedToken)) {
                  _context10.next = 17;
                  break;
                }

                eligibleForNativeTokenFill = _this.checkIfOrderCanBeFilledWithNativeToken(signedOrder);
                process.env.NODE_ENV !== "production" ? warning(eligibleForNativeTokenFill, "Order ineligible for native token fill, fill will fail.") : void 0;
                !_this.forwarderContractAddress ? process.env.NODE_ENV !== "production" ? invariant(false, 'Forwarder contract address null, cannot fill order in native token') : invariant(false) : void 0;
                forwarderContract = Forwarder__factory.connect(_this.forwarderContractAddress, (_this$signer = _this.signer) != null ? _this$signer : _this.provider);
                amountOfEthToFillWith = signedOrder.takerAssetAmount;
                return _context10.abrupt("return", forwarderContract.marketBuyOrdersWithEth([signedOrder], signedOrder.makerAssetAmount, [signedOrder.signature], [], [], _extends({
                  value: amountOfEthToFillWith
                }, allTxOverrides)));

              case 17:
                return _context10.abrupt("return", fillSignedOrder(signedOrder, exchangeContract, allTxOverrides));

              case 18:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      return function (_x15, _x16, _x17) {
        return _ref11.apply(this, arguments);
      };
    }();

    this.getGasMultipleForChainId = function (chainId) {
      if (_this.gasBufferMultiples) {
        return _this.gasBufferMultiples[_this.chainId];
      }

      return undefined;
    };

    this.normalizeOrder = function (order) {
      var normalizedOrder = normalizeOrder(order);

      return normalizedOrder;
    };

    this.normalizeSignedOrder = function (order) {
      var normalizedOrder = normalizeOrder(order);

      return normalizedOrder;
    };

    this.verifyOrderSignature = function (order, signature, chainId, exchangeContractAddress) {
      return verifyOrderSignature(order, signature, chainId, exchangeContractAddress);
    };

    this.provider = provider;
    this.signer = signer;
    this.chainId = chainId != null ? chainId : this.provider._network.chainId;
    var chainDefaultContractAddresses = addresses[this.chainId];
    var zeroExExchangeContractAddress = (_additionalConfig$exc = additionalConfig == null ? void 0 : additionalConfig.exchangeContractAddress) != null ? _additionalConfig$exc : chainDefaultContractAddresses == null ? void 0 : chainDefaultContractAddresses.exchange;
    process.env.NODE_ENV !== "production" ? warning(chainDefaultContractAddresses, "Default contract addresses missing for chain " + this.chainId + ". Supply ExchangeContract and Asset Proxy contracts manually via additionalConfig argument") : void 0;
    this.exchangeContractAddress = zeroExExchangeContractAddress;
    this.erc20ProxyContractAddress = (_additionalConfig$erc = additionalConfig == null ? void 0 : additionalConfig.erc20ProxyContractAddress) != null ? _additionalConfig$erc : getProxyAddressForErcType(SupportedTokenTypes.ERC20, this.chainId);
    this.erc721ProxyContractAddress = (_additionalConfig$erc2 = additionalConfig == null ? void 0 : additionalConfig.erc721ProxyContractAddress) != null ? _additionalConfig$erc2 : getProxyAddressForErcType(SupportedTokenTypes.ERC721, this.chainId);
    this.erc1155ProxyContractAddress = (_additionalConfig$erc3 = additionalConfig == null ? void 0 : additionalConfig.erc1155ProxyContractAddress) != null ? _additionalConfig$erc3 : getProxyAddressForErcType(SupportedTokenTypes.ERC1155, this.chainId);
    this.forwarderContractAddress = (_ref12 = (_additionalConfig$for = additionalConfig == null ? void 0 : additionalConfig.forwarderContractAddress) != null ? _additionalConfig$for : getForwarderAddress(this.chainId)) != null ? _ref12 : null;
    this.wrappedNativeTokenContractAddress = (_ref13 = (_additionalConfig$wra = additionalConfig == null ? void 0 : additionalConfig.wrappedNativeTokenContractAddress) != null ? _additionalConfig$wra : getWrappedNativeToken(this.chainId)) != null ? _ref13 : null;
    !this.exchangeContractAddress ? process.env.NODE_ENV !== "production" ? invariant(false, '0x V3 Exchange Contract Address not set. Exchange Contract is required to load NftSwap') : invariant(false) : void 0;
    process.env.NODE_ENV !== "production" ? warning(this.erc20ProxyContractAddress, 'ERC20Proxy Contract Address not set, ERC20 swaps will not work') : void 0;
    process.env.NODE_ENV !== "production" ? warning(this.erc721ProxyContractAddress, 'ERC721Proxy Contract Address not set, ERC721 swaps will not work') : void 0;
    process.env.NODE_ENV !== "production" ? warning(this.erc1155ProxyContractAddress, 'ERC20Proxy Contract Address not set, ERC1155 swaps will not work') : void 0;
    process.env.NODE_ENV !== "production" ? warning(this.forwarderContractAddress, 'Forwarder Contract Address not set, native token fills will not work') : void 0;
    process.env.NODE_ENV !== "production" ? warning(this.wrappedNativeTokenContractAddress, 'WETH Contract Address not set, SDK cannot automatically check if order can be filled with native token') : void 0;
    process.env.NODE_ENV !== "production" ? warning(this.signer, 'No Signer provided; Read-only mode only.') : void 0; // Initialize Exchange contract so we can interact with it easily.

    this.exchangeContract = ExchangeContract__factory.connect(zeroExExchangeContractAddress, signer != null ? signer : provider);
    this.gasBufferMultiples = (_additionalConfig$gas = additionalConfig == null ? void 0 : additionalConfig.gasBufferMultiples) != null ? _additionalConfig$gas : DEFAUTLT_GAS_BUFFER_MULTIPLES;
  }
  /**
   * @param asset Asset in the SDK format
   * @returns
   */


  var _proto = NftSwapV3.prototype;

  _proto.approveTokenOrNftByAsset =
  /*#__PURE__*/
  function () {
    var _approveTokenOrNftByAsset = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee11(asset, _walletAddress, // Remove in next release
    approvalTransactionOverrides, otherOverrides) {
      var _otherOverrides$excha, _otherOverrides$signe, _otherOverrides$appro2;

      var exchangeProxyAddressForAsset, signerToUse, gasBufferMultiple, _otherOverrides$gasAm, maybeCustomGasLimit, _otherOverrides$appro, estimatedGasAmount;

      return runtime_1.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              // TODO(johnrjj) - Look up via class fields instead...
              exchangeProxyAddressForAsset = (_otherOverrides$excha = otherOverrides == null ? void 0 : otherOverrides.exchangeProxyContractAddressForAsset) != null ? _otherOverrides$excha : getProxyAddressForErcType(asset.type, this.chainId);
              signerToUse = (_otherOverrides$signe = otherOverrides == null ? void 0 : otherOverrides.signer) != null ? _otherOverrides$signe : this.signer;

              if (signerToUse) {
                _context11.next = 4;
                break;
              }

              throw new Error('approveTokenOrNftByAsset:Signer null');

            case 4:

              gasBufferMultiple = undefined;

              if ((otherOverrides == null ? void 0 : otherOverrides.gasAmountBufferMultiple) === null) {
                // keep gasBufferMultiple undefined, b/c user specifically specified null.
                gasBufferMultiple = undefined;
              } else {
                gasBufferMultiple = (_otherOverrides$gasAm = otherOverrides == null ? void 0 : otherOverrides.gasAmountBufferMultiple) != null ? _otherOverrides$gasAm : this.getGasMultipleForChainId(this.chainId);
              }

              if (!gasBufferMultiple) {
                _context11.next = 12;
                break;
              }

              _context11.next = 10;
              return estimateGasForApproval(exchangeProxyAddressForAsset, convertAssetToInternalFormat(asset), signerToUse, approvalTransactionOverrides != null ? approvalTransactionOverrides : {}, (_otherOverrides$appro = otherOverrides == null ? void 0 : otherOverrides.approve) != null ? _otherOverrides$appro : true);

            case 10:
              estimatedGasAmount = _context11.sent;
              maybeCustomGasLimit = Math.floor(estimatedGasAmount.toNumber() * gasBufferMultiple);

            case 12:
              return _context11.abrupt("return", approveAsset(exchangeProxyAddressForAsset, convertAssetToInternalFormat(asset), signerToUse, _extends({
                gasLimit: maybeCustomGasLimit
              }, approvalTransactionOverrides), (_otherOverrides$appro2 = otherOverrides == null ? void 0 : otherOverrides.approve) != null ? _otherOverrides$appro2 : true));

            case 13:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function approveTokenOrNftByAsset(_x18, _x19, _x20, _x21) {
      return _approveTokenOrNftByAsset.apply(this, arguments);
    }

    return approveTokenOrNftByAsset;
  }();

  return NftSwapV3;
}();

var EIP712_DOMAIN_PARAMETERS = [{
  name: 'name',
  type: 'string'
}, {
  name: 'version',
  type: 'string'
}, {
  name: 'chainId',
  type: 'uint256'
}, {
  name: 'verifyingContract',
  type: 'address'
}];
var ERC721ORDER_STRUCT_NAME = 'ERC721Order';
var ERC721ORDER_STRUCT_ABI = [{
  type: 'uint8',
  name: 'direction'
}, {
  type: 'address',
  name: 'maker'
}, {
  type: 'address',
  name: 'taker'
}, {
  type: 'uint256',
  name: 'expiry'
}, {
  type: 'uint256',
  name: 'nonce'
}, {
  type: 'address',
  name: 'erc20Token'
}, {
  type: 'uint256',
  name: 'erc20TokenAmount'
}, {
  type: 'Fee[]',
  name: 'fees'
}, {
  type: 'address',
  name: 'erc721Token'
}, {
  type: 'uint256',
  name: 'erc721TokenId'
}, {
  type: 'Property[]',
  name: 'erc721TokenProperties'
}];
var EIP1155_DOMAIN_PARAMETERS = [{
  name: 'name',
  type: 'string'
}, {
  name: 'version',
  type: 'string'
}, {
  name: 'chainId',
  type: 'uint256'
}, {
  name: 'verifyingContract',
  type: 'address'
}];
var ERC1155ORDER_STRUCT_NAME = 'ERC1155Order';
var ERC1155ORDER_STRUCT_ABI = [{
  type: 'uint8',
  name: 'direction'
}, {
  type: 'address',
  name: 'maker'
}, {
  type: 'address',
  name: 'taker'
}, {
  type: 'uint256',
  name: 'expiry'
}, {
  type: 'uint256',
  name: 'nonce'
}, {
  type: 'address',
  name: 'erc20Token'
}, {
  type: 'uint256',
  name: 'erc20TokenAmount'
}, {
  type: 'Fee[]',
  name: 'fees'
}, {
  type: 'address',
  name: 'erc1155Token'
}, {
  type: 'uint256',
  name: 'erc1155TokenId'
}, {
  type: 'Property[]',
  name: 'erc1155TokenProperties'
}, {
  type: 'uint128',
  name: 'erc1155TokenAmount'
}];
var FEE_ABI = [{
  type: 'address',
  name: 'recipient'
}, {
  type: 'uint256',
  name: 'amount'
}, {
  type: 'bytes',
  name: 'feeData'
}];
var PROPERTY_ABI = [{
  type: 'address',
  name: 'propertyValidator'
}, {
  type: 'bytes',
  name: 'propertyData'
}];
var ETH_ADDRESS_AS_ERC20 = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
var NATIVE_TOKEN_ADDRESS_AS_ERC20 = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

var signOrderWithEoaWallet$1 = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(order, signer, chainId, exchangeContractAddress) {
    var _types, domain, types, value, rawSignatureFromEoaWallet, _types3, _domain, _types2, _value, _rawSignatureFromEoaWallet;

    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!order.erc1155Token) {
              _context.next = 8;
              break;
            }

            domain = {
              chainId: chainId,
              verifyingContract: exchangeContractAddress,
              name: 'ZeroEx',
              version: '1.0.0'
            };
            types = (_types = {}, _types[ERC1155ORDER_STRUCT_NAME] = ERC1155ORDER_STRUCT_ABI, _types.Fee = FEE_ABI, _types.Property = PROPERTY_ABI, _types);
            value = order;
            _context.next = 6;
            return signer._signTypedData(domain, types, value);

          case 6:
            rawSignatureFromEoaWallet = _context.sent;
            return _context.abrupt("return", rawSignatureFromEoaWallet);

          case 8:
            if (!order.erc721Token) {
              _context.next = 16;
              break;
            }

            _domain = {
              chainId: chainId,
              verifyingContract: exchangeContractAddress,
              name: 'ZeroEx',
              version: '1.0.0'
            };
            _types2 = (_types3 = {}, _types3[ERC721ORDER_STRUCT_NAME] = ERC721ORDER_STRUCT_ABI, _types3.Fee = FEE_ABI, _types3.Property = PROPERTY_ABI, _types3);
            _value = order;
            _context.next = 14;
            return signer._signTypedData(_domain, _types2, _value);

          case 14:
            _rawSignatureFromEoaWallet = _context.sent;
            return _context.abrupt("return", _rawSignatureFromEoaWallet);

          case 16:
            process.env.NODE_ENV !== "production" ? warning(!order, 'Unknown order type') : void 0;
            throw new Error("Unknown order type");

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signOrderWithEoaWallet(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
/**
 *
 * @param walletAddress Owner of the asset
 * @param exchangeProxyAddressForAsset Exchange Proxy address specific to the ERC type (e.g. use the 0x ERC721 Proxy if you're using a 721 asset). This is the address that will need approval & does the spending/swap.
 * @param asset
 * @param provider
 * @returns
 */

var getApprovalStatus$1 = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(walletAddress, exchangeProxyAddressForAsset, asset, provider) {
    var erc20, erc20AllowanceBigNumber, MAX_APPROVAL_WITH_BUFFER, approvedForMax, erc721, erc721ApprovalForAllPromise, erc721ApprovedAddressForIdPromise, _yield$Promise$all, erc721ApprovalForAll, erc721ApprovedAddressForId, tokenIdApproved, erc1155, erc1155ApprovalForAll;

    return runtime_1.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = asset.type;
            _context2.next = _context2.t0 === 'ERC20' ? 3 : _context2.t0 === 'ERC721' ? 12 : _context2.t0 === 'ERC1155' ? 22 : 27;
            break;

          case 3:
            if (!(asset.tokenAddress.toLowerCase() === ETH_ADDRESS_AS_ERC20)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", {
              contractApproved: true
            });

          case 5:
            erc20 = ERC20__factory.connect(asset.tokenAddress, provider);
            _context2.next = 8;
            return erc20.allowance(walletAddress, exchangeProxyAddressForAsset);

          case 8:
            erc20AllowanceBigNumber = _context2.sent;
            // Weird issue with BigNumber and approvals...need to look into it, adding buffer.
            MAX_APPROVAL_WITH_BUFFER = BigNumber.from(MAX_APPROVAL$1.toString()).sub('100000000000000000');
            approvedForMax = erc20AllowanceBigNumber.gte(MAX_APPROVAL_WITH_BUFFER);
            return _context2.abrupt("return", {
              contractApproved: approvedForMax
            });

          case 12:
            erc721 = ERC721__factory.connect(asset.tokenAddress, provider);
            erc721ApprovalForAllPromise = erc721.isApprovedForAll(walletAddress, exchangeProxyAddressForAsset);
            erc721ApprovedAddressForIdPromise = erc721.getApproved(asset.tokenId);
            _context2.next = 17;
            return Promise.all([erc721ApprovalForAllPromise, erc721ApprovedAddressForIdPromise]);

          case 17:
            _yield$Promise$all = _context2.sent;
            erc721ApprovalForAll = _yield$Promise$all[0];
            erc721ApprovedAddressForId = _yield$Promise$all[1];
            tokenIdApproved = erc721ApprovedAddressForId.toLowerCase() === exchangeProxyAddressForAsset.toLowerCase();
            return _context2.abrupt("return", {
              contractApproved: erc721ApprovalForAll != null ? erc721ApprovalForAll : false,
              tokenIdApproved: tokenIdApproved
            });

          case 22:
            erc1155 = ERC1155__factory.connect(asset.tokenAddress, provider);
            _context2.next = 25;
            return erc1155.isApprovedForAll(walletAddress, exchangeProxyAddressForAsset);

          case 25:
            erc1155ApprovalForAll = _context2.sent;
            return _context2.abrupt("return", {
              contractApproved: erc1155ApprovalForAll != null ? erc1155ApprovalForAll : false
            });

          case 27:
            throw new UnexpectedAssetTypeError(asset.type);

          case 28:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getApprovalStatus(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}(); // Some arbitrarily high number.
// TODO(johnrjj) - Support custom ERC20 approval amounts

var MAX_APPROVAL$1 = /*#__PURE__*/BigNumber.from(2).pow(118);
/**
 * @param exchangeProxyAddressForAsset Exchange Proxy address specific to the ERC type (e.g. use the 0x ERC721 Proxy if you're using a 721 asset). This is the address that will need approval & does the spending/swap.
 * @param asset
 * @param signer Signer, must be a signer not a provider, as signed transactions are needed to approve
 * @param approve Optional, can specify to unapprove asset when set to false
 * @returns
 */

var approveAsset$1 = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(exchangeProxyAddressForAsset, asset, signer, txOverrides, approvalOrderrides) {
    var _approvalOrderrides$a;

    var approve, erc20, erc20ApprovalTxPromise, erc721, erc721ApprovalForOnlyTokenId, erc721ApprovalForAllPromise, erc1155, erc1155ApprovalForAll;
    return runtime_1.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (txOverrides === void 0) {
              txOverrides = {};
            }

            approve = (_approvalOrderrides$a = approvalOrderrides == null ? void 0 : approvalOrderrides.approve) != null ? _approvalOrderrides$a : true;
            _context3.t0 = asset.type;
            _context3.next = _context3.t0 === 'ERC20' ? 5 : _context3.t0 === 'ERC721' ? 8 : _context3.t0 === 'ERC1155' ? 14 : 19;
            break;

          case 5:
            erc20 = ERC20__factory.connect(asset.tokenAddress, signer);
            erc20ApprovalTxPromise = erc20.approve(exchangeProxyAddressForAsset, approve ? MAX_APPROVAL$1.toString() : 0, _extends({}, txOverrides));
            return _context3.abrupt("return", erc20ApprovalTxPromise);

          case 8:
            erc721 = ERC721__factory.connect(asset.tokenAddress, signer); // If consumer prefers only to approve the tokenId, only approve tokenId

            if (!(approvalOrderrides != null && approvalOrderrides.approvalOnlyTokenIdIfErc721)) {
              _context3.next = 12;
              break;
            }

            erc721ApprovalForOnlyTokenId = erc721.approve(exchangeProxyAddressForAsset, asset.tokenId, _extends({}, txOverrides));
            return _context3.abrupt("return", erc721ApprovalForOnlyTokenId);

          case 12:
            // Otherwise default to approving entire contract
            erc721ApprovalForAllPromise = erc721.setApprovalForAll(exchangeProxyAddressForAsset, approve, _extends({}, txOverrides));
            return _context3.abrupt("return", erc721ApprovalForAllPromise);

          case 14:
            erc1155 = ERC1155__factory.connect(asset.tokenAddress, signer); // ERC1155s can only approval all

            _context3.next = 17;
            return erc1155.setApprovalForAll(exchangeProxyAddressForAsset, approve, _extends({}, txOverrides));

          case 17:
            erc1155ApprovalForAll = _context3.sent;
            return _context3.abrupt("return", erc1155ApprovalForAll);

          case 19:
            throw new UnexpectedAssetTypeError(asset.type);

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function approveAsset(_x9, _x10, _x11, _x12, _x13) {
    return _ref3.apply(this, arguments);
  };
}(); // Parse a hex signature returned by an RPC call into an `ECSignature`.

function parseRawSignature(rawSignature) {
  var hexSize = hexDataLength(rawSignature); // if (hexUtils.size(rpcSig) !== 65) {
  //     throw new Error(`Invalid RPC signature length: "${rpcSig}"`);
  // }

  if (hexSize !== 65) {
    throw new Error("Invalid signature length, expected 65, got " + hexSize + ".\n\"Raw signature: " + rawSignature + "\"");
  } // Some providers encode V as 0,1 instead of 27,28.


  var VALID_V_VALUES = [0, 1, 27, 28]; // Some providers return the signature packed as V,R,S and others R,S,V.
  // Try to guess which encoding it is (with a slight preference for R,S,V).
  // let v = parseInt(rpcSig.slice(-2), 16);

  var v = parseInt(rawSignature.slice(-2), 16);

  if (VALID_V_VALUES.includes(v)) {
    // Format is R,S,V
    v = v >= 27 ? v : v + 27;
    return {
      // r: hexDataSlice.slice(rpcSig, 0, 32),
      // s: hexUtils.slice(rpcSig, 32, 64),
      r: hexDataSlice(rawSignature, 0, 32),
      s: hexDataSlice(rawSignature, 32, 64),
      v: v
    };
  } // Format should be V,R,S
  // v = parseInt(rpcSig.slice(2, 4), 16);


  v = parseInt(rawSignature.slice(2, 4), 16);

  if (!VALID_V_VALUES.includes(v)) {
    throw new Error("Cannot determine RPC signature layout from V value: \"" + rawSignature + "\"");
  }

  v = v >= 27 ? v : v + 27;
  return {
    v: v,
    r: hexDataSlice(rawSignature, 1, 33),
    s: hexDataSlice(rawSignature, 33, 65)
  };
}
var INFINITE_EXPIRATION_TIMESTAMP_SEC = /*#__PURE__*/BigNumber.from(2524604400);
var generateErc721Order = function generateErc721Order(nft, erc20, orderData) {
  var _orderData$tokenPrope, _orderData$tokenPrope2, _orderData$fees$map, _orderData$fees, _orderData$nonce$toSt, _orderData$nonce, _orderData$taker$toLo, _orderData$taker;

  var expiry = INFINITE_EXPIRATION_TIMESTAMP_SEC.toString();

  if (orderData.expiry) {
    // If number is provided, assume given as unix timestamp
    if (typeof orderData.expiry === 'number') {
      expiry = orderData.expiry.toString();
    } else {
      // If date is provided, convert to unix timestamp
      expiry = getUnixTime(orderData.expiry).toString();
    }
  }

  var erc721Order = {
    erc721Token: nft.tokenAddress.toLowerCase(),
    erc721TokenId: nft.tokenId,
    direction: parseInt(orderData.direction.toString()),
    erc20Token: erc20.tokenAddress.toLowerCase(),
    erc20TokenAmount: erc20.amount,
    maker: orderData.maker.toLowerCase(),
    // Defaults not required...
    erc721TokenProperties: (_orderData$tokenPrope = (_orderData$tokenPrope2 = orderData.tokenProperties) == null ? void 0 : _orderData$tokenPrope2.map(function (property) {
      return {
        propertyData: property.propertyData,
        propertyValidator: property.propertyValidator
      };
    })) != null ? _orderData$tokenPrope : [],
    fees: (_orderData$fees$map = (_orderData$fees = orderData.fees) == null ? void 0 : _orderData$fees.map(function (x) {
      var _x$feeData$toString, _x$feeData;

      return {
        amount: x.amount.toString(),
        recipient: x.recipient.toLowerCase(),
        feeData: (_x$feeData$toString = (_x$feeData = x.feeData) == null ? void 0 : _x$feeData.toString()) != null ? _x$feeData$toString : '0x'
      };
    })) != null ? _orderData$fees$map : [],
    expiry: expiry,
    nonce: (_orderData$nonce$toSt = (_orderData$nonce = orderData.nonce) == null ? void 0 : _orderData$nonce.toString()) != null ? _orderData$nonce$toSt : generateRandomV4OrderNonce(orderData.appId),
    taker: (_orderData$taker$toLo = (_orderData$taker = orderData.taker) == null ? void 0 : _orderData$taker.toLowerCase()) != null ? _orderData$taker$toLo : NULL_ADDRESS
  };
  return erc721Order;
};
var generateErc1155Order = function generateErc1155Order(nft, erc20, orderData) {
  var _nft$amount, _orderData$tokenPrope3, _orderData$tokenPrope4, _orderData$fees$map2, _orderData$fees2, _orderData$nonce$toSt2, _orderData$nonce2, _orderData$taker$toLo2, _orderData$taker2;

  var expiry = INFINITE_EXPIRATION_TIMESTAMP_SEC.toString();

  if (orderData.expiry) {
    // If number is provided, assume given as unix timestamp
    if (typeof orderData.expiry === 'number') {
      expiry = orderData.expiry.toString();
    } else {
      // If date is provided, convert to unix timestamp
      expiry = getUnixTime(orderData.expiry).toString();
    }
  }

  var erc1155Order = {
    erc1155Token: nft.tokenAddress.toLowerCase(),
    erc1155TokenId: nft.tokenId,
    erc1155TokenAmount: (_nft$amount = nft.amount) != null ? _nft$amount : '1',
    direction: parseInt(orderData.direction.toString(10)),
    erc20Token: erc20.tokenAddress.toLowerCase(),
    erc20TokenAmount: erc20.amount,
    maker: orderData.maker.toLowerCase(),
    // Defaults not required...
    erc1155TokenProperties: (_orderData$tokenPrope3 = (_orderData$tokenPrope4 = orderData.tokenProperties) == null ? void 0 : _orderData$tokenPrope4.map(function (property) {
      return {
        propertyData: property.propertyData.toString(),
        propertyValidator: property.propertyValidator
      };
    })) != null ? _orderData$tokenPrope3 : [],
    fees: (_orderData$fees$map2 = (_orderData$fees2 = orderData.fees) == null ? void 0 : _orderData$fees2.map(function (fee) {
      var _fee$feeData$toString, _fee$feeData;

      return {
        amount: fee.amount.toString(),
        recipient: fee.recipient.toLowerCase(),
        feeData: (_fee$feeData$toString = (_fee$feeData = fee.feeData) == null ? void 0 : _fee$feeData.toString()) != null ? _fee$feeData$toString : '0x'
      };
    })) != null ? _orderData$fees$map2 : [],
    expiry: expiry,
    nonce: (_orderData$nonce$toSt2 = (_orderData$nonce2 = orderData.nonce) == null ? void 0 : _orderData$nonce2.toString()) != null ? _orderData$nonce$toSt2 : generateRandomV4OrderNonce(orderData.appId),
    taker: (_orderData$taker$toLo2 = (_orderData$taker2 = orderData.taker) == null ? void 0 : _orderData$taker2.toLowerCase()) != null ? _orderData$taker$toLo2 : NULL_ADDRESS
  };
  return erc1155Order;
}; // Number of digits in base 10 128bit nonce
// floor(log_10(2^128 - 1)) + 1

var ONE_TWENTY_EIGHT_BIT_LENGTH = 39; // Max nonce digit length in base 10
// floor(log_10(2^256 - 1)) + 1

var TWO_FIFTY_SIX_BIT_LENGTH = 78;

var checkIfStringContainsOnlyNumbers = function checkIfStringContainsOnlyNumbers(val) {
  var onlyNumbers = /^\d+$/.test(val);
  return onlyNumbers;
};

var RESERVED_APP_ID_PREFIX = '1001';
var RESERVED_APP_ID_PREFIX_DIGITS = RESERVED_APP_ID_PREFIX.length;
var DEFAULT_APP_ID = '314159';
var verifyAppIdOrThrow = function verifyAppIdOrThrow(appId) {
  var isCorrectLength = appId.length <= ONE_TWENTY_EIGHT_BIT_LENGTH - RESERVED_APP_ID_PREFIX_DIGITS;
  var hasOnlyNumbers = checkIfStringContainsOnlyNumbers(appId);
  !isCorrectLength ? process.env.NODE_ENV !== "production" ? invariant(false, 'appId must be 39 digits or less') : invariant(false) : void 0;
  !hasOnlyNumbers ? process.env.NODE_ENV !== "production" ? invariant(false, 'appId must be numeric only (no alpha or special characters, only numbers)') : invariant(false) : void 0;
};
/**
 * Generates a 256bit nonce.
 * The format:
 *   First 128bits:  ${SDK_PREFIX}${APP_ID}000000 (right padded zeroes to fill)
 *   Second 128bits: ${RANDOM_GENERATED_128BIT_ORDER_HASH}
 * @returns 128bit nonce as string (0x orders can handle up to 256 bit nonce)
 */

var generateRandomV4OrderNonce = function generateRandomV4OrderNonce(appId) {
  if (appId === void 0) {
    appId = DEFAULT_APP_ID;
  }

  if (appId) {
    verifyAppIdOrThrow(appId);
  }

  var order128 = padStart(generateRandom128BitNumber(), ONE_TWENTY_EIGHT_BIT_LENGTH, '0');
  var appId128 = padEnd("" + RESERVED_APP_ID_PREFIX + appId, ONE_TWENTY_EIGHT_BIT_LENGTH, '0');
  var final256BitNonce = "" + appId128 + order128;
  !(final256BitNonce.length <= TWO_FIFTY_SIX_BIT_LENGTH) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Invalid nonce size') : invariant(false) : void 0;
  return final256BitNonce;
}; // uuids are 128bits

var generateRandom128BitNumber = function generateRandom128BitNumber(base) {
  if (base === void 0) {
    base = 10;
  }

  var hex = '0x' + v4().replace(/-/g, '');
  var value = BigInt(hex);
  var valueBase10String = value.toString(base); // don't convert this to a number, will lose precision

  return valueBase10String;
};
var serializeNftOrder = function serializeNftOrder(signedOrder) {
  if ('erc721Token' in signedOrder) {
    return _extends({}, signedOrder, {
      direction: parseInt(signedOrder.direction.toString()),
      expiry: signedOrder.expiry.toString(),
      nonce: signedOrder.nonce.toString(),
      erc20TokenAmount: signedOrder.erc20TokenAmount.toString(),
      fees: signedOrder.fees.map(function (fee) {
        return _extends({}, fee, {
          amount: fee.amount.toString(),
          feeData: fee.feeData.toString()
        });
      }),
      erc721TokenId: signedOrder.erc721TokenId.toString()
    });
  } else if ('erc1155Token' in signedOrder) {
    return _extends({}, signedOrder, {
      direction: parseInt(signedOrder.direction.toString()),
      expiry: signedOrder.expiry.toString(),
      nonce: signedOrder.nonce.toString(),
      erc20TokenAmount: signedOrder.erc20TokenAmount.toString(),
      fees: signedOrder.fees.map(function (fee) {
        return _extends({}, fee, {
          amount: fee.amount.toString(),
          feeData: fee.feeData.toString()
        });
      }),
      erc1155TokenAmount: signedOrder.erc1155TokenAmount.toString(),
      erc1155TokenId: signedOrder.erc1155TokenId.toString()
    });
  } else {
    console.log('unknown order format type (not erc721 and not erc1155', signedOrder);
    throw new Error('Unknown asset type');
  }
};

var ERC721_TRANSFER_FROM_DATA = [{
  inputs: [{
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC721Token',
      name: 'erc721Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc721TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc721TokenProperties',
      type: 'tuple[]'
    }],
    internalType: 'struct LibNFTOrder.ERC721Order',
    name: 'order',
    type: 'tuple'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'signature',
    type: 'tuple'
  }, {
    name: 'unwrapNativeToken',
    type: 'bool'
  }],
  name: 'safeTransferFromErc721Data',
  outputs: [],
  stateMutability: 'view',
  type: 'function'
}];
var ERC1155_TRANSFER_FROM_DATA = [{
  inputs: [{
    components: [{
      internalType: 'enum LibNFTOrder.TradeDirection',
      name: 'direction',
      type: 'uint8'
    }, {
      internalType: 'address',
      name: 'maker',
      type: 'address'
    }, {
      internalType: 'address',
      name: 'taker',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'expiry',
      type: 'uint256'
    }, {
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256'
    }, {
      internalType: 'contract IERC20TokenV06',
      name: 'erc20Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc20TokenAmount',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }, {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }, {
        internalType: 'bytes',
        name: 'feeData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Fee[]',
      name: 'fees',
      type: 'tuple[]'
    }, {
      internalType: 'contract IERC1155Token',
      name: 'erc1155Token',
      type: 'address'
    }, {
      internalType: 'uint256',
      name: 'erc1155TokenId',
      type: 'uint256'
    }, {
      components: [{
        internalType: 'contract IPropertyValidator',
        name: 'propertyValidator',
        type: 'address'
      }, {
        internalType: 'bytes',
        name: 'propertyData',
        type: 'bytes'
      }],
      internalType: 'struct LibNFTOrder.Property[]',
      name: 'erc1155TokenProperties',
      type: 'tuple[]'
    }, {
      internalType: 'uint128',
      name: 'erc1155TokenAmount',
      type: 'uint128'
    }],
    internalType: 'struct LibNFTOrder.ERC1155Order[]',
    name: 'sellOrders',
    type: 'tuple[]'
  }, {
    components: [{
      internalType: 'enum LibSignature.SignatureType',
      name: 'signatureType',
      type: 'uint8'
    }, {
      internalType: 'uint8',
      name: 'v',
      type: 'uint8'
    }, {
      internalType: 'bytes32',
      name: 'r',
      type: 'bytes32'
    }, {
      internalType: 'bytes32',
      name: 's',
      type: 'bytes32'
    }],
    internalType: 'struct LibSignature.Signature',
    name: 'signature',
    type: 'tuple'
  }, {
    name: 'unwrapNativeToken',
    type: 'bool'
  }],
  name: 'safeTransferFromErc1155Data',
  outputs: [],
  stateMutability: 'view',
  type: 'function'
}];

var addresses$1 = {
	"1": {
	exchange: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
	wrappedNativeToken: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
},
	"3": {
	exchange: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
	wrappedNativeToken: "0xc778417e063141139fce010982780140aa0cd5ab"
},
	"4": {
	exchange: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
	wrappedNativeToken: "0xc778417e063141139fce010982780140aa0cd5ab"
},
	"8": {
	exchange: "0x19aaD856cE8c4C7e813233b21d56dA97796cC052",
	wrappedNativeToken: "0x1FA6A37c64804C0D797bA6bC1955E50068FbF362"
},
	"10": {
	exchange: "0xdef1abe32c034e558cdd535791643c58a13acc10",
	wrappedNativeToken: "0x4200000000000000000000000000000000000006"
},
	"42": {
	exchange: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
	wrappedNativeToken: "0xd0a1e359811322d97991e03f863a0c30c2cf029c"
},
	"56": {
	exchange: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
	wrappedNativeToken: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"
},
	"137": {
	exchange: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
	wrappedNativeToken: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"
},
	"250": {
	exchange: "0xdef189deaef76e379df891899eb5a00a94cbc250",
	wrappedNativeToken: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83"
},
	"1337": {
	exchange: "0x5315e44798395d4a952530d131249fe00f554565",
	wrappedNativeToken: "0x0b1ba0af832d7c05fd64161e0db78e85978e8082"
},
	"1452": {
	exchange: "0x6c7F935252cc0F316f12C59282540f7D8eE6bE9a",
	wrappedNativeToken: "0x624814Bca9A5d5620E350264f839b93f766B60a2"
},
	"1777": {
	exchange: "",
	wrappedNativeToken: ""
},
	"42161": {
	exchange: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
	wrappedNativeToken: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1"
},
	"42220": {
	exchange: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
	wrappedNativeToken: "0x471EcE3750Da237f93B8E339c536989b8978a438"
},
	"43114": {
	exchange: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
	wrappedNativeToken: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"
},
	"80001": {
	exchange: "0x4fb72262344034e034fce3d9c701fd9213a55260",
	wrappedNativeToken: "0x9c3c9283d3e44854697cd22d3faa240cfb032889"
}
};

var ORDERBOOK_API_ROOT_URL_PRODUCTION = 'https://api.trader.xyz';

var postOrderToOrderbook = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(signedOrder, chainId, metadata, requestOptions, fetchFn) {
    var _requestOptions$rootU;

    var payload, rootUrl, orderPostResult;
    return runtime_1.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (metadata === void 0) {
              metadata = {};
            }

            if (fetchFn === void 0) {
              fetchFn = unfetch;
            }

            payload = {
              order: serializeNftOrder(signedOrder),
              chainId: chainId.toString(10),
              metadata: metadata
            };
            rootUrl = (_requestOptions$rootU = requestOptions == null ? void 0 : requestOptions.rootUrl) != null ? _requestOptions$rootU : ORDERBOOK_API_ROOT_URL_PRODUCTION;
            _context2.next = 6;
            return fetchFn(rootUrl + "/orderbook/order", {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload)
            }).then( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(res) {
                return runtime_1.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (res.ok) {
                          _context.next = 4;
                          break;
                        }

                        _context.next = 3;
                        return res.json();

                      case 3:
                        throw _context.sent;

                      case 4:
                        if (!(res.status >= 300)) {
                          _context.next = 8;
                          break;
                        }

                        _context.next = 7;
                        return res.json();

                      case 7:
                        throw _context.sent;

                      case 8:
                        return _context.abrupt("return", res.json());

                      case 9:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x6) {
                return _ref2.apply(this, arguments);
              };
            }())["catch"](function (err) {
              // err is not a promise
              throw err;
            });

          case 6:
            orderPostResult = _context2.sent;
            return _context2.abrupt("return", orderPostResult);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function postOrderToOrderbook(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Search through the public hosted orderbook
 * @param filters Optional query param filters
 * @param requestOptions Fetch options/overrides
 * @param fetchFn Optional fetch function override. Uses unfetch by default.
 * @returns
 */


var searchOrderbook = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(filters, requestOptions, fetchFn) {
    var _requestOptions$rootU2;

    var stringifiedQueryParams, rootUrl, findOrdersResult;
    return runtime_1.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (fetchFn === void 0) {
              fetchFn = unfetch;
            }

            // https://github.com/sindresorhus/query-string#arrayformat
            stringifiedQueryParams = stringify(filters != null ? filters : {}, {
              arrayFormat: 'none'
            });
            rootUrl = (_requestOptions$rootU2 = requestOptions == null ? void 0 : requestOptions.rootUrl) != null ? _requestOptions$rootU2 : ORDERBOOK_API_ROOT_URL_PRODUCTION;
            _context4.next = 5;
            return fetchFn(rootUrl + "/orderbook/orders?" + stringifiedQueryParams).then( /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(res) {
                return runtime_1.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (res.ok) {
                          _context3.next = 4;
                          break;
                        }

                        _context3.next = 3;
                        return res.json();

                      case 3:
                        throw _context3.sent;

                      case 4:
                        if (!(res.status >= 300)) {
                          _context3.next = 8;
                          break;
                        }

                        _context3.next = 7;
                        return res.json();

                      case 7:
                        throw _context3.sent;

                      case 8:
                        return _context3.abrupt("return", res.json());

                      case 9:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x10) {
                return _ref4.apply(this, arguments);
              };
            }())["catch"](function (err) {
              // err is not a promise
              throw err;
            });

          case 5:
            findOrdersResult = _context4.sent;
            return _context4.abrupt("return", findOrdersResult);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function searchOrderbook(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var getWrappedNativeToken$1 = function getWrappedNativeToken(chainId) {
  var _zeroExAddresses$wrap;

  var chainIdString = chainId.toString(10);
  var zeroExAddresses = addresses$1[chainIdString];
  return (_zeroExAddresses$wrap = zeroExAddresses == null ? void 0 : zeroExAddresses.wrappedNativeToken) != null ? _zeroExAddresses$wrap : null;
};

var _DIRECTION_MAPPING;

var TradeDirection;

(function (TradeDirection) {
  /**
   * Sell orders are orders where direction is set to TradeDirection.SELL_NFT, which indicates that a maker wishes to sell an ERC721 token that they possess.
   */
  TradeDirection[TradeDirection["SellNFT"] = 0] = "SellNFT";
  /**
   * Buy orders are where direction is set to TradeDirection.BUY_NFT, which indicates that a maker wishes to buy an ERC721 token that they do not possess.
   */

  TradeDirection[TradeDirection["BuyNFT"] = 1] = "BuyNFT";
})(TradeDirection || (TradeDirection = {}));

var OrderStatusV4;

(function (OrderStatusV4) {
  OrderStatusV4[OrderStatusV4["Invalid"] = 0] = "Invalid";
  OrderStatusV4[OrderStatusV4["Fillable"] = 1] = "Fillable";
  OrderStatusV4[OrderStatusV4["Unfillable"] = 2] = "Unfillable";
  OrderStatusV4[OrderStatusV4["Expired"] = 3] = "Expired";
})(OrderStatusV4 || (OrderStatusV4 = {}));
/**
 * Buy orders are where direction is set to TradeDirection.BUY_NFT, which indicates that a maker wishes to buy an ERC721 token that they do not possess.
 * Sell orders are orders where direction is set to TradeDirection.SELL_NFT, which indicates that a maker wishes to sell an ERC721 token that they possess.
 */


var DIRECTION_MAPPING = (_DIRECTION_MAPPING = {}, _DIRECTION_MAPPING[TradeDirection.BuyNFT] = 'buy', _DIRECTION_MAPPING[TradeDirection.SellNFT] = 'sell', _DIRECTION_MAPPING);

/**
 * Contract-based orders property validator.
 * Add this to your order's tokenProperties to make it a collection order
 */

var CONTRACT_ORDER_VALIDATOR = {
  propertyValidator: NULL_ADDRESS,
  propertyData: []
};

var SupportedChainIdsV4;

(function (SupportedChainIdsV4) {
  SupportedChainIdsV4[SupportedChainIdsV4["Mainnet"] = 1] = "Mainnet";
  SupportedChainIdsV4[SupportedChainIdsV4["Ropsten"] = 3] = "Ropsten";
  SupportedChainIdsV4[SupportedChainIdsV4["Ubiq"] = 8] = "Ubiq";
  SupportedChainIdsV4[SupportedChainIdsV4["Ganache"] = 1337] = "Ganache";
  SupportedChainIdsV4[SupportedChainIdsV4["Polygon"] = 137] = "Polygon";
  SupportedChainIdsV4[SupportedChainIdsV4["PolygonMumbai"] = 80001] = "PolygonMumbai";
  SupportedChainIdsV4[SupportedChainIdsV4["BSC"] = 56] = "BSC";
  SupportedChainIdsV4[SupportedChainIdsV4["Optimism"] = 10] = "Optimism";
  SupportedChainIdsV4[SupportedChainIdsV4["Fantom"] = 250] = "Fantom";
  SupportedChainIdsV4[SupportedChainIdsV4["Celo"] = 42220] = "Celo";
  SupportedChainIdsV4[SupportedChainIdsV4["Avalance"] = 43114] = "Avalance";
  SupportedChainIdsV4[SupportedChainIdsV4["GaussMainnet"] = 1777] = "GaussMainnet";
  SupportedChainIdsV4[SupportedChainIdsV4["GILTestnet"] = 1452] = "GILTestnet";
})(SupportedChainIdsV4 || (SupportedChainIdsV4 = {}));

var SupportedChainsForV4OrderbookStatusMonitoring = [SupportedChainIdsV4.Ropsten, SupportedChainIdsV4.Polygon, SupportedChainIdsV4.PolygonMumbai, SupportedChainIdsV4.Mainnet, SupportedChainIdsV4.Optimism]; // We may want to see if it is possible to add our chain to the orderbook status monitoring.

var NftSwapV4 = /*#__PURE__*/function () {
  function NftSwapV4(provider, signer, chainId, additionalConfig) {
    var _this = this,
        _additionalConfig$zer,
        _additionalConfig$ord,
        _additionalConfig$app;

    /**
     * Checks if an asset is approved for trading with 0x v4
     * If an asset is not approved, call approveTokenOrNftByAsset to approve.
     * @param asset A tradeable asset (ERC20, ERC721, or ERC1155)
     * @param walletAddress The wallet address that owns the asset
     * @param approvalOverrides Optional config options for approving
     * @returns
     */
    this.loadApprovalStatus = function (asset, walletAddress, approvalOverrides) {
      var _approvalOverrides$ex;

      // TODO(johnrjj) - Fix to pass thru more args...
      return getApprovalStatus$1(walletAddress, (_approvalOverrides$ex = approvalOverrides == null ? void 0 : approvalOverrides.exchangeContractAddress) != null ? _approvalOverrides$ex : _this.exchangeProxy.address, asset, _this.provider);
    };
    /**
     * Convenience function to await a transaction hash.
     * During a fill order call, you can get the pending transaction hash and await it manually via this method.
     * @param txHash Transaction hash to await
     * @returns
     */


    this.awaitTransactionHash = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(txHash) {
        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _this.provider.waitForTransaction(txHash));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
    /**
     * Cancels an 0x v4 order. Once cancelled, the order no longer fillable.
     * Requires a signer
     * @param nonce
     * @param orderType
     * @returns Transaciton Receipt
     */


    this.cancelOrder = function (nonce, orderType) {
      if (orderType === 'ERC721') {
        return _this.exchangeProxy.cancelERC721Order(nonce);
      }

      if (orderType === 'ERC1155') {
        return _this.exchangeProxy.cancelERC1155Order(nonce);
      }

      console.log('unsupported order', orderType);
      throw new Error('unsupport order');
    };
    /**
     * Batch fill NFT sell orders
     * Can be used by taker to fill multiple NFT sell orders atomically.
     * E.g. A taker has a shopping cart full of NFTs to buy, can call this method to fill them all.
     * Requires a valid signer to execute transaction
     * @param signedOrders Signed 0x NFT sell orders
     * @param revertIfIncomplete Revert if we don't fill _all_ orders (defaults to false)
     * @param transactionOverrides Ethers transaciton overrides
     * @returns
     */


    this.batchBuyNfts = function (signedOrders, revertIfIncomplete, transactionOverrides) {
      if (revertIfIncomplete === void 0) {
        revertIfIncomplete = false;
      }

      var allSellOrders = signedOrders.every(function (signedOrder) {
        if (signedOrder.direction === 0) {
          return true;
        }

        return false;
      });
      !allSellOrders ? process.env.NODE_ENV !== "production" ? invariant(false, "batchBuyNfts: All orders must be of type sell order (order direction == 0)") : invariant(false) : void 0;
      var allErc721 = signedOrders.every(function (signedOrder) {
        if ('erc721Token' in signedOrder) {
          return true;
        }

        return false;
      });
      var allErc1155 = signedOrders.every(function (signedOrder) {
        if ('erc1155Token' in signedOrder) {
          return true;
        }

        return false;
      });
      var eitherAllErc721OrErc1155Orders = allErc721 || allErc1155;
      !eitherAllErc721OrErc1155Orders ? process.env.NODE_ENV !== "production" ? invariant(false, "Batch buy is only available for tokens of the same ERC type.") : invariant(false) : void 0;

      if (allErc721) {
        var erc721SignedOrders = signedOrders;
        return _this.exchangeProxy.batchBuyERC721s(erc721SignedOrders, erc721SignedOrders.map(function (so) {
          return so.signature;
        }), erc721SignedOrders.map(function (_) {
          return '0x';
        }), revertIfIncomplete, _extends({}, transactionOverrides));
      } else if (allErc1155) {
        var erc1155SignedOrders = signedOrders;
        return _this.exchangeProxy.batchBuyERC1155s(erc1155SignedOrders, erc1155SignedOrders.map(function (so) {
          return so.signature;
        }), erc1155SignedOrders.map(function (so) {
          return so.erc1155TokenAmount;
        }), erc1155SignedOrders.map(function (_) {
          return '0x';
        }), revertIfIncomplete, _extends({}, transactionOverrides));
      } else {
        throw Error('batchBuyNfts: Incompatible state');
      }
    };
    /**
     * Derives order hash from order (currently requires a provider to derive)
     * @param order A 0x v4 order (signed or unsigned)
     * @returns Order hash
     */


    this.getOrderHash = function (order) {
      if ('erc721Token' in order) {
        return _this.exchangeProxy.getERC721OrderHash(order);
      }

      if ('erc1155Token' in order) {
        return _this.exchangeProxy.getERC1155OrderHash(order);
      }

      throw new Error('unsupport order');
    };
    /**
     * Looks up the order status for a given 0x v4 order.
     * (Available states for an order are 'filled', 'expired', )
     * @param order An 0x v4 NFT order
     * @returns A number the corresponds to the enum OrderStatusV4
     * Valid order states:
     * Invalid = 0
     * Fillable = 1,
     * Unfillable = 2,
     * Expired = 3,
     */


    this.getOrderStatus = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(order) {
        var erc721OrderStatus, _yield$_this$exchange, erc1155OrderStatus;

        return runtime_1.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!('erc721Token' in order)) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 3;
                return _this.exchangeProxy.getERC721OrderStatus(order);

              case 3:
                erc721OrderStatus = _context2.sent;
                return _context2.abrupt("return", erc721OrderStatus);

              case 5:
                if (!('erc1155Token' in order)) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 8;
                return _this.exchangeProxy.getERC1155OrderInfo(order);

              case 8:
                _yield$_this$exchange = _context2.sent;
                erc1155OrderStatus = _yield$_this$exchange[1];
                return _context2.abrupt("return", erc1155OrderStatus);

              case 14:
                console.log('unsupported order', order);
                throw new Error('unsupport order');

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();
    /**
     * Convenience function to approve an asset (ERC20, ERC721, or ERC1155) for trading with 0x v4
     * @param asset
     * @param _walletAddress
     * @param approvalTransactionOverrides
     * @param otherOverrides
     * @returns An ethers contract transaction
     */


    this.approveTokenOrNftByAsset = function (asset, _walletAddress, // Remove in next release
    approvalTransactionOverrides, otherOverrides) {
      var _otherOverrides$signe;

      var signedToUse = (_otherOverrides$signe = otherOverrides == null ? void 0 : otherOverrides.signer) != null ? _otherOverrides$signe : _this.signer;

      if (!signedToUse) {
        throw new Error('Signed not defined');
      }

      return approveAsset$1(_this.exchangeProxy.address, asset, signedToUse, _extends({}, approvalTransactionOverrides), otherOverrides);
    };

    this.getWrappedTokenAddress = function (chainId) {
      return getWrappedNativeToken$1(chainId);
    };

    this.buildCollectionBasedOrder = function (erc20ToSell, nftCollectionToBid, makerAddress) {
      return _this.buildNftAndErc20Order(_extends({}, nftCollectionToBid, {
        // Override tokenId to zero, tokenId is ignored when using token properties
        tokenId: '0'
      }), erc20ToSell, 'buy', makerAddress, {
        // Add the token property of 'collection', so this order will be valid for any nft in the collection
        tokenProperties: [CONTRACT_ORDER_VALIDATOR]
      });
    };

    this.buildNftAndErc20Order = function (nft, erc20, sellOrBuyNft, makerAddress, userConfig) {
      var _nft$type;

      if (sellOrBuyNft === void 0) {
        sellOrBuyNft = 'sell';
      }

      var defaultConfig = {
        chainId: _this.chainId,
        makerAddress: makerAddress,
        appId: _this.appId
      };

      var config = _extends({}, defaultConfig, userConfig);

      var direction = sellOrBuyNft === 'sell' ? TradeDirection.SellNFT : TradeDirection.BuyNFT; // Validate that a bid does not use ETH.

      if (direction === TradeDirection.BuyNFT) {
        if (erc20.tokenAddress.toLowerCase() === ETH_ADDRESS_AS_ERC20) {
          throw new Error('NFT Bids cannot use the native token (e.g. ETH). Please use the wrapped native token (e.g. WETH)');
        }
      }

      switch (nft.type) {
        // Build ERC721 order
        case 'ERC721':
          var erc721Order = generateErc721Order(nft, erc20, _extends({
            direction: direction,
            maker: makerAddress
          }, config));
          return erc721Order;
        // Build ERC1155 order

        case 'ERC1155':
          var erc1155Order = generateErc1155Order(nft, erc20, _extends({
            direction: direction,
            maker: makerAddress
          }, config));
          return erc1155Order;

        default:
          throw new UnexpectedAssetTypeError((_nft$type = nft.type) != null ? _nft$type : 'Unknown');
      }
    };
    /**
     * Signs a 0x order. Requires a signer (e.g. wallet or private key)
     * Once signed, the order becomes fillable (as long as the order is valid)
     * 0x orders require a signature to fill.
     * @param order A 0x v4 order
     * @returns A signed 0x v4 order
     */


    this.signOrder = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(order) {
        var rawSignature, ecSignature, signedOrder;
        return runtime_1.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (_this.signer) {
                  _context3.next = 2;
                  break;
                }

                throw new Error('Signed not defined');

              case 2:
                _context3.next = 4;
                return signOrderWithEoaWallet$1(order, _this.signer, _this.chainId, _this.exchangeProxy.address);

              case 4:
                rawSignature = _context3.sent;
                ecSignature = parseRawSignature(rawSignature);
                signedOrder = _extends({}, order, {
                  signature: {
                    signatureType: 2,
                    r: ecSignature.r,
                    s: ecSignature.s,
                    v: ecSignature.v
                  }
                });
                return _context3.abrupt("return", signedOrder);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }();
    /**
     * Fill a 'Buy NFT' order (e.g. taker would be selling'their NFT to fill this order) without needing an approval
     * Use case: Users can accept offers/bids for their NFTs without needing to approve their NFT! 🤯
     * @param signedOrder Signed Buy Nft order (e.g. direction = 1)
     * @param tokenId NFT token id that taker of trade will sell
     * @param fillOrderOverrides Trade specific (SDK-level) overrides
     * @param transactionOverrides General transaction overrides from ethers (gasPrice, gasLimit, etc)
     * @returns
     */


    this.fillBuyNftOrderWithoutApproval = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(signedOrder, tokenId, fillOrderOverrides, transactionOverrides) {
        var _fillOrderOverrides$f;

        var signerAddress, unwrapWeth, _fillOrderOverrides$t, erc721Contract, encodingIface, fragment, data, transferFromTx, _fillOrderOverrides$t2, _signedOrder$erc1155T, erc1155Contract, _encodingIface, _fragment, _data, _transferFromTx;

        return runtime_1.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (_this.signer) {
                  _context4.next = 2;
                  break;
                }

                throw new Error('Signer undefined. Signer must be provided to fill order');

              case 2:
                if (!(signedOrder.direction !== TradeDirection.BuyNFT)) {
                  _context4.next = 4;
                  break;
                }

                throw new Error('Only filling Buy NFT orders (direction=1) is valid for skipping approvals');

              case 4:
                _context4.next = 6;
                return _this.signer.getAddress();

              case 6:
                signerAddress = _context4.sent;
                unwrapWeth = (_fillOrderOverrides$f = fillOrderOverrides == null ? void 0 : fillOrderOverrides.fillOrderWithNativeTokenInsteadOfWrappedToken) != null ? _fillOrderOverrides$f : false; // Handle ERC721

                if (!('erc721Token' in signedOrder)) {
                  _context4.next = 17;
                  break;
                }

                erc721Contract = ERC721__factory.connect(signedOrder.erc721Token, _this.signer);
                encodingIface = new Interface(ERC721_TRANSFER_FROM_DATA);
                fragment = encodingIface.getFunction('safeTransferFromErc721Data');
                data = encodingIface._encodeParams(fragment.inputs, [signedOrder, signedOrder.signature, unwrapWeth]);
                _context4.next = 15;
                return erc721Contract['safeTransferFrom(address,address,uint256,bytes)'](signerAddress, _this.exchangeProxy.address, (_fillOrderOverrides$t = fillOrderOverrides == null ? void 0 : fillOrderOverrides.tokenIdToSellForCollectionOrder) != null ? _fillOrderOverrides$t : tokenId, data, transactionOverrides != null ? transactionOverrides : {});

              case 15:
                transferFromTx = _context4.sent;
                return _context4.abrupt("return", transferFromTx);

              case 17:
                if (!('erc1155Token' in signedOrder)) {
                  _context4.next = 26;
                  break;
                }

                erc1155Contract = ERC1155__factory.connect(signedOrder.erc1155Token, _this.signer);
                _encodingIface = new Interface(ERC1155_TRANSFER_FROM_DATA);
                _fragment = _encodingIface.getFunction('safeTransferFromErc1155Data');
                _data = _encodingIface._encodeParams(_fragment.inputs, [signedOrder, signedOrder.signature, unwrapWeth]);
                _context4.next = 24;
                return erc1155Contract.safeTransferFrom(signerAddress, _this.exchangeProxy.address, (_fillOrderOverrides$t2 = fillOrderOverrides == null ? void 0 : fillOrderOverrides.tokenIdToSellForCollectionOrder) != null ? _fillOrderOverrides$t2 : tokenId, (_signedOrder$erc1155T = signedOrder.erc1155TokenAmount) != null ? _signedOrder$erc1155T : '1', _data, transactionOverrides != null ? transactionOverrides : {});

              case 24:
                _transferFromTx = _context4.sent;
                return _context4.abrupt("return", _transferFromTx);

              case 26:
                throw new Error('unknown order type');

              case 27:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x4, _x5, _x6, _x7) {
        return _ref4.apply(this, arguments);
      };
    }();
    /**
     * Fills a 'collection'-based order (e.g. a bid for any nft belonging to a particular collection)
     * @param signedOrder A 0x signed collection order
     * @param tokenId The token id to fill for the collection order
     * @param fillOrderOverrides Various fill options
     * @param transactionOverrides Ethers transaction overrides
     * @returns
     */


    this.fillSignedCollectionOrder = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(signedOrder, tokenId, fillOrderOverrides, transactionOverrides) {
        return runtime_1.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", _this.fillSignedOrder(signedOrder, _extends({
                  tokenIdToSellForCollectionOrder: tokenId
                }, fillOrderOverrides), _extends({}, transactionOverrides)));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x8, _x9, _x10, _x11) {
        return _ref5.apply(this, arguments);
      };
    }();

    this.isErc20NativeToken = function (order) {
      return order.erc20Token.toLowerCase() === ETH_ADDRESS_AS_ERC20;
    };
    /**
     * Fills a signed order
     * @param signedOrder A signed 0x v4 order
     * @param fillOrderOverrides Optional configuration on possible ways to fill the order
     * @param transactionOverrides Ethers transaction overrides (e.g. gas price)
     * @returns
     */


    this.fillSignedOrder = /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(signedOrder, fillOrderOverrides, transactionOverrides) {
        var canOrderTypeBeFilledWithNativeToken, isNativeToken, needsEthAttached, erc20TotalAmount, _fillOrderOverrides$f2, _fillOrderOverrides$t3, unwrapNativeToken, _fillOrderOverrides$f3, _fillOrderOverrides$t4, _unwrapNativeToken;

        return runtime_1.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // Only Sell orders can be filled with ETH
                canOrderTypeBeFilledWithNativeToken = signedOrder.direction === TradeDirection.SellNFT; // Is ERC20 being traded the native token

                isNativeToken = _this.isErc20NativeToken(signedOrder);
                needsEthAttached = isNativeToken && canOrderTypeBeFilledWithNativeToken;
                erc20TotalAmount = _this.getErc20TotalIncludingFees(signedOrder); // do fill

                if (!('erc1155Token' in signedOrder)) {
                  _context6.next = 16;
                  break;
                }

                if (!(signedOrder.direction === TradeDirection.SellNFT)) {
                  _context6.next = 9;
                  break;
                }

                return _context6.abrupt("return", _this.exchangeProxy.buyERC1155(signedOrder, signedOrder.signature, signedOrder.erc1155TokenAmount, '0x', _extends({
                  // If we're filling an order with ETH, be sure to include the value with fees added
                  value: needsEthAttached ? erc20TotalAmount : undefined
                }, transactionOverrides)));

              case 9:
                // TODO(detect if erc20 token is wrapped token, then switch true. if true when not wrapped token, tx will fail)
                unwrapNativeToken = (_fillOrderOverrides$f2 = fillOrderOverrides == null ? void 0 : fillOrderOverrides.fillOrderWithNativeTokenInsteadOfWrappedToken) != null ? _fillOrderOverrides$f2 : false;

                if (!(signedOrder.erc1155TokenProperties.length > 0)) {
                  _context6.next = 13;
                  break;
                }

                if (!((fillOrderOverrides == null ? void 0 : fillOrderOverrides.tokenIdToSellForCollectionOrder) === undefined)) {
                  _context6.next = 13;
                  break;
                }

                throw new Error('Collection order missing NFT tokenId to fill with. Specify in fillOrderOverrides.tokenIdToSellForCollectionOrder');

              case 13:
                return _context6.abrupt("return", _this.exchangeProxy.sellERC1155(signedOrder, signedOrder.signature, (_fillOrderOverrides$t3 = fillOrderOverrides == null ? void 0 : fillOrderOverrides.tokenIdToSellForCollectionOrder) != null ? _fillOrderOverrides$t3 : signedOrder.erc1155TokenId, signedOrder.erc1155TokenAmount, unwrapNativeToken, '0x', _extends({}, transactionOverrides)));

              case 14:
                _context6.next = 26;
                break;

              case 16:
                if (!('erc721Token' in signedOrder)) {
                  _context6.next = 26;
                  break;
                }

                if (!(signedOrder.direction === TradeDirection.SellNFT)) {
                  _context6.next = 21;
                  break;
                }

                return _context6.abrupt("return", _this.exchangeProxy.buyERC721(signedOrder, signedOrder.signature, '0x', _extends({
                  // If we're filling an order with ETH, be sure to include the value with fees added
                  value: needsEthAttached ? erc20TotalAmount : undefined
                }, transactionOverrides)));

              case 21:
                // TODO(detect if erc20 token is wrapped token, then switch true. if true when not wrapped token, tx will fail)
                _unwrapNativeToken = (_fillOrderOverrides$f3 = fillOrderOverrides == null ? void 0 : fillOrderOverrides.fillOrderWithNativeTokenInsteadOfWrappedToken) != null ? _fillOrderOverrides$f3 : false;

                if (!(signedOrder.erc721TokenProperties.length > 0)) {
                  _context6.next = 25;
                  break;
                }

                if (!((fillOrderOverrides == null ? void 0 : fillOrderOverrides.tokenIdToSellForCollectionOrder) === undefined)) {
                  _context6.next = 25;
                  break;
                }

                throw new Error('Collection order missing NFT tokenId to fill with. Specify in fillOrderOverrides.tokenIdToSellForCollectionOrder');

              case 25:
                return _context6.abrupt("return", _this.exchangeProxy.sellERC721(signedOrder, signedOrder.signature, (_fillOrderOverrides$t4 = fillOrderOverrides == null ? void 0 : fillOrderOverrides.tokenIdToSellForCollectionOrder) != null ? _fillOrderOverrides$t4 : signedOrder.erc721TokenId, _unwrapNativeToken, '0x', _extends({}, transactionOverrides)));

              case 26:
                console.log('unsupported order', signedOrder);
                throw new Error('unsupport signedOrder type');

              case 28:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x12, _x13, _x14) {
        return _ref6.apply(this, arguments);
      };
    }();
    /**
     * Posts a 0x order to the Trader.xyz NFT open orderbook
     * @param signedOrder A valid 0x v4 signed order
     * @param chainId The chain id (e.g. '1' for mainnet, or '137' for polygon mainnet)
     * @param metadata An optional record object (key: string, value: string) that will be stored alongside the order in the orderbook
     * This is helpful for webapp builders, as they can save app-level order metadata
     * (e.g. maybe save a 'bidMessage' alongside the order, or extra image metadata)
     * @returns
     */


    this.postOrder = function (signedOrder, chainId, metadata) {
      var parsedChainId = parseInt(chainId.toString(10), 10);
      var supportsMonitoring = SupportedChainsForV4OrderbookStatusMonitoring.includes(parsedChainId);
      process.env.NODE_ENV !== "production" ? warning(supportsMonitoring, "Chain " + chainId + " does not support live orderbook status monitoring. Orders can be posted to be persisted, but status wont be monitored (e.g. updating status on a fill, cancel, or expiry.)") : void 0;
      return postOrderToOrderbook(signedOrder, parsedChainId, metadata, {
        rootUrl: _this.orderbookRootUrl
      });
    };
    /**
     * Gets orders from the Trader.xyz Open NFT Orderbook
     * By default will find all order, active orders.
     * @param filters Various options to filter an order search
     * @returns An object that includes `orders` key with an array of orders that meet the search critera
     */


    this.getOrders = /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(filters) {
        var orders;
        return runtime_1.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return searchOrderbook(filters, {
                  rootUrl: _this.orderbookRootUrl
                });

              case 2:
                orders = _context7.sent;
                return _context7.abrupt("return", orders);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x15) {
        return _ref7.apply(this, arguments);
      };
    }();
    /**
     *
     * @param sellOrder ERC721 Order to sell an NFT
     * @param buyOrder ERC721 Order to buy an NFT
     * @param transactionOverrides Ethers transaction overrides
     * @returns
     */


    this.matchOrders = /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8( // NOTE(johnrjj)- Should these types be SignedERC721OrderStruct directly since only 712 is supported for matching
      sellOrder, buyOrder, transactionOverrides) {
        var contractTx;
        return runtime_1.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!('erc721Token' in sellOrder && 'erc721Token' in buyOrder)) {
                  _context8.next = 5;
                  break;
                }

                _context8.next = 3;
                return _this.exchangeProxy.matchERC721Orders(sellOrder, buyOrder, sellOrder.signature, buyOrder.signature, transactionOverrides != null ? transactionOverrides : {});

              case 3:
                contractTx = _context8.sent;
                return _context8.abrupt("return", contractTx);

              case 5:
                throw new Error('Only ERC721 Orders are currently supported for matching. Please ensure both the sellOrder and buyOrder are ERC721 orders');

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      return function (_x16, _x17, _x18) {
        return _ref8.apply(this, arguments);
      };
    }();

    this.getMakerAsset = function (order) {
      // Buy NFT - So maker asset is an ERC20
      if (order.direction.toString(10) === TradeDirection.BuyNFT.toString()) {
        return {
          tokenAddress: order.erc20Token,
          amount: order.erc20TokenAmount.toString(10),
          type: 'ERC20'
        };
      } else if (order.direction.toString(10) === TradeDirection.SellNFT.toString()) {
        // Sell NFT - So maker asset is an NFT (either ERC721 or ERC1155)
        if ('erc721Token' in order) {
          return {
            tokenAddress: order.erc721Token,
            tokenId: order.erc721TokenId.toString(10),
            type: 'ERC721'
          };
        } else if ('erc1155Token' in order) {
          return {
            tokenAddress: order.erc1155Token,
            tokenId: order.erc1155TokenId.toString(10),
            amount: order.erc1155TokenAmount.toString(10),
            type: 'ERC1155'
          };
        }
      }

      throw new Error("Unknown order direction " + order.direction);
    };

    this.getTakerAsset = function (order) {
      // Buy NFT - So taker asset is an NFT [ERC721 or ERC1155] (because the taker is the NFT owner 'accepting' a buy order)
      if (order.direction.toString(10) === TradeDirection.BuyNFT.toString()) {
        if ('erc721Token' in order) {
          return {
            tokenAddress: order.erc721Token,
            tokenId: order.erc721TokenId.toString(10),
            type: 'ERC721'
          };
        } else if ('erc1155Token' in order) {
          return {
            tokenAddress: order.erc1155Token,
            tokenId: order.erc1155TokenId.toString(10),
            amount: order.erc1155TokenAmount.toString(10),
            type: 'ERC1155'
          };
        }
      } else if (order.direction.toString(10) === TradeDirection.SellNFT.toString()) {
        // Sell NFT - So taker asset is an ERC20 -- because the taker here is 'buying' the sell NFT order
        return {
          tokenAddress: order.erc20Token,
          amount: order.erc20TokenAmount.toString(10),
          type: 'ERC20'
        };
      }

      throw new Error("Unknown order direction " + order.direction);
    };
    /**
     * Validate an order signature given a signed order
     * Throws if invalid
     * @param signedOrder A 0x v4 signed order to validate signature for
     * @returns
     */


    this.validateSignature = /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(signedOrder) {
        return runtime_1.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!('erc721Token' in signedOrder)) {
                  _context9.next = 6;
                  break;
                }

                _context9.next = 3;
                return _this.exchangeProxy.validateERC721OrderSignature(signedOrder, signedOrder.signature);

              case 3:
                return _context9.abrupt("return", true);

              case 6:
                if (!('erc1155Token' in signedOrder)) {
                  _context9.next = 12;
                  break;
                }

                _context9.next = 9;
                return _this.exchangeProxy.validateERC1155OrderSignature(signedOrder, signedOrder.signature);

              case 9:
                return _context9.abrupt("return", true);

              case 12:
                throw new Error('Unknown order type (not ERC721 or ERC1155)');

              case 13:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      return function (_x19) {
        return _ref9.apply(this, arguments);
      };
    }();
    /**
     * Fetches the balance of an asset for a given wallet address
     * @param asset A Tradeable asset -- An ERC20, ERC721, or ERC1155
     * @param walletAddress A wallet address ('0x1234...6789')
     * @param provider Optional, defaults to the class's provider but can be overridden
     * @returns A BigNumber balance (e.g. 1 or 0 for ERC721s. ERC20 and ERC1155s can have balances greater than 1)
     */


    this.fetchBalanceForAsset = /*#__PURE__*/function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(asset, walletAddress, provider) {
        var erc20, erc721, owner, erc1155;
        return runtime_1.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (provider === void 0) {
                  provider = _this.provider;
                }

                _context10.t0 = asset.type;
                _context10.next = _context10.t0 === 'ERC20' ? 4 : _context10.t0 === 'ERC721' ? 6 : _context10.t0 === 'ERC1155' ? 13 : 15;
                break;

              case 4:
                erc20 = ERC20__factory.connect(asset.tokenAddress, provider);
                return _context10.abrupt("return", erc20.balanceOf(walletAddress));

              case 6:
                erc721 = ERC721__factory.connect(asset.tokenAddress, provider);
                _context10.next = 9;
                return erc721.ownerOf(asset.tokenId);

              case 9:
                owner = _context10.sent;

                if (!(owner.toLowerCase() === walletAddress.toLowerCase())) {
                  _context10.next = 12;
                  break;
                }

                return _context10.abrupt("return", BigNumber$1.from(1));

              case 12:
                return _context10.abrupt("return", BigNumber$1.from(0));

              case 13:
                erc1155 = ERC1155__factory.connect(asset.tokenAddress, provider);
                return _context10.abrupt("return", erc1155.balanceOf(walletAddress, asset.tokenId));

              case 15:
                throw new Error("Asset type unknown " + asset.type);

              case 16:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      return function (_x20, _x21, _x22) {
        return _ref10.apply(this, arguments);
      };
    }(); // TODO(johnrjj) Consolidate w/ checkOrderCanBeFilledMakerSide


    this.checkOrderCanBeFilledTakerSide = /*#__PURE__*/function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee11(order, takerWalletAddress) {
        var _takerAsset$amount;

        var takerAsset, takerApprovalStatus, takerBalance, hasBalance, isApproved, canOrderBeFilled;
        return runtime_1.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                takerAsset = _this.getTakerAsset(order);
                _context11.next = 3;
                return _this.loadApprovalStatus(takerAsset, takerWalletAddress);

              case 3:
                takerApprovalStatus = _context11.sent;
                _context11.next = 6;
                return _this.fetchBalanceForAsset(_this.getTakerAsset(order), takerWalletAddress);

              case 6:
                takerBalance = _context11.sent;
                hasBalance = takerBalance.gte((_takerAsset$amount = takerAsset.amount) != null ? _takerAsset$amount : 1);
                isApproved = takerApprovalStatus.contractApproved || takerApprovalStatus.tokenIdApproved || false;
                canOrderBeFilled = hasBalance && isApproved;
                return _context11.abrupt("return", {
                  approvalStatus: takerApprovalStatus,
                  balance: takerBalance.toString(),
                  isApproved: isApproved,
                  hasBalance: hasBalance,
                  canOrderBeFilled: canOrderBeFilled
                });

              case 11:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      return function (_x23, _x24) {
        return _ref11.apply(this, arguments);
      };
    }();

    this.checkOrderCanBeFilledMakerSide = /*#__PURE__*/function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee12(order // override?: Partial<VerifyOrderOptionsOverrides>
      ) {
        var _makerAsset$amount;

        var makerAddress, makerAsset, makerApprovalStatus, makerBalance, hasBalance, isApproved, canOrderBeFilled;
        return runtime_1.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                makerAddress = order.maker;
                makerAsset = _this.getMakerAsset(order);
                _context12.next = 4;
                return _this.loadApprovalStatus(makerAsset, makerAddress);

              case 4:
                makerApprovalStatus = _context12.sent;
                _context12.next = 7;
                return _this.fetchBalanceForAsset(_this.getMakerAsset(order), makerAddress);

              case 7:
                makerBalance = _context12.sent;
                hasBalance = makerBalance.gte((_makerAsset$amount = makerAsset.amount) != null ? _makerAsset$amount : 1);
                isApproved = makerApprovalStatus.tokenIdApproved || makerApprovalStatus.contractApproved || false;
                canOrderBeFilled = hasBalance && isApproved;
                return _context12.abrupt("return", {
                  approvalStatus: makerApprovalStatus,
                  balance: makerBalance.toString(),
                  isApproved: isApproved,
                  hasBalance: hasBalance,
                  canOrderBeFilled: canOrderBeFilled
                });

              case 12:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      return function (_x25) {
        return _ref12.apply(this, arguments);
      };
    }();
    /**
     * Convenience function to sum all fees. Total fees denominated in erc20 token amount.
     * @param order A 0x v4 order (signed or un-signed);
     * @returns Total summed fees for a 0x v4 order. Amount is represented in Erc20 token units.
     */


    this.getTotalFees = function (order) {
      var fees = order.fees; // In 0x v4, fees are additive (not included in the original erc20 amount)

      var feesTotal = ZERO_AMOUNT;
      fees.forEach(function (fee) {
        feesTotal = feesTotal.add(BigNumber$1.from(fee.amount));
      });
      return feesTotal;
    };
    /**
     * Calculates total order cost.
     * In 0x v4, fees are additive (i.e. they are not deducted from the order amount, but added on top of)
     * @param order A 0x v4 order;
     * @returns Total cost of an order (base amount + fees). Amount is represented in Erc20 token units. Does not include gas costs.
     */


    this.getErc20TotalIncludingFees = function (order) {

      var feesTotal = _this.getTotalFees(order);

      var orderTotalCost = BigNumber$1.from(order.erc20TokenAmount).add(feesTotal);
      return orderTotalCost;
    };

    this.provider = provider;
    this.signer = signer;
    this.chainId = chainId ? parseInt(chainId.toString(10), 10) : this.provider._network.chainId;
    var defaultAddressesForChain = addresses$1[this.chainId];
    var zeroExExchangeContractAddress = (_additionalConfig$zer = additionalConfig == null ? void 0 : additionalConfig.zeroExExchangeProxyContractAddress) != null ? _additionalConfig$zer : defaultAddressesForChain == null ? void 0 : defaultAddressesForChain.exchange;
    !zeroExExchangeContractAddress ? process.env.NODE_ENV !== "production" ? invariant(false, '0x V4 Exchange Contract Address not set. Exchange Contract is required to load NftSwap') : invariant(false) : void 0;
    this.exchangeProxyContractAddress = zeroExExchangeContractAddress;
    this.orderbookRootUrl = (_additionalConfig$ord = additionalConfig == null ? void 0 : additionalConfig.orderbookRootUrl) != null ? _additionalConfig$ord : ORDERBOOK_API_ROOT_URL_PRODUCTION;
    this.appId = (_additionalConfig$app = additionalConfig == null ? void 0 : additionalConfig.appId) != null ? _additionalConfig$app : DEFAULT_APP_ID;
    verifyAppIdOrThrow(this.appId);
    this.exchangeProxy = IZeroEx__factory.connect(zeroExExchangeContractAddress, signer != null ? signer : provider);
  }

  var _proto = NftSwapV4.prototype;

  _proto.buildOrder = function buildOrder(makerAsset, takerAsset, makerAddress, orderConfig) {
    // Basic validation checks
    if ((takerAsset.type === 'ERC1155' || takerAsset.type === 'ERC721') && (makerAsset.type === 'ERC1155' || makerAsset.type === 'ERC721')) {
      throw new Error('0x v4 only supports ERC721/ERC1155 <> ERC20. Currently 0x v4 does not support NFT<>NFT swaps, please use 0x v3 SDK for that.');
    }

    if (makerAsset.type === 'ERC20' && takerAsset.type === 'ERC20') {
      throw new Error('0x v4 only supports ERC721/ERC1155 <> ERC20. Currently 0x v4 does not support NFT<>NFT swaps, please use 0x v3 SDK for that.');
    } // First determine if the maker or taker is trading the erc20 (to orient the direction of the trade)


    var direction = TradeDirection.SellNFT;

    if (takerAsset.type === 'ERC20') {
      // NFT is on the maker side (so the maker is selling the NFT)
      direction = TradeDirection.SellNFT;
    }

    if (makerAsset.type === 'ERC20') {
      // NFT is on the taker side (so the maker is buying the NFT)
      direction = TradeDirection.BuyNFT;
    }

    var nft = direction === TradeDirection.BuyNFT ? takerAsset : makerAsset;
    var erc20 = direction === TradeDirection.BuyNFT ? makerAsset : takerAsset;
    return this.buildNftAndErc20Order(nft, erc20, DIRECTION_MAPPING[direction], makerAddress, orderConfig);
  };

  return NftSwapV4;
}();



var IZeroEx = {
  __proto__: null
};



var ExchangeContract = {
  __proto__: null
};

export { AssetProxyId, DIRECTION_MAPPING, EIP1155_DOMAIN_PARAMETERS, EIP712_DOMAIN_PARAMETERS, EIP712_TYPES, ERC1155ORDER_STRUCT_ABI, ERC1155ORDER_STRUCT_NAME, ERC721ORDER_STRUCT_ABI, ERC721ORDER_STRUCT_NAME, ETH_ADDRESS_AS_ERC20, FEE_ABI, MAX_APPROVAL, NATIVE_TOKEN_ADDRESS_AS_ERC20, NftSwapV3 as NftSwap, NftSwapV3, NftSwapV4, ORDER_BUILDER_ERROR_CODES, OrderStatusCodeLookup, OrderStatusV3, OrderStatusV4, PROPERTY_ABI, RevertReason, SupportedChainIdsV3, SupportedChainIdsV4, SupportedChainsForV4OrderbookStatusMonitoring, SupportedTokenTypes, TradeDirection, ExchangeContract as V3ExchangeContract, IZeroEx as V4ExchangeProxy, approveAsset, buildOrder, cancelOrder, cancelOrders, cancelOrdersUpToNow, checkIfContractWallet, convertAssetToInternalFormat, convertAssetsToInternalFormat, convertDecodedAssetDataToUserFacingAssets, decodeAssetData, decodeErc1155AssetData, decodeErc20AssetData, decodeErc721AssetData, decodeMultiAssetData, encodeAssetData, encodeErc1155AssetData, encodeErc20AssetData, encodeErc721AssetData, encodeMultiAssetAssetData, estimateGasForApproval, estimateGasForFillOrder, fillSignedOrder, getAmountFromAsset, getApprovalStatus, getAssetsFromOrder, getOrderInfo, getOrderStatus, getSignatureTypeFromSignature, hashOrder, prepareOrderSignatureFromContractWallet, prepareOrderSignatureFromEoaWallet, signOrder, signOrderWithEip1271, signOrderWithEoaWallet, verifyOrderSignature };
//# sourceMappingURL=nft-swap-sdk.esm.js.map
