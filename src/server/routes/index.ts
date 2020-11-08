import express from "express";
import api from "./api";
import getConfig from "@root/config";

const router = express.Router();

router.get("/", (req, res) => {
  const { network, server } = getConfig();

  res.send(
    `
      <h1><pre>Fluoretto - milena_auth</pre></h1>
      <p>
        <strong>
          <br>
          Servidor:
          <ul>
            <li>Network: ${network}</li>
            <li>Servidor: ${server}</li>
          </ul>
        </strong>
      </p>
      <hr>
      <p>Este servidor está operacional.</p>
    `
  );
});

router.use("/api", api);

export default router;
