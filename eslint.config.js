import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "build", "node_modules", "*.config.js", "public"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        sourceType: 'module'
      }
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": ["error", { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-const": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-alert": "warn",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-script-url": "error",
      "no-proto": "error",
      "no-iterator": "error",
      "no-with": "error",
      "no-multi-str": "error",
      "no-new-wrappers": "error",
      "no-new-object": "error",
      "no-array-constructor": "error",
      "no-extend-native": "error",
      "no-caller": "error",
      "no-undef": "error",
      "no-unused-expressions": ["error", { 
        allowShortCircuit: true, 
        allowTernary: true 
      }],
      "no-sequences": "error",
      "no-nested-ternary": "warn",
      "no-unneeded-ternary": "error",
      "no-else-return": "error",
      "no-lonely-if": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "indent": ["error", 2, { SwitchCase: 1 }],
      "quotes": ["error", "single", { avoidEscape: true }],
      "semi": ["error", "always"],
      "comma-dangle": ["error", "es5"],
      "comma-spacing": ["error", { before: false, after: true }],
      "comma-style": ["error", "last"],
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "keyword-spacing": ["error", { before: true, after: true }],
      "space-before-blocks": "error",
      "space-infix-ops": "error",
      "space-unary-ops": ["error", { words: true, nonwords: false }],
      "spaced-comment": ["error", "always", { exceptions: ["-", "+"] }],
      "eol-last": "error",
      "no-trailing-spaces": "error",
      "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
      "jsx-a11y/alt-text": "off",
      "jsx-a11y/aria-props": "off",
      "jsx-a11y/aria-proptypes": "off",
      "jsx-a11y/aria-unsupported-elements": "off",
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
);
