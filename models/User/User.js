import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    address1: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        default: null
    },

    token: {
        type: String,
        default: null
    },

    refreshToken: {
        type: String,
        default: null
    },

    resetToken: { 
        type: String, 
        default: null
    },

    resetTokenExpiry: { 
        type: Date,
         default: null 
    },


    active: {
        type: Boolean,
        default: 0
    },

    is_admin: {
        type: Boolean,
        default: 0
    },

    is_login: {
        type: Boolean,
        default: 0
    },

    is_deleted: {
        type: Boolean,
        default: 0
    },

     created_by: {
        type: String,
        default: null
    },

    updated_by: {
        type: String,
        default: null
    },

    expiryAt: {
        type: Date
    }
}, { timestamps: true });

export default mongoose.model('OnBoardingUser', userSchema);
