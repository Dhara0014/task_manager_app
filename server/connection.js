const mongoose = require("mongoose");

const uri = 'mongodb://localhost:27017/task_manager';

const connectToDB =  async() => {
    try {
        await mongoose.connect(uri, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error("error in connection of DB", error);
        process.exit(1);
    }
}


module.exports = connectToDB;