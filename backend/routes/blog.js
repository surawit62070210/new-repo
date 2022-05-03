const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require("../middlewares");

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
router = express.Router();

// Require multer for file upload
const multer = require("multer");
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

const passwordValidator = (value, helpers) => {
  if (value.length < 8) {
    throw new Joi.ValidationError(
      "Password must contain at least 8 characters"
    );
  }
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    throw new Joi.ValidationError("Password must be harder");
  }
  return value;
};

const usernameValidator = async (value, helpers) => {
  const [rows, _] = await pool.query(
    "SELECT username FROM profile WHERE username = ?",
    [value]
  );
  if (rows.length > 0) {
    const message = "This user is already taken";
    throw new Joi.ValidationError(message, { message });
  }
  return value;
};

const signupSchema = Joi.object({
  email: Joi.string().required().email(),
  mobile: Joi.string()
    .required()
    .pattern(/0[0-9]{9}/),
  firstname: Joi.string().required().max(150),
  lastname: Joi.string().required().max(150),
  password: Joi.string().required().custom(passwordValidator),
  ConPass: Joi.string().required().valid(Joi.ref("password")), // ต้องเหมือนกับ password
  username: Joi.string().required().min(5).external(usernameValidator),
});

router.post(
  "/register",
  upload.array("myImage", 5),
  async function (req, res, next) {
    if (req.method == "POST") {
      console.log({ pic: req.files[0] });
      const file = "";
      if (req.files[0] === undefined) {
        this.file = "";
      } else {
        this.file = req.files[0].path.substring(6);
      }
      try {
        await signupSchema.validateAsync(req.body, { abortEarly: false });
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const telephone = req.body.mobile;
      const username = req.body.username;
      const password = req.body.password;
      const email = req.body.email;
      console.log({ file: this.file });
      const pic = this.file;

      const conn = await pool.getConnection();
      // Begin transaction
      await conn.beginTransaction();
      try {
        let resultss = await conn.query(
          "INSERT INTO `profile`(`firstname`, `lastname`, `mobile`, `username`, `password`, `email`,`picture`,`role`,`status`,`amount`,`code`) VALUES(?, ?, ?, ?, ?, ?, ?,'normal','NotPay',0,'');",
          [firstname, lastname, telephone, username, password, email, pic]
        );

        await conn.commit();
        console.log({ result: resultss });
        res.send("success!");
      } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
      } finally {
        console.log("finally");
        conn.release();
      }
    }
  }
);

router.put("/update/amount", async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  const id = req.body.id;
  const amount = req.body.amount;
  const code = req.body.code;
  try {
    await pool.query("UPDATE profile SET amount=? WHERE id=?", [amount, id]);
    await pool.query("UPDATE profile SET code=? WHERE id=?", [code, id]);
    await conn.commit();
    res.send("success!");
  } catch (error) {
    res.status(500).json(error);
  } finally {
    console.log("finally");
    conn.release();
  }
});

router.get("/user/me", isLoggedIn, async (req, res, next) => {
  res.json(req.user);
});

router.put("/update/status", async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  const id = req.body.id;
  const username = req.body.username;
  const status = req.body.status;
  try {
    //statusProfile
    await pool.query("UPDATE profile SET status=? WHERE id=?", [status, id]);
    if (status == "Pay") {
      //statusProfile
      await pool.query("UPDATE profile SET amount=? WHERE id=?", [0, id]);
      await pool.query("UPDATE profile SET code=? WHERE id=?", ["", id]);

      //statusStadium1
      await pool.query("UPDATE stadium1 SET status=? WHERE username=?", [
        "empty",
        username,
      ]);
      await pool.query("UPDATE stadium1 SET username=? WHERE username=?", [
        "",
        username,
      ]);

      //statusStadium2
      await pool.query("UPDATE stadium2 SET status=? WHERE username=?", [
        "empty",
        username,
      ]);
      await pool.query("UPDATE stadium2 SET username=? WHERE username=?", [
        "",
        username,
      ]);
    }

    await conn.commit();
    res.send("success!");
  } catch (error) {
    res.status(500).json(error);
  } finally {
    console.log("finally");
    conn.release();
  }
});

router.post("/user/login", async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body, { abortEarly: false });
  } catch (err) {
    return res.status(400).send(err);
  }
  const username = req.body.username;
  const password = req.body.password;

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    // Check if username is correct
    const [users] = await conn.query("SELECT * FROM profile WHERE username=?", [
      username,
    ]);
    const user = users[0];
    if (!user) {
      throw new Error("Incorrect username or password");
    }

    // Check if password is correct
    if (!((await password) === user.password)) {
      throw new Error("Incorrect username or password");
    }

    // Check if token already existed
    const [tokens] = await conn.query("SELECT * FROM tokens WHERE user_id=?", [
      user.id,
    ]);
    let token = tokens[0].token;
    if (!token) {
      // Generate and save token into database
      token = generateToken();
      await conn.query("INSERT INTO tokens(user_id, token) VALUES (?, ?)", [
        user.id,
        token,
      ]);
    }

    conn.commit();
    res.status(200).json({ token: token });
  } catch (error) {
    conn.rollback();
    res.status(400).json(error.toString());
  } finally {
    conn.release();
  }
});

router.put("/user/changepass", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log({ Newpassword: req.body });
  const newpass = req.body.newpass;

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    // Check if username is correct
    const [users] = await conn.query("SELECT * FROM profile WHERE username=?", [
      username,
    ]);
    const user = users[0];
    if (!user) {
      throw new Error("Incorrect username or mobile");
    }

    // Check if password is correct
    if (!((await password) === user.mobile)) {
      throw new Error("Incorrect username or mobile");
    }
    console.log({ password: user.mobile });

    await pool.query("UPDATE profile SET password=? WHERE username=?", [
      newpass,
      username,
    ]);

    conn.commit();
    res.send("success!");
  } catch (error) {
    conn.rollback();
    res.status(400).json(error.toString());
  } finally {
    conn.release();
  }
});
exports.router = router;
