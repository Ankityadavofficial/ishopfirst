const { generatedSignature } = require("../helper");
const CartModel = require("../models/CartModel");
const OrderModel = require("../models/OrderModel");
const Razorpay = require('razorpay');
const TransactionModel = require("../models/TransactionModel");
const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/UserModel");

var instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


class OrderController {


    placeOrder(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const cart = await CartModel.find({ user_id: data.user_id }).populate('product_id');
                    const product_details = cart.map(
                        (c) => {
                            return {
                                product_id: c.product_id,
                                quantity: c.quantity,
                                price: c.product_id.final_price,
                                total: (c.quantity * c.product_id.final_price)
                            }
                        }
                    )

                    const order = new OrderModel({
                        user_id: data.user_id,
                        product_details: product_details,
                        order_total: data.order_total,
                        payment_mode: data.payment_type,
                        shipping_details: data.shipping_details
                    })
                    order.save()
                        .then(
                            async (success) => {
                                await CartModel.deleteMany({ user_id: data.user_id });
                                if (data.payment_type == 0) {
                                    //EMAIL and SMS
                                    res({
                                        mag: 'Order placed successfully',
                                        order_id: order._id,
                                        status: 1
                                    })
                                } else {
                                    //1. Create an order on razorpay
                                    //2. Send respone to client for payment collection    
                                    const paymentOptions = {
                                        amount: data.order_total * 100,
                                        currency: 'INR',
                                        receipt: order._id
                                    }
                                    instance.orders.create(
                                        paymentOptions,
                                        (error, razorpay_order) => {
                                            if (error) {
                                                rej({
                                                    msg: 'unable to initiate payment ',
                                                    status: 0
                                                })
                                            } else {
                                                const razorpayOrderId = razorpay_order.id
                                                OrderModel.updateOne(
                                                    { _id: order._id },
                                                    {
                                                        $set: {
                                                            razorpay_order_id: razorpayOrderId
                                                        }
                                                    }
                                                ).then(
                                                    (success) => {
                                                        res({
                                                            msg: 'Payment initiated',
                                                            razorpayOrderId,
                                                            order_id: order._id,
                                                            status: 1
                                                        })
                                                    }
                                                ).catch(
                                                    (error) => {
                                                        rej({
                                                            msg: 'unable to initiate payment ',
                                                            status: 0
                                                        })
                                                    }
                                                )
                                            }
                                        }
                                    )
                                }
                            }
                        ).catch(
                            (error) => {
                                console.log(error.message);
                                rej({
                                    mag: 'Unable to placed order',
                                    order_id: null,
                                    status: 0
                                })
                            }
                        );
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }

    paymentSuccess({ razorpay_response, db_order_id }) {
        return new Promise(
            async (res, rej) => {
                try {
                    const order = await OrderModel.findById(db_order_id);
                    if (order) {
                        const generatedSign = generatedSignature(razorpay_response.razorpay_order_id, razorpay_response.razorpay_payment_id)

                        if (generatedSign == razorpay_response.razorpay_signature) {

                            OrderModel.updateOne(
                                {
                                    _id: db_order_id
                                },
                                {
                                    $set: {
                                        razorpay_payment_id: razorpay_response.razorpay_payment_id
                                    }
                                }
                            ).then(
                                (success) => {
                                    const transaction = new TransactionModel(
                                        {
                                            order_id: db_order_id,
                                            user_id: order.user_id,
                                            razorpay_payment_id: razorpay_response.razorpay_payment_id,
                                            amount: order.order_total,
                                            payment_mode: true
                                        }
                                    )
                                    transaction.save()
                                        .then(
                                            (success) => {
                                                res({
                                                    mag: 'Order placed successfully',
                                                    order_id: order._id,
                                                    status: 1
                                                })
                                            }
                                        ).catch(
                                            (error) => {

                                            }
                                        )

                                }
                            ).catch(
                                (error) => {
                                }
                            )
                        } else {
                            rej({
                                mag: 'kuch to gabad hai',
                                order_id: order._id,
                                status: 0
                            })
                        }
                    }
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }


    adminOrderListing(query) {
        return new Promise(
            async (res, rej) => {
                try {
                    const filterQuery = {};
                    if (query.email != '') {
                        const user = await UserModel.findOne({
                            email: query.email
                        })
                        if (user) {
                            filterQuery['user_id'] = user._id
                        }
                    }
                    if (query.start_date && query.end_date) {
                        filterQuery['createdAt'] = {
                            "$gte": new Date(new Date(query.start_date).setHours(0, 0, 0)),
                            "$lte": new Date(new Date(query.end_date).setHours(23, 59, 59))
                        }
                    }

                    const orders = await OrderModel.find(filterQuery).populate({
                        path: "user_id",
                        model: UserModel,
                        select: 'name email contact'
                    }).sort({ 'createdAt': -1 });
                    res({
                        msg: "Orders listing",
                        orders,
                        status: 1
                    })
                } catch (err) {
                    console.log(err.message);

                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }

    orderDetails(user_id) {
        return new Promise(
            async (res, rej) => {
                try {
                    const order = await OrderModel.find({ user_id: user_id }).populate({
                        path: 'product_details.product_id',
                        model: ProductModel,
                        select: 'name final_price main_image'
                    })

                    res({
                        order: order,
                        status: 1
                    })

                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
}

module.exports = OrderController;