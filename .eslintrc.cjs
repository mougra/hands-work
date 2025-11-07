/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    "node": true,
    "commonjs": true
  },
  rules: {
    "indent": "off",
    "comma-dangle": "off",
    "@typescript-eslint/comma-dangle": [
      "error",
      "never"
    ],
    "space-before-function-paren": "off",
    "@typescript-eslint/space-before-function-paren": [
      "error",
      {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always"
      }
    ],
    "vue/script-indent": [
      "error",
      2,
      {
        "baseIndent": 1,
        "switchCase": 1,
        "ignores": []
      }
    ],
    "vue/attributes-order": [
      "error",
      {
        "order": [
          "CONDITIONALS",
          "LIST_RENDERING",
          "RENDER_MODIFIERS",
          "OTHER_DIRECTIVES",
          "SLOT",
          "TWO_WAY_BINDING",
          "CONTENT",
          "EVENTS",
          "UNIQUE",
          "OTHER_ATTR",
          "DEFINITION",
          "GLOBAL"
        ],
        "alphabetical": false
      }
    ],
    "no-restricted-syntax": 0,
    "vue/component-tags-order": ["error", {
      "order": [ "template", "script", "style" ]
    }],
    "antfu/if-newline": 0,
    "brace-style": "off",
    "@typescript-eslint/brace-style": [
      "error",
      "1tbs"
    ],
    "react/prop-types": 0,
    "vue/comma-dangle": [
      "error",
      "never"
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "args": "after-used",
        "ignoreRestSiblings": true
      }
    ],
    "@typescript-eslint/ban-ts-comment": 0,
    "vue/no-extra-parens": 0,
    "vue/component-name-in-template-casing": "off",
    // "vue/component-name-in-template-casing": [
    //   "error",
    //   "kebab-case" | "PascalCase",
    //   {
    //     "registeredComponentsOnly": true,
    //     "ignores": []
    //   }
    // ],
    "vue/new-line-between-multi-line-property": [
      "error",
      {
        "minLineOfMultilineProperty": 2
      }
    ],
    "vue/next-tick-style": [
      "error",
      "callback"
    ],
    "vue/max-attributes-per-line": [
      "error",
      {
        "singleline": {
          "max": 2
        },
        "multiline": {
          "max": 1
        }
      }
    ],
    "react/no-unknown-property": 0,
    "react/display-name": 0,
    "vue/require-default-prop": "off",
    "vue/multi-word-component-names": "off"
  },

  "overrides": [
    {
      "files": [
        "*.vue"
      ],
      "rules": {
        "indent": "off",
        "@typescript-eslint/indent": "off"
      }
    }
  ]
}
