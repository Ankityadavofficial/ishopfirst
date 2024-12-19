const express = require('express');
const connection = require('./connection');
const cors = require('cors');
require('dotenv').config();

const CategoryRouter = require('./routes/CategoryRouter');
const ProductRouter = require('./routes/ProductRouter');
const ColorRouter = require('./routes/ColorRouter');
const AdminRouter = require('./routes/AdminRouter');
const AccessoriesRouter = require('./routes/AccessoriesRouter');
const UserRouter = require('./routes/UserRouter');
const OrderRouter = require('./routes/OrderRouter');

const server = express();
server.use(express.json());

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = ['http://localhost:5173'];
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

server.use(cors(corsOptions));
server.use(express.static("./public"));

// Router grouping
server.use("/category", CategoryRouter);
server.use('/product', ProductRouter);
server.use("/color", ColorRouter);
server.use("/admin", AdminRouter);
server.use("/accessories", AccessoriesRouter);
server.use('/user', UserRouter);
server.use('/order', OrderRouter);

connection()
    .then(() => {
        console.log("Database connected successfully");
        server.listen(5000, () => {
            console.log("Server started on http://localhost:5000");
        });
    })
    .catch(() => {
        console.log("Database connection failed");
    });
