models = require('./models');

COOKIE_NAME = 'chat';

module.exports.lookupSession = function (req, res, next) {
    var cookie = req.cookies[COOKIE_NAME];
    if (cookie) {
        models.Session.findById(cookie, function (err, session) {
            if (!err && session && session.username) {
                req.username = session.username;
            }

            next();
        });
    } else {
        next();
    }
};

module.exports.login = function (res, username, password, callback) {
    models.Session.findOne({ username: username }, function (err, session) {
        if (err) {
            callback(false);
        } else {
            if (session) {
                callback(true);
            } else {
                models.User.findOne({ username: username }, function (err, user) {
                    if (err) {
                        callback(false);
                    } else {
                        if (user) {
                            if (user.password === password) {
                                createSession(res, username, callback);
                            } else {
                                callback(false);
                            } 
                        } else {
                            createUserAndSession(
                                    res, username, password, callback);
                        }
                    }
                });
            }
        }
    });
};

module.exports.logout = function (res, username, callback) {
    res.clearCookie(COOKIE_NAME);
    models.Session.findOneAndRemove({ username: username }, function (err) {
        // There's really nothing we can do on an error.
        callback();
    });
};

var createSession = function (res, username, callback) {
    var session = new models.Session({ username });

    session.save(function (err) {
        if (err) {
            callback(false);
        } else {
            res.cookie(COOKIE_NAME, session._id.toString(), { httpOnly: true });
            callback(true);
        }
    });
};

var createUserAndSession = function (res, username, password, callback) {
    var user = new models.User({ username: username, password: password });

    user.save(function (err) {
        if (err) {
            return callback(false);
        } else {
            createSession(res, username, callback);
        }
    });
};
