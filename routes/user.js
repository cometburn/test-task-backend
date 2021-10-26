const express = require('express');

const router = express.Router();
const userController = require('../routesController/userController');
const token = require('../utils/token');
const access = require('../utils/access');

router.use(token.authenticateToken, (req, res, next) => {
  next();
});

router.get('/', userController.allUsers);
router.get('/:id', userController.userDetails);

router.get('/:id/tasks', access.checkAdminAuthorization, userController.userTasks);
router.get('/:id/locations', access.checkAdminAuthorization, userController.userLocations);

module.exports = router;
