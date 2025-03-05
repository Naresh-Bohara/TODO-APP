const addBtn = document.querySelector(".add-btn");
const taskField = document.querySelector(".task-field");
const taskList = document.querySelector(".task-list ul");
const totalTasks = document.querySelector(".total span");
const completedTasks = document.querySelector(".completed span");
const remainingTasks = document.querySelector(".remaining span");

let tasks = [];

const updateTaskSummary = () => {
  const completed = tasks.filter((task) => task.completed).length;
  totalTasks.textContent = tasks.length;
  completedTasks.textContent = completed;
  remainingTasks.textContent = tasks.length - completed;
};

const displayTasks = () => {
  taskList.innerHTML = "";
  tasks.forEach((task, inx) => {
    const li = document.createElement("li");
    li.innerHTML = `
                <label>
                    <input type="checkbox" ${
                      task.completed ? "checked" : ""
                    } data-inx="${inx}">
                    <span>${task.text}</span>
                </label>
                <div class="task-buttons">
                    <button class="edit-btn" data-inx="${inx}">Edit</button>
                    <button class="del-btn" data-inx="${inx}">Delete</button>
                </div>
            `;
    taskList.appendChild(li);
  });
  updateTaskSummary();
};

const addTask = (taskText) => {
  if (!taskText.trim()) return;
  tasks.push({ text: taskText, completed: false });
  taskField.value = "";
  displayTasks();
};

const editTask = (inx, newText) => {
  tasks[inx].text = newText;
  displayTasks();
};

const deleteTask = (inx) => {
  tasks.splice(inx, 1);
  displayTasks();
};

const toggleTaskCompletion = (inx) => {
  tasks[inx].completed = !tasks[inx].completed;
  displayTasks();
};

taskList.addEventListener("click", (e) => {
  const inx = e.target.dataset.inx;
  if (e.target.classList.contains("del-btn")) {
    deleteTask(inx);
  } else if (e.target.classList.contains("edit-btn")) {
    const newText = prompt("Edit task:", tasks[inx].text);
    if (newText !== null && newText.trim()) {
      editTask(inx, newText);
    }
  } else if (e.target.type === "checkbox") {
    toggleTaskCompletion(inx);
  }
});

addBtn.addEventListener("click", () => addTask(taskField.value));
taskField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask(taskField.value);
  }
});
displayTasks();
