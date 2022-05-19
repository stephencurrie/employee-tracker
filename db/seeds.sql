INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering");



INSERT INTO role (title, salary, department_id)
VALUES ("Associate", 40000, 1),
       ("Manager", 50000, 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Teresa", "Burk", 1, 1),
       ("Stephen", "Currie", 2, 1);
