const mongodb = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {config} = require('dotenv');
config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;


const userSchema = new mongodb.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    token: {type: String}
},
{typestamps: true}
);

const User = mongodb.model("User",userSchema);

const createUser = async({first_name, last_name, email, password}) => {
    try {
        if(!first_name.trim() || !last_name.trim() || !email.trim() || !password.trim()){
            return {
                status: false,
                message: "Please enter all the values"
            }
        }
        const existedUser = await User.findOne({email: email});
        if(existedUser){
            return {
                status: false,
                message: "User already existed !"
            }
        }
        const encreptedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password: encreptedPassword
        });
        if(newUser){
            return {
                status: true,
                message: "User created successfully",
                result: {
                    first_name: newUser.first_name,
                    last_name: newUser.last_name,
                    email: newUser.email
                }
            }
        }
        return {
            status: false,
            message: "Enable to create user"
        }
    } catch (error) {
        return {
            status: false,
            message: "Something wen't wrong"
        }
    }
}

const loginUser = async({email, password}) => {
    if(!email.trim() || !password.trim()){
        return {
            status: false,
            message: "Please enter all the values"
        }
    }
    try {
        const existedUser = await User.findOne({email});
        if(existedUser){
            const checkPassword = await bcrypt.compare(password, existedUser.password);
            if(checkPassword){
                const token = jwt.sign({userId: existedUser._id}, JWT_SECRET,{
                    expiresIn: JWT_EXPIRES_IN
                });
                existedUser.token = token
                await existedUser.save();
                return {
                    status: true,
                    message: "Login Successfully",
                    result: {
                        first_name: existedUser.first_name,
                        last_name: existedUser.last_name,
                        email: existedUser.email,
                        token: existedUser.token,
                        id: existedUser.id
                    }
                }
            }
            return {
                status: false,
                message: "Password is incorrect"
            }
        }
        return {
            status: false,
            message: "User is not existed"
        }
    } catch (error) {
        return {
            status: false,
            message: "Something wen't wrong"
        }
    }
}

module.exports = {User, createUser, loginUser}