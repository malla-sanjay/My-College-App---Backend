getStudentGroup = "SELECT * FROM student_groups where college_id = $1";
addStudentGroup = "INSERT INTO student_groups VALUES ($1, $2, $3, $4)";
deleteStudentGroup = "DELETE FROM student_groups WHERE student_group_id = $1";

module.exports = {
  getStudentGroup,
  addStudentGroup,
  deleteStudentGroup,
};
