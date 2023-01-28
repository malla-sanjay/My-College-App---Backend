getClassroom = "SELECT * FROM classrooms where college_id = $1";
addClassroom = "INSERT INTO classrooms VALUES ($1, $2, $3, $4, $5)";
deleteClassroom = "DELETE FROM classrooms WHERE class_id = $1";

module.exports = {
  getClassroom,
  addClassroom,
  deleteClassroom,
};
