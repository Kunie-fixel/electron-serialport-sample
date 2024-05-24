<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getBillPrintTestContent } from "./serial-printer";

interface PortInfo {
  path: string;
  manufacturer: string | undefined;
  serialNumber: string | undefined;
  pnpId: string | undefined;
  locationId: string | undefined;
  productId: string | undefined;
  vendorId: string | undefined;
}

const BaudRates = [9600, 19200, 38400, 57600, 115200];

const serialPorts = ref<PortInfo[]>([]);
const selectedPath = ref<string | null>(null);
const selectedBaudRate = ref<number | null>(BaudRates[0]);

onMounted(async () => {
  serialPorts.value = await window.serialport.list();
});

async function printTest() {
  await window.serialport.print(
    selectedPath.value,
    selectedBaudRate.value,
    getBillPrintTestContent(),
  );
}
</script>

<template>
  <div>
    Serial Ports <br />

    <ul>
      <li v-for="(serialPort, index) in serialPorts" :key="index">
        <input
          type="radio"
          name="sp"
          :value="serialPort.path"
          v-model="selectedPath"
        />
        path: {{ serialPort.path }} <br />
        manufacturer: {{ serialPort.manufacturer }} <br />
        serialNumber: {{ serialPort.serialNumber }} <br />
        pnpId: {{ serialPort.pnpId }} <br />
        locationId: {{ serialPort.locationId }} <br />
        productId: {{ serialPort.productId }} <br />
        vendorId: {{ serialPort.vendorId }} <br />
      </li>
    </ul>

    - selected : {{ selectedPath }} <br />
    - baud rate :
    <select name="baudRate" v-model="selectedBaudRate">
      <option
        v-for="baudRate in BaudRates"
        :key="`baudRates[${baudRate}]`"
        :value="baudRate"
      >
        {{ baudRate }}
      </option>
    </select>
    <br />
    <button type="button" @click="printTest">프린트 테스트</button>
  </div>
</template>
