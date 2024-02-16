module.exports = {
  presets: [
    ["@babel/preset-env", { targets: "> 0.25%, not dead" }],
    "@babel/preset-typescript",
  ],
  plugins: [["@babel/plugin-proposal-decorators", { version: "2023-05" }]],
};
