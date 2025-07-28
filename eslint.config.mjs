import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pkg from "@typescript-eslint/eslint-plugin";
const { configs } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: configs["recommended"],
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.config({
    extends: [
      "next",
      "prettier",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/eslint-recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: ["./tsconfig.json"],
    },
    plugins: ["prettier"],
    env: {
      node: true,
      browser: true,
      es6: true,
    },
    rules: {
      "prettier/prettier": [
        "warn",
        {
          endOfLine: "auto",
        },
      ],
      "@next/next/no-img-element": "off",
      "no-duplicate-imports": ["error"],
      "no-var": ["error"],
      "max-lines": [
        "error",
        {
          max: 300,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      "no-unused-vars": ["off"],
      "no-console": [
        "error",
        {
          allow: ["warn", "error", "info"],
        },
      ],
      "no-debugger": "error",
      eqeqeq: ["error", "always"],
      "no-else-return": [
        "error",
        {
          allowElseIf: false,
        },
      ],
      "no-loop-func": "error",
      "react/no-unstable-nested-components": [
        "error",
        {
          allowAsProps: true,
        },
      ],
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "function-declaration",
        },
      ],
      "react/jsx-boolean-value": ["error", "never"],
      "react/destructuring-assignment": ["error", "always"],
      "react/boolean-prop-naming": [
        "error",
        {
          rule: "^(is|has|show|have|allow)[A-Z]([A-Za-z0-9]?)+",
        },
      ],
      "react/forbid-component-props": [
        "error",
        {
          forbid: ["class"],
        },
      ],
      "react/forbid-dom-props": [
        "error",
        {
          forbid: ["class"],
        },
      ],
      "react/forbid-elements": [
        "error",
        {
          forbid: ["br", "select", "a", "b"],
        },
      ],
      "react/no-access-state-in-setstate": ["error"],
      "react/no-multi-comp": ["error"],
      "react/no-unused-prop-types": ["error"],
      "react/jsx-curly-brace-presence": [
        "error",
        {
          props: "never",
          children: "always",
          propElementValues: "always",
        },
      ],
      "react/jsx-fragments": ["error", "element"],
      "react/jsx-pascal-case": [
        "error",
        {
          allowAllCaps: false,
          allowNamespace: false,
          allowLeadingUnderscore: false,
        },
      ],
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true,
        },
      ],
      "react-hooks/exhaustive-deps": ["off"],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "none",
          ignoreRestSiblings: false,
          varsIgnorePattern: "^_",
        },
      ],
      "import/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          pathGroups: [],
        },
      ],
    },
  }),
];

export default eslintConfig;
