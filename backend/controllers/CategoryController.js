const { genertateFileName } = require("../helper");
const CategoryModel = require("../models/CategoryModel");
const { unlink, unlinkSync } = require('fs');
const ProductModel = require("../models/ProductModel");
class CategoryController {

    read(id) {
        return new Promise(
            async (res, rej) => {
                let category;
                if (id) {
                    category = await CategoryModel.findById(id);
                } else {
                    const data = await CategoryModel.find().sort({ createdAt: -1 });
                    category = await Promise.all(data.map(
                        async (d) => {
                            const productCount = await ProductModel.find({ category_id: d._id }).countDocuments()
                            return (
                                {
                                    ...d.toJSON(),
                                    productCount
                                }
                            )
                        }
                    )
                    )
                }
                return res(
                    {
                        msg: "Category found",
                        category,
                        image_base_url: "/images/category",
                        status: 1
                    }
                )
            }
        )

    }

    create(data, image) {
        return new Promise(
            (res, rej) => {
                try {
                    const fileName = genertateFileName(image.name);
                    const destination = "./public/images/category/" + fileName;
                    image.mv(
                        destination,
                        (err) => {
                            if (err) {
                                rej({
                                    msg: "Unable to upload image",
                                    status: 0
                                })
                            } else {
                                const category = new CategoryModel({
                                    name: data.name,
                                    slug: data.slug,
                                    image_name: fileName
                                })
                                category.save()
                                    .then(
                                        () => {
                                            res(
                                                {
                                                    msg: "Category created",
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        () => {
                                            rej(
                                                {
                                                    msg: "Unable to created category",
                                                    status: 0
                                                }
                                            )
                                        }
                                    )
                            }
                        }
                    )
                } catch (error) {
                    // console.log(error.message);
                    // exception handling -> runtime error
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }

            }
        )
    }

    update(id, data, category_image) {
        return new Promise(
            async (res, rej) => {
                try {
                    const category = await CategoryModel.findById(id);
                    if (category) {
                        if (category_image) {
                            const fileName = genertateFileName(category_image.name);
                            const destination = "./public/images/category/" + fileName;
                            category_image.mv(
                                destination,
                                (err) => {
                                    if (err) {
                                        rej({
                                            msg: 'Unable to upload new image',
                                            status: 0
                                        })
                                    } else {
                                        CategoryModel.updateOne(
                                            { _id: id },
                                            {
                                                name: data.name,
                                                slug: data.slug,
                                                image_name: fileName
                                            }
                                        ).then(
                                            (success) => {
                                                unlinkSync(
                                                    `./public/images/category/${category.image_name}`,
                                                );
                                                res({
                                                    msg: "Category updated",
                                                    status: 1
                                                })
                                            }
                                        ).catch(
                                            () => {
                                                rej({
                                                    msg: "Unable to update category",
                                                    status: 0
                                                })
                                            }
                                        )
                                    }
                                }
                            )
                        } else {
                            CategoryModel.updateOne(
                                { _id: id },
                                {
                                    name: data.name,
                                    slug: data.slug
                                }
                            ).then(
                                () => {
                                    res({
                                        msg: "Category updated",
                                        status: 1
                                    })
                                }
                            ).catch(
                                () => {
                                    rej({
                                        msg: "Unable to update category",
                                        status: 0
                                    })
                                }
                            )

                        }
                    } else {
                        rej({
                            msg: 'Invalid category id',
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

    changeStatus(id, new_status) {
        return new Promise(
            (res, rej) => {
                try {
                    CategoryModel.updateOne(
                        { _id: id },
                        {
                            status: new_status
                        }
                    ).then(
                        (success) => {
                            res({
                                msg: "Status changed successfully",
                                status: 1
                            })
                        }
                    ).catch(
                        (error) => {
                            rej({
                                msg: "Unable to change the status",
                                status: 0
                            })
                        }
                    )
                } catch (error) {
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }

    delete(id, image_name) {
        return new Promise(
            (res, rej) => {
                try {
                    CategoryModel.deleteOne({ _id: id })
                        .then(
                            (success) => {
                                unlink(
                                    "./public/images/category/" + image_name,
                                    (err) => {
                                        if (err) {
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
                            (error) => {
                                rej({
                                    msg: 'Unable to delete data',
                                    status: 0
                                })
                            }
                        )
                } catch (err) {
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )

    }

}

module.exports = CategoryController;