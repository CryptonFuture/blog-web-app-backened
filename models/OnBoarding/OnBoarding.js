import mongoose from 'mongoose';

const onBoardingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    group: {
        type: String,

    },
    add: {
        type: Boolean,
    },
    update: {
        type: Boolean,
    },
    view: {
        type: Boolean,
    },
    delete: {
        type: Boolean,
    },
    full: {
        type: Boolean,
    }
}, { timestamps: true });

export default mongoose.model('OnBoarding', onBoardingSchema);
