import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    confirmPass: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        default: null 
    },

    address: {
        type: String,
        default: null 
    },

    role: {
        type: Number,
        enum: [0, 1, 2, 3, 4], // user = 0, admin = 1, superAdmin = 2, subAdmin = 3, approver = 4
        default: 0
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

    image: {
        type: String,
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
    }

}, {
    timestamps: true
})

export default mongoose.model('User', authSchema)

