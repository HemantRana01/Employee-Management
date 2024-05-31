'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const departments = [];
    for (let i = 0; i < 5; i++) {
      departments.push({
        name: faker.commerce.department(),
        status: true,
        created: new Date(),
        modified: new Date()
      });
    }
    await queryInterface.bulkInsert('Departments', departments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Departments', null, {});
  }
};
