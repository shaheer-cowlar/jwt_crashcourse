const express = require("express");
const auth = require("./routes/auth");
const post = require("./routes/posts");

require("./services/mqttPublisher")
require("./services/mqttSubscriber")

const weather = require("./routes/weather")
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/testdb")

const app = express()
app.use(express.json())
app.use("/auth",auth)
app.use("/posts",post)
app.use("/weather",weather)

app.listen(5000,()=>{
    console.log('Now running on port 5000')
})