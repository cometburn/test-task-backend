const express = require('express');

const router = express.Router();
const taskController = require('../routesController/taskController');
const token = require('../utils/token');

router.use(token.authenticateToken, (req, res, next) => {
  next();
});

router.get('/', taskController.allTasks);
router.post('/add', taskController.addTask);
router.put('/update/:id', taskController.updateTask);

module.exports = router;
