module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard", "plugin:prettier/recommended"],
  overrides: [
    {
      files: ["*.ts"],
      extends: ["standard-with-typescript", "plugin:prettier/recommended"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": 2,
        "jest/expect-expect": [
          "error",
          {
            assertFunctionNames: ["expect", "assert*"],
            additionalTestBlockFunctions: [],
          },
        ],
        "@typescript-eslint/consistent-type-assertions": "warn",
        "@typescript-eslint/strict-boolean-expressions": "warn",
      },
    },
    {
      files: ["__mocks__/**/*.js", "**/*.test.ts"],
      plugins: ["jest"],
      extends: ["plugin:jest/recommended"],
    },
  ],
  ignorePatterns: ["dist/*"],
  rules: {},
};
