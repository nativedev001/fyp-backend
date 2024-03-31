const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');


router.post('/form', adController.createForm);

router.get('/form/:id', adController.getFormById);

router.put('/form/:id', adController.updateFormById);

router.delete('/form/:id', adController.deleteFormById);

router.get('/allads', adController.getAllForms);

module.exports = router;
