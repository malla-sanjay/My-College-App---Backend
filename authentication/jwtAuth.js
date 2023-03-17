const express = require("express");
const router = express.Router();
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");
const queries = require("../authentication/authQueries");
var CryptoJS = require("crypto-js");
require("dotenv").config();

//College Registration
router.post("/register", validInfo, async (req, res) => {
  const { college, email, name, password } = req.body;

  try {
    const user = await pool.query(queries.getCollegeByEmail, [email]);

    if (user.rows.length > 0) {
      return res
        .status(401)
        .json({ error: true, message: "User already exist!" });
    }

    //Password encryption
    const passwordHash = await CryptoJS.AES.encrypt(
      password,
      process.env.PASS_KEY
    ).toString();

    //new user created and added to the database
    let newUser = await pool.query(queries.addCollege, [
      college,
      email,
      name,
      passwordHash,
    ]);

    //generating jwt with user info
    //const jwtToken = jwtGenerator(
    //newUser.rows[0].college_id,
    //newUser.rows[0].college_name,
    //newUser.rows[0].admin_email,
    //newUser.rows[0].admin_name
    //);

    //Success response
    return res.json({
      //token: jwtToken,
      error: false,
      message: "Sign up successfull, now logging in",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: err.message });
  }
});

//Account Login
router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query(queries.getCollegeByEmail, [email]);

    //no users found through email
    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid Credential" });
    }

    //decrypting password and compairing
    const bytes = await CryptoJS.AES.decrypt(
      user.rows[0].password_hash,
      process.env.PASS_KEY
    );
    const decryptedHash = bytes.toString(CryptoJS.enc.Utf8);

    if (!(password === decryptedHash)) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid Credential" });
    }

    //generating jwt with user info
    const jwtToken = jwtGenerator(
      user.rows[0].college_id,
      user.rows[0].college_name,
      user.rows[0].admin_email,
      user.rows[0].admin_name
    );

    //Token as Response
    return res.json({
      token: jwtToken,
      error: false,
      message: "Login Successful",
      user: {
        id: user.rows[0].college_id,
        college: user.rows[0].college_name,
        email: user.rows[0].admin_email,
        admin: user.rows[0].admin_name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: err.message });
  }
});

//Token Verification
router.get("/verify", authorize, (req, res) => {
  try {
    res.json({ error: false, message: "token is still valid" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: err.message });
  }
});

//Change Password
router.post("/changePassword", async (req, res) => {
  const { email, new_password } = req.body;

  try {
    const user = await pool.query(queries.getCollegeByEmail, [email]);

    //no users found through email
    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ error: true, message: "User does not exist" });
    }

    //Password encryption
    const passwordHash = await CryptoJS.AES.encrypt(
      new_password,
      process.env.PASS_KEY
    ).toString();

    //update password query with callback sending appropirate response on success or error
    pool.query(
      queries.updatePassword,
      [passwordHash, user.rows[0].admin_email],
      (err, result) => {
        if (err) throw err;
        return res.json({
          error: false,
          message: "password updated successfully",
        });
      }
    );
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

//checkPassword
router.post("/checkPass", authorize, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query(queries.getCollegeByEmail, [email]);

    if (user.rows.length < 1) {
      return res
        .status(401)
        .json({ error: true, message: "User doesnt exist!" });
    }

    //decrypting password and compairing
    const bytes = await CryptoJS.AES.decrypt(
      user.rows[0].password_hash,
      process.env.PASS_KEY
    );
    const decryptedHash = bytes.toString(CryptoJS.enc.Utf8);

    if (!(password === decryptedHash)) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid Credential" });
    }
    return res.json({ error: false, message: "Password OK" });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

//update account details
router.post("/updateAccount", authorize, (req, res) => {
  const { college, admin, email } = req.body;
  try {
    pool.query(
      queries.updateCollegeDetails,
      [college, admin, email],
      (err, result) => {
        if (err) throw err;
        res.json({ error: false, message: "Updated details successfully" });
      }
    );
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.get("/getColleges", (req, res) => {
  try {
    pool.query(queries.getAllColleges, (err, result) => {
      if (err) throw err;
      res.json({
        error: false,
        message: "successfully retrieved all colleges",
        data: result.rows,
      });
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;
