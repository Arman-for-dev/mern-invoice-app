import bcrypt from 'bcryptjs';
import "dotenv/config";

import mongoose, {Schema, model} from 'mongoose';
import validator, { trim } from "validator";
import { USER } from '../constants.js';
import isEmail from 'validator/lib/isEmail';


const userSchema = new Schema({
    email:{
        type: String,
        lowercase: trim,
        unique: true,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },

    username:{
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        validate: {
            validator: function(value){
                return /^[A-z][A-z0-9-_]{3,23}$/.test(value);
            },
            message: "Username must be alphanumeric, without special characters. Hyphens and underscores allowed"
        }
    },
    firstName:{
        type:String,
        lowercase: true,
        trim: true,
        validate: [
            validator.isAlphanumeric, "First Name only have Alphanumeric value, No apecial charecters value"
        ]
    },
    lastName:{
        type:String,
        lowercase: true,
        trim: true,
        validate: [
            validator.isAlphanumeric, "Last Name only have Alphanumeric value, No apecial charecters value"
        ]
    },
    password: {
        type: String,
        select: false,
        validate: [
            validator.isStrongPassword, "Please must be at least 8 characters logn, with alest 1 uppercase and lowercase letters and at least i symble"
        ]
    },
    passwordConfirm:{
        type: String,
        validate: {
            validator: function (value){
                return value === this.password;
            },
            message:"Password does not match!"
        }
    },
    isEmailVarified:{
        type: Boolean,
        required:true,
        default: false
    },
    provider: {
        type: String,
        required: true,
        default: "email"
    },
    googleId: String,
    avatar: String,
    phoneNumber:{
        type: String,
        default: "+1544524",
        validate: [
            validator.isMobilePhone,
            "Your moble phone number must begin with a '+', followed by your country code then actual number 3.g +5465145654 "
        ]
    },
    address: String,
    city: String,
    country: String,
    passwordChangedAt: Date,

    roles:{
        type: [String],
        default: true
    },
    active: {
        type: Boolean,
        default: true,
    },
    refreshToken: [String],
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if(this.roles.length === 0){
        this.roles.push(USER);
        next();
    }
});

userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    this.passwordConfirm = undefined;

    next()
});

userSchema.pre("save", async function(next){
    if(this.isModified("passoword") || this.isNew){
        return next();
    }

    this.passwordChangedAt = Date.now()
    next();
});

userSchema.methods.comparePassword = async function (givenPassowrd) {
    return await bcrypt.compare(givenPassowrd, this.password)
}

const User = model("User", userSchema);

export default User;










