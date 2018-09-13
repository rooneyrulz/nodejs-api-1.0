const mongoose = require('mongoose');
const schema = mongoose.Schema;


const studentSchema = new schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    student_name: {
        type: String,
        required: [true, 'student name must contain..']
    },
    student_age: {
        type: Number,
        required: [true, 'student age must contain..']
    },
    student_email: {
        type: String,
        required: [true, 'student email must be filled in..'],
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    student_contact_number: {
        type: Number,
        required: [true, 'contact number is not found'],
        unique: true
    },
    student_country: {
        type: String,
        default: 'America',
        required: [true, 'just fill student country..']
    },
    credit_card_number: {
        type: Number,
        required: [true, 'credit card number is not found..'],
        unique: true
    },
    student_info: {
        type: String
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'course id not found..']
    }
});



module.exports = mongoose.model('Student', studentSchema);