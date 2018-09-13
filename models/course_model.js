const mongoose = require('mongoose');
const schema = mongoose.Schema;

const courseSchema = new schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    course_name: {
        type: String,
        required: [true, 'course name is required..']
    },
    course_duration: {
        type: String,
        required: [true, 'course duration is required...']
    },
    course_fee: {
        type: String,
        required: [true, 'course fee is required...']
    },
    offeredby: {
        type: String,
        required: [true, 'not found the place which you like to learn in']
    }
});





module.exports = mongoose.model('Course', courseSchema);