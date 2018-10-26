const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const dbConfig = require('./config/db');

const usersRoute = require('./routes/user');

mongoose.connect(dbConfig.DB, { useNewUrlParser: true })
    .then(() => console.log('Database is connected'))
    .catch(err => console.log(`Cannot connect to database: ${err}`));

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', usersRoute);
app.get('/', (req, res) => {
    res.send(`JWT Auth API at endpoint /api.users`);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});