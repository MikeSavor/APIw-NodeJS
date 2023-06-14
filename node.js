var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var OpenApiValidator = require('express-openapi-validator');
var apiSpec="./apiSpec.json"
var jwt = require('jsonwebtoken');

var validator =  new OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  });

var secretkey='+ZP_+_V?kUM}TJ9>6l4vgA./8nm.<-'

app.use(bodyParser.json(), validator)

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);


app.post('/getAuthorization', (req, res) => {
    
    //obviously we need to validate some actual user creds before signing and sending a token but for the shake of simplicity lets assume we've verified this is a valid user 

    const user = {
      id: 1,
      username: 'some_valid_user',
    }
    const token = jwt.sign(user, secretkey)
    res.status(200).json({ token })
  })

//Create User (Getting data through json response)
app.post("/CreateUser", function (req, res) {
    var data = req.body
    var name = data.name
    var email = data.email
    var password = data.password

    const newUser = new User({
        name: name,
        email: email,
        password: password
    });

    newUser.save()
        .then(() => {
            console.log('User: ' + name + ' saved successfully')
            res.sendStatus(200)
        })
        .catch((error) => {
            console.error('Error saving user:', error)
            res.sendStatus(500)
        });
})

//Retrieve user with a specific username
app.get('/:username', function (req, res) {
    username = req.params.username
    User.findOne({ name: username })
        .then((user) => {
            if (user) {
                
                res.status(200).send(user)
                console.log('Retrieved user:', user)
            } else {
                res.sendStatus(404)
                console.log('User ' + username + ' not found')
            }
        })
        .catch((error) => {
            res.sendStatus(500)
            console.error('Error retrieving user ' + username + ':', error)
        });

})

//Update user with a specified username
app.put('/:username', function (req, res) {
    const username = req.params.username
    const { newpassword, newemail, newusername } = req.query
    const updateFields = {}

    if (newpassword) {
        updateFields.password = newpassword
    }
    if (newemail) {
        updateFields.email = newemail
    }
    if (newusername) {
        updateFields.name = newusername
    }

    User.updateOne({ name: username }, updateFields)
        .then(() => {
            console.log('User fields updated successfully')
            res.sendStatus(200)
        })
        .catch((error) => {
            console.error('Error updating user fields:', error);
            res.sendStatus(500)
        });
});

//Delete user with username
app.delete('/:username', function (req, res) {
    var username = req.params.username

    User.deleteOne({ name: username })
        .then(() => {
            console.log('User with username: ' + username + ' deleted successfully');
            res.sendStatus(200)
        })
        .catch((error) => {
            console.error('Error deleting user:', error);
            res.sendStatus(500)
        });
})

var server = app.listen(8081, '127.0.0.1', function () {
    var host = server.address().address
    var port = server.address().port
    console.log("App listening at http://%s:%s", host, port)
})

async function connectToDb() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Users')
        console.log("Connected to database")
    } catch {
        console.log("Couldnt connect to database")
    }
}

connectToDb()