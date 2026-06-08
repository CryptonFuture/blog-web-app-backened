import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
    }
})

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
    },

    description: {
         type: String,
    },

    subCategories: [subCategorySchema]
}, {
    timestamps: true
})

export default mongoose.model('Category', CategorySchema)