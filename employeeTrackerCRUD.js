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
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleID,
          manager_id: answer.managerID,
        },
        function(err) {
          if (err) throw err;
          console.log("Employee has been added successfully.");
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
      message: "Would you like to [View Departments], [View Roles], or [View Employees]?",
      choices: ["View Departments", "View Roles", "View Employees", "BACK", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, call the various view functions
      if (answer.viewOptions === "View Departments") {
        viewD();
      }
      else if(answer.viewOptions === "View Roles") {
        viewR();
      }
      else if(answer.viewOptions === "View Employees"){
        viewE();
        // Loop back for original options
      }else if(answer.viewOptions === "BACK"){
        start();
      } else{
        // End Prompt
        connection.end();
      }
    });
}

function viewD() {
  // query the database for all departments
  connection.query("SELECT * FROM department", function(err, results) {
    if (err) throw err;
    console.table(results);
    viewDRE();
  })
}
function viewR() {
  // query the database for all roles
  connection.query("SELECT * FROM role", function(err, results) {
    if (err) throw err;
    console.table(results);
    viewDRE();
  })
}
function viewE() {
  // query the database for all employees
  connection.query("SELECT * FROM employee", function(err, results) {
    if (err) throw err;
    console.table(results);
    viewDRE();
  })
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
      choices: ["Update Role","BACK", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, call the various view functions
      if (answer.updateOptions === "Update Role") {
        upR();
      }else if(answer.updateOptions === "BACK"){
        start();
      } else{
        // End Prompt
        connection.end();
      }
    });
}

function upR() {
  // query the database for all roles
  connection.query("SELECT * FROM role", function(err, results) {
    if (err) throw err;
    // once you have the roles, prompt the user for which they'd like to update
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].title);
            }
            return choiceArray;
          },
          message: "What role would you like to update?"
        },
        {
          name: "salary",
          type: "number",
          message: "What is the new salary for this role?"
        },
        {
          name: "departmentID",
          type: "number",
          message: "What is the new department ID for this role?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen role
        var chosenRole;
        for (var i = 0; i < results.length; i++) {
          if (results[i].title === answer.choice) {
            chosenRole = results[i];
          }
        }
          connection.query(
            "UPDATE role SET ? WHERE ?",
            [
              {
                salary: answer.salary
              },
              {
                department_id: answer.departmentID
              },
              {
                id: chosenRole.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Role successfully updated.");
              start();
            }
          );
      });
  });
}
