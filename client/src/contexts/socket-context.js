import { createContext, useContext, useState } from "react";
import { io } from "socket.io-client";
import { v4 as UUIDV4 } from "uuid";
import { serverConstants } from "../constants/server-constants";
import { socketEventsConstants } from "../constants/socket-event-constants";

const SocketContext = createContext();
const socket = io(serverConstants.SERVER_BASE_URL);


export function SocketContextProvider({ children }) {

    const [meetingAlert, setMeetingAlert] = useState({
        action: '',
        isVisible: false,
        severity: ''
    });

    function createMeeting() {
        return new Promise((resolve, reject) => {
            const meetingId = UUIDV4();
            socket.emit(socketEventsConstants.CREATE_MEETING, { meetingId });

            socket.on(socketEventsConstants.MEETING_CREATED, () => {
                resolve({
                    action: socketEventsConstants.MEETING_CREATED,
                    isVisible: true,
                    message: 'Meeting created successfully',
                    severity: 'success'
                })
                // setMeetingAlert(prevState => ({ action: socketEventsConstants.MEETING_CREATED, isVisible: true, message: 'Meeting created successfully', severity: 'success' }));
                // console.log('Meeting created');
            });
        });

    }



    const contextProviderValues = {
        createMeeting,
        meetingAlert
    }

    return <SocketContext.Provider value={contextProviderValues}>
        {children}
    </SocketContext.Provider>
}


export function useSocketContext() {
    return useContext(SocketContext);
}

