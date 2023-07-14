import { v4 as UUIDV4 } from 'uuid';

export function startNewMeeting() {

    const meetingId = UUIDV4();
    return meetingId;

}