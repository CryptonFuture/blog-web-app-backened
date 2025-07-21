import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
   
    routeName: {
        type: String,
        required: true
    },

    status: {
        type: Boolean,
        default: false
    },

    paramName: {
        type: String,
        required: true
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

    iconName: {
        type: String
    },

    iconName2: {
        type: String 
    }

}, {
    timestamps: true
}) 

export default mongoose.model('Dashboard', dashboardSchema)

