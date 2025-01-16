import { Manager, Socket } from "socket.io-client";

let socket: Socket;
export const connectToSocket = (token: string) => {
  const manager = new Manager(
    "https://nesttesloshopapi.onrender.com/socket.io/socket.io.js",
    {
      // http://localhost:3000/socket.io/socket.io.js para ambiente local
      extraHeaders: {
        hola: "mundo",
        authentication: token,
      },
    }
  );

  socket?.removeAllListeners();
  socket = manager.socket("/");
  addListener();
};

const addListener = () => {
  const serverStatusLabel = document.querySelector("#server-status");

  const messageForm = document.querySelector<HTMLFormElement>("#message-form")!;
  const messageInput = document.querySelector<HTMLInputElement>(
    "#message-input"
  )! as HTMLInputElement;
  const messagesUl = document.querySelector<HTMLUListElement>("#messages-ul");

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

    socket.emit("message-from-client", {
      id: "yo",
      message: messageInput.value,
    });
    messageInput.value = "";
  });

  socket.on(
    "message-from-server",
    (payload: { fullName: string; message: string }) => {
      const li = document.createElement("li");
      li.innerHTML = payload.fullName + ": " + payload.message;
      messagesUl!.appendChild(li);
    }
  );
};
