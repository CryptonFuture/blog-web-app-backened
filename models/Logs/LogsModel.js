import mongoose from "mongoose";

const logsSchema = new mongoose.Schema({
    user_id: {
        type: String,
    },

    login_time: {
        type: Date,
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

