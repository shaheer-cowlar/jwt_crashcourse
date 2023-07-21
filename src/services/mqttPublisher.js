const mqtt = require('mqtt');
const { weather } = require("../db");

// MQTT broker details
const brokerUrl = 'mqtt://localhost';
const brokerPort = 1883;
const topic = 'weather'; // Specify the topic you want to publish to

// Create a client instance
const client = mqtt.connect(`${brokerUrl}:${brokerPort}`);

// Handle the connection event
client.on('connect', () => {
  //console.log('Connected to MQTT broker by publisher');
});

// Handle the error event
client.on('error', (error) => {
  console.error('MQTT Error:', error);
});

// Publish a message every one second
setInterval(() => {
  const message = JSON.stringify(weather); // Convert weather data to a JSON string
  //console.log('Sending:', message);

  client.publish(topic, message);
  //console.log('Published message:', message);
}, 1000);