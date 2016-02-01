'use strict';

var _slicedToArray = /**
                      * @function
                     */ function () { /**
                                       * @function
                                       * @param arr
                                       * @param i
                                      */ function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return (/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @function
                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @param arr
                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @param i
                                                                                                                                                                                                                                                                                                                                                                                                                                                          */ function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } } ); }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? /**
                                                                                     * @function
                                                                                     * @param obj
                                                                                    */ function (obj) { return typeof obj; } : /**
                                                                                                                                * @function
                                                                                                                                * @param obj
                                                                                                                               */ function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = aukConfig;

var _parseJsonObjectAsMap = require('parse-json-object-as-map');

var _parseJsonObjectAsMap2 = _interopRequireDefault(_parseJsonObjectAsMap);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @param fn
*/
function _asyncToGenerator(fn) { return (/**
                                         * @function
                                        */ function () { var gen = fn.apply(this, arguments); return new Promise( /**
                                                                                                                   * @function
                                                                                                                   * @param resolve
                                                                                                                   * @param reject
                                                                                                                  */ function (resolve, reject) { /**
                                                                                                                                                   * @function
                                                                                                                                                   * @param key
                                                                                                                                                   * @param arg
                                                                                                                                                  */ function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then( /**
                                                                                                                                                                                                                                                                                                                                                                 * @function
                                                                                                                                                                                                                                                                                                                                                                 * @param value
                                                                                                                                                                                                                                                                                                                                                                */ function (value) { return step("next", value); }, /**
                                                                                                                                                                                                                                                                                                                                                                                                                      * @function
                                                                                                                                                                                                                                                                                                                                                                                                                      * @param err
                                                                                                                                                                                                                                                                                                                                                                                                                     */ function (err) { return step("throw", err); }); } } return step("next"); }); } ); }

// const _config = global._ibexConfig || {};

// To make obj fully immutable, freeze each object in obj.
// Also makes Array, Map and Set read-only.
/**
 * @function
 * @param obj
*/function deepFreeze(obj) {
    if (obj instanceof Map) {
        obj.clear = obj.delete = obj.set = /**
                                            * @function
                                           */function () {
            throw new Error('map is read-only');
        };
    } else if (obj instanceof Set) {
        obj.add = obj.clear = obj.delete = /**
                                            * @function
                                           */function () {
            throw new Error('set is read-only');
        };
    }

    Object.getOwnPropertyNames(obj).forEach(function (name) {
        var prop = obj[name];

        // Freeze prop if it is an object
        if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) == 'object' && !Object.isFrozen(prop)) {
            deepFreeze(prop);
        }
    });

    // Freeze self
    return Object.freeze(obj);
}

/**
 * @function
 * @param dirname
 * @param name
*/function existsConfig(dirname, name) {
    return System.import('' + dirname + name + '.json!text').catch(function () {
        return false;
    }).then(function (res) {
        return !!res;
    });
}

/**
 * @function
 * @param dirname
 * @param name
*/function loadConfig(dirname, name) {
    return System.import('' + dirname + name + '.json!text').then(function (res) {
        return (0, _parseJsonObjectAsMap2.default)(res);
    });
}

/**
 * @function
 * @param dirname
*/function aukConfig(dirname) {
    dirname = dirname.replace(/\/*$/, '/');
    return (/**
            * @function
            * @param app
           */ /**
               * @function
              */function () {
            var ref = _asyncToGenerator( /**
                                          * @function
                                          * @param app
                                         */regeneratorRuntime.mark( /**
                                                                     * @function
                                                                     * @param app
                                                                    */function _callee(app) {
                var config, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, key, value, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value;

                return regeneratorRuntime.wrap( /**
                                                 * @function
                                                 * @param _context
                                                */function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                app.existsConfig = /**
                                                    * @function
                                                    * @param name
                                                   */function (name) {
                                    return existsConfig(dirname, name);
                                };
                                app.loadConfig = /**
                                                  * @function
                                                  * @param name
                                                 */function (name) {
                                    return loadConfig(dirname, name);
                                };

                                _context.next = 4;
                                return loadConfig(dirname, 'common');

                            case 4:
                                config = _context.sent;

                                if (!app.environment) {
                                    _context.next = 36;
                                    break;
                                }

                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context.prev = 9;
                                _context.next = 12;
                                return loadConfig(dirname, app.environment);

                            case 12:
                                _context.t0 = Symbol.iterator;
                                _iterator = _context.sent[_context.t0]();

                            case 14:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    _context.next = 22;
                                    break;
                                }

                                _step$value = _slicedToArray(_step.value, 2);
                                key = _step$value[0];
                                value = _step$value[1];

                                config.set(key, value);

                            case 19:
                                _iteratorNormalCompletion = true;
                                _context.next = 14;
                                break;

                            case 22:
                                _context.next = 28;
                                break;

                            case 24:
                                _context.prev = 24;
                                _context.t1 = _context['catch'](9);
                                _didIteratorError = true;
                                _iteratorError = _context.t1;

                            case 28:
                                _context.prev = 28;
                                _context.prev = 29;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 31:
                                _context.prev = 31;

                                if (!_didIteratorError) {
                                    _context.next = 34;
                                    break;
                                }

                                throw _iteratorError;

                            case 34:
                                return _context.finish(31);

                            case 35:
                                return _context.finish(28);

                            case 36:
                                if (!existsConfig(dirname, 'local')) {
                                    _context.next = 67;
                                    break;
                                }

                                _iteratorNormalCompletion2 = true;
                                _didIteratorError2 = false;
                                _iteratorError2 = undefined;
                                _context.prev = 40;
                                _context.next = 43;
                                return loadConfig(dirname, 'local');

                            case 43:
                                _context.t2 = Symbol.iterator;
                                _iterator2 = _context.sent[_context.t2]();

                            case 45:
                                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                    _context.next = 53;
                                    break;
                                }

                                _step2$value = _slicedToArray(_step2.value, 2);
                                key = _step2$value[0];
                                value = _step2$value[1];

                                config.set(key, value);

                            case 50:
                                _iteratorNormalCompletion2 = true;
                                _context.next = 45;
                                break;

                            case 53:
                                _context.next = 59;
                                break;

                            case 55:
                                _context.prev = 55;
                                _context.t3 = _context['catch'](40);
                                _didIteratorError2 = true;
                                _iteratorError2 = _context.t3;

                            case 59:
                                _context.prev = 59;
                                _context.prev = 60;

                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }

                            case 62:
                                _context.prev = 62;

                                if (!_didIteratorError2) {
                                    _context.next = 65;
                                    break;
                                }

                                throw _iteratorError2;

                            case 65:
                                return _context.finish(62);

                            case 66:
                                return _context.finish(59);

                            case 67:

                                app.config = config;
                                app.context.config = config;
                                app.context.production = !!config.get('production');

                                return _context.abrupt('return', deepFreeze(config));

                            case 71:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[9, 24, 28, 36], [29,, 31, 35], [40, 55, 59, 67], [60,, 62, 66]]);
            }));

            return (/**
                    * @function
                    * @param _x
                   */function (_x) {
                    return ref.apply(this, arguments);
                }
            );
        }()
    );
}
//# sourceMappingURL=index.js.map