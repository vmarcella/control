// Import npm modules and std lib  dependencies
const express = require('express');

// Create router for employees and merge params with the parent router, companies
const router = express.Router({ mergeParams: true });

// Import both the company and employee models
const Company = require('../../models/company');
const Employee = require('../../models/employee');

// Get all the employees that work for a specific company
router.get('/', (req, res) => {
    Company
        .find({ name: req.params.companyName })
        .populate('employees')
        .then(company => res.json({ employees: company.employees }))
        .catch(error => res.status(500).json({ err: 'Couldnt get the users for this company' }))
});

// Get a single employee from the company if they exist
router.get('/:employeeId', (req, res) => {
    Employee
        .findOne({ employeeId: req.params.employeeId })
        .then(employee => res.json({ employee }))
        .catch(err => res.status(500).json())
})

// Create a new employee for a company and then return that employee
router.post('/', (req, res) => {
    Company
        .find({ name: req.params.companyName })
        .populate('employees')
        .then((company) => {
            req.body.employedAt = company._id;
            req.body.employeeId = Math.floor(999999 * Math.random());
            const employee = new Employee(req.body);

            company.employees.push(employee);
            company.save();
            return employee.save();
        })
        .then(employee => res.json({ employee }))
        .catch(err => res.status(500).json({ err: 'Couldnt create a new employee for this company' }));
});

// Update a specific employee and then send the updated employee to the user
router.put('/:employeeId', (req, res) => {
    Employee
        .findOneAndUpdate({ employeeId: req.params.employeeId }, req.body, { new: true })
        .then(employee => res.json({ employee }))
        .catch(err => res.status(500).json({ err: 'Couldnt update the employee' }))
});

// Delete the employee and then return the deleted employee to the user
router.delete('/:employeeId', (req, res) => {
    Employee
        .findOneAndRemove({ employeeId: req.params.employeeId })
        .then(employee => res.json({ employee }))
        .catch(err => res.status(500).json({ err: 'Couldnt delete the employee for this company' }))
});

module.exports = router;
