const User = require('../model/user')
const bcrypt = require('bcrypt')

module.exports.signup = async (req, res) => {
    const {mobile_number, password} = req.body;
    try {
        const existinguser = await User.findOne({mobile_number})
        if (existinguser) {
            return res.status(400).json('Centers already exist..')
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({...req.body, password: hashPassword});
        await newUser.save();
        res.status(200).json(newUser)
    } catch (err) {
        console.log(err.message)
        res.status(500).json('Something went worng...')
    }
}

module.exports.login = async (req, res) => {
    const {mobile_number, password} = req.body;
    try {
        var existinguser = await User.findOne({mobile_number})
        if (!existinguser) {
            console.log("User not found...");
            return res.status(404).json("User not found...")
        }
        const isPasswordCrt = await bcrypt.compare(password, existinguser.password)
        if (!isPasswordCrt) {
            return res.status(400).json("Password Incorrect")
        }
        res.status(200).json(existinguser)
    } catch (err) {
        res.status(500).json(err.message)
    }
}


