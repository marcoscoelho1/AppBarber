module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'prettier/prettier':'error',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.js']
      }
    ],
    'import/no-named-as-default' : 'off',
    'import/prefer-default-export' : 'off',
    'no-param-reassign' : 'off',
    'no-shadow' : 'off',
    'react/no-typos' : 'off',
    'react/jsx-props-no-spreading' : 'off',
    'react/forbid-prop-types' : 'off',
    'react/no-array-index-key' : 'off'
  },
  settings: {
    'import/resolver': {
      'babel-plugin-root-import' : {
        rootPathSuffix: 'src'
      }
    }
  }
};
