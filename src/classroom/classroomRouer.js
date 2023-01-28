const { Router } = require("express");
const router = Router();
const controller = require("./classroomController");

//API Endpoints
router.post("/getClassroom", controller.getClassroom);
router.post("/addClassroom", controller.addClassroom);
router.delete("/deleteClassroom", controller.deleteClassroom);

module.exports = router;
