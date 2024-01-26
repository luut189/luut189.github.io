import { ELEMENT_DELAY } from './constants';

export function initToDo() {
    const newTodo = document.querySelector('#new-todo') as HTMLInputElement;
    const todoList = document.getElementById('todo-list') as HTMLUListElement;
    const addTodoButton = document.getElementById('add-todo') as HTMLButtonElement;
    const clearTodoButton = document.getElementById('clear-todo') as HTMLButtonElement;
    const existingTodo = JSON.parse(localStorage.getItem('todos') || '[]');
    const todoData: string[] = [];
    let currentIndex = -1;

    addTodoButton.addEventListener('click', () => {
        addTodo(newTodo.value);
    });
    clearTodoButton.addEventListener('click', clearTodo);

    let todoDelay = ELEMENT_DELAY;
    existingTodo.forEach((todo: string) => {
        addTodo(todo, todoDelay);
        todoDelay += ELEMENT_DELAY;
    });

    function addTodo(todoText: string, delay = 100) {
        if (todoText.length == 0) return;
        currentIndex++;
        todoData.push(todoText);
        const li = document.createElement('li');

        li.textContent = todoText;
        li.className = 'clickable'
        li.onclick = () => {
            li.style.transform = 'scale(0)';
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

        li.style.transform = 'scale(0)';
        setTimeout(() => {
            li.style.transform = 'scale(1)';
        }, delay);
        todoList.appendChild(li);
        localStorage.setItem('todos', JSON.stringify(todoData));
    }

    function clearTodo() {
        let delay = ELEMENT_DELAY;
        todoData.splice(0, todoData.length);
        localStorage.removeItem('todos');
        const allTodos = todoList.children;
        for (let i = allTodos.length - 1; i >= 0; i--) {
            setTimeout(() => {
                const todo = allTodos[i] as HTMLElement;
                todo.style.transform = 'scale(0)';
            }, delay);
            delay += ELEMENT_DELAY;
            setTimeout(() => {
                todoList.removeChild(allTodos[i]);
            }, delay + 100);
            delay += ELEMENT_DELAY;
        }
    }
}
