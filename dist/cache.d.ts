import { CacheItem } from './interfaces';
/**
 * Set cache item.
 *
 * @param key Cache item key.
 * @param value Cache item value.
 */
export declare function setItem(key: string, value: string): Map<string, CacheItem>;
/**
 * Set deferred cache item.
 *
 * @param key Cache item key.
 */
export declare function setDeferredItem(key: string): Map<string, CacheItem>;
/**
 * Get cache item.
 *
 * @param key Cache item key.
 */
export declare function getItem(key: string): CacheItem;
/**
 * Remove cache item.
 *
 * @param key Cache item key.
 */
export declare function removeItem(key: string): boolean;
/**
 * Clear all items.
 */
export declare function clear(): void;
