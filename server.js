const express = require('express');
const PORT = 3000;
const app = express();
const connect = require('./db.js')
connect();
app.use('/api/auth',require('./router/auth.js'));


app.get('/',(req,res)=>{
    res.send('HARSH RASTOGI')
})

app.listen(PORT,(req,res)=>{
    console.log("Server Started : ", PORT);
})

