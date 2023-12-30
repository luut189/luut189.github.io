const newTodo = document.querySelector('#new-todo');
const todoList = document.getElementById('todo-list');
const existingTodo = JSON.parse(localStorage.getItem('todos'));
const todoData = [];
let currentIndex = -1;

(function () {
    if (document.documentElement.className === 'theme-dark') {
        setTheme('theme-dark');
    } else {
        setTheme('theme-light');
    }
 })();

existingTodo.forEach(todo => {
    addTodo(todo);
});

function addTodo(todoText) {
    if(todoText.length == 0) return;
    currentIndex++;
    todoData.push(todoText);
    const li = document.createElement('li');

    li.innerHTML = todoText;
    li.onclick = () => {
        todoData.splice(currentIndex, 1);
        currentIndex--;
        localStorage.clear();
        localStorage.setItem('todos', JSON.stringify(todoData));

        li.parentNode.removeChild(li);
    }
    newTodo.value = '';

    todoList.appendChild(li);
    localStorage.setItem('todos', JSON.stringify(todoData));
}

function clearTodo() {
    localStorage.clear();
    todoList.innerHTML = "Things to do:";
}

function setTheme(themeName) {
    const oppositeTheme = themeName === 'theme-dark' ? 'theme-light' : 'theme-dark';
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
    document.getElementById('theme-toggle').className = `clickable ${oppositeTheme}`;
}

function toggleTheme() {
    const isDark = localStorage.getItem('theme') === 'theme-dark';
    setTheme(isDark ? 'theme-light' : 'theme-dark');
}