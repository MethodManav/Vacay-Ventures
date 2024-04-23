const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const UserRoutes = require('./routes/user')
const OrderRoutes = require('./routes/order')
const AdminRoutes = require('./routes/admin')

require('dotenv').config()
const app = express()
app.use(morgan("dev"))
app.use(cors())
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//     res.send("welcome to HOTEL");
// })
/* --------------------------- database connection -------------------------- */
const connectDB = () =>{
    try{
        const cnn = mongoose.connect(`${process.env.MONGODB_URL}`)
        // console.log("connect")
    }
    catch(err){
        console.log(err + "connection");
    }
}
connectDB()
/* -------------------------------- namespace ------------------------------- */
app.use("/api/v1" ,UserRoutes)
app.use("/api/v1" ,OrderRoutes)
app.use("/api/v1",AdminRoutes)


app.listen(process.env.PORT, (err) => {
    console.log(" Database connected successfully!")
})