const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
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

    // validation
    if(!email || !password){
        throw Error("All fields must be filled");
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not valid");
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password not strong enough");
    }

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
