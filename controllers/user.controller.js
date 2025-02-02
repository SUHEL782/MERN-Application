const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs'); // Use bcryptjs instead of bcrypt
const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');

module.exports.signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        console.log("Received data:", { username, email, password, role });

        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (role !== 'user' && role !== 'seller') {
            return res.status(400).json({ message: 'Invalid role. Please choose either "user" or "seller".' });
        }

        const isUserAlreadyExist = await userModel.findOne({ email });
        if (isUserAlreadyExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ username, email, password: hashedPassword, role });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({
            message: role === 'seller' ? 'Seller account created successfully' : 'User account created successfully',
            token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};




module.exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: 'User logged in successfully', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.logout = async (req, res) => {
    try {
        // Check if the Authorization header exists
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).json({ message: 'Authorization header missing' });
        }

        // Extract the token from the Authorization header
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(400).json({ message: 'Token missing in Authorization header' });
        }

        const isTokenBlacklisted = await blacklistModel.findOne({ token });
        if (isTokenBlacklisted) {
            return res.status(400).json({ message: 'User already logged out' });
        }

        // Blacklist the token (i.e., log out the user)
        await blacklistModel.create({ token });

        res.status(200).json({ message: 'User logged out successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports.getProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        res.status(200).json({
            message: 'User fetched successfully',
            user
            
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

