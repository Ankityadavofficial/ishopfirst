const { Schema, model } = require("mongoose");

const ColorSchema = new Schema(
    {
        name: {
            type: "String",
            maxLength: 100,
            unique: true,
            require: true
        },
        code: {
            type: "String",
            maxLength: 100,
            unique: true,
            require: true
        },
        status: {
            type: Boolean,
            default: 1
        }
    },
    {
        timestamps: true
    }
);

const ColorModel = model("Color", ColorSchema);
module.exports = ColorModel;