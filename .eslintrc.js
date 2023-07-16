module.exports = {
  env: { browser: true, es2020: true, webextensions: true },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "airbnb-base",
    "airbnb-typescript/base",
    "eslint:recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn",
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['**/vite.config.ts'], 
      optionalDependencies: false,
    }]
  },
};
