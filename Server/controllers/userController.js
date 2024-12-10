const User = require("../models/userModel")
const bcrypt = require("bcrypt")

module.exports.register = async (req,res,next)=>{
    try {
        const {username,email,password} = req.body
        const usernameCheck = await User.findOne({username})
        if(usernameCheck){
            return res.json({
                status:false,
                message:"username already exists",
            })
        }
        const emailCheck = await User.findOne({email})
        if(emailCheck){
            return res.json({
                status:false,
                message:"email already exists",
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const userCreated = await User.create({
            username,
            email,
            password:hashedPassword,
        })

        delete userCreated.password;
        return res.json({
            status:true,
            userCreated,
        })
    } catch (error) {
        next(error)
    }
}