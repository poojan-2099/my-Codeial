const User=require('../models/user')

module.exports.profile=function(req,res){
    return res.render('user_profile',{
        Title:'Profile'
    })
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
    return res.redirect('/users/profile');
}