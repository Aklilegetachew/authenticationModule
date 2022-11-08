const express = require("express");

const auth = require("../controllers/authentication")
const router = express.Router();

router.post("/signup", auth.signup);
router.post("/login", auth.login);

module.exports = router;

