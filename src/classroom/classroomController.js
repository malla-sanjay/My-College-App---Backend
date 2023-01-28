const pool = require("../../db");
const queries = require("./classroomQueries");

//get all
const getClassroom = (req, res) => {
  try {
    const { college_id } = req.body;
    pool.query(queries.getClassroom, [college_id], (error, result) => {
      if (error) throw error;
      return res.json({
        error: false,
        message: "Classroom retrived successfully",
        data: result.rows,
      });
    });
  } catch (err) {
    console.error(err);
    res.json({ error: true, message: err.message });
  }
};

//add
const addClassroom = (req, res) => {
  try {
    const { class_id, class_name, class_capacity, block_id, college_id } =
      req.body;
    pool.query(
      queries.addClassroom,
      [class_id, class_name, class_capacity, block_id, college_id],
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
const deleteClassroom = (req, res) => {
  try {
    const { class_id } = req.body;
    pool.query(queries.deleteClassroom, [class_id], (error, result) => {
      if (error) throw error;
      res.json({
        error: false,
        message: "Classroom Deleted Successfully",
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: err.message });
  }
};

module.exports = {
  getClassroom,
  addClassroom,
  deleteClassroom,
};
