const Sequelize = require('sequelize');
const config = require('./config')
var SHA256 = require("crypto-js/sha256");
const sequelize = config.sequelize;


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
  }).catch(error => {
    callback({
      status : "failure",
      message : "no table found"
    });
  })
}

function getUser(body,callback) {
  return User.findAll({
    where: {
      userName:body.userName.trim(),
      password:body.password.trim()
    }
  }).then(user => {
    if(user.length == 0)
      callback({status:"failure"});
    else {
    var data = user[0];
    data.status = "success"
      callback(data);
    }
  })
}
var success = {
  status:"success"
}
var failure = {
  status:"failure"
}

function updateData(body,callback) {
  User.update({
   data:body.data},
   {where : {userName:body.userName.trim(),password:body.password.trim()}
  })
  .then(res=>{
    console.log(res);
    if(res[0]==1)
   return callback(success)
   else return callback(failure)
  })
  .error(err=>callback(err))
}

function createTable() {
  User.sync({force:false}).then(() => {
    console.log("Table Created");
  }).catch(error => {
    console.warn("Unable to create table");
  })
}

exports.createTable = createTable
exports.getUsers = getUsers
exports.createUser = createUser
exports.dropUsers = dropUsers
exports.updateData = updateData
exports.getUser = getUser
