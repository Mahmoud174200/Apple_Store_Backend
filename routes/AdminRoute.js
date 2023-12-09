const express = require('express');
const { login, createAdmin } = require('../services/AdminService');
const { getAllAdminEmails } = require('../services/adminEmailService');

const router = express.Router();

router.get('/getAllAdminEmails', async (req, res) => {
    try {
        const adminEmails = await getAllAdminEmails();
        res.json({ success: true, adminEmails });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error fetching admin emails' });
    }
});

router.post('/createAdmin', createAdmin);
router.post('/login', login);

module.exports = router;
