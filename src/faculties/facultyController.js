const pool = require("../../db");
const queries = require("./facultyQueries");

//get all
const getFaculty = (req, res) => {
  try {
    const { college_id } = req.body;
    pool.query(queries.getFaculty, [college_id], (error, result) => {
      if (error) throw error;
      return res.json({
        error: false,
        message: "Faculties retrived successfully",
        data: result.rows,
      });
    });
  } catch (err) {
    console.error(err);
    res.json({ error: true, message: err.message });
  }
};

//addBlock
const addFaculty = (req, res) => {
  try {
    const { faculty_id, college_id, faculty_name } = req.body;
    pool.query(
      queries.addFaculty,
      [faculty_id, college_id, faculty_name],
      (error, result) => {
        if (error) {
          return res.json({
            error: true,
            message: "Invalid credentials",
          });
        }
        return res.json({
          error: false,
          message: "Faculty Data added successfully",
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: err.message });
  }
};

//deleteBlock
const deleteFaculty = (req, res) => {
  try {
    const { faculty_id } = req.body;
    pool.query(queries.deleteFaculty, [faculty_id], (error, result) => {
      if (error) throw error;
      res.json({
        error: false,
        message: "Faculty Deleted Successfully",
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: err.message });
  }
};

module.exports = {
  getFaculty,
  addFaculty,
  deleteFaculty,
};
