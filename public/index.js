import { saveTask, getTasks, onTasks } from '../firebase.js';

const taskContainer = document.querySelector('#task-container');

window.addEventListener('DOMContentLoaded', async () => {
    onTasks(async (snapshot) => {
        const tasks = await snapshot.docs.map(doc => doc.data());
        renderTasks(tasks);
    });
    
    renderTasks();
});

const taskForm = document.querySelector('#task-form');

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskInput = document.querySelector('#task');
    const taskDescription = document.querySelector('#task-description');
    
    saveTask(taskInput.value, taskDescription.value);
    
    taskForm.reset();
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
            </div>
        `;
    });
    
    taskContainer.innerHTML = html;
}