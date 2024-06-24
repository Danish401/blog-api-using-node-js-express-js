const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/BlogApp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb connected successfully ...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
