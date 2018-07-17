const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const config = require('./db/config')
const user = require('./db/user')

app.use(bodyParser.json());
app.get('/', (req, res) => res.send('UP!'));
app.get('/users', function(req, res) {
  function callback(user) {
    res.send(user)
  }
  user.getUsers(callback)
});
app.post('/create', function(req, res) {
  res.send(createReq(req.body))
});

app.listen(3000, () => console.log('App listening on port 3000!'))
config.connectToDb();

function createReq(body) {
  user.createUser(body)
  return {
    status: "success"
  }
}
