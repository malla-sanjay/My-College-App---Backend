getCapacity = "SELECT * FROM capacities where college_id = $1";
addCapacity = "INSERT INTO capacities VALUES ($1, $2, $3)";
deleteCapacity = "DELETE FROM capacities WHERE capacity_code = $1";

module.exports = {
  getCapacity,
  addCapacity,
  deleteCapacity,
};
