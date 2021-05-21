const express = require('express');
const router =express.Router();

const sauceCtrl = require("../controllers/sauce");
const multer = require("../middleware/multer-config");

router.get("/", sauceCtrl.allSauce);
router.get("/:id", sauceCtrl.oneSauce);
router.post("/", multer, sauceCtrl.postSauce);
router.put("/:id", sauceCtrl.modifySauce);
router.delete("/:id", sauceCtrl.deleteSauce);

module.exports = router;