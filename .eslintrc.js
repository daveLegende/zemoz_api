module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'no-console': 1, // Means warning
    'prettier/prettier': [
      2, // Means error
      {
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/naming-convention': 0, // Means off
    '@typescript-eslint/no-unused-vars': [2, { ignoreRestSiblings: true }],
    '@typescript-eslint/no-empty-function': [
      2,
      { allow: ['private-constructors', 'arrowFunctions'] },
    ],
    '@typescript-eslint/consistent-type-definitions': 2,
    '@typescript-eslint/explicit-function-return-type': [
      1,
      { allowFunctionsWithoutTypeParameters: true },
    ],
    '@typescript-eslint/adjacent-overload-signatures': 2,
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/array-type': 2,
    '@typescript-eslint/await-thenable': 2,
    '@typescript-eslint/ban-types': 2,
    '@typescript-eslint/ban-ts-comment': 2,
    '@typescript-eslint/no-duplicate-enum-values': 2,
    '@typescript-eslint/no-base-to-string': 2,
    '@typescript-eslint/no-empty-interface': 2,
    '@typescript-eslint/no-extra-non-null-assertion': 2,
    '@typescript-eslint/no-floating-promises': 1,
    '@typescript-eslint/no-non-null-asserted-optional-chain': 2,
    '@typescript-eslint/no-non-null-assertion': 2,
    '@typescript-eslint/no-unnecessary-type-constraint': 2,
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-useless-empty-export': 2,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/non-nullable-type-assertion-style': 2,
    '@typescript-eslint/prefer-enum-initializers': 2,
    '@typescript-eslint/prefer-optional-chain': 0, // a && a.b && a.b.c
    '@typescript-eslint/no-misused-new': 2,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-unnecessary-condition': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/no-duplicate-type-constituents': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
  },
};
