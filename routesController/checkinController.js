const CheckIn = require('../db/models').checkin;

const allCheckIns = (req, res) => {
  let cond = req.user.isAdmin ? { raw: true } : {
    raw: true,
    where: { userId: req.user.id },
  };

  cond = {
    ...cond,
    order: [
      ['id', 'DESC'],
    ],
  };

  CheckIn.findAll(cond).then((checkIns) => {
    res.json(checkIns);
  }).catch(() => {
    res.sendStatus(500);
  });
};

const addCheckIn = (req, res) => {
  CheckIn.create({
    userId: req.user.id,
    location: req.body.location,
    lat: req.body.lat,
    long: req.body.long,
  }).then((r) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(r.dataValues));
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
};

module.exports = {
  allCheckIns,
  addCheckIn,
};
