import getConfig from "@root/config";
import server from "@root/server";

const config = getConfig();
const app = server(config);

export default app;
