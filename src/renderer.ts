import { createApp } from "vue";
import App from "./App.vue";
import type { PortInfo } from "@serialport/bindings-interface";

const app = createApp(App);

app.mount("#app");

(async function () {
  const ports: PortInfo[] = await window.serialport.list();

  console.log(ports);
})();
