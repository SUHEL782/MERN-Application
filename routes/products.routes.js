const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middlewares/auth.middleware');
const productModel = require('../models/product.model');

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });


router.use(authMiddleware.isAuthenticated);
router.use(authMiddleware.isSeller);


router.post('/create-product', upload.any('image'), async (req, res) => {
    try {
        const { name, price, category, description } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: 'Image is required' });
        }

        const image = req.file.path;
        const product = new productModel({ name, price, category, description, image });

        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 