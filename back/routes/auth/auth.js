const router = require('express').Router();
const connection = require('../../helpers/db.js');
require('dotenv').config();
const passport = require('passport');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

router.post('/signup', (req, res) => {
    let hash = bcrypt.hashSync(req.body.password, 10);
    const formData = { 'email': req.body.email, 'password': hash, 'name': req.body.name, 'lastname': req.body.lastname }
    connection.query('INSERT INTO users SET ?', formData, (err) => {
        if (err)
            res.status(500).json({ flash: err.message });
        else
            res.status(200).json({ flash: "User has been signed up !" });
    });
});

router.post('/signin', function (req, res) {

    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(500).send(err)
        if (!user) return res.status(400).json({ message: info.message });
        const token = jwt.sign(JSON.stringify(user), process.env.ACCESS_TOKEN_SECRET);
        return res.json({ user, token });
    })(req, res);
});

module.exports = router;

