"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clear = exports.removeItem = exports.getItem = exports.setDeferredItem = exports.setItem = void 0;
var config_1 = require("./config");
/**
 * Public key cache.
 */
var cache = new Map();
/**
 * Get expiry.
 */
function getExpiry() {
    var now = new Date().getTime();
    var config = (0, config_1.getConfig)();
    return now + config.cacheLifetime;
}
/**
 * Set cache item.
 *
 * @param key Cache item key.
 * @param value Cache item value.
 */
function setItem(key, value) {
    return cache.set(key, {
        result: Promise.resolve(value),
        expiry: getExpiry(),
    });
}
exports.setItem = setItem;
/**
 * Set deferred cache item.
 *
 * @param key Cache item key.
 */
function setDeferredItem(key) {
    var done;
    var result = new Promise(function (resolve) {
        done = resolve;
    });
    return cache.set(key, {
        result: result,
        done: done,
        expiry: getExpiry(),
    });
}
exports.setDeferredItem = setDeferredItem;
/**
 * Get cache item.
 *
 * @param key Cache item key.
 */
function getItem(key) {
    var value = cache.get(key);
    var now = new Date().getTime();
    if (!value) {
        return null;
    }
    if (value.expiry < now) {
        // expired
        cache.delete(key);
        return null;
    }
    return value;
}
exports.getItem = getItem;
/**
 * Remove cache item.
 *
 * @param key Cache item key.
 */
function removeItem(key) {
    return cache.delete(key);
}
exports.removeItem = removeItem;
/**
 * Clear all items.
 */
function clear() {
    cache.clear();
}
exports.clear = clear;
//# sourceMappingURL=cache.js.map