import mongoose from "mongoose";

const logsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        default: null
    },

    login_time: {
        type: String,
        default: new Date().getTime()
    },

    logout_time: {
        type: String,
        default: null
    },

    token: {
        type: String,
    },

}, {
    timestamps: true
})

export default mongoose.model('UserLogs', logsSchema)

