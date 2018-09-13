const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.get_logged_in = (req, res, next) => {

    User.find({user_email: req.body.emailId})
    .exec()
    .then(user => {

        if(user.length < 1) {
            console.log(`Error: Invailid Email Id Found..`);
            res.status(404).json({
                Error: {
                    info: 'Invailid EmailId..'
                }
            });
        }
        else {

            bcrypt.compare(req.body.password, user[0].user_password, (err, result) => {
                if(err) {
                    console.log(`Error: Invailid Password Found`);
                    res.status(404).json({
                        Error: {
                            info: 'Invailid Password..'
                        }
                    });
                }
                else if(result) {
                    const token = jwt.sign({
                        Id: user[0]._id,
                        Email: user[0].user_email
                    },
                    process.env.JWT_KEY,{
                        expiresIn: '1h'
                    });
                    console.log(`success: Login Successful..`);
                    res.status(200).json({
                        success: 'Login Successful..',
                        token: token
                    });
                }
                else {
                    console.log(`Error: Invailid Email or Password Found..`);
                    res.status(404).json({
                        Error: {
                            info: 'Invailid Email or Password Found..'
                        }
                    });
                }
            })
        }
    })
    .catch(err => {
        console.log(`Error: ${err.message}`);
        res.status(500).json({
            Error: {
                error: err.message
            }
        });
    });
};