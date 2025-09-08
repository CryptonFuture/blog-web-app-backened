import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
    }, 

    image: {
        type: String,
        default: null
    },

    postStatus: {
        type: String,
        enum: ['pending', 'inProcess', 'completed'],
        default: 'pending'
    },

    approved: {
        type: Boolean,
       default: false 
    },

    reject: {
       type: Boolean,
       default: false 
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

export default mongoose.model('Post', postSchema)

