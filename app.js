const express = require('express');
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('database_development', 'postgres', 'august75', {
    host: 'localhost',
    dialect: 'postgres'
  });

 // try {
   // await sequelize.authenticate();
    //console.log('Connection has been established successfully.');
  //} catch (error) {
    //console.error('Unable to connect to the database:', error);
  //}
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });




const app = express();

app.set('view engine', 'ejs');
app.set('Views','../Views' )
const port = process.env.PORT || 5000;

app.use(express.static('Views'));

app.get('',(req, res) => {
    res.render('Home');
});



app.listen(port, () => console.log(`Listening on port $(port)`));