import { Manager, Socket } from "socket.io-client";

export const connectToSocket = () => {
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js");

  const socket = manager.socket("/");
  addListener(socket);
};

const addListener = (socket: Socket) => {
  const serverStatusLabel = document.querySelector("#server-status");

  const messageForm = document.querySelector<HTMLFormElement>("#message-form")!;
  const messageInput = document.querySelector<HTMLInputElement>(
    "#message-input"
  )! as HTMLInputElement;

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

  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (messageInput.value.trim().length <= 0) return;
    console.log({ id: "yo", message: messageInput.value });
    socket.emit("message-from-client", {
      id: "yo",
      message: messageInput.value,
    });
    messageInput.value = "";
  });
};
