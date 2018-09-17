const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const body_parser = require('body-parser');

//Connecting to MongoDB DataBase Using Mongoose ORM--------------------------------------->
mongoose.connect('mongodb://' + process.env.MONGO_USER_NAME + ':' + process.env.MONGO_PASSWORD + '@ds018238.mlab.com:18238/test_db', {
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

//HANDLING CORS ERRORS---------------------------------------------------------->
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.status(200).json({});
    }
    next();
});

app.use('/user/signup', require('./routes/signup'));
app.use('/user/login', require('./routes/login'));

app.use('/user/courses', require('./routes/course'));
app.use('/user/students', require('./routes/student'));

//HANDLING ERRORS------------------------------------------------------------------->
app.use((req, res, next) => {
    const error = new Error(`something occured an unhandled exception..!`);
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500).json({
        Error: {
            error: error.message
        }
    });
});

module.exports = app;