module.exports.profile=function(req,res){
    return res.render('user_profile',{
        Title:'Profile'
    })
}

module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        Title:"Codeial | Sign Up"
    })
}

module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        Title:"Codeial | Sign In"
    })
}