
function adminMiddleware(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'Nincs Bejelentkezve' });
  }

  if (req.user.jogosultsag !== 'admin') {
    return res.status(403).json({ message: 'Nincs jogosultságod ehhez' });
  }

  next();
}

module.exports = {adminMiddleware};