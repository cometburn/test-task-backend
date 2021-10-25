const Task = require('../db/models').task;

const allTasks = (req, res) => {
  const cond = req.user.isAdmin ? { raw: true } : { raw: true, where: { userId: req.user.id } };

  Task.findAll(cond).then((tasks) => {
    res.json(tasks);
  }).catch(() => {
    res.sendStatus(500);
  });
};

const addTask = (req, res) => {
  Task.create({
    userId: req.user.id,
    isCompleted: false,
    taskDate: req.body.taskDate,
    taskTime: req.body.taskTime,
    task: req.body.task,
    desc: req.body.desc,
  }).then((r) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(r.dataValues));
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
};

const updateTask = (req, res) => {
  const cond = { where: { userId: req.user.id, id: req.body.id } };
  Task.findOne(cond).then((tasks) => {
    tasks.isCompleted = req.body.isCompleted;
    tasks.taskDate = req.body.taskDate;
    tasks.taskTime = req.body.taskTime;
    tasks.save();

    res.end(JSON.stringify(tasks));
  }).catch(() => {
    res.sendStatus(500);
  });
};

module.exports = {
  allTasks,
  addTask,
  updateTask,
};
