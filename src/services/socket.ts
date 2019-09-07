import io from 'socket.io-client';

const socket = io({ path: '/api' });

export default socket;