// routes/index.js
const express = require('express');
const { getProfile } = require('../controllers/profileController');
const { userLogin } = require('../controllers/authController');
const { cacheMiddleware } = require('../middlewares/cacheMiddleware');
// Import other controllers as needed
// const { getCourses } = require('../controllers/coursesController');
// const { getTranscript } = require('../controllers/transcriptController');

const router = express.Router();

// Login route - no caching middleware
router.post('/login', userLogin);

// Profile route with caching middleware
router.get('/profile', cacheMiddleware, getProfile);

// Courses route with caching middleware (uncomment when ready)
// router.get('/fetch-courses', cacheMiddleware, getCourses);

// Transcript route with caching middleware (uncomment when ready)
// router.get('/fetch-transcript', cacheMiddleware, getTranscript);

// Export the router
module.exports = router;
