const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "hr_db",
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
        finish();
      }
    });
};

const viewAllEmployees = () => {
  console.log("Here are all the employees");

  db.connect(function (err) {
    if (err) throw err;
    db.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager_id AS manager FROM employee JOIN role on role.id = employee.role_id JOIN department on department.id = role.department_id;",
      function (err, result, first_name) {
        if (err) throw err;
        console.table(result);
        promptOptions();
      }
    );
  });
};

// NEED TO GET THIS WORKING
const addEmployee = () => {
  db.connect(function (err) {
    if (err) throw err;
    db.query(
      "SELECT id, CONCAT(first_name , ' ' , last_name) AS fullname FROM employee;",
      function (err, result) {
        if (err) throw err;
// The map is going through each row in the database, and then we're returning a new object key value pair.  we're then assigning the new employee and value id to it.  would be easier to read to do async
        const allEmployees = result.map((employee) => {
          return { name: employee.fullname, value: employee.id };
        });
        db.query("SELECT id, title FROM role;", function (err, result) {
          if (err) throw err;

          const allRoles = result.map((role) => {
            return { name: role.title, value: role.id };
          });

          return inquirer
            .prompt([
              {
                type: "input",
                name: "first_name",
                message: "What is the employees first name?",
              },
              {
                type: "input",
                name: "last_name",
                message: "What is the employees last name",
              },
              {
                type: "list",
                name: "role",
                message: "What is the employees role?",
                choices: allRoles,
              },
              {
                type: "list",
                name: "manager",
                message: "Who is the employees manager?",
                choices: allEmployees,
              },
            ])
            .then((answers) => {
                db.connect(function (err) {
                    var sql = `INSERT INTO employee (first_name, last_name, manager_id, role_id) 
                    VALUES ('${answers.first_name}', '${answers.last_name}', ${answers.manager}, ${answers.role})`;
                    db.query(sql, function (err, result) {
                      if (err) throw err;
                      console.log("1 record inserted");
                      promptOptions();
                    });
                  });
            });
        });
      }
    );
  });
};

const updateEmployeeRole = () => {};

const viewAllRoles = () => {
  console.log("Here are all the roles");

  db.connect(function (err) {
    if (err) throw err;
    db.query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department on department.id = role.department_id;",
      function (err, result, first_name) {
        if (err) throw err;
        console.table(result);
        promptOptions();
      }
    );
  });
};

const addRole = () => {};

const viewAllDepartments = () => {
  console.log("Here are all the departments");

  db.connect(function (err) {
    if (err) throw err;
    db.query(
      "SELECT department.id, department.name FROM department;",
      function (err, result, first_name) {
        if (err) throw err;
        console.table(result);
        promptOptions();
      }
    );
  });
};

const addDepartment = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "departmentname",
        message: "What is the name of the department?",
      },
    ])
    .then((answers) => {
      db.connect(function (err) {
        var sql = `INSERT INTO department (name) VALUES ('${answers.departmentname}')`;
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
          promptOptions();
        });
      });
    });
};

const quit = () => {
  db.end();
};

const finish = () => {};

const init = () => {
  promptOptions();
};

init();
