const elTodoInput  = document.querySelector('.todo_input');
const elTodoBox    = document.querySelector('.todo_box');
const elTodoTabs   = document.querySelector('.todo_tabs');
const elTodoList   = document.querySelector('.todo_list');
const elPendingCnt = document.querySelector('.pending_cnt');
const elBtnAdd     = document.querySelector('.btn_add');
const elBtnClear   = document.querySelector('.btn_clear');

const strHistory = localStorage.getItem('todo') ;

let arrTodo = strHistory ? JSON.parse(strHistory) : [];

function render() {
  let strList       = '';
  let intPendingCnt = 0;

  arrTodo.forEach(function(todo, idx) {
    strList +=  `<li class="${(todo.isDone) ? 'complete' : ''}" >` +
                  `<div><input class="todo_checkbox" type="checkbox" data-num="${idx}"><span class="material-icons todo_check">check</span></div>` +
                  `<div><span class="todo_item">${todo.item}</span></div>` +
                  `<div><span class="material-icons btn_delete" data-num="${idx}">clear</span></div>` +
                `</li>`;

    if (todo.isDone === false) {
      intPendingCnt += 1;
    }
  });
  
  elTodoList.innerHTML     = strList;
  elPendingCnt.textContent = intPendingCnt;
  
  elTodoBox.style.display = 'block';
  
  localStorage.setItem('todo', JSON.stringify(arrTodo));
}

function addTodo() {
  let objInput = {
    item: elTodoInput.value.trim(),
    isDone: false,
  };

  arrTodo.push(objInput);
  render();
  elTodoInput.value = '';
}

function refreshTab() {
  let tabIdx = 0;
  
  for (let i = 0; i < elTodoTabs.children.length; i++) {
    if (elTodoTabs.children[i].children[0].getAttribute('class') === 'active') {
      tabIdx = i;
    }
  }

  elTodoTabs.children[tabIdx].children[0].click();
}

if (arrTodo.length > 0) {
  render();
}

elTodoInput.addEventListener('keydown', function(e) {
  if (e.keyCode !== 13) {
    return;
  }

  if (e.target.value.trim() === '') {
    alert('待辦事項不可為空值！');
    return;
  }

  addTodo();
  refreshTab();
});

elBtnAdd.addEventListener('click', function(e) {
  if (elTodoInput.value.trim() === '') {
    alert('待辦事項不可為空值！');
    return;
  }

  addTodo();
  refreshTab();
});

elTodoTabs.addEventListener('click', function(e) {
  e.preventDefault();

  const targetIdx = e.target.getAttribute('data-tab');

  for (let i = 0; i < elTodoTabs.children.length; i++) {
    elTodoTabs.children[i].children[0].removeAttribute('class');
  }
  
  elTodoTabs.children[targetIdx].children[0].setAttribute('class', 'active');

  for (let i = 0; i < elTodoList.children.length; i++) {
    elTodoList.children[i].removeAttribute('style');

    switch(targetIdx) {
      case '1':
        if (elTodoList.children[i].getAttribute('class') === 'complete') {
          elTodoList.children[i].style.display = 'none';
        }
      break;

      case '2':
        if (elTodoList.children[i].getAttribute('class') !== 'complete') {
          elTodoList.children[i].style.display = 'none';
        }
      break;
    }
  }
});

elTodoList.addEventListener('click', function(e) {
  const targetClass = e.target.getAttribute('class');
  const targetIdx   = e.target.getAttribute('data-num') ;

  if (!targetClass || !targetClass.match(/btn_delete|todo_checkbox/)) {
    return;
  }

  if (targetClass == 'todo_checkbox') {
    elTodoList.children[targetIdx].setAttribute('class', 'complete');
    arrTodo[targetIdx].isDone = true;
  }
  else {
    arrTodo.splice(targetIdx, 1);
  }

  render();
  refreshTab();
});

elBtnClear.addEventListener('click', function(e) {
  e.preventDefault();

  arrTodo = arrTodo.filter(todo => todo.isDone === false);

  render();
  refreshTab();
});
//# sourceMappingURL=app.js.map
