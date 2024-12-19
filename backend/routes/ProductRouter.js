const express = require("express");
const ProductController = require("../controllers/ProductController");
const fileUpload = require("express-fileupload");


const ProductRouter = express.Router();

ProductRouter.get(
    "/:id?",
    (req, res) => {
        const result = new ProductController().read(req.params.id ?? null, req.query)
        console.log(req.params.id);
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

ProductRouter.post(
    "/create",
    fileUpload({
        createParentPath: true
    }),
    (req, res) => {
        const result = new ProductController().create(req.body, req.files.product_image);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
            }
        )
    }
)

ProductRouter.post(
    '/upload-other-images/:pid',
    fileUpload({
        createParentPath: true
    }),
    (req, res) => {
        if (req.files.other_images.length > 1) {
            const result = new ProductController().uploadOtherImages(
                req.params.pid,
                req.files.other_images
            )
            result.then(
                (success) => {
                    res.send(success);
                }
            ).catch(
                (error) => {
                    res.send(error);
                }
            )
        } else {
            const result = new ProductController().uploadOtherImages(
                req.params.pid,
                [req.files.other_images]
            )
            result.then(
                (success) => {
                    res.send(success);
                }
            ).catch(
                (error) => {
                    res.send(error);
                }
            )
        }

    }
)

ProductRouter.delete(
    "/delete/:id/:image_name",
    (req, res) => {
        const result = new ProductController().delete(req.params.id, req.params.image_name);
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

ProductRouter.get(
    "/delete-image/:index/:pid",
    (req, res) => {
        const result = new ProductController().delImg(req.params.index, req.params.pid)
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

ProductRouter.put(
    "/update/:id",
    fileUpload({
        createParentPath: true
    }),
    (req, res) => {
        const result = new ProductController().update(req.params.id, req.body, req.files?.product_image ?? null)
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

module.exports = ProductRouter;