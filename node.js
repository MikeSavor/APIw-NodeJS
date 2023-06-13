var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

app.use(bodyParser.json())

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
  }, { collection: 'Users' });
  
const User = mongoose.model('User', userSchema);

//Create User (Getting data through json response)
app.post("/", function(req, res){
    var data = req.body
    var name = data.name
    var email = data.email
    var password =data.password

    const newUser = new User({
        name: name,
        email: email,
        password: password
      });

      newUser.save()
    .then(() => {
        console.log('User: '+name+' saved successfully');
        res.sendStatus(200)
    })
    .catch((error) => {
        console.error('Error saving user:', error);
        res.sendStatus(500)
    });
})

//Retrieve user with a specific username
app.get('/username',function(req, res){
    res.sendStatus('Users')
    
})

//Update users 
app.put('/:username/:newpassword?/:newemail?/:newusername?', function(req, res){
    var username = req.params.username
    var newpassword = req.params.newpassword
    var newemail = req.params.newemail
    var newusername = req.params.newusername

    if(newpassword){
        //update user's password
    }
    else if (newemail){
        //update user's email
    }
    else if (newusername){
        //update user's username
    }
})

//Delete user with username
app.delete('/:username', function(req, res){
    var username = req.params.username
   
    User.deleteOne({ name: username })
  .then(() => {
    console.log('User with username: '+username+' deleted successfully');
    res.sendStatus(200)
    })
  .catch((error) => {
    console.error('Error deleting user:', error);
    res.sendStatus(500)
  });
})

var server = app.listen(8081, '127.0.0.1' ,function(){
    var host = server.address().address
    var port = server.address().port
    console.log("App listening at http://%s:%s",host, port)
})

async function connectToDb(){
    try{
        await mongoose.connect('mongodb://localhost:27017/Users')
        console.log("Connected to database")
    }catch{
        console.log("Couldnt connect to database")
    }
}

connectToDb()