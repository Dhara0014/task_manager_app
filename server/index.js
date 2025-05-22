const express = require('express');
const connectDB = require('./connection');
const {config} = require('dotenv');
const cors = require('cors');
const loginAuth = require('./router/auth');
const taskRoute = require('./router/tasks');


const app = express();
connectDB();
app.use(express.json());
config();
app.use(cors());
const PORT = process.env.PORT;

app.get('/', (req,res) => {
    res.send("Hello")
});
app.use('/api/auth', loginAuth);
app.use('/api/tasks', taskRoute);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})