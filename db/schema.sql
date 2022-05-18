DROP DATABASE IF EXISTS hr_db;

CREATE DATABASE hr_db;

USE hr_db;


CREATE TABLE department (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT,
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(100)
);

CREATE TABLE role (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT,
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(100)
);

CREATE TABLE employee (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT,
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(100)
);
