// State
let todos = [];
let orderTodos = [];

// DOMs
const $nav = document.querySelector('.nav');
const $inputTodo = document.querySelector('.input-todo');
const $todos = document.querySelector('.todos');
const $footer = document.querySelector('footer');
const $clearCompleted = document.querySelector('.clear-completed');
const $activeTodos = document.querySelector('.active-todos');
const $completedTodos = document.querySelector('.completed-todos');

const completedItem = () => {
  $completedTodos.textContent = todos.reduce((acc, cur) => +cur.completed + acc, 0);
};

const render = arr => {
  let html = '';

  arr.forEach(
    ({ id, content, completed }) => {
      html += `
        <li id="${id}" class="todo-item">
          <input id="ck-${id}" class="checkbox" type="checkbox" ${completed ? 'checked' : ''}>
          <label for="ck-${id}">${content}</label>
          <i class="remove-todo far fa-times-circle"></i>
        </li>`;
    }
  );

  $todos.innerHTML = html;
  $activeTodos.textContent = arr.length;
  completedItem();
};

const fetchTodos = () => {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
  ].sort((todo1, todo2) => todo2.id - todo1.id);

  render(todos);
};

const renderActive = () => todos.filter(active => !active.completed);
const renderCompleted = () => todos.filter(completed => completed.completed);

const maxId = () => {
  if (todos.length === 0) return 1;
  return Math.max(...todos.map(todo => todo.id)) + 1;
};

const addTodo = content => {
  if (content === '') return;
  todos = [{ id: maxId(), content, completed: false }, ...todos];
  render(todos);
};

const removeTodo = key => {
  todos = todos.filter(todo => todo.id !== +key);
  render(todos);
};

// Event Binding
window.onload = fetchTodos();

$inputTodo.onkeyup = e => {
  if (e.key !== 'Enter') return;

  addTodo($inputTodo.value);
  $inputTodo.value = '';
};

$todos.onclick = e => {
  if (!e.target.matches('.remove-todo')) return;
  removeTodo(e.target.parentNode.id);
};

$todos.onchange = e => {
  todos.forEach(todo => {
    if (todo.id === +e.target.parentNode.id) {
      todo.completed = e.target.checked;
    }
  });
  completedItem();
};

$footer.onchange = e => {
  todos = todos.map(todo => ({ ...todo, completed: e.target.checked }));
  render(todos);
};

$clearCompleted.onclick = e => {
  if (!e.target.matches('.clear-completed .btn')) return;
  todos = todos.filter(todo => !todo.completed);
  render(todos);
};

const asdas = e => {
  if (e.target.id === 'active') orderTodos = renderActive();
  else if (e.target.id === 'completed') orderTodos = renderCompleted();
};

$nav.onclick = e => {
  if (!e.target.matches('.nav li')) return;
  [...$nav.children].forEach($li => $li.classList.toggle('active', $li === e.target));

  asdas(e);
  if (e.target.id === 'all') render(todos);
  else render(orderTodos);
};
