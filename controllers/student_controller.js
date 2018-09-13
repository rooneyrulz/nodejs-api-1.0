const Student = require('../models/student_model');
const mongoose = require('mongoose');
const Course = require('../models/course_model');


//Posting Some details...................................................................>
exports.post_some = (req, res, next) => {
    Course.findById({ _id: req.body.courseId })
        .exec()
        .then(doc_course => {
            Student.find({ student_email: req.body.email })
                .exec()
                .then(doc_email => {
                    if (doc_email.length >= 1) {
                        console.log(`Error: Email id already exist..`);
                        res.status(404).json({
                            Error: {
                                message: `duplicate email id found..`
                            }
                        });
                    } else {
                        Student.find({ student_contact_number: req.body.contact_number })
                            .exec()
                            .then(doc_contact => {
                                if (doc_contact.length >= 1) {
                                    console.log(`Error: contact number already exist..`);
                                    res.status(404).json({
                                        Error: {
                                            message: `duplicate contact number found..`
                                        }
                                    });
                                } else {
                                    Student.find({ credit_card_number: req.body.creditcard_number })
                                        .exec()
                                        .then(doc_card => {
                                            if (doc_card.length >= 1) {
                                                console.log(`Error: credit card number already exist..`);
                                                res.status(404).json({
                                                    Error: {
                                                        message: `duplicate credit card number found..`
                                                    }
                                                });
                                            } else {
                                                const student = new Student({
                                                    _id: new mongoose.Types.ObjectId(),
                                                    student_name: req.body.name,
                                                    student_age: req.body.age,
                                                    student_email: req.body.email,
                                                    student_contact_number: req.body.contact_number,
                                                    student_country: req.body.country,
                                                    credit_card_number: req.body.creditcard_number,
                                                    student_info: req.body.info,
                                                    course_id: req.body.courseId

                                                });
                                                return student
                                                    .save()
                                                    .then(doc => {
                                                        const resp = {
                                                            id: doc._id,
                                                            name: doc.student_name,
                                                            email: doc.student_email,
                                                            country: doc.student_country,
                                                            courseId: doc.course_id,
                                                            request: {
                                                                type: 'GET',
                                                                discription: 'check out the link bellow to get more detail..',
                                                                url: `http://localhost:8000/user/students/${doc._id}`
                                                            }
                                                        };
                                                        console.log(`you just requested to post some data..`);
                                                        res.status(200).json({
                                                            info: `you just requested to post some data..`,
                                                            success: resp
                                                        });
                                                    })
                                                    .catch(err => {
                                                        console.log(`Error: ${err.message}`);
                                                        res.status(500).json({
                                                            Error: {
                                                                message: err.message
                                                            }
                                                        });
                                                    });
                                            }
                                        })
                                }
                            })
                    }
                })
        })
        .catch(err => {
            console.log(`Error: invailid course id..`);
            res.status(500).json({
                Error: {
                    message: `invailid course id found..`,
                    error: err.message
                }
            });
        });
};


//Getting All Data From The DataBase--------------------------------------------------->
exports.get_all = (req, res, next) => {
    Student.find()
        .select('_id student_name student_email student_country course_id')
        .exec()
        .then(students => {
            if (students.length < 1) {
                console.log(`Error: data not found..`);
                res.status(404).json({
                    Error: {
                        message: `data not found..`
                    }
                });
            } else {
                const resp = students.map(student => {
                    return {
                        id: student._id,
                        name: student.student_name,
                        email: student.student_email,
                        country: student.student_country,
                        courseId: student.course_id,
                        request: {
                            type: 'GET',
                            discription: 'check out the link bellow to get more detail..',
                            url: `http://localhost:8000/user/students/${student._id}`,
                        }
                    }
                });
                console.log(`success: you just requested to get all data from the database..`);
                res.status(200).json({
                    info: 'you just requested to get all data from the database..',
                    success: resp
                });
            }
        })
        .catch(err => {
            console.log(`Error: ${err.message}`);
            res.status(500).json({
                Error: {
                    message: err.message
                }
            });
        });
};



//Getting Data From The DataBase Using Params------------------------------------------->
exports.get_unique = (req, res, next) => {
    const studentId = req.params.id;
    Student.findById({ _id: studentId })
        .select('_id student_name student_age student_email student_contact_number student_country credit_card_number student_info course_id')
        .exec()
        .then(doc => {
            if (doc.length < 1) {
                console.log(`Error: data not found..`);
                res.status(404).json({
                    Error: {
                        message: `data not found..`
                    }
                });
            } else {
                const resp = {
                    id: doc._id,
                    name: doc.student_name,
                    age: doc.student_age,
                    email: doc.student_email,
                    contact_number: doc.student_contact_number,
                    country: doc.student_country,
                    creditcard_number: doc.credit_card_number,
                    info: doc.student_info,
                    courseId: doc.course_id,
                    request: {
                        type: 'GET',
                        discription: `check out the link bellow to get all student detail..`,
                        url: `http://localhost:9090/user/students`,
                        course: {
                            type: 'GET',
                            discription: `check out the link bellow to get course detail..`,
                            url: `http://localhost:8000/user/courses/${doc.course_id}`
                        }
                    }

                };
                console.log(`success: you just requested to get data uniquely..`);
                res.status(200).json({
                    info: `you just requested to get unique student detail..`,
                    success: resp
                });
            }
        })
        .catch(err => {
            console.log(`Error: ${err.message}`);
            res.status(500).json({
                Error: err.message
            });
        });
};



//Delete Some Data From The DataBase--------------------------------------------------->
exports.delete_some = (req, res, next) => {
    const studentId = req.params.id;
    Student.findByIdAndRemove({ _id: studentId })
        .exec()
        .then(doc => {
            const resp = {
                request: {
                    type: 'GET',
                    discription: 'check out the link bellow to make another  post request',
                    url: `http://localhost:8000/user/student`,
                    body: {
                        student_name: 'your name..',
                        student_age: 'your age..',
                        student_email: 'your email address..',
                        student_country: 'your country..',
                        student_contact_number: 'your contact number..',
                        credit_card_number: 'your credit card number..',
                        student_info: 'some information about you..',
                        course_id: 'id of the course which you like to follow..'
                    }
                }
            };
            console.log(`success: you just requested to delete some data..`);
            res.status(200).json({
                info: `you just requested to delete the details of student who had the id of ${doc._id}`,
                success: resp
            });
        })
        .catch(err => {
            console.log(`Error: ${err.message}`);
            res.status(500).json({
                Error: {
                    message: err.message
                }
            });
        });
};


//Update Some Data On The DataBase-------------------------------------------------->
exports.update_some = (req, res, next) => {
    const studentId = req.params.id;
    Student.find({ student_email: req.body.student_email })
        .exec()
        .then(doc_email => {
            if (doc_email.length >= 1) {
                console.log(`Error: email id already exist..`);
                res.status(404).json({
                    Error: {
                        message: `email address already exist..`
                    }
                });
            } else {
                Student.find({ student_contact_number: req.body.student_contact_number })
                    .exec()
                    .then(doc_contact => {
                        if (doc_contact >= 1) {
                            console.log(`Error: contact number already exist..`);
                            res.status(404).json({
                                Error: {
                                    message: `contact number already found in your collection`
                                }
                            });
                        } else {
                            Student.find({ credit_card_number: req.body.credit_card_number })
                                .exec()
                                .then(doc_card => {
                                    if (doc_card >= 1) {
                                        console.log(`Error: credit card id already found in your collection`);
                                        res.status(404).json({
                                            Error: {
                                                message: `your credit card id already found in your collection`
                                            }
                                        });
                                    } else {
                                        Student.findByIdAndUpdate({ _id: studentId }, req.body)
                                            .exec()
                                            .then(doc => {
                                                const resp = {
                                                    request: {
                                                        type: 'GET',
                                                        discription: 'check out the link bellow to look the detail you just updated',
                                                        url: `http://localhost:8000/user/student/${doc._id}`
                                                    }
                                                };
                                                console.log(`success: you just requested to update some date in the database..`);
                                                res.status(200).json({
                                                    info: `you just requested to update some detail in the database..`,
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