import { Module, Rule, NewLoader } from 'webpack';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

import { Env } from '../env';
import {
  NM_PATH,
  POSTCSS_CONFIG_PATH,
  STYLES_PATH,
  resolveSource,
} from '../paths';

const sourceMapLoaderRule: Rule = {
  test: /\.js$/,
  enforce: 'pre',
  exclude: NM_PATH,
  loader: 'source-map-loader',
};

const fileLoaderRule: Rule = {
  test: /\.(jpe?g|png|gif|svg)$/,
  loader: 'file-loader',
  options: {
    name: 'images/[name].[ext]',
    publicPath: '/',
  },
};

const urlLoaderRule: Rule = {
  test: /\.(jpe?g|png|gif|svg)$/,
  loader: 'url-loader',
  options: {
    name: 'images/[hash:8].[ext]',
    publicPath: '/',
    limit: 10000,
  },
};

const tsLoaderRule: Rule = {
  test: /\.tsx?$/,
  exclude: NM_PATH,
  loader: 'happypack/loader?id=ts',
};

const styleLoader: Required<NewLoader> = {
  loader: 'style-loader',
  options: { sourceMap: true },
};

const cssLoader: Required<NewLoader> = {
  loader: 'css-loader',
  options: {
    modules: true,
    camelCase: true,
    importLoaders: 1,
    minimize: false,
    sourceMap: true,
    localIdentName: '[hash:base64:5]',
  },
};

const postcssLoader: Required<NewLoader> = {
  loader: 'postcss-loader',
  options: {
    config: {
      path: POSTCSS_CONFIG_PATH,
    },
    sourceMap: true,
  },
};

const extractCSSFiles = [STYLES_PATH, resolveSource('app/core')];

const extractCSSRule: Rule = {
  test: /\.css$/,
  include: extractCSSFiles,
  use: [
    MiniCssExtractPlugin.loader,
    cssLoader,
    postcssLoader,
  ],
};

const extractLibCSSRule: Rule = {
  test: /\.css$/,
  include: NM_PATH,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        minimize: {
          discardComments: {
            removeAll: true,
          },
        },
      },
    },
    postcssLoader,
  ],
}
const inlineStyleRule: Rule = {
  test: /\.css$/,
  use: [
    styleLoader,
    cssLoader,
    postcssLoader,
  ],
};

const inlineLibStyleRule: Rule = {
  test: /\.css$/,
  include: NM_PATH,
  use: ['style-loader', 'css-loader'],
}

const rules: Rule[] = [
  sourceMapLoaderRule,
  tsLoaderRule,
  inlineStyleRule,
  inlineLibStyleRule,
];

export function module(env: string): Module {
  if (env === Env.HMR) {
    Reflect.deleteProperty(tsLoaderRule, 'loader');
    Object.assign(tsLoaderRule, {
      use: ['react-hot-loader/webpack', 'happypack/loader?id=ts']
    });
  }

  if (env === Env.Inspect) {
    inlineStyleRule.exclude = extractCSSFiles;
    rules.push(extractCSSRule);
  }

  if (env === Env.Production) {
    styleLoader.options.sourceMap = false;
    cssLoader.options.sourceMap = false;
    cssLoader.options.minimize = {
      discardComments: {
        removeAll: true,
      },
    };
    postcssLoader.options.sourceMap = false;
    inlineStyleRule.exclude = extractCSSFiles.concat(NM_PATH);
    rules.pop();
    rules.push(urlLoaderRule, extractCSSRule, extractLibCSSRule);
  } else {
    rules.push(fileLoaderRule);
  }

  return { rules };
}
