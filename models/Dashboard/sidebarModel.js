import mongoose from "mongoose";

const sidebarSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true
    },

    status: {
        type: Boolean,
        default: false
    },

    role: {
        type: [Number],
        enum: [0, 1, 2, 3, 4], // user = 0, admin = 1, superAdmin = 2, subAdmin = 3, approver = 4
        default: [0]
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

}, {
    timestamps: true
}) 

export default mongoose.model('Sidebar', sidebarSchema)

