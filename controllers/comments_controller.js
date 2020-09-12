const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer=require('../mailers/comments_mailer');

//adding jobs using kue
const queue=require('../config/kue');
const commentEmailWorker=require('../workers/comment_email_worker');

module.exports.create = async function (req, res) {

    try {
        let post = await Post.findById(req.body.post);
        if (post) {

            let comment= await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            
            
            //handle error
            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user','username email').execPopulate();
            // commentsMailer.newComment(comment);
           
            let job = queue.create('emails',comment).save(function(err){
               if(err){ console.log('error in creating a queue',err); return;}

               console.log('job enqueued',job.id);
            });
                if(req.xhr){
               
                return res.status(200).json({
                    data:{
                        post:post._id,
                        comment:comment
                    },
                    message:'Comment Created'
                })
            }
           
            
            res.redirect('/');
        }

    } catch (err) {
        console.log('Error', err);
    }
}



module.exports.destroy = async function (req, res) {

    try {
        let comment = await Comment.findById(req.params.id).populate('post').exec();
        if (comment.user == req.user.id || comment.post.user == req.user.id) {
            let postId = comment.post;

            comment.remove();
            
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id:req.params.id
                    },
                    message:"comment deleted"
                    
                })
            }

            let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
    }

}