const addBtn = document.getElementById("add");
addBtn.addEventListener("click", addTodo);

function addTodo() {
  const inputValue = document.getElementById("input").value;
  const todos = document.getElementById("lists");
  const task = document.createElement("p");
  const delBtn = document.createElement("button");

  if (inputValue === "") {
    return;
  }

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
  });
}

function deleteTodo() {
  const item = this.parentNode;
  const todos = document.getElementById("lists");
  todos.removeChild(item);
}
