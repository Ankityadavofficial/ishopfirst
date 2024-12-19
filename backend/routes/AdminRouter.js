const exprees = require("express");
const AdminController = require("../controllers/AdminController");

const AdminRouter = exprees.Router();

AdminRouter.get(
    "/:id?",
    (req, res) => {
        const result = new AdminController().read(req.params.id ?? null)
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

AdminRouter.post(
    "/login",
    (req, res) => {
        const result = new AdminController().login(req.body)
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

AdminRouter.post(
    "/register",
    (req, res) => {
        const result = new AdminController().register(req.body)
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

AdminRouter.delete(
    "/delete/:id",
    (req, res) => {
        const result = new AdminController().delete(req.params.id)
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

AdminRouter.put(
    "/change_status/:id/:new_status",
    (req, res) => {
        const result = new AdminController().changeStatus(req.params.id, req.params.new_status)
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

AdminRouter.put(
    "/change_type/:id/:new_type",
    (req, res) => {
        const result = new AdminController().changeType(req.params.id, req.params.new_type)
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

module.exports = AdminRouter;