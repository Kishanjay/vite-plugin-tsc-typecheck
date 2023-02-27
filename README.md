# @kjn/vite-plugin-tsc-typecheck

[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

[![npm version](https://badge.fury.io/js/@kjn%2Fvite-plugin-tsc-typecheck.svg)](https://www.npmjs.com/package/@kjn/vite-plugin-tsc-typecheck)

The repo holds the vite plugin for typechecking with typescript.

## How to use

```sh
npm i @kjn/vite-plugin-tsc-typecheck
```

```ts
import { tscTypecheck } from "@kjn/vite-plugin-tsc-typecheck";

export default defineConfig({
  plugins: [tscTypecheck()],

  /**
   * ...
   * ...
   * The rest of your config
   */
});
```

Output you'll see in your terminal

```sh
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
🕵️‍♂️ [tsc-typecheck] Testing for type errors
✅ [tsc-typecheck] All good
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
```

Now when autobuilding using `vite build --watch` an additional typechecking step will be executed. You'll see if there are typescript type errors.

Now when building using `vite build` the additional typechecking step will be executed. You'll see if there are typescript type errors.

# Release

This repo uses `semantic-release` to auto-release new versions. The semver version number is based on the conventional-commit messages.

- patches: `fix: $MSG` will increment the patch version
- minor: `feat: $MSG` will increment the minor version
- major: `feat: $MSG \n\n BREAKING CHANGE` will increment the major version

Pushing the changes to the main-branch will kick of deployment. The semantic-release bot will add a new commit directly to the repo with the new semver version number in `package.json`. Therefore after every push, you'd need to pull the repo again.
