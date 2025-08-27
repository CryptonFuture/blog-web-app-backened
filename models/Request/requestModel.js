import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        default: null
    },

    reqInfo: {
        type: String,
    },

    addInfo: {
        type: String,
    },

    status: {
        type: Boolean,
        default: false
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

export default mongoose.model('Request', requestSchema)

