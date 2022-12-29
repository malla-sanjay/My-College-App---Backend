const pool = require("../../db");
const queries = require("./queries");

const getClassrooms = (req, res) => {
  pool.query(queries.getClassrooms, (error, result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  });
};

const addClassroom = (req, res) => {
  const { id, name, capacity, blockId } = req.body;
  pool.query(
    queries.addClassroom,
    [id, name, capacity, blockId],
    (error, result) => {
      if (error) throw error;
      res.status(201).send("classroom added successfully");
    }
  );
};

const deleteClassroom = (req, res) => {
  const id = req.params.id;

  pool.query(queries.getClassroom, [id], (error, result) => {
    if (error) throw error;
    if (!result.rowCount) {
      res.send("classrooom doesnot exist");
    } else {
      pool.query(queries.deleteClassroom, [id], (error, result) => {
        if (error) throw error;
        res.status(200).send("classroom deleted successfully");
      });
    }
  });
};

module.exports = {
  getClassrooms,
  addClassroom,
  deleteClassroom,
};
