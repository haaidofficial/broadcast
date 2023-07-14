const { Server } = require('socket.io');
const socketEventsConstants = require('../constants/socket-event-constants');

function initSocket(httpServer) {

    const io = new Server(httpServer, {
        cors: {
            origin: '*'
        }
    });

    io.on('connection', (socket) => {
        console.log('connection established');
        // socket.on('message', (msg) => {
        //     console.log(msg);
        // });
        //



        socket.on(socketEventsConstants.CREATE_MEETING, (data) => {
            console.log(data, 'create-meeting');
            socket.join(data.meetingId);
            io.to(data.meetingId).emit(socketEventsConstants.MEETING_CREATED);
            // socket.emit('joined', { roomId });
        });




        socket.on('new-message', (data) => {
            console.log(data);
        });
    })
}


module.exports = initSocket;