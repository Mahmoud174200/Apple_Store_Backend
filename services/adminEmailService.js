const { AdminModel } = require('../models/AdminModel');

const getAllAdminEmails = async () => {
    try {
        const admins = await AdminModel.find({}, 'email');
        const adminEmails = admins.map(admin => admin.email);
        return adminEmails;
    } catch (error) {
        console.error('Error fetching admin emails:', error);
        return [];
    }
};

module.exports = {
    getAllAdminEmails,
};
