import { execSync } from "child_process";
import { exit } from "process";

if (!process.env.MIGRATION_NAME) {
  console.error("\x1b[31m[!] ERR:\x1b[0m Please, provide migration name.");
  exit();
}

console.log(
  "\x1b[36m[!]\x1b[0m Creating Migration:",
  process.env.MIGRATION_NAME
);

execSync(
  `yarn ts-node ./node_modules/typeorm/cli.js "migration:generate" "-n" "${process.env.MIGRATION_NAME}"`
);

console.log(
  "\x1b[32m[!]\x1b[0m Migration created.",
  process.env.MIGRATION_NAME
);
