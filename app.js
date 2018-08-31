const express = require('express');
const  EcommerceController = require('./EcommerceController');
const app=express();
const bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(bodyParser.json());

new EcommerceController(app);
const UserController = require('./controller/UserController')
new UserController(app);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`app listening on port ${PORT}`))