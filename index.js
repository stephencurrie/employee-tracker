const inquirer = require('inquirer');
const fs = require('fs');

// call once somewhere in the beginning of the app
const cTable = require('console.table');
// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);

// prints
// name  age
// ----  ---
// foo   10
// bar   20

// Collects input from command prompt

// This is the method to ask which team member you want to add, and then to call that particular function
const promptOptions = () => {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "options",
          message: "What would you like to do?",
          choices: [
            { value: "viewAllEmployees", name: "View all Employees" },
            { value: "addEmployee", name: "Add Employee" },
            { value: "updateEmployeeRole", name: "Update Employee Role" },
            { value: "viewAllRoles", name: "View All Roles" },
            { value: "addRole", name: "Add Role" },
            { value: "viewAllDepartments", name: "View All Departments" },
            { value: "addDepartment", name: "Add Department" },
            
          ],
        },
      ])
      .then((answers) => {
        if (answers.options === "viewAllEmployees") {
          viewAllEmployees();
        } else if (answers.options === "addEmployee") {
          addEmployee();
        } else if (answers.options === "updateEmployeeRole") {
            updateEmployeeRole();
        } else if (answers.options === "viewAllRoles") {
            viewAllRoles();
        } else if (answers.options === "addRole") {
            addRole();
        } else if (answers.options === "viewAllDepartments") {
            viewAllDepartments();
        } else if (answers.options === "addDepartment") {
            addDepartment();
            
        } else {
          finish()
          ;
          
        }
      });
  };

  const viewAllEmployees = () => {

  };

  const addEmployee = () => {

};

const updateEmployeeRole = () => {

};

const viewAllRoles = () => {

};

const addRole = () => {

};

const viewAllDepartments = () => {

};

const addDepartment = () => {

};

const finish = () => {

};

const init = () => {
    promptOptions()
  
  };
  
  init();