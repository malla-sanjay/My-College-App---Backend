const { Router } = require("express");
const router = Router();
const controller = require("./controller");

//API Endpoints
router.get("/", controller.getClassrooms);
router.post("/", controller.addClassroom);
router.delete("/delete/:id", controller.deleteClassroom);

module.exports = router;
