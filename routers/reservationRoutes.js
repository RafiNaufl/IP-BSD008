const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.post("/", reservationController.createReservation);

module.exports = router;
