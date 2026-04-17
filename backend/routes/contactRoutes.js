const express = require('express');
const { createContact, getContacts, deleteContact } = require('../controllers/contactController');
const protectedRoute = require('../middleware/protectedRoute');
const router = express.Router();

router.post('/create-contact', createContact);
router.get('/get-contacts',protectedRoute, getContacts);
router.delete('/delete-contact/:id',protectedRoute, deleteContact);

module.exports = router;