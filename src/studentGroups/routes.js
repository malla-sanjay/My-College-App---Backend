const { Router } = require("express");
const router = Router();
const controller = require("./controller");

//API Endpoints
router.get("/", controller.getStudents);
router.post("/", controller.addStudents);
router.delete("/delete/:id", controller.deleteStudent);

module.exports = router;
