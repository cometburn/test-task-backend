const jwt = require('jsonwebtoken');
const User = require('../db/models').user;

const createAccessToken = (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });

const createRefreshToken = (payload) => jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.sendStatus(401);

  const isAccessTokenValid = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return false;
    req.user = user;
    return true;
  });

  if (isAccessTokenValid) {
    req.user = await User.findOne({
      where: {
        id: req.user.id,
      },
    }).then((inst) => {
      inst.changed('updatedAt', true);
      inst.set('updatedAt', new Date());
      inst.save();

      return inst.dataValues;
    });

    return next();
  }

  const isRefreshTokenValid = jwt.verify(
    req.cookies.test_task,
    process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return false;
      req.user = user;
      return true;
    },
  );

  if (isRefreshTokenValid) {
    req.user = await User.findOne({
      raw: true,
      where: {
        id: req.user.id,
      },
    });

    return next();
  }

  return res.sendStatus(401);
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  authenticateToken,
};
