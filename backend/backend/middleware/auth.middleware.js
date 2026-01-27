const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_KEY;

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Token hiányzik' });
  }


  const token = authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token hiányzik' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

   
    req.user = decoded;  
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Érvénytelen token' });
  }
}

module.exports = authMiddleware;
