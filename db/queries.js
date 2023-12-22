const viewDepartmentsQuery = 'SELECT * FROM departments';        // <= Queries (filters) for add Role, Employee, view and update Roles.
const viewRolesQuery = 'SELECT * FROM roles';
const viewEmployeesQuery = 'SELECT * FROM employees';
const addDepartmentQuery = 'INSERT INTO departments (name) VALUES (?)';
const addRoleQuery = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
const addEmployeeQuery = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
const updateEmployeeRoleQuery = 'UPDATE employees SET role_id = ? WHERE employee_id = ?';

module.exports = { viewDepartmentsQuery, viewRolesQuery, viewEmployeesQuery, addDepartmentQuery, addRoleQuery, addEmployeeQuery, updateEmployeeRoleQuery};   // <= defines object, holds the exported values and functions.
