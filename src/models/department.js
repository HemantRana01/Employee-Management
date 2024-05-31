'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    created: DataTypes.DATE,
    modified: DataTypes.DATE
  }, {timestamps : false});
  Department.associate = function(models) {
    Department.hasMany(models.Employee, { foreignKey: 'department_id' });
  };
  return Department;
};
