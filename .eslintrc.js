module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig-eslint.json",
    sourceType: "module"
  },
  plugins: [
    "prettier",
  ],
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  rules: {
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, variables: false }
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        argsIgnorePattern: "^_.*",
        ignoreRestSiblings: true
      }
    ],
    "no-underscore-dangle": 0,
    // disable this rule until we can refactor the app to not do this
    "@typescript-eslint/no-empty-function": 0,
    // disable this rule because it is unnecessarily strict for TS
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    // if we want this, we should turn disallow any in tsconfig not here
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-var-requires": 0,
    camelcase: "error",
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/prefer-namespace-keyword": "error",
    eqeqeq: ["error", "smart"],
    "id-blacklist": [
      "error",
      "any",
      "Number",
      "number",
      "String",
      "string",
      "Boolean",
      "boolean",
      "Undefined"
    ],
    "id-match": "error",
    "no-eval": "error",
    "no-redeclare": "error",
    "no-var": "error"
  }
};
