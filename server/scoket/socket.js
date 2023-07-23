const { Server } = require("socket.io");
const socketEventsConstants = require("../constants/socket-event-constants");

const meetingUsersList = [];
const meetingUsersList_temp_array = [];

function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  });

  io.on("connection", (socket) => {
    console.log("connection established");
    // socket.on('message', (msg) => {
    //     console.log(msg);
    // });
    //

    socket.on(socketEventsConstants.CREATE_MEETING, (data) => {
      const { meetingId, userId, username } = data;
      console.log("create-meeting");
      socket.join(meetingId);
      insertUserInMeetingUserList({ meetingId, userId, username })

      io.to(meetingId).emit(socketEventsConstants.MEETING_CREATED);
      // socket.emit('joined', { roomId });
    });

    socket.on("send_message_inside_meeting", (data) => {
      const { meetingId, event, message, user } = data;
      io.to(meetingId).emit(socketEventsConstants.NEW_MESSAGE_IN_MEETING, {
        message,
        user,
        dateTime: new Date().toLocaleString()
      });
      // console.log(data);
    });


    socket.on("remove_user_from_meeting", (data) => {

      removeUserFromMeeting(data, io);

    });


  });
}


function insertUserInMeetingUserList({ meetingId, userId, username }) {

  if (!meetingUsersList_temp_array.includes(userId)) {
    meetingUsersList_temp_array.push(userId);
    meetingUsersList.push({ meetingId, userId, username });
    console.log(meetingUsersList, 'meetingUsersList');


  }

}


function removeUserFromMeeting(data, io) {
  const { userId, meetingId } = data;


  const index = meetingUsersList.findIndex(user => (user.meetingId === meetingId && user.userId === userId));

  console.log('------------------------------------------------');

  if (index !== -1) {
    meetingUsersList.splice(index, 1);
    io.to(meetingId).emit('user-removed-from-meeting', {
      status: 'user-removed',
      userId,
      meetingId
    });
  }


  console.log(meetingUsersList);
}



module.exports = initSocket;
