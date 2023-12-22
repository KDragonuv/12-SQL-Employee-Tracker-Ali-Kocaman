const fs = require('fs');
const mysql = require('mysql2/promise');
const { viewDepartmentsQuery, viewRolesQuery, viewEmployeesQuery, addDepartmentQuery, addRoleQuery, addEmployeeQuery, updateEmployeeRoleQuery } = require('./queries');

const connection = mysql.createConnection({
  host: 'your_host',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
});

async function executeQuery(query, params) {
    const [rows] = await connection.execute(query, params);
    return rows;
  }

async function initializeDatabase() {
  try {
    
    const schemaSql = fs.readFileSync('./path/to/schema.sql', 'utf8');   // <= Read and execute the schema.sql file.
    await connection.execute(schemaSql);

    const seedsSql = fs.readFileSync('./path/to/seeds.sql', 'utf8');     // <= Read and execute the seeds.sql file.
    await connection.execute(seedsSql);

    console.log('Schema and seeds executed successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);                                                     // <= Exit the application on error.
  }
}

  async function viewDepartments() {
    const departments = await executeQuery(viewDepartmentsQuery);
    console.table(departments);
  }

  async function viewRoles() {
    const roles = await executeQuery(viewRolesQuery);
    console.table(roles);
  }

  async function viewEmployees() {
    const employees = await executeQuery(viewEmployeesQuery);
    console.table(employees);
  }

  async function addDepartment() {
    const departmentName = await inquirer.prompt({ type: 'input', name: 'name', message: 'Enter the name of the department:' });   // <= Prompt user for information.
    await executeQuery(addDepartmentQuery, [departmentName.name]);
    console.log('Department added successfully!');
  }

  async function addRole() {
    try {
        const roleInfo = await inquirer.prompt([     // <= Prompt user for role information.
        { type: 'input', name: 'title', message: 'Enter the title of the role:' },
        { type: 'input', name: 'salary', message: 'Enter the salary for the role:' },
        { type: 'input', name: 'departmentId', message: 'Enter the department ID for the role:' },
      ]);
  
      await executeQuery(addRoleQuery, [roleInfo.title, roleInfo.salary, roleInfo.departmentId]);     // <= Execute the addRoleQuery with what information, the user provided. 
  
      console.log('Role added successfully!');
    } catch (error) {
      console.error('Error adding role:', error);
    }
  }

  async function addEmployee() {
    try {
        const employeeInfo = await inquirer.prompt([     // <= Prompt user for employee information.
        { type: 'input', name: 'firstName', message: 'Enter the first name of the employee:' },
        { type: 'input', name: 'lastName', message: 'Enter the last name of the employee:' },
        { type: 'input', name: 'roleId', message: 'Enter the role ID for the employee:' },
        { type: 'input', name: 'managerId', message: 'Enter the manager ID for the employee (optional):' },
      ]);
  
      await executeQuery(addEmployeeQuery, [       // <= Execute the addEmployeeQuery with user-provided information.
        employeeInfo.firstName,
        employeeInfo.lastName,
        employeeInfo.roleId,
        employeeInfo.managerId || null,     // <= If managerId is not provided, set it to null.
      ]);
  
      console.log('Employee added successfully!');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  }
  
  async function updateEmployeeRole() {
    try {

      const employees = await executeQuery('SELECT employee_id, CONCAT(first_name, " ", last_name) AS employee_name FROM employees');      // <= Get a list of employees for the user to choose from.
  
      const selectedEmployee = await inquirer.prompt({       // <= Prompt user to select an employee to update.
        type: 'list',
        name: 'employeeId',
        message: 'Select an employee to update their role:',
        choices: employees.map((employee) => ({ name: employee.employee_name, value: employee.employee_id })),
      });
  
      const newRoleId = await inquirer.prompt({ type: 'input', name: 'newRoleId', message: 'Enter the new role ID for the employee:' });    // <= Prompt user for the new role ID.
  
      await executeQuery(updateEmployeeRoleQuery, [newRoleId.newRoleId, selectedEmployee.employeeId]);   // <= Execute the updateEmployeeRoleQuery with user-provided information.
  
    console.log('Employee role updated successfully!');
    } catch (error) {
      console.error('Error updating employee role:', error);      
    }
  }

    module.exports = { initializeDatabase, viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };