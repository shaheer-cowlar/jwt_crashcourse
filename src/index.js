const express = require("express");
const auth = require("./routes/auth");
const post = require("./routes/posts");

require("./services/mqttPublisher")
require("./services/mqttSubscriber")

const weather = require("./routes/weather")
const mongoose = require("mongoose")
const User = require("./user")





const app = express()
app.use(express.json());

mongoose.connect("mongodb://localhost/test")

app.use("/weather",weather)
app.use("/auth",auth)

app.listen(5000,()=>{
    console.log('Now running on port 5000')
})