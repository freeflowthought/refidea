//Aiming:  LocalStrategy is not safe enough.  just keep this for now. refactor later (etc. passport JWT)

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

//deal with login module -- password compare.  my understanding is this function can pass the value to isauthenticated
function initialize(passport,getUserByEmail,getUserById){
    const authenticateUser = async (email,password,done) =>{
        const user = getUserByEmail(email)
        if(user == null){

            return done(null,false,{message:'No user with this email'})
        }
        try{
            if(await bcrypt.compare(password,user.password)){
                
                done(null, user)

            }else{
                done(null,false,{message: 'Password Incorrect'})
            }
        }catch(e){
              return done(e)
        }

    }
    passport.use(new LocalStrategy({usernameField:'email'},authenticateUser))
    passport.serializeUser((user,done) =>done(null,user.id))
    passport.deserializeUser((id,done) =>{
        return done(null, getUserById(id))
    })
}


module.exports = initialize