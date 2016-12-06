var express = require('express');
var router = express.Router();
var sessions = require('../sessions');

router.get('/', function (req, res, next) {
    if (req.username) {
        // We should not display the login page if a user is logged in!
        next();
    } else {
        res.render('login', { title: 'Login', loginError: false });
    }
});

router.post('/login', function (req, res, next) {
    sessions.login(res, req.body.username, req.body.password, function (result) {
        if (result) {
            res.redirect('/');
        } else {
            res.render('login', { title: 'Login', loginError: true });
        }
    });
});

router.post('/logout', function (req, res, next) {
    sessions.logout(res, req.username, function () {
        res.redirect('/');
    });
});

module.exports = router;
