const { Schema, model } = require("mongoose");

const AdminSchema = new Schema(
    {
        name: {
            type: "String",
            maxLength: 100
        },
        email: {
            type: String,
            maxLength: 100,
            unique: true,
        },
        password: {
            type: String
        },
        admin_type: {
            type: Boolean,
            default: false
            // true-> super admin
            // false -> admin
        },
        main_admin: {
            type: Boolean,
            default: false
            // true-> super admin
            // false -> admin
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const AdminModel = model("Admin", AdminSchema);
module.exports = AdminModel;