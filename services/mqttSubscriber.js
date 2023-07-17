const mqtt = require('mqtt');

// MQTT broker details
const brokerUrl = 'mqtt://localhost';
const brokerPort = 1883;
const topic = 'weather'; // Specify the topic you want to subscribe to

// Create a client instance
const client = mqtt.connect(`${brokerUrl}:${brokerPort}`);

// Handle the connection event
client.on('connect', () => {
  console.log('Connected to MQTT broker by subscriber');
  // Subscribe to the specified topic
  client.subscribe(topic);
});

// Handle incoming messages
client.on('message', (receivedTopic, message) => {
  console.log('Received message:', message.toString());
});

// Handle the error event
client.on('error', (error) => {
  console.error('MQTT Error:', error);
});
