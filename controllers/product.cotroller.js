const productModel = require('../models/product.model');
const express = require('express');

exports.createProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        if (req.files && req.files.length > 0) {
            req.files.forEach(file => console.log(file.publicUrl));
        }

        if (!name || !price || !description) {
            return res.status(400).json({ error: 'Please fill all fields' });
        }

        const newProduct = await productModel.create({ name, price, description });
        return res.status(201).json(newProduct);

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: error.message });
    }
};
