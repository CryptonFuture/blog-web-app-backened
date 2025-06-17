import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    tagName: {
        type: String,
        required: true
    },

    description: {
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

export default mongoose.model('Tag', tagSchema)

