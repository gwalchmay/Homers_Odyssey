const router = require('express').Router();
const connection = require('../../helpers/db.js');

router.post('/signup', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO users SET ?', formData, (err) => {
        if (err) {
            res.send(err.message);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;