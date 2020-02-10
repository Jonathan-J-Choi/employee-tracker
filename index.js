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

// Connection to MySQL
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start()
});

// ================================================================//
// function which prompts the user for what action they should take
// ================================================================//
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

// ==================================================================================//
// Function which prompts user for Adding Departments, Adding Roles, and Adding Roles
// ==================================================================================//
function addDRE() {
  inquirer
    .prompt({
      name: "addOptions",
      type: "list",
      message: "Would you like to [Add Department], [Add Role], or [Add Employee]?",
      choices: ["Add Department", "Add Role", "Add Employee", "BACK", "EXIT"]
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
        // Loop back for original options
      }else if(answer.addOptions === "BACK"){
        start();
      } else{
        // End Prompt
        connection.end();
      }
    });
}

// function to handle posting new departments
function addD() {
  // prompt for info about the department being added
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of the department you would like to add?"
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.name,
        },
        function(err) {
          if (err) throw err;
          console.log("Department has been added successfully.");
          // re-prompt the user for if they want add any other departments, roles, or employees
          addDRE();
        }
      );
    });
}

// function to handle posting new roles
function addR() {
  // prompt for info about the department being added
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the role you would like to add?"
      },
      {
        name: "salary",
        type: "number",
        message: "What is the salary of the role you would like to add?"
      },
      {
        name: "departmentID",
        type: "number",
        message: "What is the departmentID of the role you would like to add?"
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.departmentID,
        },
        function(err) {
          if (err) throw err;
          console.log("Role has been added successfully.");
          // re-prompt the user for if they want add any other departments, roles, or employees
          addDRE();
        }
      );
    });
}

// function to handle posting new employees
function addE() {
  // prompt for info about the employee being added
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the first name of the employee you would like to add?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the last name of the employee you would like to add?"
      },
      {
        name: "roleID",
        type: "number",
        message: "What is role ID number of the employee you would like to add?"
      },
      {
        name: "managerID",
        type: "number",
        message: "Is this employee a Manager? Enter 0 for [NO] or 1 for [YES]"
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleID,
          manager_id: answer.managerID,
        },
        function(err) {
          if (err) throw err;
          console.log("Department has been added successfully.");
          // re-prompt the user for if they want add any other departments, roles, or employees
          addDRE();
        }
      );
    });
}

// ============================================================================//
// Function for prompting user for displaying Departments, Roles, and Employees
// ============================================================================//
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

// =============================================//
// Function for prompting user for updating Role
// =============================================//
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