const Course = require('../models/course_model');
const mongoose = require('mongoose');

//Posting Some Data To The DataBase-------------------------------------------------------->
exports.post_some = (req, res, next) => {
    
    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        course_name: req.body.course,
        course_duration: req.body.duration,
        course_fee: req.body.fee,
        offeredby: req.body.offeredby
    });
    course
    .save()
    .then(doc => {
        const resp = {
            course: {
                id: doc._id,
                course: doc.course_name,
                offeredBy: doc.offeredby,
                request: {
                    type: 'GET',
                    discription: `check out the link bellow to get more detail..`,
                    url: `http://localhost:8000/user/courses/${doc._id}`
                }
            }
        };
        console.log(`success: you just post some data successfully..`);
        res.status(200).json({
            info: `you just successfully POST some data to the database..`,
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



//Getting All Data From The DataBase------------------------------------------------------->
exports.get_all = (req, res, next) => {

    Course.find()
    .select(' _id course_name offeredby')
    .exec()
    .then(courses => {
        if(courses.length < 1) {
            console.log(`Error: courses not found..`);
            res.status(404).json({
                Error: {
                    message: `courses not found..`
                }
            });
        }
        else {
            const resp = courses.map(course => {
                return {
                    id: course._id,
                    course: course.course_name,
                    offeredBy: course.offeredby,
                    request: {
                        type: 'GET',
                        discription: `check out the link bellow to get more detail`,
                        url: `http://localhost:8000/user/courses/${course._id}`
                    }
                }
            });
            console.log(`success: you just successfully had the whole detail... `);
            res.status(200).json({
                info: `you just requested to GET all detail of the courses..`,
                success: resp
            });
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



//Getting Unique Data From The DataBase---------------------------------------------------->
exports.get_unique = (req, res, next) => {

    const courseId = req.params.id;
    Course.findById({_id: courseId})
    .select('_id course_name course_duration course_fee offeredby')
    .exec()
    .then(course => {
        if(!course) {
            console.log(`Error: course not found..`);
            res.status(404).json({
                Error: {
                    message: `course not found..`
                }
            });
        }
        else {
            const resp = {
                id: course._id,
                course: course.course_name,
                duration: course.course_duration,
                fee: course.course_fee,
                offeredBy: course.offeredby,
                request: {
                    type: 'GET',
                    discription: `check out the link bellow to get all detail..`,
                    url: `http://localhost:8000/user/courses`
                }
            };
            console.log(`success: you just requested to get unique detail..`);
            res.status(200).json({
                info: `you just requested to GET unique detail..`,
                success: resp
            });
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



//Delete Some Data From The DataBase---------------------------------------------------->
exports.delete_some = (req, res, next) => {

    const courseId = req.params.id;
    Course.remove({_id: courseId})
    .exec()
    .then(doc => {
        const resp = {
            info: `you just requested to DELETE the course ${doc.course_name} which had the id ${doc._id}`,
            request: {
                type: 'POST',
                discription: `let's make another course detail..`,
                url: `http://localhost:8000/user/courses`
            }
        };
        console.log(`success: you just delete some data of id ${doc._id}`);
        res.status(200).json({
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



//Patch Some Data In The DataBase----------------------------------------------------------->
exports.patch_some = (req, res, next) => {

    const courseId = req.params.id;
    Course.update({_id: courseId}, req.body)
    .exec()
    .then(course => {
        const resp = {
            info: `you just requested to UPDATE some data which has id ${course._id}`,
            request: {
                type: 'GET',
                discription: 'check out the link bellow to get the data you just updated',
                url: `http://localhost:8000/user/courses/${courseId}`
            }
        };
        console.log(`success: you just requested to update the data which has id ${course._id}`);
        res.status(200).json({
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


