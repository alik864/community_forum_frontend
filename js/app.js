$(document).ready(function(){


   $('#category-filter').on('change',function(){
var category_id = $("#category-filter option:selected").val();
  getPostsInCategory(category_id);
  });


  // Add a click handler to the submit button
  // for adding a new post

  $('#create-post').on('click',function(){
var category_id = $("#categories option:selected").val();
    // form the data that you will send to the server
    // to create a new post in the backend.
    var postData = {
      post: {
        title: $('#title').val(),
        content: $('#content').val(),
      },
     category_id: category_id
    };

    // sent the post data the user entering
    // to the server
    $.ajax({
      url: 'http://localhost:3000/posts',
      method: 'POST',
      data: postData,
      dataType: 'json'
    })

    // Once the server has the info it post to website"
    .done(function(result){
      console.log("Added post");
      $('#title').val('');
      $('#content').val('');
      getAllPosts();
    })

    // if there is error then an alert will come up
    .fail(function(){
      alert('Error: failed to create a new post');
    });

  });

  getAllPosts();

  getAllCategories();

});

// this allows for post to show up in live time without
//refreshing the page
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
      $('#all-posts').append("<li class='post-entry' id='" + post.id + "'>" + post.title + "<p>" + post.date + "</p>" + "<p>" + post.content + "</p></li>");
    });
  });

}

function getPostsInCategory(category_id){
   $.ajax({
    url: 'http://localhost:3000/posts?q=' + category_id,
    dataType: 'json'
  })
  .done(function(posts_data){
    $('#all-posts').html('');

    // posts_data is an array of all the posts
    console.log(posts_data);

    // for each individual post in the posts_data array
    posts_data.forEach(function(post){
      // create a HTML paragraph with one post's title in it.
      $('#all-posts').append("<li class='post-entry' id='" + post.id + "'>" + post.title + "<p>" + post.date + "</p>" + "<p>" + post.content + "</p></li>");
    });
  });

}

function getAllCategories(){
  $.ajax({
    url: 'http://localhost:3000/categories',
    dataType: 'json'
  })
  .done(function(data){
    $('#categories').html('');

 $('#category-filter').html('');


    // posts_data is an array of all the posts
    console.log(data);

    // for each individual post in the posts_data array
    data.forEach(function(element){
      // create a HTML paragraph with one post's title in it.
      $('#categories').append("<option value='" + element.id + "'>" + element.name + "</option>");
       $('#category-filter').append("<option value='" + element.id + "'>" + element.name + "</option>");
    });
  });
}
