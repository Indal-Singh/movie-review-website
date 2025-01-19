const express = require('express');
const { webHome } = require('../controllers/web');
const router = express.Router();

router.get('/',webHome);

module.exports = router;