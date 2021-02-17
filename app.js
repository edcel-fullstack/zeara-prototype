const { createServer } = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { createEventAdapter } = require('@slack/events-api');
const slackSigningSecret = 'a5a04e5ffd6b259b379fbfa6f0a777ae';
const port = process.env.PORT || 3000;
const slackEvents = createEventAdapter(slackSigningSecret);
const firebase = require('./db');
const firestore = firebase.firestore();
// Create an express application
const app = express();
const moment = require('moment'); // require


app.use('/slack/events', slackEvents.requestListener());
app.use(bodyParser());

slackEvents.on('message', (event) => {
    (async () => {
      try {
      //   const m = moment();
      //   const data = { 
      //     createdAt: m.toString(),
      //     photoURL: 'https://i.ibb.co/HqdWLRv/z-letter-53876-60370.jpg',
      //     text: event.text,
      //     uid: event.user,
      // };
        
      //   await firestore.collection('messages').doc().set(data);
      console.log(event);
        
      } catch (error) {
        console.log(error.data)
      }
    })();
  });
  
  slackEvents.on('error', console.error);

const server = createServer(app);
server.listen(port, () => {
  // Log a message when the server is ready
  console.log(`Listening for events on ${server.address().port}`);
});