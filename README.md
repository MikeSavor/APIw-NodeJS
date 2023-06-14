# APIw-NodeJS

This is a simple API implemented with nodeJS. I used a local mongoDB database and mongoose to communicate with it.

## Steps for execcution (assuming you've already installed node):

1. You will first need to download and install mongoDB (https://www.mongodb.com/try/download/community)
2. Follow these (https://www.prisma.io/dataguide/mongodb/setting-up-a-local-mongodb-database) directions to have the local database up and running.
3. Open MongoDB compass and after youve connected to the server, create a new database named 'Users'.
4. Now it's time to install all the necessary node modules. Run these commands on the terminal:<br />
  $npm install --save express <br />
  $npm install body-parser <br />
  $npm install mongoose <br />
  $npm install express openapi-validator<br />
5. The setup is complete. All you have to do now is run the node app with the command<br />
  $node node.js<br />
6. You can use Postman to send https requests and receive responses from the API and mongoDB compass to see the chhanges in the database.
