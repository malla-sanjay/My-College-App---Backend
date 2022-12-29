const { Router } = require("express");
const router = Router();
const controller = require("./controller");

//API Endpoints
router.get("/", controller.getColleges);
router.post("/", controller.addAccount);
router.post("/login", controller.getUserBYEmail);
router.put("/update/", controller.updateAccountDetails);
router.put("/change-password", controller.changePassword);

module.exports = router;
