const express = require('express');
const walletLogic = require('../logic/walletLogic');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.post("/user",[check('phone','Phone Number is required').not().isEmpty()], walletLogic.addUser);

router.get("/balance", walletLogic.getBalance);



module.exports = router;