const express = require('express');
const router = express.Router();
const controllerLinks = require('../controllers/links');

/* GET links listing. */
router.get('/', controllerLinks.get);
router.get('/:id', controllerLinks.id.get);
router.post('/', controllerLinks.post);

module.exports = router;
