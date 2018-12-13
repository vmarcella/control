// Middleware to check if users are authorized to access certain endpoints
module.exports = (req, res, next) => {
    if (res.locals.user) {
        return next();
    }

    return res.status(403).json({ err: 'Not authorized to access api routes' });
}
