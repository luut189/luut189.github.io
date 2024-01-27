import { ELEMENT_DELAY } from './constants';

interface ToDoItem {
    text: string;
    associatedHTML: HTMLElement;
    index: number;
}

export function initToDo() {
    const newTodo = document.querySelector('#new-todo') as HTMLInputElement;
    const todoList = document.getElementById('todo-list') as HTMLUListElement;
    const addTodoButton = document.getElementById('add-todo') as HTMLButtonElement;
    const clearTodoButton = document.getElementById('clear-todo') as HTMLButtonElement;
    const existingTodo = JSON.parse(localStorage.getItem('todos') || '[]');
    const todoData: ToDoItem[] = [];
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
        const todoItem: ToDoItem = {
            text: todoText,
            associatedHTML: document.createElement('li'),
            index: currentIndex,
        };

        todoItem.associatedHTML.textContent = todoText;
        todoItem.associatedHTML.className = 'clickable';

        todoItem.associatedHTML.onclick = () => {
            todoItem.associatedHTML.style.transform = 'scale(0)';
            todoData.splice(todoItem.index, 1);
            todoData.forEach((item) => {
                if (item.index >= todoItem.index) {
                    item.index--;
                    console.log('hi');
                    
                }
            });

            currentIndex--;

            localStorage.removeItem('todos');
            localStorage.setItem('todos', JSON.stringify(todoData));

            setTimeout(() => {
                const parent = todoItem.associatedHTML.parentNode as ParentNode;
                parent.removeChild(todoItem.associatedHTML);
            }, 200);
        };
        newTodo.value = '';

        todoItem.associatedHTML.style.transform = 'scale(0)';
        setTimeout(() => {
            todoItem.associatedHTML.style.transform = 'scale(1)';
        }, delay);

        todoData.push(todoItem);

        todoList.appendChild(todoItem.associatedHTML);
        localStorage.setItem('todos', JSON.stringify(todoData));
    }

    function clearTodo() {
        let delay = ELEMENT_DELAY;

        currentIndex = -1;
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
