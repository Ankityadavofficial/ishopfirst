// const mongoose = require('mongoose');
// const CategorySchema = new mongoose.Schema()

const { Schema, model } = require('mongoose');

const CategorySchema = new Schema(
    {
        name: {
            type: "String",
            maxLength: 100,
            unique: true,
            required: true
        },
        slug: {
            type: "String",
            maxLength: 100,
            unique: true,
            required: true
        },
        status: {
            type: Boolean,
            default: 1 // 1: Active, 0: Inactive
        },
        image_name: {
            type: "String"
        }
    },
    {
        timestamps: true
    }
);

const CategoryModel = model('Category', CategorySchema);
module.exports = CategoryModel;