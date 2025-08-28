import mongoose from "mongoose";

const rolesSchema = new mongoose.Schema({
    name: {
        type: String
    },

    role: {
        type: Number
    },

    description: {
        type: String
    },

}, {
    timestamps: true
})

export default mongoose.model('Roles', rolesSchema)

