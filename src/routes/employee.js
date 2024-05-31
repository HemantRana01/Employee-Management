const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee');
const { validateEmployee } = require('../middlewares/validators');
const upload = require('../middlewares/upload');

router.get('/', employeeController.getEmployeesList);
router.post('/', upload.single('photo'), validateEmployee, employeeController.createEmployee);
router.put('/:id', upload.single('photo'), validateEmployee, employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);
router.get('/highest-salary', employeeController.getDepartmentWiseHighestSalary);
router.get('/salary-range-count', employeeController.getSalaryRangeEmployeeCount);
router.get('/youngest-employee', employeeController.getYoungestEmployeeData);

module.exports = router;
