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
    },
  ],
  rules: {},
};
