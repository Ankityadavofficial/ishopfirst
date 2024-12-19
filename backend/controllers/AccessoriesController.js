const { log } = require("console");
const { genertateFileName } = require("../helper");
const AccessoriesModel = require("../models/AccessoriesModel")
const { unlink, unlinkSync } = require("fs");

class AccessoriesController {
    create(data, accessories_image, other_images) {
        return new Promise(
            async (res, rej) => {
                try {
                    const names = []
                    const promises = []
                    for (let othImg of other_images) {
                        const otherImagesName = genertateFileName(othImg.name)
                        const destination = './public/images/accessories/' + otherImagesName;
                        names.push(otherImagesName);
                        promises.push(othImg.mv(destination))
                    }
                    await Promise.all(promises)
                    const imageName = genertateFileName(accessories_image.name);
                    const destination = "./public/images/accessories/" + imageName;
                    accessories_image.mv(
                        destination,
                        (err) => {
                            if (err) {
                                rej({
                                    msg: "Unable to upload image ",
                                    status: 0
                                })
                            } else {
                                const accessorie = new AccessoriesModel(
                                    {
                                        name: data.name,
                                        slug: data.slug,
                                        description: data.description,
                                        original_price: data.original_price,
                                        discount_percentage: data.discount_percent,
                                        final_price: data.final_price,
                                        product_id: JSON.parse(data.accessories_product),
                                        colors: JSON.parse(data.accessories_colors),
                                        main_image: imageName,
                                        other_images: [...names]
                                    }
                                )
                                accessorie.save()
                                    .then(
                                        (success) => {
                                            res({
                                                msg: 'Accessories added',
                                                status: 1
                                            })
                                        }
                                    ).catch(
                                        (error) => {
                                            rej({
                                                mag: 'Unble to add accessories',
                                                status: 0
                                            })
                                        }
                                    )
                            }
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

    read(id, query) {
        return new Promise(
            async (res, rej) => {
                let accessorie;
                try {
                    console.log(query);

                    if (id) {
                        accessorie = await AccessoriesModel.findById(id).populate(['product_id', 'colors']);
                    } else {
                        accessorie = await AccessoriesModel.find().populate(['product_id', 'colors']);
                    }
                    res({
                        msg: 'Accessories found',
                        accessorie,
                        image_base_url: "/images/accessories",
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

    delete(id, accImg) {
        return new Promise(
            async (res, rej) => {
                try {
                    const other = await AccessoriesModel.findById(id)
                    if (other) {
                        const images = [...other.other_images]
                        for (let i in images) {
                            unlink("./public/images/accessories/" + images[i],
                                (err) => {
                                    if (err) {
                                        console.log(err.message);
                                        rej({
                                            msg: 'Unable to detele',
                                            status: 0
                                        })
                                    }
                                })
                        }
                        AccessoriesModel.deleteOne({ _id: id })
                            .then(
                                (success) => {
                                    unlink(
                                        "./public/images/accessories/" + accImg,
                                        (err) => {
                                            if (err) {
                                                console.log(err.message);

                                                rej({
                                                    msg: "Data deleted but image not!",
                                                    status: 0
                                                })
                                            } else {
                                                res({
                                                    msg: "Data deleted",
                                                    status: 1
                                                })
                                            }
                                        }
                                    )
                                }

                            ).catch(
                                (err) => {
                                    rej({
                                        msg: "Unable to delete product",
                                        status: 0
                                    })
                                }
                            )

                    }


                    // await AccessoriesModel.deleteOne({ _id: id })
                    //     .then(
                    //         (success) => {
                    //             unlink(
                    //                 "./public/images/accessories/" + accImg,
                    //                 (err) => {
                    //                     if (err) {
                    //                         rej({
                    //                             msg: "Data deleted but image not!",
                    //                             status: 0
                    //                         })
                    //                     } else {
                    //                         res({
                    //                             msg: "Data deleted",
                    //                             status: 1
                    //                         })
                    //                     }
                    //                 }
                    //             )
                    //         }
                    //     ).catch(
                    //         (err) => {
                    //             console.log(err.message);

                    //             rej({
                    //                 msg: "Unable to delete product",
                    //                 status: 0
                    //             })
                    //         }
                    //     )
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

    update(id, data, accessories_image, other_images) {
        return new Promise(
            async (res, rej) => {
                try {
                    const accessorie = await AccessoriesModel.findById(id);
                    if (accessorie) {
                        if (accessories_image || other_images) {
                            if (accessories_image) {
                                const imageName = genertateFileName(accessories_image.name);
                                const destination = "./public/images/accessories/" + imageName;
                                accessories_image.mv(
                                    destination,
                                    (err) => {
                                        if (err) {
                                            rej({
                                                msg: "Unable to upload image ",
                                                status: 0
                                            })
                                        } else {
                                            AccessoriesModel.updateOne(
                                                { _id: id },
                                                {
                                                    name: data.name,
                                                    slug: data.slug,
                                                    description: data.description,
                                                    original_price: data.original_price,
                                                    discount_percentage: data.discount_percent,
                                                    final_price: data.final_price,
                                                    product_id: JSON.parse(data.accessories_product),
                                                    colors: JSON.parse(data.accessories_colors),
                                                    main_image: imageName
                                                }
                                            ).then(
                                                (success) => {
                                                    res({
                                                        msg: 'Accessories added',
                                                        status: 1
                                                    })
                                                }
                                            ).catch(
                                                (error) => {
                                                    rej({
                                                        mag: 'Unble to add accessories',
                                                        status: 0
                                                    })
                                                }
                                            )
                                        }
                                    }
                                )
                            }
                            if (other_images) {
                                const names = []
                                const promises = []
                                for (let othImg of other_images) {
                                    const otherImagesName = genertateFileName(othImg.name)
                                    const destination = './public/images/accessories/' + otherImagesName;
                                    names.push(otherImagesName);
                                    promises.push(othImg.mv(destination))
                                }
                                await Promise.all(promises);
                                AccessoriesModel.updateOne(
                                    { _id: id },
                                    {
                                        name: data.name,
                                        slug: data.slug,
                                        description: data.description,
                                        original_price: data.original_price,
                                        discount_percentage: data.discount_percent,
                                        final_price: data.final_price,
                                        product_id: JSON.parse(data.accessories_product),
                                        colors: JSON.parse(data.accessories_colors),
                                        other_images: [...names]
                                    }
                                ).then(
                                    (success) => {
                                        res({
                                            msg: 'Accessories added',
                                            status: 1
                                        })
                                    }
                                ).catch(
                                    (error) => {
                                        rej({
                                            mag: 'Unble to add accessories',
                                            status: 0
                                        })
                                    }
                                )
                            }

                        } else {
                            AccessoriesModel.updateOne(
                                { _id: id },
                                {
                                    name: data.name,
                                    slug: data.slug,
                                    description: data.description,
                                    original_price: data.original_price,
                                    discount_percentage: data.discount_percent,
                                    final_price: data.final_price,
                                    product_id: JSON.parse(data.accessories_product),
                                    colors: JSON.parse(data.accessories_colors),
                                }
                            ).then(
                                (success) => {
                                    res({
                                        msg: 'Accessories Updated',
                                        status: 1
                                    })
                                }
                            ).catch(
                                (error) => {
                                    rej({
                                        mag: 'Unble to update accessories',
                                        status: 0
                                    })
                                }
                            )
                        }
                    } else {
                        rej({
                            msg: "Accessorie not found",
                            status: 0
                        })
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
}

module.exports = AccessoriesController;