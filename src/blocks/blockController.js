const { Router } = require("express");
const router = Router();
const pool = require("../../db");
const authorize = require("../../middleware/authorize");
const queries = require("./blockQueries");

//get all
const getBlocks = (req, res) => {
  try {
    const { college_id } = req.body;
    pool.query(queries.getBlocks, [college_id], (error, result) => {
      if (error) throw error;
      return res.json({
        error: false,
        message: "data retrived successfully",
        data: result.rows,
      });
    });
  } catch (err) {
    console.error(err);
    res.json({ error: true, message: err.message });
  }
};

//addBlock
const addBlocks = (req, res) => {
  try {
    const { block_id, block_name, college_id } = req.body;
    pool.query(
      queries.addBlocks,
      [block_id, block_name, college_id],
      (error, result) => {
        if (error) {
          return res.json({
            error: true,
            message: "Invalid credentials",
          });
        }
        return res.json({
          error: false,
          message: "Block Data added successfully",
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: err.message });
  }
};

//deleteBlock
const deleteBlocks = (req, res) => {
  try {
    const { block_id } = req.body;
    pool.query(queries.deleteBlocks, [block_id], (error, result) => {
      if (error) throw error;
      res.json({
        error: false,
        message: "Block Deleted Successfully",
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: err.message });
  }
};

module.exports = {
  getBlocks,
  addBlocks,
  deleteBlocks,
};
