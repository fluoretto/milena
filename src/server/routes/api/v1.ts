import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    health: true,
    version: 1,
    status: true,
  });
});

export default router;
