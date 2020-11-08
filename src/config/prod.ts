import { EnvConfig } from "@root/types";

const c = (): EnvConfig => {
  return {
    port: process.env.PORT || 4000,
  };
};

export default c;
module.exports = c;
