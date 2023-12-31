const newTodo = document.querySelector("#new-todo");
const todoList = document.getElementById("todo-list");
const existingTodo = JSON.parse(localStorage.getItem("todos"));
const todoData = [];
let currentIndex = -1;

const http = "https://";
const linkSaverWrapper = document.getElementById("link-saver");
const savedWebsite = [
    {
        name: "Facebook",
        url: "facebook.com",
    },
    {
        name: "YouTube",
        url: "youtube.com",
    },
];

(function () {
    if (document.documentElement.className === "theme-dark") {
        setTheme("theme-dark");
    } else {
        setTheme("theme-light");
    }
})();

(function () {
    savedWebsite.forEach((web) => {
        const link = document.createElement("a");
        link.className = "clickable";
        link.href = http + web.url;
        link.innerHTML = web.name;
        linkSaverWrapper.appendChild(link);
    });
})();

const anchorClickable = document.getElementsByTagName("a");
const buttonClickable = document.getElementsByTagName("button");
for (const anchor of anchorClickable) {
    anchor.addEventListener("mouseover", () => {
        anchor.style = "transform: scale(0.8)";
    });
    anchor.addEventListener("mouseleave", () => {
        anchor.style = "transform: scale(1)";
    });
}
for (const button of buttonClickable) {
    button.addEventListener("click", () => {
        button.style = "transform: scale(0.8)";
        setTimeout(() => {
            button.style = "transform: scale(1)";
        }, 200);
    });
}

existingTodo.forEach((todo) => {
    addTodo(todo);
});

function addTodo(todoText) {
    if (todoText.length == 0) return;
    currentIndex++;
    todoData.push(todoText);
    const li = document.createElement("li");

    li.innerHTML = todoText;
    li.onclick = () => {
        li.style = "transform: scale(0)";
        todoData.splice(currentIndex, 1);
        currentIndex--;
        localStorage.clear();
        localStorage.setItem("todos", JSON.stringify(todoData));

        setTimeout(() => {
            li.parentNode.removeChild(li);
        }, 200);
    };
    newTodo.value = "";

    todoList.appendChild(li);
    li.style = "transform: scale(0)";
    setTimeout(() => {
        li.style = "transform: scale(1)";
    }, 100);
    localStorage.setItem("todos", JSON.stringify(todoData));
}

function clearTodo() {
    localStorage.removeItem('todos');
    todoList.innerHTML = "Things to do:";
}

function setTheme(themeName) {
    const oppositeTheme =
        themeName === "theme-dark" ? "theme-light" : "theme-dark";
    localStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
    document.getElementById(
        "theme-toggle"
    ).className = `clickable ${oppositeTheme}`;
}

function toggleTheme() {
    const isDark = localStorage.getItem("theme") === "theme-dark";
    setTheme(isDark ? "theme-light" : "theme-dark");
}
