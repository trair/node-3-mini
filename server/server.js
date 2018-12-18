require('dotenv').config();
const express = require('express');
const messagesCtrl = require('./messagesCtrl')
const session = require('express-session')

let {SERVER_PORT, SECRET} = process.env

// EXPRESS APP AND JSON PARSER
const app = express()
app.use(express.json())

// TOP-LEVEL MIDDLEWARE
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use((req, res, next) => {
    let badWords = ['poop', 'meanie', 'internet explorer']
    if (req.body.message) {
        let badWordsExist = true;
        for (let i=0; i < badWords.length; i++) {
            let regex = new RegExp(badWords[i], 'g')
            req.body.message = req.body.message.replace(regex, '****')
        }
        next()
    } else {
        next()
    }
})

// ENDPOINTS
app.get('/api/messages', messagesCtrl.getAllMessages)
app.post('/api/messages', messagesCtrl.createMessage)
app.get('/api/messages/history', messagesCtrl.history)


app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT} Bob Ross chia pets`)
})