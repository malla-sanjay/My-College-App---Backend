const pool = require("../../db");
const queries = require("./capacityQueries");

//get all
const getCapacity = (req, res) => {
  try {
    const { college_id } = req.body;
    pool.query(queries.getCapacity, [college_id], (error, result) => {
      if (error) throw error;
      return res.json({
        error: false,
        message: "Capacities retrived successfully",
        data: result.rows,
      });
    });
  } catch (err) {
    console.error(err);
    res.json({ error: true, message: err.message });
  }
};

//add
const addCapacity = (req, res) => {
  try {
    const { capacity_code, no_of_student, college_id } = req.body;
    pool.query(
      queries.addCapacity,
      [capacity_code, no_of_student, college_id],
      (error, result) => {
        if (error) {
          return res.json({
            error: true,
            message: "Invalid credentials",
          });
        }
        return res.json({
          error: false,
          message: "Capacity Data added successfully",
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: err.message });
  }
};

//delete
const deleteCapacity = (req, res) => {
  try {
    const { capacity_code } = req.body;
    pool.query(queries.deleteCapacity, [capacity_code], (error, result) => {
      if (error) throw error;
      res.json({
        error: false,
        message: "Capacity Deleted Successfully",
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: err.message });
  }
};

module.exports = {
  getCapacity,
  addCapacity,
  deleteCapacity,
};
