const select = function(selector) {
  return document.querySelector(selector);
};
const btnn = select('.buttonS');
console.log('e', btnn);

if (btnn) {
  btnn.addEventListener('click', () => {
    const name = select('#name').value;
    const password = select('#password').value;
    const msg = select('.msg');
    fetch('/login', 'POST', name, password, res => {
      msg.textContent = res;
      if (res === 'success') {
        window.location.pathname = '/freelancer';
      }
    });
  });
}

const searchbtn = select('#btnSearch');
if (searchbtn) {
  searchbtn.addEventListener('click', () => {
    const s = select('#search').value;
    const d = 'f';
    fetch('/', 'POST', s, d, res => {});
  });
}

const deleteProject = document.querySelectorAll('.deleteProject');

if (deleteProject) {
  deleteProject.forEach(btn => {
    btn.addEventListener('click', () => {
      fetch('/admin/projects', 'POST', btn.id, '', res => {
        location.reload();
      });
    });
  });
}
const buttons = document.querySelectorAll('.x');

console.log('qqq', buttons);

if (buttons) {
  buttons.forEach(e => {
    e.addEventListener('click', () => {
      fetch('/admin/users', 'POST', e.id, '', res => {
        location.reload();
      });
    });
  });
}
