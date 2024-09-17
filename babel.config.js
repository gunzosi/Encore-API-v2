module.exports = {
    presets: [
        "@babel/preset-env",
        "@babel/preset-typescript"
    ],
    plugins: [
        "@babel/plugin-transform-modules-commonjs" // Add this plugin for ESM
    ]
};
