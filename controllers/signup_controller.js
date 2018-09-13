const User = require('../models/user_model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


//Getting All Data From The DataBase---------------------------------------------------->
exports.signup_get_all = (req, res, next) => {

    User.find()
    .select('_id user_email user_password')
    .exec()
    .then(users => {
        const resp = users.map(user => {
            return {
                Id: user._id,
                Email: user.user_email,
                Password: user.user_password,
                Request: {
                    type: 'GET',
                    discription: 'Get the details of each user..',
                    url: `http://localhost:8000/user/signup/${user._id}`
                }
            }
        });
        console.log(`success: ${users}`);
        res.status(200).json({
            info: 'You just requested to get all users...',
            success: resp
        });
    })
    .catch(err => {
        console.log(`Error: ${err.message}`);
        res.status(500).json({
            Error: {
                error: err.message
            }
        });
    })
};



//Posting Data To The DataBase------------------------------------------------------>
exports.signup_create_post = (req, res, next) => {

    User.find({user_email: req.body.emailId})
    .exec()
    .then(user => {
        if(user.length >= 1) {
            console.log(`user email already exist..!`);
            res.status(404).json({
                Error: {
                    info: `duplicate emailId is not allowed..!`
                }
            });
        }
        else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {

                if(err) {
                    console.log(`Error: ${err.message}`);
                    res.status(404).json({
                        Error: {
                            info: err.message
                        }
                    });
                }
                else {
                    const newUser = new User({
                        _id: new mongoose.Types.ObjectId(),
                        user_email: req.body.emailId,
                        user_password: hash
                    });
                    newUser
                    .save()
                    .then(doc => {
                        const resp = {
                            user: {
                                Id: doc._id,
                                Email: doc.user_email,
                                Password: doc.user_password,
                                Request: {
                                    type: 'GET',
                                    discription: 'Get user details uniquely..',
                                    url: `http://localhost:8000/user/signup/${doc._id}`
                                    
                                }
                            }
                        };
                        console.log(`success: ${doc}`);
                        res.status(200).json({
                            info: `Your data just successfully posted to the database..`,
                            success: resp
                        });
                    })
                    .catch(err => {
                        console.log(`Error: ${err.message}`);
                        res.status(500).json({
                            Error: {
                                error: err.message
                            }
                        });
                    });
                }
            });
        }
    })
};


//Deleting Data From The DataBase-------------------------------------------------->
exports.signup_delete_post = (req, res, next) => {
    const userId = req.params.id;
    User.findByIdAndRemove({_id: userId})
    .exec()
    .then(doc => {
        const resp = {
            request: {
                type: 'POST',
                discription: 'check out the link bellow to make signup to user..',
                url: `http://localhost:9090/user/signup`
            }
        };
        console.log(`success: you just requested to DELETE some data which has id ${userId}`);
        res.status(200).json({
            info: `you just requested to DELETE a user whose id was ${userId}`,
            success: resp
        });

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



//Patching Some Data In The DataBase-------------------------------------------------->
exports.signup_patch_post = (req, res, next) => {
    const userId = req.params.id;
    User.find({user_email: req.body.emailId})
    .exec()
    .then(doc_email => {
        if(doc_email.length >= 1) {
            console.log(`Error: email id already exist..`);
            res.status(404).json({
                Error: {
                    message: `entered email already found in the collection`
                }
            });
        }
        else {
            User.findByIdAndUpdate({_id: userId}, req.body)
            .exec()
            .then(doc => {
                const resp = {
                    request: {
                        type: 'GET',
                        discription: 'check out the link bellow to look user detail you just updated..',
                        url: `http://localhost:9090/user/signup/${doc._id}`
                    }
                };
                console.log(`success: you just requested to UPDATE a user whose id is ${userId}`);
                res.status(201).json({
                    message: `you just requested to UPDATE a user whose id is ${userId}`,
                    success: resp
                });
            })
            .catch(err => {
                console.log(`Error: ${err.message}`);
                res.status(500).json({
                    Error: {
                        error: err.message
                    }
                });
            });
        }
    })
};

//Getting Data Uniquely Through Params---------------------------------------------->
exports.signup_get_unique = (req, res, next) => {
    const userId = req.params.id;
    User.findById({_id: userId})
    .select('_id user_email user_password')
    .exec()
    .then(doc => {
        const resp = {
            id: doc._id,
            email: doc.user_email,
            password: doc.user_password,
            request: {
                type: 'GET',
                discription: 'check out the link bellow to get all users..',
                url: `http://localhost:8000/user/signup`
            }
        };
        console.log(`success: you just requested to get the unique user..`);
        res.status(200).json({
            info: `you just requested to get the unique user from the collection`,
            success: resp
        });
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