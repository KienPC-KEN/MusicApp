const express = require("express");
const router = express.Router();

const dataController = require("../controllers/data.controller");

router.get('/', dataController.getData);

router.get('/search', dataController.search);

module.exports = router;