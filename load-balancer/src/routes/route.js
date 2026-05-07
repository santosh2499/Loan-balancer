const express = require("express");
const router = express.Router();
const { routeRequest } = require("../controllers/routeController");

router.get("/route", routeRequest);

module.exports = router;