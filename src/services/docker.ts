import fs from "fs";

export const getSecret = (secretName: string) => {
  try {
    return fs.readFileSync(`/run/secrets/${secretName}`, "utf8");
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.error(
        `An error occurred while trying to read the secret: ${secretName}. Err: ${err}`
      );
    } else {
      console.error(
        `Could not find the secret, probably not running in swarm mode: ${secretName}. Err: ${err}`
      );
    }
    return false;
  }
};
