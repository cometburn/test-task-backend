checkAdminAuthorization = async (req, res, next) => {
  console.log(req.user);
  if (!req.user.isAdmin) return res.sendStatus(401);
  next();
};

module.exports = {
  checkAdminAuthorization,
};
