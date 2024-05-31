const { Department } = require('../models');
const { StatusCodes } = require ('http-status-codes')

exports.getDepartments = async (req, res) => {
  try {
    const departmentsData = await Department.findAll();
    res.status(StatusCodes.OK).json(departmentsData);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const { name, status } = req.body;
    const newDepartment = await Department.create({
      name,
      status,
      created: new Date(),
      modified: new Date()
    });
    res.status(StatusCodes.CREATED).json(newDepartment);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Bad Request', error });
  }
};
