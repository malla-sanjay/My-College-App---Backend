getClassrooms = "SELECT * FROM classrooms";
addClassroom = "INSERT INTO classrooms VALUES ($1, $2, $3, $4)";
getClassroom = "SELECT * FROM classrooms WHERE class_id = $1";
deleteClassroom = "DELETE FROM classrooms WHERE class_id = $1";

module.exports = {
  getClassrooms,
  addClassroom,
  getClassroom,
  deleteClassroom,
};
