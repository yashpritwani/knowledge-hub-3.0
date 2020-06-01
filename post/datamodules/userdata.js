var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ypritwani:Yash2904%40@knowledgehub-database-zu4vn.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
var conn = mongoose.connection;
var userSchema = new mongoose.Schema({
    name: {type:String,
        required: true,
        index: {
            unique: true,
        },},
    email: {type:String,
        required: true,
        index: {
            unique: true,
        },},
    cno: Number,
    dob: Number,
    password: {type:String,
        required: true,
    },
    cpassword: {type:String,
        required: true,
    },
    // date: {
    //     default: Date.now() }
});
var userdata = mongoose.model('UserData', userSchema);
module.exports = userdata;
