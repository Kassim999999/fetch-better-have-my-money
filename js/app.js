const API_URL = 'http://localhost:4000/todos';

document.addEventListener('DOMContentLoaded', fetchTasks);

const tasksList = document.querySelector('#tasks-list');

function fetchTasks() {
    fetch(API_URL)
    .then((res) => { 
        if (!res.ok) {
            alert(res.status);
        }
        return res.json();
    })
    .then((todos) => {
        renderTodos(todos);
        setRemainingTasks(todos);
    });
}

function renderTodos(todos) {
    todos.forEach(todo => {
        const todoElement = document.createElement('div');
    
        todoElement.className = 'task';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        checkbox.checked = todo.completed;

        const todoText = document.createElement('span');
        todoText.textContent = todo.title;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

        todoElement.appendChild(checkbox);
        todoElement.appendChild(todoText);
        todoElement.appendChild(deleteButton);
        
        tasksList.appendChild(todoElement);
    });
}

const remainingtodosCount = document.querySelector('#tasks-count');
function setRemainingTasks(todos) {
    const remainingTodos = todos.filter(todo => !todo.completed).length;
    remainingtodosCount.textContent = remainingTodos
}