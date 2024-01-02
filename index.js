const elementDelay = 200;

const newTodo = document.querySelector('#new-todo');
const todoList = document.getElementById('todo-list');
const existingTodo = JSON.parse(localStorage.getItem('todos'));
const todoData = [];
let currentIndex = -1;

const http = 'https://';
const linkSaverWrapper = document.getElementById('link-saver');
const savedWebsite = [
    {
        name: 'Facebook',
        url: 'facebook.com',
    },
    {
        name: 'YouTube',
        url: 'youtube.com',
    },
];

const defaultTheme = 'theme-dark';
const theme = localStorage.getItem('theme') || defaultTheme;
setTheme(theme);

let linkDelay = elementDelay;
savedWebsite.forEach((web) => {
    const link = document.createElement('a');
    link.className = 'clickable';
    link.href = http + web.url;
    link.innerHTML = web.name;
    link.style = 'transform: scale(0)';
    setTimeout(() => {
        link.style = 'transform: scale(1)';
    }, linkDelay);
    linkDelay += elementDelay;
    linkSaverWrapper.appendChild(link);
});

const anchorClickable = document.getElementsByTagName('a');
const buttonClickable = document.getElementsByTagName('button');
for (const anchor of anchorClickable) {
    anchor.addEventListener('mouseover', () => {
        anchor.style = 'transform: scale(0.8)';
    });
    anchor.addEventListener('mouseleave', () => {
        anchor.style = 'transform: scale(1)';
    });
}
for (const button of buttonClickable) {
    button.addEventListener('click', () => {
        button.style = 'transform: scale(0.8)';
        setTimeout(() => {
            button.style = 'transform: scale(1)';
        }, 200);
    });
}

let todoDelay = elementDelay;
existingTodo.forEach((todo) => {
    addTodo(todo, todoDelay);
    console.log(todoDelay);
    todoDelay += elementDelay;
});

function addTodo(todoText, delay = 100) {
    if (todoText.length == 0) return;
    currentIndex++;
    todoData.push(todoText);
    const li = document.createElement('li');

    li.innerHTML = todoText;
    li.onclick = () => {
        li.style = 'transform: scale(0)';
        todoData.splice(currentIndex, 1);
        currentIndex--;
        localStorage.removeItem('todos');
        localStorage.setItem('todos', JSON.stringify(todoData));

        setTimeout(() => {
            li.parentNode.removeChild(li);
        }, 200);
    };
    newTodo.value = '';

    li.style = 'transform: scale(0)';
    setTimeout(() => {
        li.style = 'transform: scale(1)';
    }, delay);
    todoList.appendChild(li);
    localStorage.setItem('todos', JSON.stringify(todoData));
}

function clearTodo() {
    let delay = elementDelay;
    todoData.splice(0, todoData.length);
    localStorage.removeItem('todos');
    const allTodos = todoList.children;
    for (let i = allTodos.length - 1; i >= 0; i--) {
        setTimeout(() => {
            allTodos[i].style = 'transform: scale(0)';
        }, delay);
        delay += elementDelay;
        setTimeout(() => {
            todoList.removeChild(allTodos[i]);
        }, delay + 100);
        delay += elementDelay;
    }
}

function setTheme(themeName) {
    const oppositeTheme =
        themeName === 'theme-dark' ? 'theme-light' : 'theme-dark';
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
    document
        .getElementById('theme-toggle')
        .classList.replace(themeName, oppositeTheme);
    document.getElementById('theme-toggle-tooltip').innerHTML = `Switch ${
        oppositeTheme.replace('-', ' ')
    }`;
}

function toggleTheme() {
    const isDark = localStorage.getItem('theme') === 'theme-dark';
    setTheme(isDark ? 'theme-light' : 'theme-dark');
}
