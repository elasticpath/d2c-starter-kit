# `BETA` Elastic Path D2C Storefront 


## About

Elastic Path Commerce Cloud + Next.js + Algolia  + Netlify

Note that this project is a work in progress and subject to changes.

The aim of this project is to provide a toolkit that accellerates the development of storefronts.
 
## Getting Started

### Setup Local Environment

First, make a copy of the `.env.example` and rename it to `.env.local.` Set at least the values marked `<required>`

### Dev Server

then, run the development server:

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Feature list

#### Algolia setup
#### Registering payment gateways
#### Deployment instructions
#### Middleware
#### `useCart` hook
#### Roadmap feature list with done checkmarks
#### Available prebuilt components

## Git Commits

### Depends on

- [lint-staged](https://github.com/okonet/lint-staged)
- [husky](https://github.com/typicode/husky)

### Pre-commit hooks details

The project has a pre-commit hook that will run four stages independently for .ts, .tsx, .js and .jsx files

- runs `prettier` formating fix
- typecheck by running `tsc`
- validate code using `eslint` with the `next lint` command
- runs a final `prettier` format check to make sure nothing slipped through.

This is configured in the .lintstagedrc.js file in the root project directory.


