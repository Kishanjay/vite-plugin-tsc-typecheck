# @kjn/vite-plugin-tsc-typecheck

[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

The repo holds the vite plugin for typechecking with typescript.

## How to use

Add `tscTypecheck` as a plugin in `vite.config.js`. This will 

```ts
export default defineConfig({
  plugins: [
    /**
     * ...
     * ...
     * The rest of your plugins
     */
    tscTypecheck()
  ],
  /**
   * ...
   * ...
   * The rest of your config
   */
});
```

Now when autobuilding using `vite build --watch` an additional typechecking step will be executed. You'll see if there are typescript type errors.


Now when building using `vite build` the additional typechecking step will be executed. You'll see if there are typescript type errors.

# Release

This repo uses `semantic-release` to auto-release new versions. The semver version number is based on the conventional-commit messages.

- patches: `fix: $MSG` will increment the patch version
- minor: `feat: $MSG` will increment the minor version
- major: `feat: $MSG \n\n BREAKING CHANGE` will increment the major version

Pushing the changes to the main-branch will kick of deployment. The semantic-release bot will add a new commit directly to the repo with the new semver version number in `package.json`. Therefore after every push, you'd need to pull the repo again.
