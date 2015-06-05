$(document).ready(function(){

  $.ajax({
    url: 'http://localhost:3000/posts',
    dataType: 'json'
  })
  .done(function(posts_data){
    // posts_data is an array of all the posts
    console.log(posts_data);

    // for each individual post in the posts_data array
    posts_data.forEach(function(post){
      // create a HTML paragraph with one post's title in it.
      $('#all-posts').append("<li class='post-entry' id='" + post.id + "'>" + post.title + "<p>" + post.content + "</p></li>");
    })
  });

})
