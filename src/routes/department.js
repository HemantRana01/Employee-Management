const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/department');
const { validateDepartment } = require('../middlewares/validators');

router.get('/', departmentController.getDepartments);
router.post('/', validateDepartment, departmentController.createDepartment);

module.exports = router;
