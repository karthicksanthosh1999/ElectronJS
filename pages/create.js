const { ipcRenderer } = require("electron");

const taskForm = document.querySelector("#taskForm");
const taskName = document.querySelector("#taskName");
const taskAge = document.querySelector("#taskAge");
const taskList = document.querySelector("#taskList");

let tasks = [];
let updataTask = false;
let idTaskToUpdate = "";

function deleteTask(id) {
  const responce = confirm("Are you sure you want to delete the task");
  console.log(id);
  if (responce) {
    ipcRenderer.send("delete-task", id);
    console.log(id);
  }
  return;
}

function editTask(id) {
  updataTask = true;
  idTaskToUpdate = id;
  const task = tasks.find((task) => task._id === id);
  console.log(task._id);
  taskName.value = task.name;
  taskAge.value = task.age;
}

function renderEmployee(employees) {
  taskList.innerHTML = "";
  employees.map((t, i) => {
    taskList.innerHTML += `
          <tr>
          <td class="create-data">
            ${i + 1}
          </td>
          <td>
            ${t.name}
          </td>
          <td>
           ${t.age}
          </td>
          <td>
          <button onclick="deleteTask('${t._id}')">
          🗑 Delete
        </button>
          </td>
          <td>
          <button onclick="editTask('${t._id}')">
            ✎ Edit
          </button>
          </td>
        </tr>
            `;
  });
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const employee = {
    name: taskName.value,
    age: taskAge.value,
  };

  if (!updataTask) {
    ipcRenderer.send("new-employee", employee);
  } else {
    ipcRenderer.send("updata-task", { ...employee, idTaskToUpdate });
  }

  taskForm.reset();
});

ipcRenderer.on("new-employee-added", (e, args) => {
  const newEmployee = JSON.parse(args);
  tasks.push(newEmployee);
  renderEmployee(tasks);
  alert("New employee created successfully");
  console.log(newEmployee);
});

ipcRenderer.send("get-employee");

ipcRenderer.on("get-employee", (e, args) => {
  const allEmployee = JSON.parse(args);
  tasks = allEmployee;
  renderEmployee(tasks);
});

ipcRenderer.on("delete-task-success", (e, args) => {
  const deletedTask = JSON.parse(args);
  console.log(args);
  const newTasks = tasks.filter((t) => {
    return t._id !== deletedTask._id;
  });
  tasks = newTasks;
  renderEmployee(tasks);
});

ipcRenderer.on("update-task-success", (e, args) => {
  const updateTask = JSON.parse(args);
  tasks = tasks.map((item) => {
    if (item._id === updateTask._id) {
      item.name = updateTask.name;
      item.age = updateTask.age;
    }
    return item;
  });
  renderEmployee(tasks);
});
