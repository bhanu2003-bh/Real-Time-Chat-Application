import express from 'express'
import http from 'http'
import {Server} from 'socket.io';
import cors from 'cors'
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173', // Replace with your Vite dev server URL
      methods: ['GET', 'POST'],
      credentials: true
    }
  });
  
  app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }));



app.get('/',(req,res)=>{
    res.send('<h1>Hello</h1>');
})

io.on('connection',(client)=>{
    console.log("The Connected client id is :",client.id);

   client.on('user-message',(message)=>{
    console.log("new Message comes to server:",message,client.id);
    io.emit('messages',{'message':message,'client_id':client.id});
})
    

})

server.listen(3000,()=>{
    console.log("PORT is running at 3000...")
})
