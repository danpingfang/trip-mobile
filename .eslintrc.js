module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  globals: {
    Android: true
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'import/no-unresolved': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'comma-dangle': [2, 'never'],
    'no-param-reassign': 0,
    'arrow-body-style': 0,
    'max-len': ['error',
      {
        'ignorePattern': '\/\/'
      }
    ],
    'no-new': 0
  }
};
