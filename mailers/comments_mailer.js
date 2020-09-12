const nodeMailer=require('../config/nodemailer');

//this is new way to exporting method
exports.newComment=(comment)=>{
    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')

    nodeMailer.transporter.sendMail({
        from:'apix.com',
        to:comment.user.email,
        subject:"new comment publishd!",
        html:htmlString
    }, (err,info) => {
        if (err) {
            console.log("Error in sending mail",err);
            return;
        }
        console.log('Message sent',info);
        return;
    })
}