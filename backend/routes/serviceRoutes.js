const express = require('express');
const { getAllServices,createService,updateServiceByID,deleteServiceByID } = require('../controllers/serviceController');
const protectedRoute = require('../middleware/protectedRoute');
const upload  = require('../middleware/upload');
const router = express.Router();

router.get('/services',getAllServices);
router.post('/service',protectedRoute,upload.single('img_url'),createService);
router.put('/service/:id',protectedRoute,upload.single('img_url'),updateServiceByID);
router.delete('/service/:id',protectedRoute,deleteServiceByID);

module.exports = router;