import { connectToSocket } from "./socket-client";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h2>Websocket - client</h2>
    <input id="jwtToken" placeholder="JWT Token">
    <button id="btn-connect">Connect</button>

    <br />
    <span id="server-status">offline</span>
    <ul id="clients-ul">
    </ul>
    <form id="message-form">
    <input id="message-input" placeholder="Message">
    </form> 
    
    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`;

// connectToSocket();

const btnConnect = document.querySelector("#btn-connect")! as HTMLButtonElement;
const jwtToken = document.querySelector<HTMLInputElement>("#jwtToken")!;

btnConnect.addEventListener("click", () => {
  if (jwtToken.value.trim().length <= 0)
    return alert("Please enter a JWT token");

  connectToSocket(jwtToken.value.trim());
});
