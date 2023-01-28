getModule = "SELECT * FROM modules where college_id = $1";
addModule = "INSERT INTO modules VALUES ($1, $2, $3, $4)";
deleteModule = "DELETE FROM modules WHERE module_id = $1";

module.exports = {
  getModule,
  addModule,
  deleteModule,
};
