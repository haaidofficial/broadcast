const { Server } = require("socket.io");
const socketEventsConstants = require("../constants/socket-event-constants");

const meetingUsersList = [];
const meetingUsersList_temp_array = [];
const meetingMessages = [];

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
      const { meetingId, userId, username, userType } = data;
      console.log("create-meeting", userType);
      socket.join(meetingId);
      insertUserInMeetingUserList({ meetingId, userId, username, userType })

      io.to(meetingId).emit(socketEventsConstants.MEETING_CREATED, { status: 'meeting-created', userType });
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


    // socket.on('offer', (data) => {

    //   const { meetingId, localDescription } = data;
    //   console.log(meetingId, localDescription, 'offer');
    //   io.to(meetingId).emit('new_offer', localDescription)
    // })


    // socket.on('answer', (data) => {
    //   console.log(data);
    //   if (data) {
    //     const { meetingId, rc } = data;
    //     io.to(meetingId).emit('new_answer', { meetingId, rc });
    //   }

    // })



    socket.on('insert_peer_connection_new_user', (data) => {
      console.log(data, 'insert_peer_connection_new_user');
      const { peerId, meetingId, user } = data;
      const { userId, username } = user;

      // console.log(peer, peerId, meetingId, 'insert_peer_connection_new_user');
      const result = insertPeerIdInsideUserList({ peerId, userId, username, meetingId });

      if (result.status && result.userType === 'participant') {
        const participantList = getAllCOnnectedUsersForAMeeting(meetingId);
        io.to(meetingId).emit('new_participant_joined', { userId, meetingId, participantList, newJoineePeerId: peerId });
      }
    });




  });
}


function insertUserInMeetingUserList({ meetingId, userId, username, userType }) {

  if (!meetingUsersList_temp_array.includes(userId)) {
    meetingUsersList_temp_array.push(userId);
    meetingUsersList.push({ meetingId, userId, username, userType });
    // console.log(meetingUsersList, 'meetingUsersList');


  }

}


function removeUserFromMeeting(data, io) {
  const { userId, meetingId } = data;


  const index = findIndexIfUserExists(meetingId, userId);

  console.log('------------------------------------------------');

  if (index !== -1) {
    meetingUsersList.splice(index, 1);
    io.to(meetingId).emit('user-removed-from-meeting', {
      status: 'user-removed',
      userId,
      meetingId
    });
  }


  // console.log(meetingUsersList);
}


function insertPeerIdInsideUserList({ peerId, userId, username, meetingId }) {
  //console.log(userId,  'meetingUsersList');
  const index = findIndexIfUserExists(meetingId, userId);

  // meetingUsersList = [...meetingUsersList].splice(index, 1, { meetingId, userId, username });

  meetingUsersList[index].peerId = peerId;
  console.log(meetingUsersList, 'meetingUsersList');
  return { status: true, userType: meetingUsersList[index].userType };




}



function findIndexIfUserExists(meetingId, userId) {
  const index = meetingUsersList.findIndex(user => (user.meetingId === meetingId && user.userId === userId));
  return index;
}


function getAllCOnnectedUsersForAMeeting(meetingId) {
  return meetingUsersList.filter((user, index) => user.meetingId === meetingId);
}





module.exports = initSocket;
