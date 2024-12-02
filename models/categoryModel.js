const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
    {
        categoryId: {
            type: String,
            unique: true
        },
        categoryName: {
            type: String,
            required: [true, "Category name is required"],
            trim: true,
            minlength: [6, "Category name must be at least 6 characters long"]
        },
        description: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

CategorySchema.index({ categoryId: 1, categoryName: 1 });

const Category = mongoose.model('category', CategorySchema);

module.exports = Category;
