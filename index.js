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
  },
  userName: {
    type: Sequelize.STRING
  },
  data: {
    type: Sequelize.TEXT
  }
});

// force: true will drop the table if it already exists
/*User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    firstName: 'Nikhil',
    lastName: 'Roy',
    password: 'password',
    userName: 'nikhil',
    data: 'Sample data'
  });
});*/

function createUser(data) {
  User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      userName: data.userName,
      data: data.data
    })
    .then(() => {
      status: "success"
    })

}

function dropUsers(callback){
  return User.drop()
          .then(res =>{
            callback(res);
          })
}

function getUsers(callback) {
  return User.findAll().then(users => {
    callback(users);
  })
}

function updateData(body,callback) {
  User.update({
   data:body.data},
   {where : {userName:body.userName}
  })
  .then(res=>callback(res))
  .error(err=>callback(err))
}

exports.getUsers = getUsers
exports.createUser = createUser
exports.dropUsers = dropUsers
exports.updateData = updateData
