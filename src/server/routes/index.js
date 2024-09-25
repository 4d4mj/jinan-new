// routes/index.js
const express = require('express');
const { combinedData } = require('../controllers/dataController');

const router = express.Router();

// Profile route
router.post('/profile', combinedData);

// Export the router
module.exports = router;
