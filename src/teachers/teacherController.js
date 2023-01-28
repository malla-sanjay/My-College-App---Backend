const pool = require("../../db");
const queries = require("./teacherQueries");

//get all
const getTeacher = (req, res) => {
  try {
    const { college_id } = req.body;
    pool.query(queries.getTeacher, [college_id], (error, result) => {
      if (error) throw error;
      return res.json({
        error: false,
        message: "Teachers retrived successfully",
        data: result.rows,
      });
    });
  } catch (err) {
    console.error(err);
    res.json({ error: true, message: err.message });
  }
};

//addBlock
const addTeacher = (req, res) => {
  try {
    const { teacher_id, college_id, teacher_name } = req.body;
    pool.query(
      queries.addTeacher,
      [teacher_id, college_id, teacher_name],
      (error, result) => {
        if (error) {
          return res.json({
            error: true,
            message: "Invalid credentials",
          });
        }
        return res.json({
          error: false,
          message: "Teacher Data added successfully",
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: err.message });
  }
};

//deleteBlock
const deleteTeacher = (req, res) => {
  try {
    const { teacher_id } = req.body;
    pool.query(queries.deleteTeacher, [teacher_id], (error, result) => {
      if (error) throw error;
      res.json({
        error: false,
        message: "Teacher Deleted Successfully",
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: err.message });
  }
};

module.exports = {
  getTeacher,
  addTeacher,
  deleteTeacher,
};
