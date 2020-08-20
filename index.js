const express=require('express');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose')

app.use(express.static('./assets'))
//we have to put layouts first before routes
app.use(expressLayouts);
//extract style and scripts from seb pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true)

//use express router
app.use('/',require('./routes'))
//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        //console.log("Error!!",err);
        console.log(`Error in running server:${err}`);
    }
    console.log(`Server is running on port:${port}`);
})