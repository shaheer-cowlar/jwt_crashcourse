const express = require("express");
const auth = require("./routes/auth");
const post = require("./routes/posts");

require("./services/mqttPublisher");
require("./services/mqttSubscriber");

const mongoose = require("mongoose");
const User = require("./user");
const { InfluxDB, Point } = require("@influxdata/influxdb-client");

/** Environment variables **/
const url = "http://localhost:8086";
const token = "o2BYOZlZJoiKIZJVzdoLxaQpWNbYHRGwHKx9CNIwh9Z8p4Zv3hTEmQ-926aqz5zF6OUuWb8Ffx59yZPBQICGYA==";
const org = "shaheer-cowlar";
const bucket = "shaheer-cowlar-bucket1";

/**
 * Instantiate the InfluxDB client
 * with a configuration object.
 **/
const influxDB = new InfluxDB({ url, token });

// Require the data from db.js
const { weather } = require("./db");

//influx db token
//o2BYOZlZJoiKIZJVzdoLxaQpWNbYHRGwHKx9CNIwh9Z8p4Zv3hTEmQ-926aqz5zF6OUuWb8Ffx59yZPBQICGYA==
const writeApi = influxDB.getWriteApi(org, bucket);

/**
 * Apply default tags to all points.
 **/
writeApi.useDefaultTags({ region: 'west' });

// Create a function to write data points
function writeToInfluxDB() {
  weather.forEach((data) => {
    const { city, temperature, humidity } = data;

    const point = new Point('temperature')
      .tag('city', city)
      .floatField('value', parseFloat(temperature))
      .floatField('humidity', parseFloat(humidity));

    console.log(point);
    writeApi.writePoint(point);
  });
}

// Call the function to write data points
writeToInfluxDB();

/**
 * Flush pending writes and close writeApi.
 **/
writeApi.close().then(() => {
  console.log('WRITE FINISHED');
});

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost/test");

app.use("/auth", auth);

app.listen(5000, () => {
  console.log('Now running on port 5000');
});
