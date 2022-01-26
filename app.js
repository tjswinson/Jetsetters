const express = require('express');
const {Sequelize} = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('./models');
const {Users} = require('./models');
const bodyParser = require('body-parser');


const sequelize = new Sequelize('database_development', 'postgres', 'august75', {
    host: 'localhost',
    dialect: 'postgres'
  });

 
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });






const app = express();

app.use(express.json())

app.use(bodyParser.json({ type: 'application/*+json' }))

app.set('view engine', 'ejs');
app.set('views','views');
const port = process.env.PORT || 5000;

app.use(express.static('views'));

app.get('/', (req, res)=>{
    res.render('home');
});

app.get('/login',(req, res)=>{
  res.render('login');
});

app.get('/register',(req, res)=>{
  res.render('register');
});


app.post('/register', async (req, res) => {
 // if (await Users.findOne({ where: { email: req.body.email } })) {
 //   res.send({ message: "email in use" });
 //   return;
 // }
console.log(req.body);

const SALT = await bcrypt.genSalt();



  const {
    fname,
    lname,
    email,
    pword
  } = req.body;

  try {
    //const hashedPassword = await bcrypt.hash(pword, SALT);
    const User = await Users.create({
     
      firstName: fname,
      lastName: lname,
      email: email,
      password: pword,
      tripId: 1
    });
    res.send(User);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});










app.listen(port, () => console.log(`Listening on port $(port)`));