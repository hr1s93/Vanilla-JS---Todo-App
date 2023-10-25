function addTodo() {
  const inputValue = document.getElementById("input").value;

  if (inputValue === "") {
    return;
  }

  const todos = document.getElementById("lists");
  const task = document.createElement("p");
  const delBtn = document.createElement("button");

  delBtn.innerHTML = "X";
  delBtn.id = "deleteButton";
  task.innerHTML = inputValue;
  task.classList = "incomplete";

  todos.appendChild(task);
  task.appendChild(delBtn);
  task.style.listStyle = "none";

  delBtn.addEventListener("click", deleteTodo);

  task.addEventListener("click", () => {
    if (task.classList.contains("incomplete")) {
      task.classList.remove("incomplete");
      task.classList.add("completed");
    } else {
      task.classList.remove("completed");
      task.classList.add("incomplete");
    }
    saveTasks();
  });

  saveTasks();
}

function deleteTodo() {
  const item = this.parentNode;
  const todos = document.getElementById("lists");
  todos.removeChild(item);
  saveTasks();
}

function saveTasks() {
  const tasks = document.querySelectorAll("#lists p");
  const taskList = [];
  tasks.forEach((task) => {
    taskList.push({
      text: task.textContent,
      completed: task.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    savedTasks.forEach((task) => {
      const todos = document.getElementById("lists");
      const newTask = document.createElement("p");
      const delBtn = document.createElement("button");

      delBtn.innerHTML = "X";
      delBtn.id = "deleteButton";
      newTask.innerHTML = task.text;
      newTask.classList = task.completed ? "completed" : "incomplete";

      todos.appendChild(newTask);
      newTask.appendChild(delBtn);
      newTask.style.listStyle = "none";

      delBtn.addEventListener("click", deleteTodo);

      newTask.addEventListener("click", () => {
        if (newTask.classList.contains("incomplete")) {
          newTask.classList.remove("incomplete");
          newTask.classList.add("completed");
        } else {
          newTask.classList.remove("completed");
          newTask.classList.add("incomplete");
        }
        saveTasks();
      });
    });
  }
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

const addBtn = document.getElementById("add");
addBtn.addEventListener("click", addTodo);

loadTasks();
