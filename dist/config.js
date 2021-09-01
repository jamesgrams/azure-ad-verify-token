"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetConfig = exports.getConfig = exports.setConfig = exports.DEFAULT_CACHE_LIFETIME = void 0;
/**
 * Default value for `cacheLifetime`.
 */
exports.DEFAULT_CACHE_LIFETIME = 60 * 60 * 1000; // one hour
/**
 * Current configuration.
 */
var config = {
    cacheLifetime: exports.DEFAULT_CACHE_LIFETIME,
};
/**
 * Set config properties.
 *
 * @param config Object of properties to set.
 */
function setConfig(overrides) {
    return Object.assign(config, overrides);
}
exports.setConfig = setConfig;
/**
 * Get current configuration.
 */
function getConfig() {
    return config;
}
exports.getConfig = getConfig;
/**
 * Reset configuration to defaults.
 */
function resetConfig() {
    config = {
        cacheLifetime: exports.DEFAULT_CACHE_LIFETIME,
    };
}
exports.resetConfig = resetConfig;
//# sourceMappingURL=config.js.map