const express = require('express');
const fileUpload = require("express-fileupload");
const AccessoriesController = require("../controllers/AccessoriesController");

const AccessoriesRouter = express.Router();

AccessoriesRouter.get(
    '/:id?',
    (req, res) => {
        const result = new AccessoriesController().read(req.params.id ?? null, req.query);
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

AccessoriesRouter.post(
    "/create",
    fileUpload({
        createParentPath: true
    }),
    (req, res) => {
        const result = new AccessoriesController().create(req.body, req.files.accessories_image, req.files.other_images)
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

AccessoriesRouter.delete(
    "/delete/:id/:accImg/",
    (req, res) => {
        const result = new AccessoriesController().delete(req.params.id, req.params.accImg)
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

AccessoriesRouter.put(
    "/update/:id",
    fileUpload({
        createParentPath: true
    }),
    (req, res) => {
        const result = new AccessoriesController().update(req.params.id, req.body, req.files?.accessories_image, req.files?.other_images)
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


module.exports = AccessoriesRouter;