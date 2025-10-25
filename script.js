// Task statistics functionality with proper DOM manipulation
function createTaskStats() {
  // Create container
  const statsContainer = document.createElement('div');
  statsContainer.id = 'task-stats';
  statsContainer.className = 'stats-container';
  
  // Create stat items using proper DOM methods
  const statData = [
    { id: 'total-tasks', label: 'Total Tasks' },
    { id: 'completed-tasks', label: 'Completed' },
    { id: 'pending-tasks', label: 'Pending' }
  ];
  
  statData.forEach(stat => {
    const statItem = document.createElement('div');
    statItem.className = 'stat-item';
    
    const statNumber = document.createElement('span');
    statNumber.className = 'stat-number';
    statNumber.id = stat.id;
    statNumber.textContent = '0';
    
    const statLabel = document.createElement('span');
    statLabel.className = 'stat-label';
    statLabel.textContent = stat.label;
    
    statItem.appendChild(statNumber);
    statItem.appendChild(statLabel);
    statsContainer.appendChild(statItem);
  });
  
  // FIXED: Insert after the VIP header, not the h1
  const mainContent = document.getElementById('main-content');
  const vipHeader = mainContent.querySelector('.vip-header');
  vipHeader.insertAdjacentElement('afterend', statsContainer);
}

function updateTaskStats() {
  const tasks = document.querySelectorAll('#tasks li');
  const completedTasks = document.querySelectorAll('#tasks input[type="checkbox"]:checked');
  
  // Safely update stats if elements exist
  const totalEl = document.getElementById('total-tasks');
  const completedEl = document.getElementById('completed-tasks');
  const pendingEl = document.getElementById('pending-tasks');
  
  if (totalEl && completedEl && pendingEl) {
    totalEl.textContent = tasks.length;
    completedEl.textContent = completedTasks.length;
    pendingEl.textContent = tasks.length - completedTasks.length;
  }
}

// ==================== FLOATING ACTION BUTTON ====================
function createFloatingActionButton() {
  const fab = document.createElement('button');
  fab.id = 'fab-add-task';
  fab.className = 'fab';
  fab.innerHTML = '+';
  fab.setAttribute('aria-label', 'Add new task');
  
  // Create the form container (initially hidden)
  const formContainer = document.createElement('div');
  formContainer.id = 'fab-form-container';
  formContainer.className = 'fab-form-container hidden';
  
  // Move the existing form into a temporary variable
  const existingForm = document.getElementById('create-task-form');
  if (existingForm) {
    // Create form header
    const formHeader = document.createElement('div');
    formHeader.className = 'fab-form-header';
    formHeader.innerHTML = `
      <h3 class="fab-form-title">Add New Task</h3>
      <p class="fab-form-subtitle">Fill in the details below</p>
    `;
    
    // Enhanced close button
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'fab-form-close';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Close form');
    closeBtn.addEventListener('click', () => {
      formContainer.classList.add('hidden');
      fab.classList.remove('hidden');
    });
    
    // Create form body
    const formBody = document.createElement('div');
    formBody.className = 'fab-form-body';
    
    // Move the existing form into the body
    formBody.appendChild(existingForm);
    
    // Add close button to header
    formHeader.appendChild(closeBtn);
    
    // Assemble the form container
    formContainer.appendChild(formHeader);
    formContainer.appendChild(formBody);
    
    // Add proper labels to form inputs based on your HTML structure
    addFormLabels(existingForm);
  }
  
  // FAB click handler
  fab.addEventListener('click', () => {
    formContainer.classList.remove('hidden');
    fab.classList.add('hidden');
    // Auto-focus on the input field for better UX
    const input = document.getElementById('new-task-description');
    if (input) input.focus();
  });
  
  // Add to main content
  const mainContent = document.getElementById('main-content');
  mainContent.appendChild(fab);
  mainContent.appendChild(formContainer);
}

// Helper function to add labels to form inputs
function addFormLabels(form) {
  // Get all form rows
  const formRows = form.querySelectorAll('.form-row');
  
  // First row: Task User and Task Description
  const firstRow = formRows[0];
  const userInput = firstRow.querySelector('#task-user');
  const descInput = firstRow.querySelector('#new-task-description');
  
  if (firstRow && userInput && descInput) {
    // Clear the row and rebuild with labels
    firstRow.innerHTML = '';
    
    // User input group
    const userGroup = document.createElement('div');
    userGroup.className = 'form-input-group';
    userGroup.innerHTML = `
      <label for="task-user" class="form-label">Assigned To</label>
      <input type="text" id="task-user" placeholder="e.g. Mohamed">
    `;
    
    // Description input group
    const descGroup = document.createElement('div');
    descGroup.className = 'form-input-group';
    descGroup.innerHTML = `
      <label for="new-task-description" class="form-label required">Task Description</label>
      <input type="text" id="new-task-description" placeholder="What needs to be done?" required>
    `;
    
    firstRow.appendChild(userGroup);
    firstRow.appendChild(descGroup);
  }
  
  // Second row: Priority and Due Date
  const secondRow = formRows[1];
  const prioritySelect = secondRow.querySelector('#priority-level');
  const dateInput = secondRow.querySelector('#due-date');
  
  if (secondRow && prioritySelect && dateInput) {
    // Clear the row and rebuild with labels
    secondRow.innerHTML = '';
    
    // Priority select group
    const priorityGroup = document.createElement('div');
    priorityGroup.className = 'form-input-group';
    priorityGroup.innerHTML = `
      <label for="priority-level" class="form-label">Priority Level</label>
      <select id="priority-level">
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
    `;
    
    // Date input group
    const dateGroup = document.createElement('div');
    dateGroup.className = 'form-input-group';
    dateGroup.innerHTML = `
      <label for="due-date" class="form-label required">Due Date</label>
      <input type="date" id="due-date" required>
    `;
    
    secondRow.appendChild(priorityGroup);
    secondRow.appendChild(dateGroup);
  }
  
  // Update submit button text
  const submitBtn = form.querySelector('#add-task-btn');
  if (submitBtn) {
    submitBtn.textContent = 'Create Task';
  }
}

// ==================== PREMIUM SIDEBAR FUNCTIONS ====================
// Create premium sidebar with features
function createPremiumSidebar() {
  const sidebar = document.createElement('div');
  sidebar.className = 'sidebar';
  
  // Statistics Section - MOVED INTO SIDEBAR
  const statsSection = document.createElement('div');
  statsSection.id = 'task-stats'; // Keep the same ID
  statsSection.className = 'stats-sidebar'; // Updated class
  
  // Create stat items using your existing structure
  const statData = [
    { id: 'total-tasks', label: 'Total Tasks' },
    { id: 'completed-tasks', label: 'Completed' },
    { id: 'pending-tasks', label: 'Pending' }
  ];
  
  statData.forEach(stat => {
    const statItem = document.createElement('div');
    statItem.className = 'stat-item';
    
    const statNumber = document.createElement('span');
    statNumber.className = 'stat-number';
    statNumber.id = stat.id;
    statNumber.textContent = '0';
    
    const statLabel = document.createElement('span');
    statLabel.className = 'stat-label';
    statLabel.textContent = stat.label;
    
    statItem.appendChild(statNumber);
    statItem.appendChild(statLabel);
    statsSection.appendChild(statItem);
  });
  
  // Quick Actions Section
  const quickActions = document.createElement('div');
  quickActions.className = 'quick-actions-sidebar';
  quickActions.innerHTML = `
    <h3>Quick Actions</h3>
    <button id="clear-completed" class="sidebar-btn">🗑️ Clear Completed</button>
    <button id="mark-all-done" class="sidebar-btn">✅ Mark All Done</button>
    <button id="export-tasks" class="sidebar-btn">📊 Export to Excel</button>
  `;
  
  // Due Soon Section
  const dueSoon = document.createElement('div');
  dueSoon.className = 'due-soon-sidebar';
  dueSoon.innerHTML = `
    <h3>🕒 Due Soon</h3>
    <div id="due-list" class="due-list"></div>
  `;
  
  // Productivity Tip Section
  const tipSection = document.createElement('div');
  tipSection.className = 'tip-sidebar';
  tipSection.innerHTML = `
    <div class="tip-icon">💡</div>
    <p id="tip-text">Break large tasks into smaller steps!</p>
  `;
  
  // Assemble sidebar - STATS NOW INSIDE SIDEBAR
  sidebar.appendChild(statsSection);
  sidebar.appendChild(quickActions);
  sidebar.appendChild(dueSoon);
  sidebar.appendChild(tipSection);
  
  // Create main content wrapper
  const mainArea = document.createElement('div');
  mainArea.className = 'main-area';
  
  // Move existing content to main area BUT EXCLUDE THE FORM
  const mainContent = document.getElementById('main-content');
  const elementsToMove = Array.from(mainContent.children).filter(child => 
    !child.classList.contains('vip-header') && 
    child.id !== 'task-stats' &&
    child.id !== 'create-task-form' // EXCLUDE THE FORM
  );
  
  elementsToMove.forEach(element => {
    mainArea.appendChild(element);
  });
  
  // Create layout container
  const appLayout = document.createElement('div');
  appLayout.className = 'app-layout';
  appLayout.appendChild(sidebar);
  appLayout.appendChild(mainArea);
  
  // Insert after VIP header
  const vipHeader = document.querySelector('.vip-header');
  vipHeader.insertAdjacentElement('afterend', appLayout);
  
  // Add event listeners for new buttons
  addSidebarEventListeners();
}

// Add sidebar functionality
function addSidebarEventListeners() {
  document.getElementById('clear-completed')?.addEventListener('click', clearCompletedTasks);
  document.getElementById('mark-all-done')?.addEventListener('click', markAllDone);
  document.getElementById('export-tasks')?.addEventListener('click', exportTasks);
}

// Sidebar functions
// Sidebar functions
function clearCompletedTasks() {
  const completedTasks = document.querySelectorAll('#tasks input[type="checkbox"]:checked');
  completedTasks.forEach(checkbox => {
    const taskId = checkbox.closest('li').dataset.taskId;
    fetch(`https://taskzilla-vz2d.onrender.com/tasks/${taskId}`, { method: 'DELETE' })
      .then(() => {
        checkbox.closest('li').remove();
        updateTaskStats(); // Update the stats in sidebar
        updateDueSoon(); // Update due soon section
      })
      .catch(error => {
        console.error('Error deleting task:', error);
        // Fallback: remove from UI anyway
        checkbox.closest('li').remove();
        updateTaskStats();
        updateDueSoon();
      });
  });
}

function markAllDone() {
  const checkboxes = document.querySelectorAll('#tasks input[type="checkbox"]:not(:checked)');
  const updatePromises = [];
  
  checkboxes.forEach(checkbox => {
    const taskId = checkbox.closest('li').dataset.taskId;
    checkbox.checked = true;
    
    // Update in backend
    const updatePromise = fetch(`https://taskzilla-vz2d.onrender.com/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true })
    })
    .then(() => {
      // Update UI
      const taskContent = checkbox.closest('li').querySelector('.task-content');
      if (taskContent) {
        taskContent.style.textDecoration = "line-through";
      }
    })
    .catch(error => {
      console.error('Error updating task:', error);
      // Still update UI even if backend fails
      const taskContent = checkbox.closest('li').querySelector('.task-content');
      if (taskContent) {
        taskContent.style.textDecoration = "line-through";
      }
    });
    
    updatePromises.push(updatePromise);
  });
  
  // Wait for all updates to complete
  Promise.all(updatePromises).then(() => {
    updateTaskStats(); // Update the stats in sidebar
    updateDueSoon(); // Update due soon section
  });
}

function exportTasks() {
  const tasks = Array.from(document.querySelectorAll('#tasks li')).map(li => {
    const description = li.querySelector('.task-content').textContent.split(' (Due:')[0];
    const completed = li.querySelector('input[type="checkbox"]').checked ? 'Yes' : 'No';
    const dueDate = li.dataset.dueDate || 'No date';
    const priority = li.style.color === 'red' ? 'High' : 
                    li.style.color === 'orange' ? 'Medium' : 
                    li.style.color === 'green' ? 'Low' : 'Unknown';
    
    return {
      Description: description,
      Completed: completed,
      'Due Date': dueDate,
      Priority: priority
    };
  });

  // Create CSV content (Excel can open CSV files)
  const headers = ['Description', 'Completed', 'Due Date', 'Priority'];
  const csvContent = [
    headers.join(','), // Header row
    ...tasks.map(task => [
      `"${task.Description.replace(/"/g, '""')}"`, // Escape quotes in description
      task.Completed,
      `"${task['Due Date']}"`,
      task.Priority
    ].join(','))
  ].join('\n');

  // Create and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `taskzilla-export-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Update due soon list
function updateDueSoon() {
  const dueList = document.getElementById('due-list');
  if (!dueList) return;
  
  const tasks = Array.from(document.querySelectorAll('#tasks li'));
  const today = new Date();
  const dueSoon = tasks.filter(li => {
    const dueDate = new Date(li.dataset.dueDate);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  }).slice(0, 3); // Show only 3 most urgent
  
  dueList.innerHTML = dueSoon.map(li => {
    const text = li.querySelector('.task-content').textContent;
    const dueDate = li.dataset.dueDate;
    return `<div class="due-item">${text.split(' (Due:')[0]}<br><small>Due: ${dueDate}</small></div>`;
  }).join('') || '<div class="due-item">No urgent tasks! 🎉</div>';
}

// Update productivity tip
function updateProductivityTip() {
  const tips = [
    "Eat the frog! Do your most important task first.",
    "Break large tasks into smaller, manageable steps.",
    "Use the Pomodoro technique: 25min work, 5min break.",
    "Review your tasks at the end of each day.",
    "Focus on one task at a time for better productivity.",
    "Delegate tasks when possible to free up your time.",
    "Set clear deadlines to stay motivated and focused."
  ];
  
  const tipText = document.getElementById('tip-text');
  if (tipText) {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    tipText.textContent = randomTip;
  }
}

// ==================== UPDATED DOMCONTENTLOADED ====================
document.addEventListener("DOMContentLoaded", () => {
  // Create premium sidebar with integrated statistics
  createPremiumSidebar();
  
  // Create floating action button
  createFloatingActionButton();
  
  const taskList = document.getElementById("tasks");
  const form = document.getElementById("create-task-form");
  const input = document.getElementById("new-task-description");
  const prioritySelect = document.getElementById("priority-level");
  const dateInput = document.getElementById("due-date");
  const userInput = document.getElementById("task-user");
  const sortDateBtn = document.getElementById("sort-date-btn");
  const sortBtn = document.getElementById("sort-btn");

  const BASE_URL = "https://taskzilla-vz2d.onrender.com/tasks";

  // Load tasks from backend
  fetch(BASE_URL)
    .then(res => res.json())
    .then(tasks => {
      tasks.forEach(task => renderTask(task));
      updateTaskStats();
      updateDueSoon(); // Initialize due soon section
      updateProductivityTip(); // Initialize tips
    });

  // Render a task
  function renderTask(task) {
    const li = document.createElement("li");
    li.className = "task-item";
    li.setAttribute("data-due-date", task.dueDate);
    li.style.position = "relative";

    // Apply priority color
    if (task.priority === "high") li.style.color = "red";
    else if (task.priority === "medium") li.style.color = "orange";
    else if (task.priority === "low") li.style.color = "green";

    // Task content container
    const taskContent = document.createElement("div");
    taskContent.className = "task-content";
    taskContent.textContent = `${task.description} (Due: ${task.dueDate}) - Assigned to: ${task.assignedUser}`;

    const badge = document.createElement("span");
    badge.classList.add("priority-badge", `priority-${task.priority}`);
    badge.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
    taskContent.appendChild(badge);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.style.marginRight = "10px";
    checkbox.addEventListener("change", () => {
      taskContent.style.textDecoration = checkbox.checked ? "line-through" : "none";
      fetch(`${BASE_URL}/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: checkbox.checked })
      }).then(() => {
        updateTaskStats();
        updateDueSoon(); // Update due soon when tasks change
      });
    });

    // Action menu button
    const actionMenuBtn = document.createElement("button");
    actionMenuBtn.textContent = "⋮";
    actionMenuBtn.className = "action-menu";

    // Dropdown menu
    const menu = document.createElement("div");
    menu.className = "action-dropdown";
    menu.style.display = "none";

    const editOption = document.createElement("button");
    editOption.textContent = "✏️ Edit Task";
    editOption.addEventListener("click", () => {
      const newTask = prompt("Edit task:", task.description);
      const newDate = prompt("Edit due date:", task.dueDate);
      const newUser = prompt("Edit assigned user:", task.assignedUser);
      if (newTask && newDate && newUser) {
        fetch(`${BASE_URL}/${task.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: newTask,
            dueDate: newDate,
            assignedUser: newUser
          })
        }).then(() => {
          taskContent.textContent = `${newTask} (Due: ${newDate}) - Assigned to: ${newUser}`;
          taskContent.appendChild(badge);
          li.setAttribute("data-due-date", newDate);
          updateDueSoon(); // Update due soon when tasks change
        });
      }
      menu.style.display = "none";
    });

    const deleteOption = document.createElement("button");
    deleteOption.textContent = "❌ Delete Task";
    deleteOption.addEventListener("click", () => {
      fetch(`${BASE_URL}/${task.id}`, {
        method: "DELETE"
      }).then(() => {
        li.remove();
        updateTaskStats();
        updateDueSoon(); // Update due soon when tasks change
      });
      menu.style.display = "none";
    });

    menu.appendChild(editOption);
    menu.appendChild(deleteOption);

    actionMenuBtn.addEventListener("click", () => {
      menu.style.display = menu.style.display === "none" ? "block" : "none";
    });

    const rightSide = document.createElement("div");
    rightSide.className = "task-controls";
    rightSide.appendChild(actionMenuBtn);
    rightSide.appendChild(menu);

    li.appendChild(checkbox);
    li.appendChild(taskContent);
    li.appendChild(rightSide);

    taskList.appendChild(li);
    
    // Apply strikethrough if task is completed
    if (task.completed) {
      taskContent.style.textDecoration = "line-through";
    }
    
    updateTaskStats();
  }

  // Submit new task
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const newTask = {
      description: input.value,
      dueDate: dateInput.value,
      priority: prioritySelect.value,
      assignedUser: userInput.value,
      completed: false
    };

    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask)
    })
      .then(res => res.json())
      .then(task => {
        renderTask(task);
        updateTaskStats();
        updateDueSoon(); // Update due soon when tasks change
        
        // Close the form after successful submission
        const formContainer = document.getElementById('fab-form-container');
        const fab = document.getElementById('fab-add-task');
        if (formContainer && fab) {
          formContainer.classList.add('hidden');
          fab.classList.remove('hidden');
        }
      });

    input.value = "";
    userInput.value = "";
    prioritySelect.value = "low";
    dateInput.value = "";
  });

  // Sort by due date
  sortDateBtn.addEventListener("click", () => {
    const tasks = Array.from(document.querySelectorAll("#tasks li"));
    tasks.sort((a, b) => {
      const dateA = new Date(a.dataset.dueDate);
      const dateB = new Date(b.dataset.dueDate);
      return dateA - dateB;
    });
    taskList.innerHTML = "";
    tasks.forEach(task => taskList.appendChild(task));
  });

  // Sort by priority
  sortBtn.addEventListener("click", () => {
    const tasks = Array.from(document.querySelectorAll("#tasks li"));
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    const getPriorityValue = (li) => {
      const color = li.style.color;
      if (color === "red") return priorityOrder.high;
      if (color === "orange") return priorityOrder.medium;
      if (color === "green") return priorityOrder.low;
      return 4;
    };
    tasks.sort((a, b) => getPriorityValue(a) - getPriorityValue(b));
    taskList.innerHTML = "";
    tasks.forEach(task => taskList.appendChild(task));
  });

  // Update sidebar features periodically
  setInterval(() => {
    updateDueSoon();
    updateProductivityTip();
  }, 30000);
});

// Auto-close dropdown when clicking outside
document.addEventListener("click", (event) => {
  const allMenus = document.querySelectorAll(".action-dropdown");
  allMenus.forEach(menu => {
    const toggleButton = menu.previousElementSibling;
    if (!menu.contains(event.target) && !toggleButton.contains(event.target)) {
      menu.style.display = "none";
    }
  });
});

// ---- Dynamic Quote Section ----
window.addEventListener('load', function() {
  console.log('Window fully loaded, initializing quotes...');
  
  const quoteText = document.getElementById("quote-text");
  const quoteAuthor = document.getElementById("quote-author");

  if (!quoteText || !quoteAuthor) {
    console.error('Critical: Quote elements not found even after window.load');
    return;
  }

  const RENDER_BACKEND_URL = "https://taskzilla-vz2d.onrender.com";

  async function fetchQuote() {
    try {
      console.log('Fetching quote from backend...');
      const response = await fetch(`${RENDER_BACKEND_URL}/api/quote`);
      
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      
      const data = await response.json();
      displayQuote(data.content, data.author);
      
    } catch (error) {
      console.error('Failed to fetch quote:', error);
      displayQuote("Persistence conquers all challenges", "TaskZilla Wisdom");
    }
  }

  function displayQuote(text, author) {
    quoteText.textContent = `"${text}"`;
    quoteAuthor.textContent = `— ${author}`;
  }

  fetchQuote();
  setInterval(fetchQuote, 60000);
});