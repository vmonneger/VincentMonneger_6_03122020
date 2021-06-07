const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/user");
const { check, validationResult } = require('express-validator');


router.post("/signup", [check("password", "Le mot de passe doit faire minimum 6 charactères.").isLength({ min: 6 }),], userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;