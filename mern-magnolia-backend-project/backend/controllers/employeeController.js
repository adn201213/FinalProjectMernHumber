import asyncHandler from 'express-async-handler'
import Employee from '../models/employeeModel.js'
import generateToken from '../utils/generateToken.js'

//route Get api/employees
//desc Get all employees
//access public
const getEmployees = asyncHandler(async (req, res) => {
    try {
        const employeesDB = await Employee.find();
        res.send(employeesDB);
    } catch (err) {
        res.status(500).send("Server error");
    }
})

//route Get api/employees/:id
//desc Get  employees by id
//access public
const getEmployee = asyncHandler(async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
        if (!employee) {
            return res.status(404).send('Employee not found');
        }
        res.send(employee);
    } catch (err) {
        res.status(500).send("Server error");
    }
})

//route post api/employees
//desc insert employee
//access public
const insertEmployee = asyncHandler(async (req, res) => {
    try {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(422).json({ errors: errors.array() });
        // }
        const newEmployee = new Employee({
            name: req.body.name,
            title: req.body.title,
            github: req.body.github,
            linkedin: req.body.linkedin,
            imgSrc: req.body.imgSrc,
            user: req.user._id,
        })

        const result = await newEmployee.save();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
})

//route delete api/employees/
//desc delete employee by id
//access public
const deleteEmployee = asyncHandler(async (req, res) => {
    try {
        // find the element
        const employee = await Employee.findById(req.body.id);
        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }

        const result = await Employee.findByIdAndDelete({ _id: req.body.id })

        res.json(result);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error 44');
    }
})

//route put  api/employees/
//desc update employee
//access public
const updateEmployee = asyncHandler(async (req, res) => {
    try {
        // find the element
        const employee = await Employee.findById(req.body.id);
        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }
        employee.name = req.body.name;
        employee.title = req.body.title;
        employee.github = req.body.github;
        employee.linkedin = req.body.linkedin;
        employee.imgSrc = req.body.imgSrc;
        // employee.user = req.user.id;
        await employee.save();


        res.send(employee);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error 55');
    }
})

export {
    getEmployees,
    getEmployee,
    insertEmployee,
    deleteEmployee,
    updateEmployee
}