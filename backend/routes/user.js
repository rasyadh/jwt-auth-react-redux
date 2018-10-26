const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegister = require('../validation/register');
const validateLogin = require('../validation/login');

const User = require('../models/User');

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegister(req.body);
    if (!isValid) return res.status(400).json(errors);

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    email: 'Email already exist'
                });
            }
            else {
                const newUser = new User({ name, email, password } = req.body);

                bcrypt.genSalt(10).then(salt => {
                    bcrypt.hash(newUser.password, salt)
                        .then(hash => {
                            newUser.password = hash;
                            newUser.save().then(user => { res.json(user) });
                        })
                        .catch(err => console.error(`there was an error: ${err}`));
                }).catch(err => console.error(`there was an error: ${err}`));
            }
        });
});

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) return res.status(400).json(errors);

    const { email, password } = req.body;
    User.findOne({ email }).then(user => {
        if (!user) {
            errors.email = 'User not found';
            return res.status(400).json(errors);
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                }
                jwt.sign(payload, 'secret-jwtauth', { expiresIn: 3600 }, (err, token) => {
                    if (err) console.error(`There is some error in token: ${err}`);
                    else res.json({
                        success: true,
                        token: `Bearer ${token}`
                    });
                });
            }
            else {
                errors.password = 'Incorrect password';
                return res.status(400).json(errors);
            }
        });
    });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ 
        id: req.user.id, 
        name: req.user.name, 
        email: req.user.email
    });
});

module.exports = router;