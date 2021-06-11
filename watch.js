const fs = require("fs");
const { resolve, parse } = require("path");
// import fs from "fs";
// import { resolve, parse } from "path";
const cwd = process.cwd();

function fixName(par, p = "") {
  return p.replace(par.dir + "/" + par.name, "");
}

function updateAPI(realPath = "", srcPath, aouterPath) {
  const par = parse(realPath);
  console.log(par);

  const fixRealPath = (inPath = "") => {
    return inPath.replace(/\.(tsx|jsx)/, "");
  };
  let dir = {};
  let importCode = "";
  const loadDir = (thePath, obj) => {
    const files = fs.readdirSync(thePath);
    files.forEach((file) => {
      const p = resolve(thePath, file);
      const stat = fs.statSync(p);
      const key = "'" + file.replace(/\.(ts|js)/, "") + "'";
      if (stat.isDirectory()) {
        if (!obj[key]) {
          obj[key] = {};
        }
        loadDir(p, obj[key]);
      } else if (/\.(tsx|jsx)$/.test(file) && !/\.d\.ts$/.test(file)) {
        const importName = fixRealPath(p);
        let name = fixName(par, importName);
        const _par = parse(name);
        let url = name;
        if (_par.name === "index") {
          url = _par.dir;
        }
        importCode += `\t\t\t\t<Route path="${url}" component={() => import("./${par.name}${name}")}/>\n`;
        obj[key] = name;
      }
    });
  };
  loadDir(realPath, dir);

  fs.writeFile(
    aouterPath,
    `/* eslint-disable */
// Code generated by svelte-zero-api, DO NOT EDIT.
import { Route } from "aouter";

function Pages() {
  return (
    <>
${importCode}
    </>
  );
}


export default Pages;
    `,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
}

function run({ routes, src, fileName = "_aouter.tsx", watch } = {}) {
  routes = routes || "src/routes";
  src = src || "src";
  const realPath = resolve(cwd, routes);
  const srcPath = resolve(cwd, src);

  const aouterPath = resolve(cwd, src, fileName);

  updateAPI(realPath, srcPath, aouterPath);
  if (watch) {
    fs.watch(realPath, { recursive: true }, (event, file) => {
      if (/\.ts/.test(file)) {
        updateAPI(realPath, srcPath, aouterPath);
      }
    });
  }
}

// export default run;
module.exports = run;
