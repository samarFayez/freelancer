function addEleme(event) {
  event.preventDefault();
  var text = document.getElementById('input-task').value;
  if (text == '') {
    alert('please Add arole');
  } else {
    createUiElement(text, false);
  }
}
function createUiElement(text, checked, id) {
  var ul = document.getElementById('ul');
  var li = document.createElement('li');
  var label = document.createElement('label');
  var remove = document.createElement('button');
  var input = document.createElement('input');
  input.setAttribute('style', 'display:none');
  input.setAttribute('name', 'skill');
  remove.setAttribute('class', 'remove');
  li.setAttribute('class', 'inp');
  input.setAttribute('value', text);
  ul.appendChild(li);
  li.appendChild(label);
  li.appendChild(input);
  label.name = 'stuff';
  label.style = 'color:white;font-weight: bold;';
  li.appendChild(remove);
  remove.innerHTML = 'x';
  label.appendChild(document.createTextNode(text));
  document.getElementById('input-task').value = '';
  remove.addEventListener('click', function() {
    ul.removeChild(li);
  });
}
// function remove_Child(id) {
//   event.preventDefault();
//   var li = document.getElementById(id);
//   ul.removeChild(li);
// }
