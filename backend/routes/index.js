const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/", async function (req, res, next) {
  console.log({ res: res, pool: pool });
  try {
    let promotions = "SELECT * FROM promotions;";
    let profile = "SELECT * FROM profile;";
    let stadium1 = "SELECT * FROM stadium1;";
    let stadium2 = "SELECT * FROM stadium2;";
    let store = "SELECT * FROM store;";
    let tokens = "SELECT * FROM tokens;";
    let product = "SELECT * FROM selectProduct;";

    const [rows1] = await pool.query(promotions);
    const [rows2] = await pool.query(profile);
    const [rows3] = await pool.query(stadium1);
    const [rows4] = await pool.query(stadium2);
    const [rows5] = await pool.query(product);
    const [rows7] = await pool.query(store);
    const [rows8] = await pool.query(tokens);
    return res.json({
      promotions: rows1,
      profile: rows2,
      stadium1: rows3,
      stadium2: rows4,
      selectProduct: rows5,
      store: rows7,
      tokens: rows8,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(err);
  }
});

exports.router = router;
