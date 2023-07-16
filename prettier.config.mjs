// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/** @type {import("prettier").Options} */
const config = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "css",
  endOfLine: "lf",
  embeddedLanguageFormatting: "off",
};

export default config;