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

  saveTodo(inputValue);

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
  });
}

function saveTodo(todoText) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.push(todoText);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo() {
  const item = this.parentNode;
  const todos = document.getElementById("lists");
  todos.removeChild(item);

  const todoText = item.textContent;
  removeTodo(todoText);
}

function removeTodo(todoText) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos = todos.filter((todo) => todo !== todoText);

  localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTodos = JSON.parse(localStorage.getItem("todos"));

  if (savedTodos) {
    const todos = document.getElementById("lists");

    for (const todoText of savedTodos) {
      const task = document.createElement("p");
      const delBtn = document.createElement("button");

      delBtn.innerHTML = "X";
      delBtn.id = "deleteButton";
      task.innerHTML = todoText;
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
      });
    }
  }
});

window.addEventListener("keydown", (e) => {
  e.key === "Enter" ? addTodo() : "";
});

const addBtn = document.getElementById("add");
addBtn.addEventListener("click", addTodo);
