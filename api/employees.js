const express = require('express');
const router = express.Router();
module.exports = router;
const prisma = require('../prisma/index.js');

router.get('/', async (req, res, next) => {
  try {
    res.json('Welcome to Prismatic Employees API');
  } catch (e) {
    next(e);
  }
});

router.get('/employees', async (req, res, next) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (e) {
    next(e);
  }
});

router.post('/employees', async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next({ status: 400, message: 'name is required.' });
  }
  try {
    const employee = await prisma.employee.create({ data: { name } });
    res.status(201).json(employee);
  } catch (e) {
    next(e);
  }
});

router.get('/employees/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    //converts id into a number
    const employee = await prisma.employee.findUnique({ where: { id: +id } });
    if (employee) {
      res.json(employee);
    } else {
      next({ status: 404, message: `Employee id ${id} not found.` });
    }
  } catch (e) {
    next(e);
  }
});

router.put('/employees/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  //Check if name exists
  if (!name) {
    return next({ status: 400, message: 'name is required.' });
  }

  try {
    //Check if the employee exists
    const employee = await prisma.employee.findUnique({ where: { id: +id } });
    if (!employee) {
      return next({ status: 404, message: `Employee id ${id} not found.` });
    }

    //Updates the employee
    const updatedEmployee = await prisma.employee.update({
      where: { id: +id },
      data: { name },
    });
    res.json(updatedEmployee);
  } catch (e) {
    next(e);
  }
});

router.delete('/employees/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    //Check it employee exists
    const employee = await prisma.employee.findUnique({ where: { id: +id } });
    if (!employee) {
      return next({ status: 404, message: `Employee id ${id} not found.` });
    }
    //Deletes the employee
    await prisma.employee.delete({ where: { id: +id } });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});
