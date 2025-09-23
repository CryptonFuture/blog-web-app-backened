import User from '../../models/Auth/authModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { isValidEmail } from '../../utils/utils.js'
import validator from 'validator'
import { generateAccessToken, generateRefreshToken } from '../../utils/utils.js'
import UserLogs from '../../models/Logs/LogsModel.js'
import crypto from "crypto";
import { sendEmail } from '../../helper/emailServices.js'

const register = async (req, res) => {
    const { firstname, lastname, email, password, confirmPass, role } = req.body

    if (!firstname || !lastname || !email || !password || !confirmPass) {
        return res.status(400).json({
            success: false,
            error: 'Please fill out all fields'
        })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid Email'
        })
    }

    const isExistUser = await User.findOne({ email })

    if (isExistUser) {
        return res.status(400).json({
            success: false,
            error: 'Email already exists has been taken'
        })
    } else if (password !== confirmPass) {
        return res.status(400).json({
            success: false,
            error: "Password does'nt match"
        })
    }

    if (password.length < 10 || confirmPass.length < 10) {
        return res.status(400).json({
            success: false,
            error: 'Password must be at least 10 characters long'
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const hashConfirmPass = await bcrypt.hash(confirmPass, 10)

    let imagePath = null;
    if (req.file) {
        imagePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const user = new User({
        firstname,
        lastname,
        email,
        password: hashPassword,
        confirmPass: hashConfirmPass,
        role,
        image: imagePath
    })

    const userData = await user.save()

    if (userData) {
        return res.status(200).json({
            success: true,
            message: "user create successfully",
            data: userData
        })
    }

     else {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

const login = async (req, res) => {
    const { email, password, role } = req.body;

  try {
  
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const expiresIn = 24 * 60 * 60 * 1000;
    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: expiresIn
    });

    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString(); 

    const users = await User.findOne({active: user.active})
    const admin = await User.findOne({is_admin: user.is_admin})

    if (!users.active) {
            return res.status(400).send({
                success: false,
                error: "This account is in-active, please contact your admin",
        });
    }

     if (admin.role === 1 && !admin.is_admin) {
            return res.status(400).send({
                success: false,
                error: "This account is not admin",
        });
    }
    

  
    const logs = new UserLogs({
        user_id: user._id,
        token: token,
        login_time: new Date()
    })

    await logs.save()

     if (parseInt(role, 10) !== user.role) {
      return res.status(403).json({
        success: false,
        error: "Role mismatch. Unauthorized login attempt."
      });
    }

     if (![0, 1, 2, 3, 4].includes(user.role)) {
        return res.status(403).json({
            success: false,
            error: "Unauthorized access: invalid role.",
        });
    }

    if (user.role === 0 || user.role === 1 || user.role === 2 || user.role === 3 || user.role === 4) {
    const users = await User.findByIdAndUpdate(
            { _id: user._id },
            { token: token },
            { new: true }
        )

         let message = "Login successfully";
            if (user.role === 0) {
                message = "User login successfully";
            } else if (user.role === 1) {
                message = "Admin login successfully";
            } else if (user.role === 2) {
                message = "superAdmin login successfully";
            } else if (user.role === 3) {
                message = "subAdmin login successfully";
            } else if (user.role === 4) {
                message = "Approver login successfully";
            }
             await users.save()
        
    res.json({ 
        success: true, 
        token,
        expiresAt,
        user: { 
            id: user._id, 
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            tokenType: 'Bearer',
            active: user.active ,
            role: user.role,
            is_admin: user.is_admin,
            image: user.image
        },
        message: message
         });
        }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(err, 'error');
    
    
  }

  
    // const { email, password } = req.body

    // try {
    //     if (!email || !password) {
    //         return res.status(400).json({
    //             success: false,
    //             error: 'Please fill out all fields'
    //         })
    //     }

    //     if (!validator.isEmail(email)) {
    //         return res.status(400).json({
    //             success: false,
    //             error: 'Invalid Email'
    //         })
    //     }

    //     const userData = await User.findOne({ email })

    //     if (!userData) {
    //         return res.status(400).json({
    //             success: false,
    //             error: 'email & password is incorrect!'
    //         })
    //     }

    //     const isPasswordMatch = await bcrypt.compare(password, userData.password)

    //     if (!isPasswordMatch) {
    //         return res.status(400).json({
    //             success: false,
    //             error: "email & password is incorrect!",
    //         })
    //     }

    //     const accessToken = await generateAccessToken({ user: userData })
    //     const refreshToken = await generateRefreshToken({ user: userData })

    //     // res.cookie('accessToken', accessToken, {
    //     //     httpOnly: true,
    //     //     maxAge: 24 * 60 * 60 * 1000,
    //     // })

    //     // res.cookie('refreshToken', refreshToken, {
    //     //     httpOnly: true,
    //     //     maxAge: 24 * 60 * 60 * 1000,
    //     // })

    //     const user = await User.findOne({ active: userData.active })

    //     const logs = new UserLogs({
    //         user_id: userData._id,
    //         token: accessToken
    //     })

    //     await logs.save()

    //     const users = await User.findByIdAndUpdate(
    //         { _id: userData._id },
    //         { token: accessToken, refreshToken: refreshToken },
    //         { new: true }
    //     )

    //     if (!user.active) {
    //         return res.status(400).send({
    //             success: false,
    //             error: "This account is in-active, please contact your admin",
    //         });
    //     }

    //     const authUser = await users.save()


    //     return res.status(200).json({
    //         success: true,
    //         message: 'login successfully',
    //         data: authUser,
    //         accessToken: accessToken,
    //         refreshToken: refreshToken
    //     });

    // } catch (error) {
    //     return res.status(500).json({
    //         success: false,
    //         message: "Internal server error",
    //     })
    // }

}

const logout = async (req, res) => {

    const { id } = req.query

    if (!id) {
        return res.status(400).json({ success: false, error: "User ID is required for logout." });
    }

    const data = await User.updateOne(
            { _id: id },
            { $set: { token: null } },
        )

        await UserLogs.updateMany(
            { user_id: id, logout_time: null },
            { $set: { token: null, logout_time: new Date() } }
        );


    if (data.nModified === 0) {
            return res.status(404).json({ success: false, error: "User not found or already logged out." });
    }

    return res.status(200).json({ success: true, message: "Successfully logged out." });
}

const forgotPassword = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) 
    return res.status(404).json({ 
        success: false, 
        error: "User not found" 
    });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; 
    await user.save();

    const resetLink = `http://127.0.0.1:5501/reset-password.html?token=${resetToken}`;

    sendEmail(user.email, "Account created", resetLink);

    return res.json({ 
        success: true, 
        message: "Password reset link sent to your email" 
    });

}

const resetPassword = async (req, res) => {
    const { token } = req.query

    const { password } = req.body;

     const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) 
        return res.status(400).json({ 
            success: false, 
            error: "Invalid or expired token" 
    });

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    return res.json({ 
        success: true, 
        message: "Password reset successfully" 
    });
}    


export {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword
}