const { Router } = require("express");
const authorize = require("../../middleware/authorize");
const router = Router();
const controller = require("./facultyController");

//API Endpoints
router.post("/getFaculty", authorize, controller.getFaculty);
router.post("/addFaculty", authorize, controller.addFaculty);
router.delete("/deleteFaculty", authorize, controller.deleteFaculty);

module.exports = router;
