// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge } from "electron";
import { SerialPort } from "serialport";
import * as iconv from "iconv-lite";

contextBridge.exposeInMainWorld("serialport", {
  list: () => SerialPort.list(),
  print: (path: string, baudRate: number, content: string) => {
    try {
      const sp = new SerialPort({
        path,
        baudRate,
        autoOpen: false,
      });
      sp.open();
      sp.close();

      sp.write(iconv.encode(content, "windows1252"), (error) => {
        console.error(error);
        sp.close();
      });

      // sp.close();
    } catch (e) {
      console.error(e);
    }
  },
});
