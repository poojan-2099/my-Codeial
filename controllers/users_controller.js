const User=require('../models/user')
const fs = require('fs');
const path = require('path');

module.exports.profile=function(req,res){
    User.findById(req.params.id, function(err,user){
        return res.render('user_profile',{
            Title:'User Profile',
            profile_user:user
        });
    })
    
}

module.exports.update=async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body ,function(req,res){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){
        try {
            
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('****Multer Error:!',err);return}

                user.username=req.body.username;
                user.email=req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }

                    // this is saving the path of the uploaded file
                    user.avatar=User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })

        } catch (err) {
            req.flash('error',err);
            return res.redirect('back');
        }

    }else{
        req.flash('error','Unauthorised');
        return res.status(401).send('Unauthorised');
    }

}

//render the signup page
module.exports.signUp=function(req,res){
    //setting up that page is not shown after sign-up
    if(req.isAuthenticated()){
      return res.redirect('/users/profile')
    }

    return res.render('user_sign_up',{
        Title:"Codeial | Sign Up"
    })
}

//render the signin page
module.exports.signIn=function(req,res){
    //setting up that page is not shown after sign-in
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_in',{
        Title:"Codeial | Sign In"
    })
}

//get the signUp data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        //req.flash(`error_message`,`password Doesn't match please try again`);
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing up'); return }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { 
                    console.log('Error in creating user while signing up'); 
                    return }
                    
                // req.flash('success_message','Register Successfully ! Login here');
                return res.redirect('/users/sign-in');
            })
        } else {
            return res.redirect('back');
        }

    });
}

//sign in and create a session for user
module.exports.createSession=function(req,res){
    req.flash('success','Logged in successfully')
    return res.redirect('/');
}


//Signout

module.exports.destroySession=function(req,res){
    req.logOut();
    req.flash('success','You have Logged out!');

    return res.redirect('/');
}