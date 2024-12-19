const { createToken, encodePassword, decodePassword } = require("../helper");
const CartModel = require("../models/CartModel");
const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/UserModel");

class UserController {
    register(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    console.log("data", data);

                    const { name, email, password, contact } = data;
                    // Validate input
                    if (!name || !email || !password || !contact) {
                        return rej({ msg: 'All fields are required', status: 0 });
                    }
                    // Check if user already exists
                    const existingUser = await UserModel.findOne({ email });
                    if (existingUser) {
                        return rej({ msg: 'User already exists', status: 0 });
                    }
                    // Hash password
                    // const hashedPassword = await bcrypt.hash(password, 10);
                    // Create new user
                    const newUser = new UserModel({
                        name,
                        email,
                        contact,
                        password: encodePassword(password)
                    });
                    await newUser.save();

                    res({ msg: 'User registered successfully', status: 1 });
                } catch (error) {
                    console.log(error.message);

                    rej({ msg: 'Server error', status: 0 });
                }
            }
        )
    }

    login(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const user = await UserModel.findOne({
                        email: data.email
                    });
                    if (user && (decodePassword(user.password) == data.password)) {
                        const token = createToken(user)
                        const { password, ...userWithoutPassword } = user.toObject();
                        res({
                            msg: "Login successful",
                            status: 1,
                            user: userWithoutPassword,
                            token
                        })
                    }
                    else {
                        rej({
                            msg: "Invailed credentails",
                            status: 0,
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

    read(id) {
        return new Promise(
            async (res, rej) => {
                try {
                    let user
                    if (id) {
                        user = await UserModel.findById(id)
                    } else {
                        user = await UserModel.find()
                    }
                    res({
                        msg: "User found",
                        user,
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

    readAddress(id) {
        return new Promise(
            async (res, rej) => {
                try {
                    const address = await UserModel.findById(id)
                    const user = address.shipping_address;
                    res({
                        msg: "Address found",
                        user,
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
                    UserModel.deleteOne({ _id: id })
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
                                    msg: 'Unable to delete user',
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
                    await UserModel.updateOne(
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
                    await UserModel.updateOne(
                        { _id: id },
                        { admin_type: new_type }
                    )
                        .then(
                            (success) => {
                                res({
                                    msg: "Change user type",
                                    status: 1
                                })
                            }
                        ).catch(
                            (error) => {
                                console.log(error.message);

                                rej({
                                    msg: 'Unable to change user type',
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

    moveToCart({ cartData, userId }) {
        return new Promise(
            async (res, rej) => {
                try {
                    const promises = cartData.map(
                        async (cd) => {
                            const exists = await CartModel.findOne({ user_id: userId, product_id: cd.pId })
                            if (exists) {
                                await CartModel.updateOne(
                                    { _id: exists._id },
                                    { quantity: exists.quantity + cd.qty }
                                );
                            } else {
                                const cart = new CartModel({
                                    user_id: userId,
                                    product_id: cd.pId,
                                    quantity: cd.qty
                                });
                                await cart.save();
                            }
                        }
                    )
                    await Promise.all(promises)
                    const userCart = await CartModel.find({ user_id: userId })
                    let total = 0
                    for (let uc of userCart) {
                        const prod = await ProductModel.findById(uc.product_id);
                        total += (prod.final_price * uc.quantity);
                    }
                    res({ userCart, total, msg: "Moved to cart", status: 1 })

                    // const data = cartData.map(
                    //     (cd) => {
                    //         return {
                    //             user_id: userId,
                    //             product_id: cd.pId,
                    //             quantity: cd.qty
                    //         }
                    //     }
                    // )
                    // CartModel.insertMany(data)
                    //     .then(
                    //         (success) => {
                    //             res({
                    //                 msg: "Move to cart",
                    //                 status: 1
                    //             })
                    //         }
                    //     ).catch(
                    //         (error) => {
                    //             res({
                    //                 msg: "unable to move to cart",
                    //                 status: 0
                    //             })
                    //         }
                    //     )
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }

    changeQty({ product_id, user_id, new_qty }) {
        return new Promise(
            async (res, rej) => {
                try {
                    const cart = await CartModel.findOne({ product_id, user_id })
                    if (cart) {
                        CartModel.updateOne(
                            {
                                product_id, user_id
                            },
                            {
                                quantity: new_qty
                            }
                        ).then(
                            (success) => {
                                res({
                                    msg: 'Cart updated',
                                    status: 1
                                })
                            }
                        ).catch(
                            (error) => {
                                rej({
                                    msg: 'Unable to updated cart',
                                    status: 0
                                })
                            }
                        )
                    } else {
                        rej({
                            msg: 'Unable to updated cart',
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

    updateDb({ user_id, prod_id }) {
        return new Promise(
            async (res, rej) => {
                try {
                    const cart = await CartModel.findOne({
                        user_id: user_id,
                        product_id: prod_id
                    })
                    if (cart) {
                        CartModel.updateOne(
                            {
                                user_id: user_id, product_id: prod_id
                            },
                            {
                                quantity: cart.quantity + 1
                            }
                        ).then(
                            (success) => {
                                res({
                                    msg: 'Cart updated',
                                    status: 1
                                })
                            }
                        ).catch(
                            (error) => {
                                rej({
                                    msg: 'Unable to updated cart',
                                    status: 0
                                })
                            }
                        )
                    } else {
                        const addCart = CartModel(
                            {
                                user_id: user_id,
                                product_id: prod_id
                            }
                        )
                        await addCart.save();
                    }
                    res({
                        msg: 'Cart updated successfully',
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
    address(data, id) {
        return new Promise(
            async (res, rej) => {
                try {
                    const { country, name, contact, pincode, addressLine1, addressLine2, landmark, city, district, state } = data;

                    // Ensure all required fields are present
                    if (!name || !contact || !pincode || !addressLine1 || !landmark || !city || !district || !state) {
                        throw new Error('Missing required fields');
                    }

                    const user = await UserModel.findById({ _id: id });
                    if (user) {
                        const newShippingAddress = {
                            country,
                            name,
                            contact,
                            pincode,
                            addressLine1,
                            addressLine2,
                            landmark,
                            city,
                            district,
                            state
                        };
                        user.shipping_address.push(newShippingAddress);
                        await user.save();
                        res({
                            msg: 'Add address',
                            status: 1
                        });
                    } else {
                        rej({
                            msg: 'Unable to add address',
                            status: 0
                        });
                    }
                } catch (err) {
                    console.log(err.message);
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    });
                }
            }
        );
    }

    delAdd(index, id) {
        return new Promise(
            async (res, rej) => {
                try {
                    const user = await UserModel.findById(id)
                    if (user) {
                        const address = [...user.shipping_address];
                        address.splice(index, 1)
                        UserModel.updateOne(
                            { _id: id },
                            {
                                shipping_address: address
                            }
                        ).then(
                            (success) => {
                                res({
                                    msg: "Address deleted",
                                    status: 1
                                })
                            }
                        ).catch(
                            (error) => {
                                rej({
                                    msg: "Address Not deleted",
                                    status: 0
                                })
                            }
                        )
                    }
                    else {
                        rej({
                            msg: "Address Not deleted",
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
module.exports = UserController;