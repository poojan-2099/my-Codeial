const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport=require('passport')
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy')

const Mongostore=require('connect-mongo')(session);
//setting up saas
const saasMiddleware=require('node-sass-middleware');
//setting up flash
const flash=require('connect-flash');
const customMware=require('./config/middleware');


app.use(saasMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

//make the upload files available to the browser
// app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/uploads',express.static(__dirname+'/uploads'));

//we have to put layouts first before routes
app.use(expressLayouts);

//extract style and scripts from seb pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo-store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    //TODO change the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new Mongostore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok')
        }

    )

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//using flash
app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        //console.log("Error!!",err);
        console.log(`Error in running server:${err}`);
    }
    console.log(`Server is running on port:${port}`);
})