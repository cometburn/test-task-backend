const bcrypt = require('bcrypt');
const token = require('../utils/token');
const User = require('../db/models').user;

const login = (req, res) => {
  if (!req.body.email) {
    res.sendStatus(401);
    return;
  }

  User.findOne({
    raw: true,
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      if (!bcrypt.compareSync(req.body.password || '', user.password)) {
        res.sendStatus(401);
        return;
      }

      const payload = { id: user.id, email: user.email };
      const accessToken = token.createAccessToken(payload);
      const refreshToken = token.createRefreshToken(payload);

      res.cookie('test_task', refreshToken, {
        httpOnly: false,
        maxAge: 3600000 * 5,
        secure: true,
        sameSite: 'none',
        domain: process.env.DOMAIN,
      });

      res.json({
        id: user.id,
        isAdmin: user.isAdmin,
        accessToken,
        refreshToken,
      });
    } else {
      res.sendStatus(401);
    }
  }).catch(() => {
    res.sendStatus(500);
  });
};

module.exports = {
  login,
};
