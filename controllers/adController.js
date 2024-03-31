const FormModel = require('../models/adForm');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const getAllForms = async (req, res) => {
    try {
        const forms = await FormModel.find();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve forms data", error: error.message });
    }
};

cloudinary.config({
    cloud_name: 'fzr',
    api_key: '846165115762924',
    api_secret: '92S1T0zHqI4QMqg1U4Ly25MCcRE'
  });


// Controller for creating a new form data
const createForm = async (req, res) => {
    try {
        const { title, category, subcategory, price, desc, images, address, name, phone, featured, approve } = req.body;

        // Validate that 'images' field is present and is an array
        if (!Array.isArray(images)) {
            return res.status(400).json({ message: "Images are required and must be an array" });
        }

        // Ensure images field is an array of strings
        const imageNames = images.map(img => img.split('/').pop()); // Extracting image names

        const formData = {
            title,
            category,
            subcategory,
            price,
            desc,
            image: imageNames,
            address,
            name,
            phone,
            featured,
            approve
        };

        // Save form data to your database
        const newForm = new FormModel(formData);
        await newForm.save();

        res.status(201).json({ message: "Form data created successfully", data: newForm });
    } catch (error) {
        console.error("Error creating form data:", error);
        res.status(400).json({ message: "Failed to create form data", error: error.message });
    }
};

// Controller for retrieving form data by ID
const getFormById = async (req, res) => {
    try {
        const formId = req.params.id;
        const formData = await FormModel.findById(formId);
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

module.exports = { createForm, getFormById, updateFormById, deleteFormById, getAllForms };
