const express = require('express');
const router = express.Router();
const { postQA, getList, postDD } = require('../controllers/formController');

router.post('/qa', postQA);
router.post('/dropdown', postDD);
router.get('/list', getList);

module.exports = router;
