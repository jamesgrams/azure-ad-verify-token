import { Config } from './interfaces';
/**
 * Default value for `cacheLifetime`.
 */
export declare const DEFAULT_CACHE_LIFETIME: number;
/**
 * Set config properties.
 *
 * @param config Object of properties to set.
 */
export declare function setConfig(overrides: Config): Config;
/**
 * Get current configuration.
 */
export declare function getConfig(): Config;
/**
 * Reset configuration to defaults.
 */
export declare function resetConfig(): void;
