const config = {
  plugins: {
    'postcss-import': {
      path: ["src/styles"]
    },
    'postcss-utilities': {
      centerMethod: 'flexbox'
    },
    'postcss-extend-rule': {},
    'postcss-cssnext': {
      features: {
        autoprefixer: false,
      },
    }
  }
};

module.exports = ({ file, options, env }) => {
  if (env === 'production') {
    Object.assign(config, {
      autoprefixer: {},
      'postcss-flexbugs-fixes': {}
    });
  }

  return config;
}
