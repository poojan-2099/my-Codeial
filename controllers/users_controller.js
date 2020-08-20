module.exports.profile=function(req,res){
    return res.render('user_profile',{
        Title:'Profile'
    })
}

//render the signup page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        Title:"Codeial | Sign Up"
    })
}

//render the signin page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        Title:"Codeial | Sign In"
    })
}

//get the signUp data
module.exports.create=function(req,res){
    //TODo later
}

//sign in and create a session for user
module.exports.createSession=function(req,res){
    //TODo later
}