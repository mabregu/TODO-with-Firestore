import { saveTask, getTasks, onTasks, deleteTask, getTask, updateTask } from './services/firebase.js';

const taskContainer = document.querySelector('#task-container');
const taskInput = document.querySelector('#task');
const taskDescription = document.querySelector('#task-description');
let editing = false;
let currentTaskId = '';

window.addEventListener('DOMContentLoaded', async () => {
    onTasks(async (snapshot) => {
        const tasks = await snapshot.docs.map(doc => doc.data());
        renderTasks(tasks);
    });
    
    renderTasks();
});

const taskForm = document.querySelector('#task-form');

// Click event for the save task button
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (editing) {
        let data = {
            task: taskInput.value,
            description: taskDescription.value
        };
        
        updateTask(currentTaskId, data);
        
        editing = false;
        currentTaskId = '';
    } else {
        saveTask(taskInput.value, taskDescription.value);
    }
    
    taskForm.reset();
});

// Click event for the delete and update task button
taskContainer.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-task')) {
        const id = e.target.dataset.id;
        if (confirm('Are you sure you want to delete this task?')) await deleteTask(id);
    }
    
    if (e.target.classList.contains('edit-task')) {
        const id = e.target.dataset.id;
        const task = await getTask(id);
        
        taskInput.value = task.data().task;
        taskDescription.value = task.data().description;
        
        editing = true;
        currentTaskId = id;
        document.querySelector('#btn-save-task').innerText = 'Update task';
    }
});

async function renderTasks() {
    let tasks = await getTasks();
    let html = '';
    
    tasks.forEach(doc => {
        let task = doc.data();
        
        html += `
            <div class="task">
                <h3>${task.task}</h3>
                <p>${task.description}</p>
                <small><i>${task.createdAt.toDate()}</i></small>
                <button class="delete-task" data-id="${doc.id}">Delete</button>
                <button class="edit-task" data-id="${doc.id}">Edit</button>
            </div>
        `;
    });
    
    taskContainer.innerHTML = html;
}
