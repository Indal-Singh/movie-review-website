const express = require('express');
const { webHome,webPost } = require('../controllers/webController');
const router = express.Router();

router.get('/',webHome);
router.get('/post/:id/:name',webPost);

module.exports = router;