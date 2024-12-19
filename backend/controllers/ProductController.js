const { genertateFileName } = require("../helper");
const AccessoriesModel = require("../models/AccessoriesModel");
const CategoryModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModel");
const { unlink, unlinkSync } = require('fs')
const ColorModel = require('../models/ColorModel')

class ProductController {
    create(data, product_image) {
        return new Promise(
            (res, rej) => {
                try {
                    const fileName = genertateFileName(product_image.name);
                    const destination = "./public/images/product/" + fileName;
                    product_image.mv(
                        destination,
                        (err) => {
                            if (err) {
                                rej({
                                    msg: "Unable to upload image ",
                                    status: 0
                                })
                            } else {
                                const product = new ProductModel({
                                    name: data.name,
                                    slug: data.slug,
                                    description: data.description,
                                    original_price: data.original_price,
                                    discount_percentage: data.discount_percent,
                                    final_price: data.final_price,
                                    category_id: data.product_category,
                                    colors: JSON.parse(data.product_color),
                                    main_image: fileName,
                                    other_images: fileName
                                })
                                product.save()
                                    .then(
                                        (success) => {
                                            res({
                                                msg: 'Product added',
                                                status: 1
                                            })
                                        }
                                    ).catch(
                                        (error) => {
                                            rej({
                                                mag: 'Unble to add product',
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
                let product;
                try {
                    if (id) {
                        product = await ProductModel.findById(id).populate(['category_id', 'colors']);
                    } else {
                        const filterQuery = {};
                        if (query.category_slug) {
                            const category = await CategoryModel.findOne({ slug: query.category_slug });
                            if (category) {
                                filterQuery['category_id'] = category._id
                            }
                        }
                        if (query.price_start && query.price_end) {
                            filterQuery['final_price'] = {
                                '$gte': query.price_start,
                                '$lte': query.price_end
                            }
                        }
                        if (query.color_id) {
                            filterQuery['colors'] = query.color_id
                        }
                        product = await ProductModel.find(filterQuery).sort({ createdAt: -1 }).populate(['category_id', 'colors'])
                        // product = [];
                        // await Promise.all(
                        //     data.map(
                        //         async (d) => {
                        //             const accessCount = await AccessoriesModel.find({ product_id: d._id }).countDocuments()
                        //             product.push(
                        //                 {
                        //                     ...d.toJSON(),
                        //                     accessCount
                        //                 }
                        //             )
                        //         }
                        //     )
                        // )
                    }
                    res({
                        msg: "Product found",
                        product,
                        image_base_url: "/images/product",
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

    uploadOtherImages(pid, other_images) {
        return new Promise(
            async (res, rej) => {
                try {
                    const names = [];
                    const promises = [];
                    const product = await ProductModel.findById(pid);
                    for (let images of other_images) {
                        const imageName = genertateFileName(images.name);
                        const destination = "./public/images/product/" + imageName;
                        names.push(imageName);
                        promises.push(images.mv(destination));
                    }
                    await Promise.all(promises);
                    ProductModel.updateOne(
                        { _id: pid },
                        {
                            other_images: [
                                ...product.other_images,
                                ...names
                            ]
                        }
                    ).then(
                        () => {
                            res({
                                msg: 'Images uploaded',
                                status: 1
                            })
                        }
                    ).catch(
                        () => {
                            rej({
                                msg: 'Images not uploaded',
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

    delete(id, image_name) {
        return new Promise(
            (res, rej) => {
                try {
                    ProductModel.deleteOne({ _id: id })
                        .then(
                            (success) => {
                                unlink(
                                    "./public/images/product/" + image_name,
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
                                    msg: "Unable to delete product",
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

    delImg(index, id) {
        return new Promise(
            async (res, rej) => {
                try {
                    const product = await ProductModel.findById(id)
                    if (product) {
                        const images = [...product.other_images];
                        unlink("./public/images/product/" + images[index],
                            (err) => {
                                if (err) {
                                    rej({
                                        msg: 'Unable to detele',
                                        status: 0
                                    })
                                } else {
                                    images.splice(index, 1)
                                    ProductModel.updateOne(
                                        { _id: id },
                                        { other_images: images }
                                    ).then(
                                        (success) => {
                                            res({
                                                msg: "Image deleted",
                                                status: 1
                                            })
                                        }
                                    ).catch(
                                        (error) => {
                                            rej({
                                                msg: "Image Not deleted",
                                                status: 0
                                            })
                                        }
                                    )
                                }

                            }
                        )
                    } else {
                        rej({
                            msg: 'Product not found',
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

    update(id, data, product_image) {
        return new Promise(
            async (res, rej) => {
                try {
                    const product = await ProductModel.findById(id);
                    if (product) {
                        if (product_image) {
                            const imageName = genertateFileName(product_image.name);
                            const destination = "./public/images/product/" + imageName;
                            product_image.mv(
                                destination,
                                (err) => {
                                    if (err) {
                                        rej({
                                            msg: "Unable to upload new image",
                                            status: 0
                                        })
                                    } else {
                                        ProductModel.updateOne(
                                            { _id: id },
                                            {
                                                name: data.name,
                                                slug: data.slug,
                                                description: data.description,
                                                original_price: data.original_price,
                                                discount_percentage: data.discount_percent,
                                                final_price: data.final_price,
                                                category_id: data.product_category,
                                                colors: JSON.parse(data.product_color),
                                                main_image: imageName,
                                                other_images: imageName
                                            }
                                        ).then(
                                            (success) => {
                                                unlinkSync(
                                                    `./public/images/product/${product.main_image}`
                                                );
                                                res({
                                                    msg: "Product updated",
                                                    status: 1
                                                })
                                            }
                                        ).catch(
                                            () => {
                                                rej({
                                                    msg: "Unable to updated product",
                                                    status: 0
                                                })
                                            }
                                        )
                                    }
                                }
                            )
                        } else {
                            ProductModel.updateOne(
                                { _id: id },
                                {
                                    name: data.name,
                                    slug: data.slug,
                                    description: data.description,
                                    original_price: data.original_price,
                                    discount_percentage: data.discount_percent,
                                    final_price: data.final_price,
                                    category_id: data.product_category,
                                    colors: JSON.parse(data.product_color),
                                }
                            ).then(
                                (success) => {
                                    res({
                                        msg: "Product updated",
                                        status: 1
                                    })
                                }
                            ).catch(
                                () => {
                                    rej({
                                        msg: "Unable to updated product",
                                        status: 0
                                    })
                                }
                            )

                        }
                    } else {
                        rej({
                            msg: "Product not found",
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

module.exports = ProductController;