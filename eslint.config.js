import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';

export default tseslint.config(
  { ignores: ['dist', 'build', 'dist', 'node_modules', 'public', '!.eslintrc.js'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      prettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': 'error',
      'global-require': 0,
      'import/prefer-default-export': 0,
      'import/no-extraneous-dependencies': 0,
      'import/no-import-module-exports': 0,
      'jsx-a11y/click-events-have-key-events': 0,
      'jsx-a11y/label-has-associated-control': 0,
      'jsx-a11y/no-noninteractive-element-interactions': 0,
      'no-console': 0,
      'no-param-reassign': ['error', { props: false }],
      'react/button-has-type': 0,
      'react/destructuring-assignment': 0,
      'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
      'react/jsx-filename-extension': 0,
      'react/jsx-one-expression-per-line': 0,
      'react/jsx-uses-react': 'off',
      'react/no-access-state-in-setstate': 0,
      'react/prop-types': 0,
      'react/react-in-jsx-scope': 0,
      'react/state-in-constructor': 0,
    },
  },
);
