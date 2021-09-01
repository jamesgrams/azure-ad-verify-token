import jwt from 'jsonwebtoken';
import { VerifyOptions } from './interfaces';
/**
 * Verify token.
 *
 * @param token Token to verify.
 * @param options Configuration options.
 * @param jwtOptions Options to pass directly to jwt verify.
 */
export declare function verify(token: string, options: VerifyOptions, jwtOptions: any): Promise<string | jwt.JwtPayload>;
