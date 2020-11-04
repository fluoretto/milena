import dotenv from "dotenv";
import "module-alias/register";

import getConfig from "@root/config";
import server from "@root/server";

dotenv.config();
const config = getConfig();

const app = server(config);
app.create();
app.start();
