import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
    pageName: {
        type: String,
        required: true
    },

    description: {
        type: String,
    },

    pageUrl: {
        type: String,
        required: true
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

export default mongoose.model('Page', pageSchema)

