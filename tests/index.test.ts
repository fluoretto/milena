import supertest from "supertest";

import app from "../src/services/app";
import { startDatabase, endDatabase } from "../src/services/typeorm";
import { closeRedis } from "../src/services/redis";

const milenaId = "milena";
const milenaKey = "Milena is looking good today... As always.";

describe("API", () => {
  const req = supertest(app.router);

  beforeAll((done) => {
    app.create();
    startDatabase().then(() => done());
  });

  afterAll((done) => {
    try {
      closeRedis();
    } catch {}

    endDatabase().then(() => done());
  });

  it("is healthy", (done) => {
    req.get("/api").expect(200, done);
  });

  describe("v1", () => {
    it("is healthy", (done) => {
      req
        .get("/api/v1")
        .set("claimer-id", milenaId)
        .set("claimer-key", milenaKey)
        .expect(200, done);
    });
  });
});
