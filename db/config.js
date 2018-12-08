const Sequelize = require('sequelize');
const sequelize = new Sequelize('solo', 'nikhil', 'testuser', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

function connectToDb() {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}

exports.sequelize = sequelize;
exports.connectToDb = connectToDb;
