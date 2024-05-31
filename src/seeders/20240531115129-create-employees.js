'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const employees = [];
    const departments = await queryInterface.sequelize.query(
      'SELECT id FROM Departments;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    for (let i = 0; i < 50; i++) {
      employees.push({
        department_id: faker.helpers.arrayElement(departments).id,
        name: faker.person.fullName(),
        dob: faker.date.past({ years: 30, refDate: new Date(2002, 0, 1) }),
        phone: faker.phone.number(),
        photo: faker.image.avatar(),
        email: faker.internet.email(),
        salary: faker.number.int({ min: 30000, max: 150000 }),
        status: true,
        created: new Date(),
        modified: new Date()
      });
    }
    await queryInterface.bulkInsert('Employees', employees, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Employees', null, {});
  }
};
