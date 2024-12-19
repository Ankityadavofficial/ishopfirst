const { Schema, model, default: mongoose } = require('mongoose');

const productDetailsSchema = new Schema(
    {
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
    },
    {
        _id: false
    }
);

const shippingDetailsSchema = new Schema(
    {
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: {
            type: String,
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        landmark: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        },
    },
    {
        _id: false
    }
);

const orderSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        product_details: {
            type: [productDetailsSchema],
            required: true
        },
        order_total: {
            type: Number,
            required: true
        },
        // processing_fee: {
        //     type: Number,
        //     required: true
        // },
        payment_mode: { // 0-> COD, 1-> for online
            type: Boolean,
            required: true
        },
        razorpay_order_id: {
            type: String,
            default: null
        },
        razorpay_payment_id: {
            type: String,
            default: null
        },
        order_status: {
            // Assuming 0 to 7 are differet stauts codes 0-> order placed, 1- din
            type: Number,
            enum: [0, 1, 2, 3, 4, 5, 6, 7],
            default: 0
        },
        shipping_details: {
            type: shippingDetailsSchema,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const OrderModel = model('Order', orderSchema);
module.exports = OrderModel;

