const { app, BrowserWindow, ipcMain } = require("electron");
const path = require('path')
const Employee = require("./models/userModel");
require("./database/database");

let win;
const createWindow = () => {
  win = new BrowserWindow({
    height: 1000,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});


// CREATE EMPLOYEE

ipcMain.on("new-employee", async (e, args) => {
  const newEmp = new Employee(args);
  const employeeSaved = await newEmp.save();
  e.reply("new-employee-added", JSON.stringify(employeeSaved));
});

// GET EMPLOYEE

ipcMain.on("get-employee", async (e, args) => {
  const employees_list = await Employee.find();
  e.reply("get-employee", JSON.stringify(employees_list));
});

// DELETE EMPLOYEE

ipcMain.on("delete-task", async (e, args) => {
  const deleteTask = await Employee.findByIdAndDelete(args);
  e.reply("delete-task-success", JSON.stringify(deleteTask));
});

// UPDATE TASK

ipcMain.on("updata-task", async (e, args) => {
  const updateTask = await Employee.findByIdAndUpdate(args.idTaskToUpdate, {
    new: true,
  });
  e.reply("update-task-success", JSON.stringify(updateTask));
});
