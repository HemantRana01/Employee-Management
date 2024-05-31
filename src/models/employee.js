'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    department_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    dob: DataTypes.DATE,
    phone: DataTypes.STRING,
    photo: DataTypes.STRING,
    email: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    created: DataTypes.DATE,
    modified: DataTypes.DATE
  }, {timestamps : false});
  Employee.associate = function(models) {
    Employee.belongsTo(models.Department, { foreignKey: 'department_id' });
  };
  return Employee;
};
