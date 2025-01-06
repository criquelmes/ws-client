import { connectToSocket } from "./socket-client";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Websocket - client</h1>
    <span id="server-status">offline</span>
    <ul id="clients-ul">
    <li>adads</li>
    </ul>
  </div>
`;

connectToSocket();
