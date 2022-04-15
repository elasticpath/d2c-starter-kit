const path = require("path");

/**
 *  Using next lint with lint-staged requires this setup
 *  https://nextjs.org/docs/basic-features/eslint#lint-staged
 */

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": ["npm run format:fix"],
  "*.{ts,tsx}": ["npm run type:check"],
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, "npm run format:check"],
};
