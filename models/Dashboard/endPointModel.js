import mongoose from "mongoose";

const endPointModelSchema = new mongoose.Schema({
   
    ePGetEndPointName: {
        type: [String],
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

export default mongoose.model('EndPoint', endPointModelSchema)

