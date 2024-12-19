const { Schema, model, default: mongoose } = require('mongoose');

const cartSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1, // Ensures at least 1 item is in the cart
        default: 1
    }
}, { timestamps: true });

const CartModel = model('Cart', cartSchema);

module.exports = CartModel;
