
localComments = [];

chrome.storage.local.get('comments', function(commentArray) {
  localComments = commentArray.comments
  console.log(commentArray.comments)
  // document.getElementById('foo').append(makeUL(commentArray.comments));
  makeUL(commentArray.comments);

});


setInterval(function() {
  var classname = document.getElementsByClassName("btn-default");
  for (i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', handler, false);
  }
}, 100);

function makeUL(array) {
    // Create the list element:
    var list = $('#main-ul');

    for(var i = 0; i < array.length; i++) {
       var comment = array[i];

        list.append(`
  <div class="media">
    <div class="media-left">
      <a href="#">
        <img src="${comment.authorImg}" alt="">
      </a>
    </div>
    <div class="media-body">
      <h4 class="media-heading" >${comment.videoTitle}<small>saved on ${comment.dateSaved}</small></h4>
      <p>
       ${comment.text}
      </p>
      <p> ${comment.likeCount - 1}&nbsp<i class="glyphicon glyphicon-thumbs-up"></i>&nbsp - ${comment.author}
      </p>
    </div>
    <div class="media-right">
      <button class="btn btn-default" id="${comment.url}">
        <i class="glyphicon glyphicon-trash"></i>
      </button>
    </div>
    <p style="display: none;" class="comment-id">${comment.url}</p>
  </div>
`);
//
    }
    console.log(list)
    // Finally, return the constructed list:
  //  return list;
}

function handler() {
 console.log(this.id)
 localComments.forEach( (comment, index) => {
   if (comment.url === this.id) {
     localComments.splice(index, 1);
     chrome.storage.local.set({
       comments: localComments
     }, function() {
       console.log("Sucess!")
     });
     }

 })
  getXthParentElement(this,2).remove();
//  var overallCommentParent = getXthParentElement(this, levelsOfIndentation);


  // chrome.storage.local.get('comments', function(commentArray) {

  //   commentArray.comments.push(comment)

  // });

}

function getXthParentElement(child, x) {
  for (var i = 0; i < x; i++) {
    child = child.parentElement;
  }
  return child
}
