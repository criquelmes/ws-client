import { Manager, Socket } from "socket.io-client";

export const connectToSocket = () => {
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js");

  const socket = manager.socket("/");
  addListener(socket);
};

const addListener = (socket: Socket) => {
  const serverStatusLabel = document.querySelector("#server-status");

  //TODO: #clients-ul

  socket.on("connect", () => {
    serverStatusLabel!.innerHTML = "online";
  });

  socket.on("disconnect", () => {
    serverStatusLabel!.innerHTML = "offline";
  });

  socket.on("clients-updated", (clients: string[]) => {
    const clientsUl = document.querySelector("#clients-ul");

    clientsUl!.innerHTML = "";
    clients.forEach((client) => {
      const li = document.createElement("li");
      li.innerHTML = client;
      clientsUl!.appendChild(li);
    });
  });
};
