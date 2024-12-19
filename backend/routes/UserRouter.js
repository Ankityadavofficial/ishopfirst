const exprees = require("express");
const UserController = require("../controllers/UserController");

const UserRouter = exprees.Router();
UserRouter.get(
    "/:id?",
    (req, res) => {
        const result = new UserController().read(req.params.id ?? null)
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

UserRouter.get(
    '/address/:id',
    (req, res) => {
        const result = new UserController().readAddress(req.params.id)
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

UserRouter.post(
    "/login",
    (req, res) => {
        const result = new UserController().login(req.body)
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

UserRouter.post(
    "/register",
    (req, res) => {
        const result = new UserController().register(req.body)
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

UserRouter.delete(
    "/delete/:id",
    (req, res) => {
        const result = new UserController().delete(req.params.id)
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

UserRouter.put(
    "/change_status/:id/:new_status",
    (req, res) => {
        const result = new UserController().changeStatus(req.params.id, req.params.new_status)
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

UserRouter.put(
    "/change_type/:id/:new_type",
    (req, res) => {
        const result = new UserController().changeType(req.params.id, req.params.new_type)
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

UserRouter.post(
    '/move-to-cart',
    (req, res) => {
        const result = new UserController().moveToCart(req.body);
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

UserRouter.post(
    '/change-qty',
    (req, res) => {
        const result = new UserController().changeQty(req.body)
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

UserRouter.post(
    '/update-db',
    (req, res) => {
        const result = new UserController().updateDb(req.body)
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

UserRouter.post(
    '/address/:id',
    (req, res) => {
        const result = new UserController().address(req.body, req.params.id)
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

UserRouter.put(
    "/update-profile/:id",
    (req, res) => {
        const result = new UserController().updateProfile(req.body)
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

UserRouter.delete(
    '/delete-address/:index/:uid',
    (req, res) => {
        const result = new UserController().delAdd(req.params.index, req.params.uid)
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


UserRouter.post(
    '/delete-prod',
    (req, res) => {
        const result = new UserController().deleteProd(req.body)
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

module.exports = UserRouter;