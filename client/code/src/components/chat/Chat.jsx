import { useEffect, useState } from 'react';
import { socket } from '../../services/socket/socket-connection';

export function Chat() {

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected');


            socket.on('joined', (roomId) => {
                console.log(roomId.roomId);
            });
        })

        socket.emit('message', 'this is a test message');
    }, []);




    return (
        <>
        </>
    );

}