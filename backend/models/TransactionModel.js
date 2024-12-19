const { Schema, model } = require('mongoose');
const { stringify } = require('uuid');

const transactionSchema = new Schema(
    {
        order_id: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: true
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        razorpay_payment_id: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        payment_mode: {
            // 0 -> COD, 1 -> Razorpay, 2 -> Other Online Methods
            type: Boolean,
            required: true
        },
        payment_status: {
            // 0 -> Pending, 1 -> Successful, 2 -> Failed, 3 -> Refunded
            type: Boolean,
            // enum: [0, 1, 2, 3],
            default: true
        },
    },
    {
        timestamps: true // Automatically add `createdAt` and `updatedAt`
    }
);

const TransactionModel = model('Transaction', transactionSchema);
module.exports = TransactionModel;
