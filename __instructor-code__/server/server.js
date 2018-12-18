require('dotenv').config();
const express = require('express');
const messagesCtrl = require('./messagesCtrl');
const session = require('express-session');

let { SERVER_PORT, SECRET } = process.env;

const app = express();
app.use(express.json());

app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false
}))

app.get('/api/messages', messagesCtrl.getAllMessages)
app.post('/api/messages', messagesCtrl.createMessage)
app.get('/api/messages/history', messagesCtrl.history)


app.listen(SERVER_PORT, () => {
  console.log(`Listening on port: ${SERVER_PORT}`)
})

