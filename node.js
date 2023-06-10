var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())

//Create User (Getting data through json response)
app.post('/CreateUser/', function(req, res){
    var data = req.body
    var name = data.name
    var email = data.email
    var password =data.password
})

//Retrieve users
app.get('/GetUsers', function(req, res){
    res.send('Users')
})

//Update users 
app.put('/UpdateUser/:username/:newpassword?/:newemail?/:newusername?', function(req, res){
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

//Delete users
app.delete('/DeleteUser/:username', function(req, res){
    var username = req.params.username
    //delete user with username
})

var server = app.listen(8081, '127.0.0.1' ,function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s",host, port)
})

