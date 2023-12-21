DROP DATABASE employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (    -- <= Table creation named 'department'

    id INT AUTO_INCREMENT NOT NULL, 
    name VARCHAR(30)
    PRIMARY KEY (id)
);

CREATE TABLE roles (          -- <= Table creation named 'roles'
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
    FOREIGN KEY (department_id)
    REFERENCES department (id)
);

CREATE TABLE employee (          -- <= Table creation named 'employee'
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
    FOREIGN KEY (role_id)
    REFERENCES roles (id)
);

