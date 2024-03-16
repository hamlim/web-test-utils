import { $, file } from "bun";

let version = (await file(`./packge.json`).json()).version;

// this cli can be called with the following arguments:
// - init: creates a new project
// - help: shows the help

// Parse the arguments
let args = process.argv.slice(2);

switch (args[0]) {
  case "init": {
    // TODO
    process.exit();
  }
  case "version": {
    console.log(`v${version}`);
    process.exit();
  }
  case "help":
  default: {
    console.log(`Usage: web-test-utils <command>`);
    console.log(`Commands:`);
    console.log(`  init: creates a new project`);
    console.log(`  help: shows the help`);
    process.exit();
  }
}
