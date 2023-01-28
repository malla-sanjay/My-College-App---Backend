const { Router } = require("express");
const router = Router();
const controller = require("./capacityController");

//API Endpoints
router.post("/getCapacity", controller.getCapacity);
router.post("/addCapacity", controller.addCapacity);
router.delete("/deleteCapacity", controller.deleteCapacity);

module.exports = router;
