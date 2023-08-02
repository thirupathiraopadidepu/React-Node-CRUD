const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Sample data (replace this with a database later)
let employees = [
  {
    id: 1,
    name: 'John Doe',
    address: '123 Main St',
    profession: 'Software Engineer',
    age: 30,
    hobbies: ['Reading', 'Coding'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    address: '456 Park Ave',
    profession: 'Graphic Designer',
    age: 28,
    hobbies: ['Painting', 'Traveling'],
  },
  // Add more sample employees here
];

// CRUD routes for employees
app.get('/api/employees', (req, res) => {
  res.json(employees);
});

app.post('/api/employees', (req, res) => {
  const newEmployee = {
    id: employees.length + 1,
    name: req.body.name,
    address: req.body.address,
    profession: req.body.profession,
    age: req.body.age,
    hobbies: req.body.hobbies,
  };
  employees.push(newEmployee);
  res.json(newEmployee);
});

app.put('/api/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedEmployee = {
    id,
    name: req.body.name,
    address: req.body.address,
    profession: req.body.profession,
    age: req.body.age,
    hobbies: req.body.hobbies,
  };
  employees = employees.map(employee => (employee.id === id ? updatedEmployee : employee));
  res.json(updatedEmployee);
});

app.delete('/api/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  employees = employees.filter(employee => employee.id !== id);
  res.json({ message: 'Employee deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
