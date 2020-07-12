const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const connection = require('./helpers/db.js');
const authRouter = require('./routes/auth/auth.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const JWTStrategy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const cors = require('cors');
const ExtractJWT = require('passport-jwt').ExtractJwt;


const corsOptions = {
    origin: process.env.CLIENT_APP_ORIGIN,
};
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use('/auth', authRouter);
app.get("/", (req, res) => {
    res.send("youhou");
})

app.get("/profile", passport.authenticate('jwt', { session: false }), function (req, res) {
    res.send(req.user);
})

/// dans le cas d'une route non trouvée, je retourne le code 404 'Not Found'
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//je lance le serveur node
let server = app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on port ' + server.address().port);
});

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    function (email, password, done) {
        //Your code here
        connection.query(`SELECT * FROM users WHERE email = "${email}" `, function (err, res) {
            if (err) {
                return done(err);
            }
            else if (!res.length) {
                return done(null, false, { info: 'Unknown Email' });
            }
            else if (!bcrypt.compareSync(password, res[0].password)) {
                return done(null, false, { info: 'Wrong Password' })
            }
            else {
                return done(null, res[0], { info: 'User Signed in' })
            }
        });
    }
));

passport.use(new JWTStrategy({

    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
},

    function (jwtPayload, cb) {
        return cb(null, jwtPayload);
    }
));