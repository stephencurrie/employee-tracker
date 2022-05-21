const inquirer = require('inquirer');
const mysql = require('mysql2');
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



// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'hr_db'
    },
    console.log(`Connected to the hr_db database.`)
  );


// Collects options from command prompt and initiates that function

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
            { value: "quit", name: "Quit" },
            
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
        } else if (answers.options === "quit") {
            quit();
            
        } else {
          finish()
          ;
          
        }
      });
  };

const viewAllEmployees = () => {
console.log("Here are all the employees");

db.connect(function(err) {
    if (err) throw err;
    db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager_id AS manager FROM employee JOIN role on role.id = employee.role_id JOIN department on department.id = role.department_id;", function (err, result, first_name) {
      if (err) throw err;
      console.table(result);
      promptOptions();
    });
  });
};

// NEED TO GET THIS WORKING
  const addEmployee = () => {
    return inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'What is the employees first name?',
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'What is the employees last name',
        },
        {
          type: 'input',
          name: 'role',
          message: 'What is the employees role?',
        },
        {
          type: 'list',
          name: 'manager',
          message: 'Who is the employees manager?',
          choices: [
              //Need this to be a variable and dynamic array
            {value: '', name: "Stephen Currie"},
            {value: '', name: "Teresa Burk"},
             ],
  
        },
      ]);
    };





const updateEmployeeRole = () => {

};

const viewAllRoles = () => {
console.log("Here are all the roles");

db.connect(function(err) {
    if (err) throw err;
    db.query("SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department on department.id = role.department_id;", function (err, result, first_name) {
      if (err) throw err;
      console.table(result);
      promptOptions();
    });
  });

};

const addRole = () => {

};

const viewAllDepartments = () => {
console.log("Here are all the departments");

db.connect(function(err) {
    if (err) throw err;
    db.query("SELECT department.id, department.name FROM department;", function (err, result, first_name) {
      if (err) throw err;
      console.table(result);
      promptOptions();
    });
  });

};

const addDepartment = () => {
    return inquirer.prompt([
        {
          type: 'input',
          name: 'departmentname',
          message: 'What is the name of the department?',
        },
    ]);

    db.connect(function(err) {
        var sql = "INSERT INTO department (name) VALUES (departmentname)";
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
        });
      };




const quit = () => {
    db.end()
};

const finish = () => {

};

const init = () => {
    promptOptions()
  
  };
  
  init();