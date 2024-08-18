const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { createproject, getprojects, getprojectById, updateproject, deleteproject } = require('../controllers/projectController');

router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), createproject);
router.get('/', getprojects);
router.get('/:id', getprojectById);
router.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), updateproject);
router.delete('/:id', deleteproject);

module.exports = router;
