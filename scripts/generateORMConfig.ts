import fs from "fs";
import yaml from "js-yaml";

const mysqlPassword = fs.readFileSync(
  "./secrets/mysql_password.secret",
  "utf8"
);

const dockerComposeContent = fs.readFileSync(
  "./docker-compose.dev.yml",
  "utf8"
);
const dockerCompose = yaml.safeLoad(dockerComposeContent) as any;
const mysql = dockerCompose.services.mysql;

const configContent = `{
  "type": "mysql",
  "host": "localhost",
  "port": ${mysql.ports[0].split(":")[0]},
  "username": "root",
  "password": "${mysqlPassword}",
  "database": "${mysql.environment.MYSQL_DATABASE}",
  "migrationsTableName": "migrations",
  "entities": [
    "src/entity/**/*.ts"
  ],
  "migrations": [
    "src/migration/**/*.ts"
  ],
  "subscribers": [
    "src/subscriber/**/*.ts"
  ]
}`;

fs.writeFileSync("./ormconfig.json", configContent);
