var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.PASSWORD,
  database: "employee_trackerDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start()
});

// function afterConnection() {
//   connection.query("SELECT * FROM department", function(err, res) {
//     if (err) throw err;
//     console.log(res);
//     connection.end();
//   });
// }

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "startOptions",
      type: "list",
      message: "Would you like to [Add Department/Roles/Employees], [View Departments/Roles/Employees], or [Update employee roles]?",
      choices: ["Add Department/Roles/Employees", "View Departments/Roles/Employees", "Update employee roles", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either various functions to add, view, or update
      if (answer.startOptions === "Add Department/Roles/Employees") {
        addDRE();
      }
      else if(answer.startOptions === "View Departments/Roles/Employees") {
        viewDRE();
      }
      else if(answer.startOptions === "Update employee roles"){
        updateR();
      } else{
        connection.end();
      }
    });
}

// Function which prompts user for Adding Departments, Adding Roles, and Adding Roles
function addDRE() {
  inquirer
    .prompt({
      name: "addOptions",
      type: "list",
      message: "Would you like to [Add Department], [Add Role], or [Add Employee]?",
      choices: ["Add Department", "Add Role", "Add Employee", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, call the bid or the post functions
      if (answer.addOptions === "Add Department") {
        addD();
      }
      else if(answer.addOptions === "Add Role") {
        addR();
      }
      else if(answer.addOptions === "Add Employee"){
        addE();
      } else{
        connection.end();
      }
    });
}

// Function for prompting user for displaying Departments, Roles, and Employees
function viewDRE() {
  inquirer
    .prompt({
      name: "viewOptions",
      type: "list",
      message: "Would you like to [View Department], [View Role], or [View Employee]?",
      choices: ["View Department", "View Role", "View Employee", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, call the various view functions
      if (answer.viewOptions === "View Department") {
        viewD();
      }
      else if(answer.viewOptions === "View Role") {
        viewR();
      }
      else if(answer.viewOptions === "View Employee"){
        viewE();
      } else{
        connection.end();
      }
    });
}

// Function for prompting user for updating Role
function updateR() {
  inquirer
    .prompt({
      name: "updateOptions",
      type: "list",
      message: "Would you like to [Update Role]?",
      choices: ["Update Role", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, call the various view functions
      if (answer.updateOptions === "Update Role") {
        upR();
      }else{
        connection.end();
      }
    });
}