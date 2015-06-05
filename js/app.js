$(document).ready(function(){

  // Add a click handler to the submit button
  // for adding a new post
  $('#create-post').on('click',function(){

    // form the data that you will send to the server
    // to create a new post in the backend.
    var postData = {
      post: {
        title: $('#title').val(),
        content: $('#content').val()
      }
    };

    // sent the post data the user entering
    // to the server
    $.ajax({
      url: 'http://localhost:3000/posts',
      method: 'POST',
      data: postData,
      dataType: 'json'
    })
    .done(function(result){
      console.log("Added post");
      $('#title').val('');
      $('#content').val('');
      getAllPosts();
    })
    .fail(function(){
      alert('Error: failed to create a new post');
    })

  });

  getAllPosts();

});


function getAllPosts(){
   $.ajax({
    url: 'http://localhost:3000/posts',
    dataType: 'json'
  })
  .done(function(posts_data){
    $('#all-posts').html('');

    // posts_data is an array of all the posts
    console.log(posts_data);

    // for each individual post in the posts_data array
    posts_data.forEach(function(post){
      // create a HTML paragraph with one post's title in it.
      $('#all-posts').append("<li class='post-entry' id='" + post.id + "'>" + post.title + "<p>" + post.content + "</p></li>");
    })
  });

}
