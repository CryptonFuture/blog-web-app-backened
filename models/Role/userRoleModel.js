import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roles"
    },

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
    },

}, {
    timestamps: true
});

export default mongoose.model("UserRole", userRoleSchema);
