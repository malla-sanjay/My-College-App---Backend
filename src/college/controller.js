const pool = require("../../db");
const queries = require("./queries");
var CryptoJS = require("crypto-js");

const getColleges = (req, res) => {
  pool.query(queries.getAllColleges, (error, result) => {
    if (error) throw error;
    res.status(201).json({
      error: false,
      message: "data retrival success",
      data: result.rows,
    });
  });
};

const addAccount = (req, res) => {
  const { collegeName, email, adminName, password } = req.body;
  const passwordHash = CryptoJS.AES.encrypt(
    password,
    "mycollegeapp"
  ).toString();

  pool.query(queries.checkEmail, [email], (error, result) => {
    //if the email already exists
    if (result.rowCount) {
      res
        .status(200)
        .json({ error: true, message: "The email already exists" });
    } else {
      pool.query(
        queries.addCollege,
        [collegeName, email, adminName, passwordHash],
        (error, result) => {
          if (error) throw error;
          res.status(201).json({ error: false, message: "Added successfully" });
        }
      );
    }
  });
};

const getUserBYEmail = (req, res) => {
  const { email, password } = req.body;
  //check if account exist from email
  pool.query(queries.getCollegeByEmail, [email], (error, result) => {
    if (error) throw error;
    if (result.rowCount) {
      //decrypting password and compairing
      const bytes = CryptoJS.AES.decrypt(
        result.rows[0].password_hash,
        "mycollegeapp"
      );
      const decryptedHash = bytes.toString(CryptoJS.enc.Utf8);
      if (password == decryptedHash) {
        res.status(201).json({
          error: false,
          message: "login Successful",
          data: result.rows,
        });
      } else {
        res.status(200).json({ error: true, message: "password is incorrect" });
      }
    } else {
      res.status(200).json({ error: true, message: "Account doesn't exist" });
    }
  });
};

const updateAccountDetails = (req, res) => {
  const { email, collegeName, adminName } = req.body;
  //pinpoint account
  pool.query(queries.getCollegeByEmail, [email], (error, result) => {
    if (result.rowCount) {
      //update account
      pool.query(
        queries.updateCollegeDetails,
        [collegeName, adminName, email],
        (error, result) => {
          if (error) throw error;
          res
            .status(201)
            .json({ error: false, message: "Account updated successfully" });
        }
      );
    } else {
      res.status(200).json({ error: true, message: "Account does not exist" });
    }
  });
};

const changePassword = (req, res) => {
  const { email, password } = req.body;
  //pinpoint account
  pool.query(queries.getCollegeByEmail, [email], (error, result) => {
    if (result.rowCount) {
      //encrypt password and update password hash
      const passwordHash = CryptoJS.AES.encrypt(
        password,
        "mycollegeapp"
      ).toString();
      pool.query(
        queries.updatePassword,
        [passwordHash, email],
        (error, result) => {
          if (error) throw error;
          res
            .status(201)
            .json({ error: false, message: "Password updated successfully" });
        }
      );
    } else {
      res.status(200).json({ error: true, message: "Account does not exist" });
    }
  });
};

module.exports = {
  getColleges,
  addAccount,
  getUserBYEmail,
  updateAccountDetails,
  changePassword,
};
