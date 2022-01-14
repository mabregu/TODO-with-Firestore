import { saveTask, getTasks, onTasks, deleteTask, getTask, updateTask } from './services/firebase.js';

const taskContainer = document.querySelector('#task-container');
const taskInput = document.querySelector('#task');
const taskDescription = document.querySelector('#task-description');
const btnSaveTask = document.querySelector('#btn-save-task');

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
        
        btnSaveTask.innerText = 'Create task';
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
        btnSaveTask.innerText = 'Update task';
    }
});

async function renderTasks() {
    let tasks = await getTasks();
    let html = '';
    
    tasks.forEach(doc => {
        let task = doc.data();
        
        html += `
            <div class="task px-3 py-3">
                <blockquote class="flex items-center justify-between w-full col-span-1 p-6 bg-white rounded-lg shadow">
                    <div class="flex flex-col pr-8">
                        <h2 class="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">
                            ${task.task}
                        </h2>
                        <div class="relative pl-12">
                            <p class="mt-2 text-sm text-gray-600 sm:text-base lg:text-sm xl:text-base">
                                ${task.description}
                            </p>
                        </div>
                        <p class="w-full mt-4 text-sm text-center text-gray-500">
                            ${task.createdAt.toDate()}
                        </p>
                    </div>
                    <button data-id="${doc.id}" class="delete-task bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-3 px-4 border border-green-500 hover:border-transparent rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                    <button data-id="${doc.id}" class="edit-task bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-3 px-4 border border-yellow-500 hover:border-transparent rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                </blockquote>
            </div>
        `;
    });
    
    taskContainer.innerHTML = html;
}
