INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering");



INSERT INTO role (title, salary, department_id)
VALUES ("Associate", 40,000, 1),
       ("Manager", 50,000, 2);


INSERT INTO role (first_name, last_name, role_id, manager_id)
VALUES ("Burk", "Teresa", 1, 1),
       ("Currie", "Stephen", 2, 2);
