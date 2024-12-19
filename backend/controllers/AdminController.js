const { createToken } = require("../helper")
const AdminModel = require("../models/AdminModel")

class AdminController {
    register(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const admin = await AdminModel(
                        {
                            name: data.name,
                            email: data.email,
                            password: data.password
                        }
                    )
                    admin.save()
                        .then(
                            () => {
                                res({
                                    msg: "Admin created",
                                    status: 1
                                })
                            }
                        ).catch(
                            (error) => {
                                rej({
                                    msg: "Unable to create",
                                    status: 0
                                })
                            }
                        )
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }

    login(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const admin = await AdminModel.findOne({ email: data.email, password: data.password, status: 1 })
                    if (admin) {
                        const token = createToken(admin)
                        // console.log(token);

                        res({
                            msg: "Login successfully",
                            admin,
                            token,
                            status: 1
                        })
                    } else {
                        rej({
                            msg: "Invailed credentails",
                            status: 0
                        })
                    }
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

    read(id) {
        return new Promise(
            async (res, rej) => {
                try {
                    let admin
                    if (id) {
                        admin = await AdminModel.findById(id)
                    } else {
                        admin = await AdminModel.find()
                    }
                    res({
                        msg: "Admin found",
                        admin,
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

    updateStatus(id) {
        return new Promise(
            (res, rej) => {
                try {
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }

    edit(id, data) {
        return new Promise(
            (res, rej) => {
                try {
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }

    delete(id) {
        return new Promise(
            async (res, rej) => {
                try {
                    AdminModel.deleteOne({ _id: id })
                        .then(
                            (success) => {
                                res({
                                    msg: "Admin deleted successfuly",
                                    status: 1
                                })
                            }
                        ).catch(
                            (error) => {
                                console.log(error.message);

                                rej({
                                    msg: 'Unable to delete admin',
                                    status: 0
                                })
                            }
                        )
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }

    changeStatus(id, new_status) {
        return new Promise(
            async (res, rej) => {
                try {
                    await AdminModel.updateOne(
                        { _id: id },
                        { status: new_status }
                    )
                        .then(
                            (success) => {
                                res({
                                    msg: "Status change successfully",
                                    status: 1
                                })
                            }
                        ).catch(
                            (error) => {
                                console.log(error.message);

                                rej({
                                    msg: 'Unable to update',
                                    status: 0
                                })
                            }
                        )
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }

    changeType(id, new_type) {
        return new Promise(
            async (res, rej) => {
                try {
                    await AdminModel.updateOne(
                        { _id: id },
                        { admin_type: new_type }
                    )
                        .then(
                            (success) => {
                                res({
                                    msg: "Change admin type",
                                    status: 1
                                })
                            }
                        ).catch(
                            (error) => {
                                console.log(error.message);

                                rej({
                                    msg: 'Unable to change admin type',
                                    status: 0
                                })
                            }
                        )
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
module.exports = AdminController