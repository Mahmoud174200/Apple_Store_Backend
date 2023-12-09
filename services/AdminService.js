const bcrypt = require('bcrypt');
const { AdminModel } = require('../models/AdminModel');

const createAdmin = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const admin = await AdminModel.create({ username, password: hashedPassword, email });

        res.status(200).json({ data: admin });
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyValue && err.keyValue.email) {
            res.status(400).json({ error: 'Email already exists. Please use a different email.' });
        } else {
            res.status(400).json({ error: err.message });
        }
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await AdminModel.findOne({ email });

        if (!admin) {
            console.error('Admin not found for email:', email);
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (isPasswordValid) {
            // Password is valid, authentication successful
            res.json({ success: true, message: 'Login successful' });
        } else {
            console.error('Invalid password for email:', email);
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};





module.exports = {
    createAdmin,
    login,
};
