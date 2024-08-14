document.addEventListener('DOMContentLoaded', function() {
    loadTasks();

    document.getElementById('add-task-button').addEventListener('click', function() {
        const taskInput = document.getElementById('task-input');
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            addTask(taskText);
            saveTask(taskText);
            taskInput.value = '';
            taskInput.focus(); // Automatically focuses on the input field for the next task
        }
    });
});

function addTask(taskText, completed = false) {
    const taskList = document.getElementById('task-list');

    const listItem = document.createElement('li');
    listItem.textContent = taskText;
    if (completed) {
        listItem.classList.add('completed');
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(listItem);
        deleteTask(taskText);
    });

    listItem.addEventListener('click', function() {
        listItem.classList.toggle('completed');
        toggleTaskCompletion(taskText);
    });

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

function saveTask(taskText) {
    const tasks = getTasksFromStorage();
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(taskText) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleTaskCompletion(taskText) {
    const tasks = getTasksFromStorage();
    tasks.forEach(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach(task => {
        addTask(task.text, task.completed);
    });
}

function getTasksFromStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}
