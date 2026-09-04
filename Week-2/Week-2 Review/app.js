// State Management 
let tasks = JSON.parse(localStorage.getItem('app_tasks')) || [];
let activeFilter = 'all';

// DOM Selectors 
const taskListEl = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskCategorySelect = document.getElementById('task-category');
const titleErrorEl = document.getElementById('title-error');
const filterBtns = document.querySelectorAll('.filter-btn');

const modalEl = document.getElementById('task-modal');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const cancelBtn = document.getElementById('cancel-btn');

const fetchUsersBtn = document.getElementById('fetch-users-btn');
const userGridEl = document.getElementById('user-grid');
const apiStatusEl = document.getElementById('api-status');

// Helper & Utility Functions 
const saveToLocalStorage = () => {
  localStorage.setItem('app_tasks', JSON.stringify(tasks));
};

const resetForm = () => {
  taskForm.reset();
  titleErrorEl.textContent = '';
};

const toggleModal = (show = true) => {
  if (show) {
    modalEl.classList.remove('hidden');
    taskTitleInput.focus();
  } else {
    modalEl.classList.add('hidden');
    resetForm();
  }
};

// Task CRUD & Rendering
const renderTasks = () => {
  taskListEl.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'pending') return !task.completed;
    if (activeFilter === 'completed') return task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    taskListEl.innerHTML = `<li class="task-item" style="color: var(--text-muted)">No tasks found.</li>`;
    return;
  }

  filteredTasks.forEach(({ id, title, category, completed }) => {
    const li = document.createElement('li');
    li.className = `task-item ${completed ? 'completed' : ''}`;
    li.dataset.id = id;

    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox" class="task-toggle" ${completed ? 'checked' : ''}>
        <span class="task-title">${title}</span>
        <span class="badge">${category}</span>
      </div>
      <button class="btn btn-tertiary delete-btn" style="color: var(--danger)">Delete</button>
    `;

    taskListEl.appendChild(li);
  });
};

const addTask = (title, category) => {
  const newTask = {
    id: Date.now().toString(),
    title,
    category,
    completed: false
  };
  tasks.push(newTask);
  saveToLocalStorage();
  renderTasks();
};

const toggleTaskStatus = (id) => {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveToLocalStorage();
  renderTasks();
};

const deleteTask = (id) => {
  tasks = tasks.filter(task => task.id !== id);
  saveToLocalStorage();
  renderTasks();
};

// Event Handlers & Delegation 

// Task Actions via Event Delegation
taskListEl.addEventListener('click', (e) => {
  const taskItem = e.target.closest('.task-item');
  if (!taskItem) return;
  const taskId = taskItem.dataset.id;

  if (e.target.classList.contains('task-toggle')) {
    toggleTaskStatus(taskId);
  } else if (e.target.classList.contains('delete-btn')) {
    deleteTask(taskId);
  }
});

// Form Processing & Validation
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const titleValue = taskTitleInput.value.trim();

  if (!titleValue) {
    titleErrorEl.textContent = 'Task title is required.';
    return;
  }

  addTask(titleValue, taskCategorySelect.value);
  toggleModal(false);
});

// Filter Handlers
filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    filterBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    activeFilter = e.target.dataset.filter;
    renderTasks();
  });
});

// Modal Listeners
openModalBtn.addEventListener('click', () => toggleModal(true));
closeModalBtn.addEventListener('click', () => toggleModal(false));
cancelBtn.addEventListener('click', () => toggleModal(false));
modalEl.addEventListener('click', (e) => {
  if (e.target === modalEl) toggleModal(false);
});

// Asynchronous Operations
const fetchExternalUsers = async () => {
  apiStatusEl.textContent = 'Loading user data...';
  apiStatusEl.className = 'status-message';
  userGridEl.innerHTML = '';

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=4');
    
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const users = await response.json();
    apiStatusEl.textContent = '';

    userGridEl.innerHTML = users.map(({ name, email, company }) => `
      <div class="user-card">
        <h4>${name}</h4>
        <p>✉ ${email}</p>
        <p>🏢 ${company.name}</p>
      </div>
    `).join('');

  } catch (error) {
    console.error('Fetch error:', error);
    apiStatusEl.textContent = `Failed to load users: ${error.message}`;
    apiStatusEl.className = 'status-message error';
  }
};

fetchUsersBtn.addEventListener('click', fetchExternalUsers);

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
});