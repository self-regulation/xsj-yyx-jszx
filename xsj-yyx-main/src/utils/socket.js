import socketIo from "socket.io-client";

let host = location.origin;

const socket = socketIo.connect(host);

export default socket;
