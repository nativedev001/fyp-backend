const FormModel = require('../models/adForm');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose')
const Ad = require('../models/Ad');

const getAllForms = async (req, res) => {
    try {
        const forms = await Ad.find();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve forms data", error: error.message });
    }
};


cloudinary.config({
    cloud_name: 'dm55kqxna',
    api_key: '473296691162498',
    api_secret: 'HJ5jdvY3Zn1hszS0Ev15Axs0t0c'
});


const createAd = async (req, res) => {
    try {
      const { title, category, subcategory, price, desc, address, phone, approve, featured, userId } = req.body;
      const images = req.files.images;
  
      // Upload image to Cloudinary
      const uploadedImages = await Promise.all(images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image.path, { folder: 'adImages' });
        return { url: result.secure_url, name: image.originalname };
      }));
  
      const ad = new Ad({
        title,
        category,
        subcategory,
        price,
        desc,
        images: uploadedImages,
        address,
        phone,
        approve,
        featured,
        userId
      });
  
      await ad.save();
      res.status(201).json({ message: 'Ad created successfully', ad });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };




// Controller for retrieving form data by ID
const getFormById = async (req, res) => {
    try {
        const formId = req.params.id;
        const formData = await Ad.findById(formId);
        if (!formData) {
            return res.status(404).json({ message: "Form data not found" });
        }
        res.status(200).json({ data: formData });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve form data", error: error.message });
    }
};

// Controller for updating form data by ID
const updateFormById = async (req, res) => {
    try {
        const formId = req.params.id;
        const updateData = req.body;
        const updatedForm = await FormModel.findByIdAndUpdate(formId, updateData, { new: true });
        if (!updatedForm) {
            return res.status(404).json({ message: "Form data not found" });
        }
        res.status(200).json({ message: "Form data updated successfully", data: updatedForm });
    } catch (error) {
        res.status(500).json({ message: "Failed to update form data", error: error.message });
    }
};

// Controller for deleting form data by ID
const deleteFormById = async (req, res) => {
    try {
        const formId = req.params.id;
        const deletedForm = await FormModel.findByIdAndDelete(formId);
        if (!deletedForm) {
            return res.status(404).json({ message: "Form data not found" });
        }
        res.status(200).json({ message: "Form data deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete form data", error: error.message });
    }
};

module.exports = { createAd, getFormById, updateFormById, deleteFormById, getAllForms };
