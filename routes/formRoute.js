const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });


router.post('/form', upload.fields([{ name: 'images', maxCount: 5 }]), adController.createAd);

router.get('/form/:id', adController.getFormById);

router.put('/form/:id', adController.updateFormById);

router.delete('/form/:id', adController.deleteFormById);

router.get('/allads', adController.getAllForms);

module.exports = router;
