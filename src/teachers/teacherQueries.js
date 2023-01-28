getTeacher = "SELECT * FROM teachers where college_id = $1";
addTeacher = "INSERT INTO teachers VALUES ($1, $2, $3)";
deleteTeacher = "DELETE FROM teachers WHERE teacher_id = $1";

module.exports = {
  getTeacher,
  addTeacher,
  deleteTeacher,
};
