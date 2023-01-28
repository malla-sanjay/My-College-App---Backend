getFaculty = "SELECT * FROM faculties where college_id = $1";
addFaculty = "INSERT INTO faculties VALUES ($1, $2, $3)";
deleteFaculty = "DELETE FROM faculties WHERE faculty_id = $1";

module.exports = {
  getFaculty,
  addFaculty,
  deleteFaculty,
};
