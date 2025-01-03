import { Manager, Socket } from "socket.io-client";

export const connectToSocket = () => {
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js");

  const socket = manager.socket("/");
  addListener(socket);
};

const addListener = (socket: Socket) => {
  const serverStatusLabel = document.querySelector("#server-status");

  socket.on("connect", () => {
    serverStatusLabel!.innerHTML = "online";
  });

  socket.on("disconnect", () => {
    serverStatusLabel!.innerHTML = "offline";
  });
};
