const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

const AuthRouter = require('./routes/Auth');
const adminRoutes = require('./routes/Admin')
const pocRoutes = require('./routes/Poc');
const hosRoutes = require('./routes/Hod');
const departmentRoute = require('./routes/departmet');
const collegeRoute = require("./routes/college");
const projectRoute = require("./routes/Project");
const likeRoute = require("./routes/Like");
const commentRoute = require("./routes/Comment");
const savedRoute = require("./routes/Saved");

const app = express();
app.use(cors({
    origin: "*"
}))
app.use(express.json());

mongoose.set("strictQuery", false);
var db = "mongodb+srv://yashmulik95:ByqJDh1MIulKfJKW@cluster0.smtzecd.mongodb.net/?retryWrites=true&w=majority";
//"mongodb+srv://bytedev24:6FVzk31AZBf6thuC@cluster0.plyd4uc.mongodb.net/?retryWrites=true&w=majority";

//mongodb + srv://yashmulik95:ByqJDh1MIulKfJKW@cluster0.smtzecd.mongodb.net/?retryWrites=true&w=majority
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connect");
    })
    .catch((err) => {
        console.log(err);
    });


app.use('/api/auth', AuthRouter);
app.use('/api/admin', adminRoutes);
app.use('/api/poc', pocRoutes);
app.use('/api/hod', hosRoutes);
app.use('/api/dpt', departmentRoute);
app.use('/api/college', collegeRoute);
app.use('/api/project', projectRoute);
app.use("/api/like", likeRoute);
app.use("/api/comment", commentRoute);
app.use('/api/save', savedRoute);

app.listen(3000, () => {
    console.log("server started...");
})