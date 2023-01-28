const { Router } = require("express");
const authorize = require("../../middleware/authorize");
const router = Router();
const controller = require("./moduleController");

//API Endpoints
router.post("/getModule", authorize, controller.getModule);
router.post("/addModule", authorize, controller.addModule);
router.delete("/deleteModule", authorize, controller.deleteModule);

module.exports = router;
