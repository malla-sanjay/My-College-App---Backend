const { Router } = require("express");
const authorize = require("../../middleware/authorize");
const router = Router();
const controller = require("./blockController");

//API Endpoints
router.post("/getBlocks", authorize, controller.getBlocks);
router.post("/addBlock", authorize, controller.addBlocks);
router.delete("/deleteBlock", authorize, controller.deleteBlocks);

module.exports = router;
