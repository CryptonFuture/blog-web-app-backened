import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    routeName: {
        type: String,
        required: true
    },

    role: 
    [
        {
            type: Number,
            enum: [0, 1, 2, 3, 4]   
        }
        
    ],

    paramName: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    action: 
    [
        { 
            type: String, 
            enum: ["create", "read", "update", "delete"]   
        }
    ],

    status: {
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

} , {
    timestamps: true
})

export default mongoose.model('Permission', permissionSchema)

