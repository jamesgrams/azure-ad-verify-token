"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var rsa_pem_from_mod_exp_1 = __importDefault(require("rsa-pem-from-mod-exp"));
var cache_1 = require("./cache");
/**
 * Get public key.
 *
 * @param jwksUri Json web key set URI.
 * @param kid Public key to get.
 */
function getPublicKey(jwksUri, kid) {
    var item = (0, cache_1.getItem)(kid);
    if (item) {
        return item.result;
    }
    // immediately defer to prevent duplicate calls to get jwks
    (0, cache_1.setDeferredItem)(kid);
    return (0, node_fetch_1.default)(jwksUri)
        .then(function (res) { return res.json(); })
        .then(function (res) {
        res.keys.forEach(function (key) {
            var existing = (0, cache_1.getItem)(key.kid);
            var pem = (0, rsa_pem_from_mod_exp_1.default)(key.n, key.e);
            if (existing && existing.done) {
                // deferred item
                existing.done(pem);
            }
            else {
                (0, cache_1.setItem)(key.kid, pem);
            }
        });
        item = (0, cache_1.getItem)(kid);
        if (!item) {
            throw new Error('public key not found');
        }
        return item.result;
    });
}
/**
 * Verify token.
 *
 * @param token Token to verify.
 * @param options Configuration options.
 * @param jwtOptions Options to pass directly to jwt verify.
 */
function verify(token, options, jwtOptions) {
    var jwksUri = options.jwksUri, audience = options.audience, issuer = options.issuer;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var decoded;
    var kid;
    try {
        decoded = jsonwebtoken_1.default.decode(token, { complete: true, json: true });
        kid = decoded.header.kid;
        if (!kid) {
            throw new Error('kid missing from token header');
        }
    }
    catch (error) {
        return Promise.reject('invalid token');
    }
    var verifyOptions = {
        algorithms: ['RS256'],
        audience: audience,
        issuer: issuer,
    };
    if (jwtOptions)
        verifyOptions = __assign(__assign({}, verifyOptions), jwtOptions);
    return getPublicKey(jwksUri, kid).then(function (key) {
        return jsonwebtoken_1.default.verify(token, key, verifyOptions);
    });
}
exports.verify = verify;
//# sourceMappingURL=verify.js.map