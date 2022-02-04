module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false,
    },
  })

  return config
}
