var selectors = ['.Ct', '.comment-renderer-text-content', 'yt-formatted-string.content-text'];

const levelsOfIndentation = 3;

const authorImageUrlSel = '.yt-thumb-clip';
const authorNameSel = '.comment-author-text';
const commentTextSel = '.comment-renderer-text-content';
const commentUrlSel = '.comment-renderer-time';
const likeSel = '.comment-renderer-like-count';


// adds button
var addButton = function(comment) {

  parent = comment.parentElement;

  next = parent.nextSibling,
  button = document.createElement("button");
  button.className = "buttonInj";
  text = document.createTextNode("save");
  button.appendChild(text);
  parent.appendChild(button);

  comment.classList.add('buttoned');

}

// build the full selector string
var commentSelectorString = selectors.map(function(sel) {
  return sel + ':not(.buttoned)';
}).join(", ");

// every 100 milliseconds, apply button function to unmodified comments
setInterval(function() {
  document.querySelectorAll(commentSelectorString).forEach(addButton);
}, 100);

setInterval(function() {
  var classname = document.getElementsByClassName("buttonInj");
  for (i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', handler, false);
  }
}, 100);

function handler() {

  var that = this;

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  var overallCommentParent = getXthParentElement(this, levelsOfIndentation);
  var comment = {}
  comment.text = overallCommentParent.querySelector(commentTextSel).innerHTML;
  comment.url = overallCommentParent.querySelector(commentUrlSel).children[0].getAttribute("href");
  comment.author = overallCommentParent.querySelector(authorNameSel).innerHTML
  comment.authorImg = overallCommentParent.querySelector(authorImageUrlSel).children[0].getAttribute("src");
  comment.likeCount = overallCommentParent.querySelector(likeSel).innerHTML;
  comment.dateSaved = date;
  comment.videoTitle = document.getElementById('eow-title').getAttribute("title");
  comment.videoID = getVideoID();

  chrome.storage.local.get('comments', function(commentArray) {

    commentArray.comments.unshift(comment)
    chrome.storage.local.set({
      comments: commentArray.comments
    }, function() {
      that.innerHTML = "Saved";
      that.classList.add("savedButton");
      that.disabled = true;
      console.log("Sucess!")
    });
  });

}

function getXthParentElement(child, x) {
  for (var i = 0; i < x; i++) {
    child = child.parentElement;
  }
  return child
}


function getVideoID() {
  var video_id = window.location.search.split('v=')[1];
  console.log(video_id)
  var ampersandPosition = video_id.indexOf('&');
  if (ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
    return video_id;
  }
  return video_id;

}
