import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import { Config } from "@root/types";
import routes from "./routes";

const e = (config: Config) => {
  const app = express();

  const create = () => {
    app.set("dev", config.dev);
    app.set("port", config.port);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(logger("dev"));

    app.use(routes);
  };

  const start = () => {
    const port = app.get("port");
    app.listen(port, () => {
      // tslint:disable-next-line:no-console
      console.log(`Servidor iniciado: http://localhost:${port}.`);
    });
  };

  return {
    create,
    start,
  };
};

export default e;
module.exports = e;
