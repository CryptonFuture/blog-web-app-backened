import mongoose  from 'mongoose'

const contactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    contact_no: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    status: {
        type: Boolean,
        default: 0
    },

    is_deleted: {
        type: Boolean,
        default: 0
    }

}, {
    timestamps: true
})

export default mongoose.model('ContactUs', contactUsSchema)