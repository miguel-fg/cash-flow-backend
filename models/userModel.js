const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

// user model
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// static signup method
userSchema.statics.signup = async function(email, password) {
    const exists = await this.findOne({ email }); //check for existing email

    if(exists) {
        throw Error("Email already in use");
    }

    //random string added to password
    const salt = await bcrypt.genSalt(10);
    
    //hash and store the value to the db    
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hash });

    return user;
}

module.exports = mongoose.model("User", userSchema);
