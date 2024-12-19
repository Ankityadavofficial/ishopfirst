const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const fileUpload = require('express-fileupload');
const adminAuth = require('../middlewares/AdminAuth');


const CategoryRouter = express.Router();

CategoryRouter.get(
    '/:id?',
    (req, res) => {
        const result = new CategoryController().read(req.params.id ?? null);
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

CategoryRouter.post(
    "/create",
    [
        fileUpload({
            createParentPath: true
        }),
        adminAuth
    ],
    (req, res) => {
        const result = new CategoryController().create(req.body, req.files.category_image);
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

CategoryRouter.delete(
    "/delete/:id/:image_name",
    (req, res) => {
        const result = new CategoryController().delete(req.params.id, req.params.image_name);
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

CategoryRouter.put(
    "/update/:id",
    fileUpload({
        createParentPath: true
    }),
    (req, res) => {
        const result = new CategoryController().update(req.params.id, req.body, req.files?.category_image ?? null);
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

CategoryRouter.put(
    "/change-status/:id/:new_status",
    (req, res) => {
        const result = new CategoryController().changeStatus(req.params.id, req.params.new_status);
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



module.exports = CategoryRouter;