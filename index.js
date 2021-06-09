const express = require('express')
const app =express();
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const server = http.createServer(app)

const io = socketio(server)
const mongoose= require('mongoose')

app.use(express.json())

const indexpath = path.join(__dirname,'/public')
// console.log(indexpath)
app.use(express.static(indexpath))
app.get('',(req,res)=>{
res.sendFile(indexpath)

})
let count = 0;
// socket.on('newuser')
io.on('connection',(socket)=>{
    console.log('connection is up and r')
    socket.emit('messages','new user connected')
    socket.broadcast.emit('messages','a new has user is joined')
   

socket.on('sendmessages',(message,cb)=>{
    io.emit('messages',message)
    
    cb();
    
})

socket.on('geolocation',(cord,cb)=>{
io.emit('messages',`https://www.google.com/maps/?q=${cord.lang},${cord.lat}`);

cb()
})

socket.on('disconnect',()=>{
    // console.log('a user is left')
    io.emit('messages','a user is left') 
})

})


const port =process.env.PORT||5000



// mongoose.connect('mongodb://shivanshu:trisha@cluster0-shard-00-00.tcown.mongodb.net:27017,cluster0-shard-00-01.tcown.mongodb.net:27017,cluster0-shard-00-02.tcown.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-qd2pgr-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
// .then(()=>{
   
// })
// .catch((e)=>{
//     console.log(e);
// })
server.listen(port,()=>{
    console.log('app is connected')
})
