{
    //mthod to creating new data for comment in ajax
   
    let createComment=function(comment1){
        
        
        comment1.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/comments/create',
                data:comment1.serialize(),
                success:function(data){
                    let newComment= newCommentDom(data.data.comment);
                    $(`#postcmt_${data.data.post}`).prepend(newComment);
                    success_noty("comment Created SuccessFully!")
                    deleteComment($(' .delete-comment-button', newComment));
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
            comment1[0].reset();
        })
    }

     //method to create comment in DOM

     let newCommentDom=function(comment){
         return $(`
         <li id="comment-${ comment._id }">
            <p>
                
                        <small>
                            <a class="delete-comment-button" href="/comments/destroy/${comment._id}"><i class="far fa-times-circle"></i></a>
                        </small>
                   
                
                ${comment.content}
                <br>
                ${comment.user.username}
            </p>
        </li>
         `)
     }
      

        let deleteComment=function(deleteLink){
            $(deleteLink).click(function(e){
                e.preventDefault();
    
                $.ajax({
                    type:'get',
                    url:$(deleteLink).prop('href'),
                    success:function(data){
                        $(`#comment-${data.data.comment_id}`).remove();
                        error_noty("Comment Deleted Successfully!");
                    },
                    error:function(error){
                        console.log(error.responseText);
                    }
                })
            })
        }

        let success_noty=function(text){
            new Noty({
                theme: 'relax',
                text: text,
                type: 'success',
                layout: 'topRight',
                timeout: 1500
    
            }).show();
        }
    
        let error_noty=function(text){
        new Noty({
            theme: 'relax',
            text: text,
            type: 'error',
            layout: 'topRight',
            timeout: 1500
    
        }).show();
    }

for (let comment1 of $('.comment1'))
{
    createComment($(comment1));
}
        

let apply_dynamic_delete_to_existing_comment = function ()
{
    for (let link of $('.delete-comment-button'))
    {
        deleteComment(link);
    }
}    
apply_dynamic_delete_to_existing_comment();
   
createComment();
}