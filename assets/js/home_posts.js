{   
    //method to submit the form data for new post using ajax
    let createPost=function(){
        let newPostForm=$('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){
                    let newPost= newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    success_noty('Posted successfully');
                    deletePost($(' .delete-post-button',newPost));
                    
                },
                error:function(error){
                    erorr_noty("Error in creating Post")
                    console.log(error.responseText);
                }
            });
            $('.post1')[0].reset();
        });
    }

    //method to create post in DOM

    let newPostDom=function(post){
        return $(`
        <li id="post-${post._id}">
            <div class="post-display">
                ${ post.content }
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${ post._id }"><i class='fas fa-trash-alt'></i></a>
                </small>
                </div>
            <div>
                <small>
                    <img src="${ post.user.avatar }" alt="${ post.user.username}" width="30" style="border-radius: 50%;">
                    ${ post.user.username }
                </small>
            </div>
            <div class="post-comments">
                <div class="post-comments-list">
                    <ul id="post-comments-${ post._id }">
                       
                    </ul>
                    </div>
                    
                        <form action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="Type here to add comment.." required>
                            <input type="hidden" name="post" value="${post._id }">
                            <input type="submit" value="Add Comment">
                        </form>
                      
                </div>
        </li>
        `)
    }

    //method to delete a post from dom
    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    erorr_noty("Post Deleted!")
                },
                error:function(error){
                    console.log(error.responseText);
                    erorr_noty("Error in Post Deleting!")
                }
            })
        });
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

    let erorr_noty=function(text){
    new Noty({
        theme: 'relax',
        text: text,
        type: 'error',
        layout: 'topRight',
        timeout: 1500

    }).show();
}

    
let apply_dynamic_delete_to_existing_post = function ()
{
    for (let link of $('.delete-post-button'))
    {
        deletePost(link)
    }
}    
apply_dynamic_delete_to_existing_post();
   
    createPost();
}


