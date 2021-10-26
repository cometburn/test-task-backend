const sequelizeFixtures = require('sequelize-fixtures');

const models = require('../models');

const fixtures = [
  {
    model: 'user',
    data: {
      id: 1,
      firstname: 'Admin',
      lastname: 'Lastname',
      email: 'admin@test.com',
      password: '$2b$10$AOFTEzI/cgQsxC1yAeRTW.DLylUVC/Vj7gxl9cK7ZuxG0YwyjASym',
      isAdmin: true,
    },
  },
  {
    model: 'user',
    data: {
      id: 2,
      firstname: 'User1',
      lastname: 'Lastname',
      email: 'user1@test.com',
      password: '$2b$10$AOFTEzI/cgQsxC1yAeRTW.DLylUVC/Vj7gxl9cK7ZuxG0YwyjASym',
      isAdmin: false,
    },
  },
  {
    model: 'user',
    data: {
      id: 3,
      firstname: 'User2',
      lastname: 'Lastname',
      email: 'user2@test.com',
      password: '$2b$10$AOFTEzI/cgQsxC1yAeRTW.DLylUVC/Vj7gxl9cK7ZuxG0YwyjASym',
      isAdmin: false,
    },
  },

];

module.exports = {
  loadFixtures: () => {
    sequelizeFixtures.loadFixtures(fixtures, models).then(() => {
      console.log('Fixtures have been loaded, check your database tables!!');
    }).catch((err) => {
      console.log(err);
    });
  },
};
