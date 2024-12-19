const { Schema, model } = require('mongoose');

const AccessoriesSchema = new Schema(
    {
        name: {
            type: "String",  // Corrected
            maxLength: 250,
            unique: true
        },
        slug: {
            type: String,  // Corrected
            maxLength: 250,
            unique: true
        },
        description: {
            type: String  // Corrected
        },
        original_price: {
            type: Number,
            min: 1
        },
        discount_percentage: {
            type: Number,
            default: 0
        },
        final_price: {
            type: Number,
            min: 1
        },
        product_id: [
            {
                type: Schema.ObjectId,
                ref: 'Product'
            }
        ],
        main_image: {
            type: String
        },
        other_images: [
            {
                type: String
            }
        ],
        colors:[
            {
                type:Schema.ObjectId,
                ref:"Color"
            }
        ],
        status: {
            type: Boolean,
            default: true
        },
        // stock: {
        //     type: Boolean,
        //     default: true
        // }
    },
    {
        timestamps: true
    }
);

const AccessoriesModel = model("Accessories", AccessoriesSchema);
module.exports = AccessoriesModel;
