import { Resolve } from 'webpack';

import { Env } from '../env';
import { SRC_PATH, NM_PATH } from '../paths';

const config: Resolve = {
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  modules: [SRC_PATH, NM_PATH],
};

let unsafeCache = true;

export function resolve(env: string): Resolve {
  if (env === Env.Inspect || env === Env.Production) {
    unsafeCache = false;
  }

  return { unsafeCache, ...config }
}
