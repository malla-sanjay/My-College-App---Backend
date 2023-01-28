const pool = require("../../db");
const queries = require("./moduleQueries");

//get all
const getModule = (req, res) => {
  try {
    const { college_id } = req.body;
    pool.query(queries.getModule, [college_id], (error, result) => {
      if (error) throw error;
      return res.json({
        error: false,
        message: "Modules retrived successfully",
        data: result.rows,
      });
    });
  } catch (err) {
    console.error(err);
    res.json({ error: true, message: err.message });
  }
};

//addBlock
const addModule = (req, res) => {
  try {
    const { module_id, college_id, module_name, module_credits } = req.body;
    pool.query(
      queries.addModule,
      [module_id, college_id, module_name, module_credits],
      (error, result) => {
        if (error) {
          return res.json({
            error: true,
            message: "Invalid credentials",
          });
        }
        return res.json({
          error: false,
          message: "Module Data added successfully",
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: err.message });
  }
};

//deleteBlock
const deleteModule = (req, res) => {
  try {
    const { module_id } = req.body;
    pool.query(queries.deleteModule, [module_id], (error, result) => {
      if (error) throw error;
      res.json({
        error: false,
        message: "Module Deleted Successfully",
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: err.message });
  }
};

module.exports = {
  getModule,
  addModule,
  deleteModule,
};
