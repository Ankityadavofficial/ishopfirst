const express = require('express');
const OrderController = require('../controllers/OrderController');
const OrderRouter = express.Router();

OrderRouter.get(
    '/:id',
    (req, res) => {
        const result = new OrderController().adminOrderListing(req.query)
        result.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error)
            }
        )
    }
)

OrderRouter.post(
    '/place-order',
    (req, res) => {
        const result = new OrderController().placeOrder(req.body)
        result.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error)
            }
        )
    }
)

OrderRouter.post(
    '/payment-success',
    (req, res) => {
        const result = new OrderController().paymentSuccess(req.body);
        result.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error)
            }
        )
    }

)

OrderRouter.get(
    "/order-details/:user_id",
    (req, res) => {
        const result = new OrderController().orderDetails(req.params.user_id)
        result.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error)
            }
        )
    }
)

OrderRouter.post(
    "/payment-failed",
)

module.exports = OrderRouter