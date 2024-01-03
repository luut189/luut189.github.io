'use strict';
const elementDelay = 200;

const newTodo = document.querySelector('#new-todo') as HTMLInputElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const addTodoButton = document.getElementById('add-todo') as HTMLButtonElement;
const clearTodoButton = document.getElementById(
    'clear-todo'
) as HTMLButtonElement;
const existingTodo = JSON.parse(localStorage.getItem('todos') || '{}');
const todoData: string[] = [];
let currentIndex = -1;

addTodoButton.addEventListener('click', () => {
    addTodo(newTodo.value);
});
clearTodoButton.addEventListener('click', clearTodo);

const http = 'https://';
const linkSaverWrapper = document.getElementById(
    'link-saver'
) as HTMLDivElement;
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
    link.setAttribute('style', 'transform: scale(0)');
    setTimeout(() => {
        link.setAttribute('style', 'transform: scale(1)');
    }, linkDelay);
    linkDelay += elementDelay;
    linkSaverWrapper.appendChild(link);
});

const anchorClickable = document.getElementsByTagName('a');
const buttonClickable = document.getElementsByTagName('button');
for (const anchor of anchorClickable) {
    anchor.addEventListener('mouseover', () => {
        anchor.setAttribute('style', 'transform: scale(0.8)');
    });
    anchor.addEventListener('mouseleave', () => {
        anchor.setAttribute('style', 'transform: scale(1)');
    });
}
for (const button of buttonClickable) {
    button.addEventListener('click', () => {
        button.setAttribute('style', 'transform: scale(0.8)');
        setTimeout(() => {
            button.setAttribute('style', 'transform: scale(1)');
        }, 200);
    });
}

let todoDelay = elementDelay;
existingTodo.forEach((todo: string) => {
    addTodo(todo, todoDelay);
    console.log(todoDelay);
    todoDelay += elementDelay;
});

function addTodo(todoText: string, delay = 100) {
    if (todoText.length == 0) return;
    currentIndex++;
    todoData.push(todoText);
    const li = document.createElement('li');

    li.innerHTML = todoText;
    li.onclick = () => {
        li.setAttribute('style', 'transform: scale(0)');
        todoData.splice(currentIndex, 1);
        currentIndex--;
        localStorage.removeItem('todos');
        localStorage.setItem('todos', JSON.stringify(todoData));

        setTimeout(() => {
            const parent = li.parentNode as ParentNode;
            parent.removeChild(li);
        }, 200);
    };
    newTodo.value = '';

    li.setAttribute('style', 'transform: scale(0)');
    setTimeout(() => {
        li.setAttribute('style', 'transform: scale(1)');
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
            allTodos[i].setAttribute('style', 'transform: scale(0)');
        }, delay);
        delay += elementDelay;
        setTimeout(() => {
            todoList.removeChild(allTodos[i]);
        }, delay + 100);
        delay += elementDelay;
    }
}

function setTheme(themeName: string) {
    const oppositeTheme =
        themeName === 'theme-dark' ? 'theme-light' : 'theme-dark';
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;

    const toggleButton = document.getElementById(
        'theme-toggle'
    ) as HTMLButtonElement;
    toggleButton.classList.replace(themeName, oppositeTheme);

    const toggleButtonTooltip = document.getElementById(
        'theme-toggle-tooltip'
    ) as HTMLSpanElement;
    toggleButtonTooltip.innerHTML = `Switch ${oppositeTheme.replace('-', ' ')}`;
}

function toggleTheme() {
    const isDark = localStorage.getItem('theme') === 'theme-dark';
    setTheme(isDark ? 'theme-light' : 'theme-dark');
}
