const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://lantronix:DZSfJ9wPvmvKuyA4@cluster0.loyuw.mongodb.net/LantronixUserDB";

const startMongoServer = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true, 
      useUnifiedTopology: true, 
      useFindAndModify: false
    });
    console.log("Connected to datbase");
  } catch (error) {
    console.log('There is some error connecting to database',error);
    throw error;
  }
};

module.exports = startMongoServer;
