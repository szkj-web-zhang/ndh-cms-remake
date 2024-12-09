module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "2020",
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  ignorePatterns: ["dist", "node_modules", ".eslintrc.cjs"],
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    // eslint (http://eslint.cn/docs/rules)
    "no-var": "error",
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "prefer-const": "off",
    "no-use-before-define": "off",

    // typeScript (https://typescript-eslint.io/rules)
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/prefer-ts-expect-error": "error",
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-non-null-assertion": "off",

    // vue (https://eslint.vuejs.org/rules)
    "vue/script-setup-uses-vars": "error",
    "vue/v-slot-style": "error",
    "vue/no-mutating-props": "error",
    "vue/custom-event-name-casing": "error",
    "vue/html-closing-bracket-newline": "off",
    "vue/attribute-hyphenation": "error",
    "vue/attributes-order": "off",
    "vue/no-v-html": "off",
    "vue/require-default-prop": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-setup-props-destructure": "off",
    "vue/no-use-v-if-with-v-for": "off"
  }
};
