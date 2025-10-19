document.addEventListener("DOMContentLoaded", () => {
const sortDateBtn = document.getElementById("sort-date-btn");
sortDateBtn.addEventListener("click", () => {
  const tasks = Array.from(document.querySelectorAll("#tasks li"));
  tasks.sort((a, b)=>{
    const dateA = new Date(a.dataset.dueDate);
    const dateB = new Date(b.dataset.dueDate);
    return dateA - dateB;
  });
  const taskList = document.getElementById("tasks");
  taskList.innerHTML = "";
  tasks.forEach((task)=> taskList.appendChild(task));
});
const userInput = document.getElementById("task-user");

  const sortBtn= document.getElementById("sort-btn");
  sortBtn.addEventListener("click",()=>{
    const tasks= Array.from(document.querySelectorAll("#tasks li"));
    tasks.sort((a, b) =>{
      const priorityOrder= {high: 1, medium: 2, low: 3 };
      const getPriorityValue= (li) => {
        const color = li.style.color;
        if (color === "red") return priorityOrder.high;
        if (color === "orange") return priorityOrder.medium;
        if (color === "green") return priorityOrder.low;
        return 4;
      }
      return getPriorityValue(a) - getPriorityValue(b);
    });
    const tasklist= document.getElementById("tasks")
    taskList.innerHTML= "";
    tasks.forEach((task)=> taskList.appendChild(task));
    });
  const form = document.getElementById("create-task-form");
  const input = document.getElementById("new-task-description");
  const prioritySelect = document.getElementById("priority-level")
  const dateInput = document.getElementById("due-date")
  const taskList = document.getElementById("tasks");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    //const userInput = document.getElementById("assigned-user").value;
    const user = userInput.value;
    const task = input.value;
    const priority = prioritySelect.value;
    const dueDate = dateInput.value;
    const li = document.createElement("li");
    li.textContent = `${task} (Due: ${dueDate})- Assigned to: ${user}`;
    li.setAttribute("data-due-date", dueDate);
       //li.textContent= task;
    if (priority === "high") {
      li.style.color = "red";
    }else if (priority === "medium") {
      li.style.color = "orange";
    }else if (priority === "low") {
      li.style.color = "green";
    }
        taskList.appendChild(li);
    input.value="";
    userInput.value = "";
    const checkbox = document.createElement("input");
    checkbox.type= "checkbox";
    checkbox.style.marginRight = "10px"
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        li.style.textDecoration= "line-through";
      }else {
        li.style.textDecoration = "none";
      }
    });
    li.prepend(checkbox);
    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "x";
    deleteBtn.style.marginLeft="10px";
    deleteBtn.style.backgroundColor="crimson";
    deleteBtn.style.color= "white";
    deleteBtn.style.border="lightblue";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.addEventListener("click",()=> {
      li.remove();
    });
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    input.value="";
    prioritySelect.value = "low";
    dateInput.value="";
    const editBtn= document.createElement("button");
    editBtn.textContent= "Edit";
    editBtn.style.marginLeft= "10px";
    editBtn.style.backgroundColor= "navy";
    editBtn.style.color="white";
    editBtn.style.border="yellow";
    editBtn.style.cursor= "pointer";
    editBtn.addEventListener("click", () => {
      const newTask = prompt("Edit task:", task);
       const newDate = prompt("Edit due date:", dueDate);
      const newUser = prompt("Edit assigned user:", user);
      if (newTask !== null && newDate !== null && newUser !== null) {
        //li.firstChild.nodeValue = `${newTask} (Due ${newDate})- Assigned to: ${newUser}`;
       li.childNodes[1].nodeValue = `${newTask} (Due: ${newDate})- Assigned to: ${newUser}`;
    li.setAttribute("data-due-date", newDate);
      }
    })
    

    li.appendChild(editBtn)

 });
});


