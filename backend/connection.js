const mongoose = require("mongoose");

async function connection() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "Ishopfirst"
        });
        console.log("Connected to MongoDB Atlas");
        return conn;
    } catch (err) {
        console.error("Error connecting to MongoDB Atlas:", err.message);
        throw err;
    }
}

module.exports = connection;
