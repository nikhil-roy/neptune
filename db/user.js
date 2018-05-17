const Sequelize = require('sequelize');
const config = require('./config')
var sequelize = config.sequelize;

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
/*User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock',
    password: 'test'
  });
});*/
function createUser(data) {
  User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password
    })
    .then(() => {
      status: "success"
    })

}

function getUsers(callback) {
  return User.findAll().then(users => {
    callback(users);
  })
}

exports.getUsers = getUsers
exports.createUser = createUser
