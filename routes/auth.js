const express = require('express');

const router = express.Router();

const authController = require('../routesController/authController');

router.use((req, res, next) => {
  next();
});

router.post('/', authController.login);

module.exports = router;
