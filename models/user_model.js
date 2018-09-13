const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({

    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    user_email: {
        type: String,
        required: [true, 'user email must be filled in correctly..!'],
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    user_password: {
        type: String,
        required: [true, 'user password must be filled correctly..!']
    }
});


module.exports = mongoose.model('User_signup', userSchema);