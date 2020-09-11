const nodeMailer=require('../config/nodemailer');

//this is new way to exporting method
exports.newComment=(comment)=>{
    console.log('inside newComment mailer');

    nodeMailer.transporter.sendMail({
        from:'apix.com',
        to:comment.user.email,
        subject:"new comment publishd!",
        html:'<h1>Yup, your comment is publisheed</h1>'
    }, (err,info) => {
        if (err) {
            console.log("Error in sending mail",err);
            return;
        }
        console.log('Message sent',info);
        return;
    })
}