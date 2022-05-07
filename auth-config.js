
module.exports={
    checkAuthenticated: function (req, res,next){
        //not sure if I did the right thing for checking the session logic
        let session = req.session
        if(req.isAuthenticated() || session.userid !== undefined){
            //use of the return next to avoid the execution of the res.redirect('/login')
            return next()
        }
        res.redirect('/login')
    },
    //it's legitimate and good practice to use the next or return next here logically.
    storeSession: function(req,res,next){
        let session = req.session;
        session.userid = req.body.email
        next();

    },
    checkNotAuthenticated:function (req,res,next){
        if(req.isAuthenticated()){
            return res.redirect('/login')
        }
        next()
    
    }
}




