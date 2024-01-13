import { randomBytes, scryptSync } from 'node:crypto';

export class HashUtil {
  static hash(word: string): string {
    const salt = randomBytes(8).toString('hex');

    const derivedKey = scryptSync(word, salt, 64);

    return salt + ':' + derivedKey.toString('hex');
  }

  static verify(word: string, hash: string): boolean {
    if (!word || !hash) return false;

    const [salt, key] = hash.split(':');

    const derivedKey = scryptSync(word, salt, 64);

    return key === derivedKey.toString('hex');
  }
}
