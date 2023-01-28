getBlocks = "SELECT * from blocks where college_id = $1";
addBlocks = "insert into blocks values ($1, $2, $3)";
deleteBlocks = "delete from blocks where block_id = $1";

module.exports = {
  getBlocks,
  addBlocks,
  deleteBlocks,
};
