import mongoose from "mongoose";

const logsConfigSchema = new mongoose.Schema({
    label: {
        type: String
    },

    field_name: {
        type: String
    },

    data_type: {
        type: String,
    },

    tracking_enabled: {
        type: Boolean,
    },

}, {
    timestamps: true
})

export default mongoose.model('LogsConfig', logsConfigSchema)

