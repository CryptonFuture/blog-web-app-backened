import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    moduleCode: {
        type: String, 
    },

    moduleType: {
        type: String,
    },

    moduleName: {
        type: String,
    },

}, {
    timestamps: true
})

export default mongoose.model('Module', moduleSchema)

