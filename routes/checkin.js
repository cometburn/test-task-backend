const express = require('express');

const router = express.Router();
const checkinController = require('../routesController/checkinController');
const token = require('../utils/token');

router.use(token.authenticateToken, (req, res, next) => {
  next();
});

router.get('/', checkinController.allCheckIns);
router.post('/add', checkinController.addCheckIn);

module.exports = router;
