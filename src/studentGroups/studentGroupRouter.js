const { Router } = require("express");
const authorize = require("../../middleware/authorize");
const router = Router();
const controller = require("./studentGroupController");

//API Endpoints
router.post("/getStudentGroup", controller.getStudentGroup);
router.post("/addStudentGroup", authorize, controller.addStudentGroup);
router.delete("/deleteStudentGroup", authorize, controller.deleteStudentGroup);

module.exports = router;
