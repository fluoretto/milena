import { EnvConfig } from "@root/types";

const c = (): EnvConfig => {
  return {
    port: process.env.PORT || 8080,
  };
};

export default c;
module.exports = c;
