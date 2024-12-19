const ColorModel = require("../models/ColorModel");

class ColorController {
    read(id) {
        return new Promise(
            async (res, rej) => {
                let color;
                if (id) {
                    color = await ColorModel.findById(id);
                } else {
                    color = await ColorModel.find().sort({ createdAt: -1 })
                }
                res({
                    msg: "Color found",
                    color,
                    status: 1
                })

            }
        )
    }

    create(data) {
        return new Promise(
            (res, rej) => {
                try {
                    const color = new ColorModel({
                        name: data.name,
                        code: data.code
                    })
                    color.save()
                        .then(
                            () => {
                                res(
                                    {
                                        msg: "Color created",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                rej(
                                    {
                                        msg: "Unable to create color",
                                        status: 0
                                    }
                                )
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

    delete(id) {
        return new Promise(
            (res, rej) => {
                try {
                    ColorModel.deleteOne({ _id: id })
                        .then(
                            (success) => {
                                res({
                                    msg: "Color deleted successfuly",
                                    status: 1
                                })
                            }
                        ).catch(
                            (error) => {
                                rej({
                                    msg: 'Unable to delete color',
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
module.exports = ColorController;