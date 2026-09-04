// --- Selecting DOM Elements ---
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const errorMessage = document.getElementById('error-message');
const taskList = document.getElementById('task-list');
const fetchAdviceBtn = document.getElementById('fetch-advice-btn');
const adviceText = document.getElementById('advice-text');

// State Array
let tasks = [];

// --- Local Storage Integration ---
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks); // Parse JSON string back to array
    renderTasks();
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Convert array to JSON string
}

// --- DOM Rendering & Modification ---
function renderTasks() {
  taskList.innerHTML = ''; // Clear existing DOM nodes

  tasks.forEach((task, index) => {
    // Creating elements
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = task.text;
    
    // Toggle completion on click
    span.addEventListener('click', () => toggleTask(index));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    
    // Event listener for delete
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Stop event bubbling
      deleteTask(index);
    });

    // Appending elements
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// --- Form Handling & Validation ---
taskForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default page refresh
  
  const text = taskInput.value.trim();

  // Simple Form Validation
  if (text === '') {
    showError('Task cannot be empty!');
    return;
  }

  clearError();
  addTask(text);
  taskInput.value = '';
});

function showError(msg) {
  errorMessage.textContent = msg;
  taskInput.classList.add('invalid');
}

function clearError() {
  errorMessage.textContent = '';
  taskInput.classList.remove('invalid');
}

// Input event listener to clear validation as user types
taskInput.addEventListener('input', clearError);

// --- Task Array Operations ---
function addTask(text) {
  tasks.push({ text: text, completed: false });
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// --- Async/Await, Promises & Fetch API ---
async function fetchAdvice() {
  adviceText.textContent = 'Loading advice...';
  
  try {
    // Fetch request to public REST API
    const response = await fetch('https://api.adviceslip.com/advice');

    // Error handling for HTTP status codes
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    adviceText.textContent = `"${data.slip.advice}"`;
  } catch (error) {
    // Handling network or parsing errors
    console.error('Fetch Error:', error);
    adviceText.textContent = 'Failed to load advice. Please try again.';
  }
}

// Event listener for API request
fetchAdviceBtn.addEventListener('click', fetchAdvice);

// Initial Load
document.addEventListener('DOMContentLoaded', loadTasks);