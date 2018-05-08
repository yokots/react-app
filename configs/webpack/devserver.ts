import { Env } from '../env';
import { DIST_PATH, MOCK_PATH, ASSETS_PATH } from '../paths';

const config = {
  contentBase: [
    DIST_PATH,
    MOCK_PATH,
    ASSETS_PATH,
  ],
  historyApiFallback: true,
  hot: false,
};

export function devServer(env: string) {
  if (env === Env.Production || env === Env.Inspect) {
    return;
  }

  if (env === Env.HMR) {
    config.hot = true;
  }

  return {
    devServer: config,
    cache: true,
    watch: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  };
}
