const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const User = require('../db/models').user;
const Task = require('../db/models').task;
const Checkin = require('../db/models').checkin;

const salt = bcrypt.genSaltSync(10);

const allUsers = (req, res) => {
  User.findAll({
    raw: true,
    where: { id: { [Sequelize.Op.not]: req.user.id } },
    attributes: {
      include: [[Sequelize.fn('COUNT', Sequelize.col('tasks.id')), 'taskCount']],
    },
    include: [{
      model: Task, attributes: [],
    }],
    group: ['user.id'],
  }).then((users) => {
    res.json(users);
  }).catch(() => {
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
    res.json(users);
  }).catch(() => {
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

const addUser = (req, res) => {
  User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
    isAdmin: req.body.isAdmin,
  }).then((r) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(r.dataValues));
  }).catch((err) => {
    console.log(err);
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.sendStatus(400);
    } else { res.sendStatus(500); }
  });
};

const updateUser = (req, res) => {
  const cond = { where: { id: req.body.id } };
  User.findOne(cond).then((user) => {
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = bcrypt.hashSync(req.body.password, salt);
    user.isAdmin = req.body.isAdmin;
    user.save();

    res.end(JSON.stringify(user));
  }).catch((err) => {
    res.sendStatus(500);
  });
};

const deleteUser = (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.setHeader('Content-Type', 'text/xml charset=utf-8');
    res.sendStatus(200);
  });
};

module.exports = {
  allUsers,
  userDetails,
  userTasks,
  userLocations,
  addUser,
  updateUser,
  deleteUser,
};
