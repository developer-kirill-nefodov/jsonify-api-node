module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
	],
	rules: {
		'@typescript-eslint/quotes': ['error', 'single', {avoidEscape: true}],
		'@typescript-eslint/object-curly-spacing': ['error', 'always'],
	},
};
