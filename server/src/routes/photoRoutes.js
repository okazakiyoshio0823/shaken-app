const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const checkAuth = require('../middleware/check-auth');

// GET /api/photos/:id
router.get('/:id', checkAuth, uploadController.getPhoto);

module.exports = router;
