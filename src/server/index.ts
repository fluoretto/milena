import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import logger from "morgan";
import { Config } from "@root/types";
import routes from "./routes";
import { respond } from "./util";
import { startDatabase } from "@root/services/typeorm";

const e = (config: Config) => {
  const app = express();

  const create = () => {
    app.use(helmet());

    app.set("dev", config.dev);
    app.set("port", config.port);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    if (config.dev) app.use(logger("dev"));

    app.use(routes);

    app.use((err: any, req: any, res: typeof express.response, next: any) => {
      let message = err.message;
      let status = err.status || 500;

      let name = err.name;
      let originService = "Unknown";
      let originModule = "Unknown";
      let additionalContext;

      if (err.isMilenaError) {
        status = err.statusCode;
        originService = err.context.originService;
        originModule = err.context.originModule;
        additionalContext = err.context.additionalContext;
      }

      respond(
        res,
        {
          name,
          message,
          originService,
          originModule,
          additionalContext,
        },
        status,
        false
      );
    });
  };

  const start = async () => {
    await startDatabase();
    const port = app.get("port") as number | string;
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Servidor iniciado: http://localhost:${port}.`);
    });
  };

  return {
    create,
    start,
    router: app,
  };
};

export default e;
module.exports = e;
