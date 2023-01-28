const pool = require("../../db");
const queries = require("./studentGroupQueries");

//get all
const getStudentGroup = (req, res) => {
  try {
    const { college_id } = req.body;
    pool.query(queries.getStudentGroup, [college_id], (error, result) => {
      if (error) throw error;
      return res.json({
        error: false,
        message: "Student Groups retrived successfully",
        data: result.rows,
      });
    });
  } catch (err) {
    console.error(err);
    res.json({ error: true, message: err.message });
  }
};

//addBlock
const addStudentGroup = (req, res) => {
  try {
    const { student_group_id, college_id, college_grade, no_of_students } =
      req.body;
    pool.query(
      queries.addStudentGroup,
      [student_group_id, college_id, college_grade, no_of_students],
      (error, result) => {
        if (error) {
          return res.json({
            error: true,
            message: "Invalid credentials",
          });
        }
        return res.json({
          error: false,
          message: "Student Group added successfully",
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: err.message });
  }
};

//deleteBlock
const deleteStudentGroup = (req, res) => {
  try {
    const { student_group_id } = req.body;
    pool.query(
      queries.deleteStudentGroup,
      [student_group_id],
      (error, result) => {
        if (error) throw error;
        res.json({
          error: false,
          message: "Student Group Deleted Successfully",
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: err.message });
  }
};

module.exports = {
  getStudentGroup,
  addStudentGroup,
  deleteStudentGroup,
};
