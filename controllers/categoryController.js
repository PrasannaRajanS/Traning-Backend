const Category = require("../models/categoryModel");

class CategoryController {

    createCategory = async (req, res, next) => {
        try {
            const lastCategory = await Category.findOne({}, {}, { sort: { createdAt: -1 } });
            let nextCategoryId = 'CT0001';

            if (lastCategory) {
                const lastId = parseInt(lastCategory.categoryId.replace('CT', ''));
                const newId = lastId + 1;
                nextCategoryId = `CT${String(newId).padStart(4, '0')}`;
            }

            const category = new Category({
                ...req.body,
                categoryId: nextCategoryId
            });

            const savedCategory = await category.save();
            res.status(201).json({
                message: 'Category created successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    getAllCategory = async (req, res, next) => {
        const { page = 1, limit = 10 } = req.query;
        try {
            const categories = await Category.find({})
                .skip((page - 1) * limit)
                .limit(parseInt(limit));
            const totalCategories = await Category.countDocuments();

            res.json({
                total: totalCategories,
                page: parseInt(page),
                limit: parseInt(limit),
                categories
            });
        } catch (error) {
            next(error);
        }
    }

    getCategoryById = async (req, res, next) => {
        const { categoryId } = req.params;
        try {
            const category = await Category.findOne({categoryId});
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json(category);
        } catch (error) {
            next(error);
        }
    }

    updateCategory = async (req, res, next) => {
        const { categoryId } = req.params;
        try {
            const updatedCategory = await Category.findOneAndUpdate(
                {categoryId},
                req.body,
                { new: true }
            );
            if (!updatedCategory) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json({
                message: 'Category updated successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    deleteCategory = async (req, res, next) => {
        const { categoryId } = req.params;
        try {
            const updatedCategory = await Category.findOneAndUpdate(
                { categoryId },
                { $set: { isActive: false } },
                { new: true }
            );
            if (!updatedCategory) {
                return res.status(404).json({ error: 'Category ID is required'  });
            }
            res.json({
                message: 'Category deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CategoryController();
