// eslint.config.mjs
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname for ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create FlatCompat instance with recommended config
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
	// Base configurations
	...compat.extends(
		"next/core-web-vitals",
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"prettier"
	),

	// Custom configuration
	{
		files: ["**/*.ts", "**/*.tsx"],
		plugins: {
			"@typescript-eslint": tsPlugin,
			react: reactPlugin,
		},
		languageOptions: {
			globals: {
				React: "readonly",
				JSX: "readonly",
			},
			parser: tsParser,
			parserOptions: {
				project: "./tsconfig.json",
				ecmaFeatures: {
					jsx: true,
				},
				ecmaVersion: "latest",
				sourceType: "module",
			},
		},
		settings: {
			"import/resolver": {
				typescript: {
					project: "./tsconfig.json",
				},
			},
			react: {
				version: "detect",
			},
		},
		rules: {
			"no-console": "warn",
			"prefer-arrow-callback": "error",
			"prefer-template": "error",
			quotes: ["error", "double"],

			// React specific rules
			"react/react-in-jsx-scope": "off",
			"react/prop-types": "off",

			// TypeScript rules
			"@typescript-eslint/ban-ts-comment": [
				"error",
				{
					"ts-expect-error": "allow-with-description",
					minimumDescriptionLength: 10,
				},
			],
			"@typescript-eslint/consistent-type-definitions": "off",
			"@typescript-eslint/consistent-type-exports": "error",
			"@typescript-eslint/consistent-type-imports": [
				"warn",
				{
					fixStyle: "inline-type-imports",
					prefer: "type-imports",
				},
			],
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					args: "after-used",
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-empty-interface": "off", // Changed to warning instead of error
			"@typescript-eslint/no-empty-object-type": "off",

			// Import rules
			"import/no-unresolved": "error",
			"import/named": "error",
			"import/no-anonymous-default-export": "off", // Add this to allow anonymous default exports
			"import/order": [
				"warn",
				{
					groups: [
						"builtin",
						"external",
						"internal",
						"parent",
						"sibling",
						"index",
					],
					"newlines-between": "always",
					alphabetize: {
						order: "asc",
						caseInsensitive: true,
					},
				},
			],
		},
	},
];

export default eslintConfig;
