'use strict';

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
exports.default = deepFreeze;
/**
 * @function
 * @param obj
*/ // To make obj fully immutable, freeze each object in obj.
// Also makes Array, Map and Set read-only.
function deepFreeze(obj) {
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
//# sourceMappingURL=deepFreeze.js.map