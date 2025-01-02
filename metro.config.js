const { getDefaultConfig } = require("expo/metro-config")

const config = getDefaultConfig(__dirname)

const { transformer, resolver } = config

config.resolver = {
  ...resolver,
  sourceExts: [...resolver.sourceExts, "mjs", "cjs"],
}

module.exports = config
