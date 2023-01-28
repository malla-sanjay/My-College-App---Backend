const { Router } = require("express");
const authorize = require("../../middleware/authorize");
const router = Router();
const controller = require("./teacherController");

//API Endpoints
router.post("/getTeacher", authorize, controller.getTeacher);
router.post("/addTeacher", authorize, controller.addTeacher);
router.delete("/deleteTeacher", authorize, controller.deleteTeacher);

module.exports = router;
