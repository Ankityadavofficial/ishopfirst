const exprees = require('express');
const ColorController = require('../controllers/ColorController');
const adminAuth = require('../middlewares/AdminAuth');

const ColorRouter = exprees.Router();


ColorRouter.get(
    "/:id?",
    (req, res) => {
        const result = new ColorController().read(req.params.id ?? null);
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

ColorRouter.post(
    "/create",adminAuth,
    (req, res) => {
        const result = new ColorController().create(req.body);
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

ColorRouter.delete(
    "/delete/:id",
    (req, res) => {
        const result = new ColorController().delete(req.params.id);
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

ColorRouter.delete(
    "/update",
    (req, res) => {

    }
)
module.exports = ColorRouter;