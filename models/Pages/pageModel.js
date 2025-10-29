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

   moduleCode: {
        type: String,
        default: 'page001'
    },

     moduleType: {
        type: String,
        default: 'p'
    },

    moduleName: {
        type: String,
        default: 'page'
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

