import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import nextPlugin from '@next/eslint-plugin-next';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';


export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Next.js plugin configuration
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    // React plugin settings
    settings: {
      react: {
        version: 'detect',
      },
    },
    ...pluginReactConfig,
    rules: {
        ...pluginReactConfig.rules,
        'react/react-in-jsx-scope': 'off', // Not needed in Next.js 17+
        'react/prop-types': 'off' // Optional: if you are using TypeScript for props
    }
  },
  {
    // Prettier configuration
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'warn',
    },
  },
  {
    // Ignores node_modules and the .next build directory
    ignores: ['node_modules/', '.next/'],
  },
];
