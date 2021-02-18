module.exports = {
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: [
    "react",
    "@babel",
  ],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    indent: ["error", 2],
    "react/jsx-indent": ["error", 2],
    "react/forbid-prop-types": ["off"],
  },
};
