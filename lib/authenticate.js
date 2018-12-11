const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (!req.cookies.controlAuth) {
        res.locals.user = null
    } else {
        const token = req.cookies.controlAuth;
        const decodedToken = jwt.decode(token, { complete: true }) || {};
        res.locals.user = decodedToken.payload;
    }

    return next();
}
