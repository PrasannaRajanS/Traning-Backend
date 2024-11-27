const mongoose = require('mongoose');

const ProductCatalogSchema = new mongoose.Schema({
    productId: {
        type: String,
        unique: true
    },
    productName: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: 3,
    },
    productDescription: {
        type: String,
    },
    productPrice: {
        type: String,
        required: [true, "Price is required"],
        validate: {
            validator: function (v) {
                return /^\d+(\.\d{1,2})?$/.test(v);
            },
            message: props => `${props.value} is not a valid price!`
        }
    },
    productCategory: {
        type: String,
    },
    productStock: {
        type: String,
        required: [true, "Stock is required"],
        validate: {
            validator: function (v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} is not a valid stock quantity!`
        }
    },
    isActive: {
        type: Boolean,
        default: true,
    }
},
    { timestamps: true }
);

const Product = mongoose.model('ProductCatalog', ProductCatalogSchema);

module.exports = Product;
