
import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    return io(process.env.REACT_APP_BACKEND_URL, options);
        //url of server to connect to with customised options

};

//EVERY TIME WHEN WE WANT TO CONNECT TO SERVER WE WILL CALL THIS FUNCTION