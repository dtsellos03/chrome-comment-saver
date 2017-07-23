var selectors = ['.Ct', '.comment-renderer-text-content', 'yt-formatted-string.content-text'];


// adds button
var addButton = function(comment) {

    parent = comment.parentElement;

    next = parent.nextSibling,
    button = document.createElement("button");
    button.className = "button";
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
  var classname = document.getElementsByClassName("button");
  for (i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', handler, false);
  }
}, 100);

function handler() {
	console.log("CLICKED")
  console.log(this.parentElement.children)
  console.log(this.parentElement.children[0].innerHTML)
}
