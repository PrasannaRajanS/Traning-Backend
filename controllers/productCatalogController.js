const ProductCatalog = require("../models/ProductCatalogModel");

class ProductCatalogController {

    createProduct = async (req, res, next) => {

        try {
            const lastProduct = await ProductCatalog.findOne({}, {}, { sort: { createdAt: -1 } });
            let nextProductId = 'PD0001';

            if (lastProduct) {
                const lastId = parseInt(lastProduct.productId.replace('PD', ''));
                const newId = lastId + 1;
                nextProductId = `PD${String(newId).padStart(4, '0')}`;
            }

            const product = new ProductCatalog({
                ...req.body,
                productId: nextProductId
            });

            const savedProduct = await product.save();
            res.status(201).json({ message: 'Create Successfully' });
        } catch (error) {
            next(error);
        }
    }

    getAllProducts = async (req, res, next) => {

        try {
            const products = await ProductCatalog.find({});
            res.json(products);
        } catch (error) {
            next(error);
        }

    }

    getProductById = async (req, res, next) => {
        const { id } = req.params;
        try {
            const product = await ProductCatalog.findById(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    updateProduct = async (req, res, next) => {
        const { id } = req.params;
        try {
            const updatedProduct = await ProductCatalog.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(updatedProduct);
        } catch (error) {
            next(error);
        }
    }

    deleteProduct = async (req, res, next) => {
        const { id } = req.params;
        try {
            const deletedProduct = await ProductCatalog.findByIdAndDelete(id);
            if (!deletedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(204).json({ message: 'Deleted Successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductCatalogController();
