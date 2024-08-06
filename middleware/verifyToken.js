const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Access token from the 'Authorization' header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;

    console.log(token); // For debugging, ensure token is correctly extracted
    
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user info to request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = verifyToken;
