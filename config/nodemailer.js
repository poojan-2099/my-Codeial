const nodeMailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');



let transporter=nodeMailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'luciferreal69@gmail.com', 
        pass:'8347961590'
    }

});

let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log('Error in rendering Template',err); return;}

            mailHTML=template;
        }
    )
    return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}