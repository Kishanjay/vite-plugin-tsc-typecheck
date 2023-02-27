/**
 * Dual build will do both a `esm` build and a `cjs` build based on a tsconfig file.
 */
const fs = require("fs");
const path = require("path");
const json = require("json5");
const assert = require("node:assert");
const { exec } = require("child_process");

const [, , tsConfigFile] = process.argv;
assert(tsConfigFile, `Invalid tsConfig file. Usage: tsc-dual-build <tsConfigFile>`);

async function tscDualBuild() {
  console.log(`2️⃣  [tsc-dual-build] starting\n  building ESM and CJS`);
  const config = getConfig();

  // Build ESM
  tscBuild(config.esm.module, config.esm.outDir);

  // Build CJS
  tscBuild(config.cjs.module, config.cjs.outDir);

  // Add local package.jsons
  compileLocalPackageJson(config.packageJson, config.esm.outDir, config.cjs.outDir);

  console.log(`🏁 [tsc-dual-build] finished`);
}

function tscBuild(moduleOverride, outDirOverride) {
  return new Promise((resolve, reject) => {
    console.log(`🔨 tsc-build\n  module: "${moduleOverride}"\n  outDir: "${outDirOverride}"`);

    exec(
      `tsc --pretty -p tsconfig.json --module ${moduleOverride} --outDir ${outDirOverride}`,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

function compileLocalPackageJson(packageJson, esmOutDir, cjsOutDir) {
  const { exports, ...basePackageJson } = packageJson;

  const esmPackageJson = { ...basePackageJson, type: "module", main: exports.import };
  const cjsPackageJson = { ...basePackageJson, type: "commonjs", main: exports.require };

  console.log(`⚙️ Exporting package.json`);
  fs.writeFileSync(path.join(esmOutDir, "package.json"), JSON.stringify(esmPackageJson, null, 2), {
    encoding: "utf8",
    flag: "w",
  });
  console.log(`  created "${path.join(esmOutDir, "package.json")}"`);
  fs.writeFileSync(path.join(cjsOutDir, "package.json"), JSON.stringify(cjsPackageJson, null, 2), {
    encoding: "utf8",
    flag: "w",
  });
  console.log(`  created "${path.join(cjsOutDir, "package.json")}"`);
}

/**
 * Fetches (and validates) the `tscDualBuild` config from tsconfig.json
 */
function getConfig() {
  const fileContents = fs.readFileSync(path.join(__dirname, tsConfigFile), {
    encoding: "utf8",
    flag: "r",
  });
  const tsConfig = json.parse(fileContents);

  assert(tsConfig?.tscDualBuild?.esm, "tsconfig.json tscDualBuild.esm is not set");
  assert(tsConfig?.tscDualBuild?.esm?.module, "tsconfig.json tscDualBuild.esm.module is not set");
  assert(tsConfig?.tscDualBuild?.esm?.outDir, "tsconfig.json tscDualBuild.esm.outDir is not set");

  assert(tsConfig?.tscDualBuild?.cjs, "tsconfig.json tscDualBuild.cjs is not set");
  assert(tsConfig?.tscDualBuild?.cjs?.module, "tsconfig.json tscDualBuild.cjs.module is not set");
  assert(tsConfig?.tscDualBuild?.cjs?.outDir, "tsconfig.json tscDualBuild.cjs.outDir is not set");

  const pjFileContents = fs.readFileSync(process.env.npm_package_json, {
    encoding: "utf8",
    flag: "r",
  });
  const packageJson = json.parse(pjFileContents);
  assert(packageJson?.exports, "package.json exports is not set");
  assert(packageJson?.exports?.import, "package.json exports.import is not set");
  assert(packageJson?.exports?.require, "package.json exports.require is not set");

  return { ...tsConfig.tscDualBuild, exports: packageJson.exports, packageJson };
}

tscDualBuild();
