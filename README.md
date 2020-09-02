### Packages Required

As per package.json file defined we need the npm modules,we can install them with command as below:
npm install

### Database

We are using MongoDB Database to store our users.

- mongodb+srv://lantronix:DZSfJ9wPvmvKuyA4@cluster0.loyuw.mongodb.net/LantronixUserDB

### Configure User Model

-config folder will keep the database connection information. 
  -Create a file named: db.js in config folder
  -Create a file named: mailDetails.js in config.folder


-Folder named **model**. Inside the model folder, create a new file **User.js**. 
  -User Model to save our registered users. 
  -We are using **mongoose** to create UserSchema. 

### Routes

- In the 'routes' folder, we created a file named `user.js` 
- We have imported this in **service.js**. 

- User registration is created in **'routes/user.js'**. 
- `/user/register` route to register a new user.

- `/user/login` route for user login.

- server.js to connect our API to the database. 


#### Testing application procedure- 

We are using postman to test the APIs. 

1. First, register the user with below path with POST Method
  -http://localhost:4000/user/register
  
### curl as below: 
  curl --location --request POST 'http://localhost:4000/user/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username":"testbest",
    "firstName":"John ",
    "lastName":"Dee",
    "email":"johndee@gmail.com",
    "password":"testbest123"

}'

2. Login with user's email and password. 
  -http://localhost:4000/user/login

### curl as below:
  curl --location --request POST 'http://localhost:4000/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
     "email":"johndee@gmail.com",
     "password":"testbest123"
}'
