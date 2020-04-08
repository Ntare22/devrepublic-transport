import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import socketio from 'socket.io';
import http from 'http';
import authRouter from './api/routes/authRoutes';
import tripRouter from './api/routes/tripRoute';

import {
  getUser, getUsersInRoom, removeUser, addUser,
} from './api/helpers/manageChat';

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 4000;

app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to devRepublic transport',
}));

const server = http.createServer(app);
const io = socketio(server);

// io.on('connection', (socket) => {
//   console.log('User is conncted!');

//   socket.on('join', ({ name, room }, callback) => {
//     // callback function usage
//     // const error = true;
//     // if (error) {
//     //   callback({ error: 'This is an error from server' });
//     // }
//     const { error, user } = addUser({ id: socket.id, name, room });

//     if (error) return callback(error);
//     socket.emit('message', { user: 'Admin Aime', text: `${user.name} welcome to ${user.room}` });
//     socket.broadcast.to(user.room).emit('message', { user: 'Admin Aime', text: `${user.name} has joined!` });
//     socket.join(user.room);

//     callback();
//   });

//   socket.on('sendMessage', (message, callback) => {
//     const user = getUser(socket.id);

//     io.to(user.room).emit('sendMessage', { user: user.name, text: message });
//     console.log("MESSAGE",message)
//     callback();
//   });

//   socket.on('disconnect', () => {
//     console.log('user left');
//   });
// });

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });
    console.log('MEEEEEEE',message)
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1', tripRouter);
// app.listen(port, () => console.log(`Server is running on PORT ${port}`));

server.listen(port, () => console.log(`Server is running on PORT ${port}`));

export default app;
