getAllColleges = "SELECT * from college_acc";
getCollegeByEmail = "SELECT * from college_acc WHERE admin_email = $1";
addCollege =
  "INSERT INTO college_acc (college_name, admin_email, admin_name, password_hash) values ($1, $2, $3, $4) RETURNING *";
updateCollegeDetails =
  "UPDATE college_acc SET college_name = $1, admin_name = $2 WHERE admin_email = $3";
updatePassword =
  "UPDATE college_acc SET password_hash = $1 WHERE admin_email = $2";

module.exports = {
  getAllColleges,
  getCollegeByEmail,
  addCollege,
  updateCollegeDetails,
  updatePassword,
};
