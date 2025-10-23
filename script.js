document.addEventListener("DOMContentLoaded", () => {
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
      });
    }
    menu.style.display = "none";
  });

  const deleteOption = document.createElement("button");
  deleteOption.textContent = "❌ Delete Task";
  deleteOption.addEventListener("click", () => {
    fetch(`${BASE_URL}/${task.id}`, {
      method: "DELETE"
    }).then(() => li.remove());
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
      .then(task => renderTask(task));

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
});

//  Auto-close dropdown when clicking outside
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