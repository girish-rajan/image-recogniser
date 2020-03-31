const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const bcrypt = require('bcrypt-nodejs');
const register = require('./control/register');
const signin = require('./control/signin');
const profile = require('./control/profile');
const image = require('./control/image');

const db = require('knex')({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
      // user : 'postgres',
      // password : 'welcome',
      // database : 'smartbrain'
    }
  });

  db.select('user_id').from ('users')
.then(data=>{

});

const database={users:[
    {
    id:'123',
    name: 'Girish',
    email: 'girish.test@gmail.com',
    password: 'cookies',
    entries:0,
    joined: new Date()},
    {
        id:'345',
        name: 'Sally',
        email: 'sally.test@gmail.com',
        password: 'peanut',
        entries:0,
        joined: new Date()}
    
]}
;

const app=express();

app.use(bodyparser.json());
app.use(cors());

app.get('/',(req, res)=>{res.send(database.users);})
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req, res, db)});
app.put('/image', (req,res)=>{image.handleImage(req, res, db)})
app.post('/signin', (req,res)=>{signin.handleSignin(req, res, db, bcrypt)});
app.post('/register',(req,res)=>{register.handleRegister(req, res, db, bcrypt)});
app.post('/imageurl',(req,res)=>{image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, ()=>{
    console.log('App Started on port ${process.env.PORT}');
})