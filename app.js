if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const {checkAuthenticated,checkNotAuthenticated,storeSession} = require('./auth-config')
const {isEmail,isPassword} = require('./help')

//cookie
const cookieParser = require("cookie-parser")
//setting maximum session length to be 3 hours
const session_max = 1000*60*60*3

//Postgresql database setup
const {Client} = require('pg');
const client = new Client({
    user:'postgres',
    host:'localhost',
    database: 'postgres',
    port: 5432
});
client.connect();

//This is annoying and not good for the database migration and scale up.  use the prisma instead
client.query(`
CREATE SCHEMA IF NOT EXISTS public;
CREATE TABLE IF NOT EXISTS public.User (
  id SERIAL PRIMARY KEY,
  email VARCHAR(254) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL
)`, (err, result) => {
    if(err) {
        console.log(`GOT ERROR SETTING UP TABLE: ${err}`);
        return;
    }
    console.log(`CREATED USER TABLE/already there`);
    

})

//introduce and setup the passport
const initializePassport = require('./passport-config')
initializePassport(
    passport,
    //getUserByEmail function
    email=> users.find(user =>user.email ===email),
    //getUserById function
    id => users.find(user =>user.id ===id)
    )

//create test user array, will be replaced by db later
const users = []
app.set('view-engine','ejs')

// Express body parser
app.use(express.urlencoded({ extended: false }))
// Connect flash
app.use(flash())
//cookie parser middleware
app.use(cookieParser())
// Express session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    cookie:{maxAge:session_max},
    saveUninitialized: false

}))
app.use(passport.initialize())
//should I enable this?
app.use(express.json())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/',checkAuthenticated,(req,res)=>{

    res.render('index.ejs')
})

app.get('/login',checkNotAuthenticated,(req,res)=>{
    res.render('login.ejs')
})

app.get('/register',checkNotAuthenticated,(req,res)=>{
    res.render('register.ejs')
})

app.post('/login',checkNotAuthenticated,storeSession,passport.authenticate(
    'local',{
        successRedirect:'/',
        failureRedirect:'/login',
        failureFlash:true
    }))

app.post('/register',checkNotAuthenticated,async(req,res)=>{

    const {email,password,confirmpassword} = req.body;
    let errors = []
    //check each field if it's being entered
    let validatedEmail = isEmail(email);
    if(!validatedEmail){
       errors.push({msg:"invalid email input"})

    }
    
    let validatedPassword = isPassword(password)
    if(!validatedPassword){
        errors.push({msg:"you either misentered the password or the password format is not secure(uppercase, lowercase, special characters)"})
    }

    if(confirmpassword === undefined){
        errors.push({msg:"please enter the confirmed your password"})
    }
    //check the password conditions
    if(password != confirmpassword){
        errors.push({msg:"the password does not match"})
    }
    /**check for length */
    if(password.length <6){
        errors.push({msg:"Password must be at least 6 characters"})
    }

    //begin to write the database section. check if this user is in the database, if yes, return the user exists error.


    if (errors.length > 0) {
        res.status(409).send({
          errors
        });
      } else{
          //authentication 
            try{
                //this step takes both sault and hash
                const hashedPassword = await bcrypt.hash(password,10)
                //create the user in the database
                users.push(
                    {
                        id: Date.now().toString(),
                        email:email,
                        password:hashedPassword
                    }
                )
                res.redirect('/login')

            }catch{
                res.redirect('/register')

            }
            //console.log(users)
    }
      
    

})

app.delete('/logout', (req, res) =>{
    req.session.destroy()
    req.logOut()
    res.redirect('/login')
})



app.listen(3000)