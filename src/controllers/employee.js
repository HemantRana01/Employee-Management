const { Employee, Department, sequelize } = require('../models');
const path = require('path');
const { StatusCodes } = require ('http-status-codes')

exports.getEmployeesList = async (req, res) => {
  try {
    const queryData = req.query;
    const  page  = queryData.page ? parseInt(queryData.page) : 1;
    const  limit  = queryData.limit ? parseInt(queryData.limit) : 1;
    const offset = (page - 1) * limit;
    const employees = await Employee.findAndCountAll({ limit, offset });
    res.status(StatusCodes.OK).json({
      data: employees.rows,
      total: employees.count,
      page,
      pages: Math.ceil(employees.count / limit)
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { department_id, name, dob, phone, email, salary, status } = req.body;
    const photo = req.file ? req.file.path : null;

    const newEmployee = await Employee.create({
      department_id, name, dob, phone, photo, email, salary, status, created: new Date(), modified: new Date()
    });
    res.status(StatusCodes.CREATED).json(newEmployee);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Bad Request', error });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { department_id, name, dob, phone, email, salary, status } = req.body;
    const photo = req.file ? req.file.path : null;

    const updateData = {
      department_id, name, dob, phone, email, salary, status, modified: new Date()
    };

    if (photo) {
      updateData.photo = photo;
    }

    const updatedEmployee = await Employee.update(updateData, { where: { id } });
    res.status(StatusCodes.OK).json(updatedEmployee);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Bad Request', error });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.destroy({ where: { id } });
    res.status(StatusCodes.OK).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Bad Request', error });
  }
};

exports.getDepartmentWiseHighestSalary = async (req, res) => {
  try {
    let queryData =  `SELECT d.name AS department_name, e.department_id, MAX(e.salary) AS highest_salary
    FROM Employees e
    JOIN Departments d ON e.department_id = d.id
    GROUP BY e.department_id, d.name;`
    const results = await sequelize.query(queryData,{type: sequelize.QueryTypes.SELECT});
    res.status(StatusCodes.OK).json(results);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error });
  }
};

exports.getSalaryRangeEmployeeCount = async (req, res) => {
  try {
    const ranges = req.body.ranges;
    let caseStr = ranges.map(range => {
      return `WHEN salary BETWEEN ${range.min} AND ${range.max} THEN '${range.min}-${range.max}'`;
    }).join(' ');
    caseStr += " ELSE 'Above " + ranges[ranges.length - 1].max + "'";

    const query = ` SELECT
        CASE ${caseStr} END AS salary_range,
        COUNT(*) AS employee_count
      FROM Employees
      GROUP BY salary_range;
    `;

    const results = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT
    });
    res.status(StatusCodes.OK).json(results);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error });
  }
};

exports.getYoungestEmployeeData = async (req, res) => {
  try {
    let queryData = ` SELECT d.name as department_name, e.name as employee_name, e.dob
    FROM Employees e
    JOIN Departments d ON e.department_id = d.id
    WHERE e.dob = ( SELECT MIN(dob) FROM Employees WHERE department_id = e.department_id) `
    const results = await sequelize.query(queryData, { type: sequelize.QueryTypes.SELECT });
    res.status(StatusCodes.OK).json(results);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error });
  }
};
