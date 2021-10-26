const Sequelize = require('sequelize');
const User = require('../db/models').user;
const Task = require('../db/models').task;
const Checkin = require('../db/models').checkin;

const allUsers = (req, res) => {
  User.findAll({
    raw: true,
    where: { isAdmin: false },
    attributes: {
      include: [[Sequelize.fn('COUNT', Sequelize.col('tasks.id')), 'taskCount']],
    },
    include: [{
      model: Task, attributes: [],
    }],
    group: ['user.id'],
  }).then((users) => {
    res.json(users);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
};

const userDetails = (req, res) => {
  User.findOne({
    raw: true,
    where: { id: req.params.id },
    attributes: {
      include: [[Sequelize.fn('COUNT', Sequelize.col('tasks.id')), 'taskCount']],
    },
    include: [{
      model: Task, attributes: [],
    }],
    group: ['user.id'],
  }).then((users) => {
    console.log(users);
    res.json(users);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
};

const userTasks = (req, res) => {
  Task.findAll({
    where: {
      userId: req.params.id,
    },
  }).then((tasks) => {
    res.json(tasks);
  }).catch(() => {
    res.sendStatus(500);
  });
};

const userLocations = (req, res) => {
  Checkin.findAll({
    where: {
      userId: req.params.id,
    },
    order: [
      ['id', 'DESC'],
    ],
  }).then((checkin) => {
    res.json(checkin);
  }).catch(() => {
    res.sendStatus(500);
  });
};

module.exports = {
  allUsers,
  userDetails,
  userTasks,
  userLocations,
};
