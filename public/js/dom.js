const select = function(selector) {
  return document.querySelector(selector);
};

function comment(post_id) {
  event.preventDefault();
  var comment = document.getElementsByClassName(`${post_id}`)[0].value;
  fetch('/addComment', 'POST', comment, post_id, res => {
    var all = select('.all');
    all.innerHTML = res;
  });
}
