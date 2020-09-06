const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User = require('../models/user');


//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID:"533919007497-7nojjep75em3lmld7c1jvfa6gq5o0s2u.apps.googleusercontent.com",
        clientSecret:"fon8AC7EAdja_Pe2o3hK72p-",
        callbackURL:"http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){
        //find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google strategy-passport',err); return;}

            console.log(profile);
            
            //if found,set this user as req.user
            if(user){
                return done(null,user);
            }else{
                //if not found create the and set it as req.user
                User.create({
                    username:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){console.log('Error in creating user',err); return;}

                    return done(null,user);
                })
            }

        })
    }

))

module.exports=passport;