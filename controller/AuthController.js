const AuthModel = require("../model/Auth");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config()
const jwtkey = process.env.jwt_key;

const test = async (req, res) => {
    const user = req.user;
    console.log(user);
    res.send("done");
}

const authLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existuser = await AuthModel.findOne({ username: username })
        if (!existuser) {
            return res.status(200).json({
                data: {
                    status: false,
                    msg: "username or password is invalid"
                }
            })
        }

        const match = await bcrypt.compare(password, existuser.password);
        if (match) {
            const data = {
                id: existuser._id,
                name: existuser.username,
                email: existuser.email,
                type: existuser.userType,
            }
            const token = jwt.sign(data, jwtkey);
            return res.status(200).json({
                data: {
                    status: true,
                    msg: "login sucessful...",
                    token: token
                }
            })
        }

        return res.status(200).json({
            data: {
                status: false,
                msg: "username or password is invalid"
            }
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            data: {
                status: false,
                msg: err
            }
        })
    }
}

const authSignup = async (req, res) => {
    try {
        const { username, password, email, userType, mobileNo ,fullName} = req.body;

        const userexist = await AuthModel.findOne({ username: username });
        if (userexist) {
            return res.status(200).json({
                data: {
                    status: false,
                    msg: "Username Already Exists"
                }
            })
        }
        const emailExist = await AuthModel.findOne({ email: email });
        if (emailExist) {
            return res.status(200).json({
                data: {
                    status: false,
                    msg: "Email Already Exists"
                }
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new AuthModel({
            username: username,
            password: hashedPassword,
            fullName:fullName,
            email: email,
            userType: userType,
            mobileNo: mobileNo,
          
        })
        await user.save()

        return res.status(200).json({
            data: {
                status:200,
                msg: "Account Created Successfully"
            }
        })
    } catch (err) {
        console.log(err);

        return res.status(400).json({
            data: {
                status: false,
                msg: err
            }
        })
    }
}

module.exports = { authLogin, authSignup, test } 