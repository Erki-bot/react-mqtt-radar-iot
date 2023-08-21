import * as mqtt from "precompiled-mqtt";
// let protocol = "ws";
// let host = "localhost";
// let port = 8083;
// let clientId = "erki0";
// let { username, password } = { username: "erki-test", password: "erki" };
// const url = `${protocol}://${host}:${port}/mqtt`;
// const options = {
//   clientId,
//   username,
//   password,
//   clean: true,
//   reconnectPeriod: 1000, // ms
//   connectTimeout: 30 * 1000, // ms
// };
// const mqttClient = mqtt.connect(url, options);
// mqttClient.on("connect", () => {
//   console.log("Connected to the broker");
// });
// mqttClient.subscribe("esp32/distance");
// mqttClient.on("message", (topic: string, payload: Buffer) => {
//   console.log(payload.toString());
// });

// export default mqttClient;
type MQTTConfig = {
  protocol: string;
  host: string;
  port: number;
  username: string;
  password: string;
  clientId: string;
};

class MQTTClient {
  private client: mqtt.MqttClient | undefined;

  connect(
    config: MQTTConfig,
    successCalback?: (packet?: mqtt.IConnectPacket) => void,
    reconnectCalback?: (packet?: mqtt.IConnectPacket) => void,
    failledCalback?: (error?: Error) => void
  ) {
    const url = `${config.protocol}://${config.host}:${config.port}/mqtt`;
    let { username, password, clientId } = config;
    const options = {
      clientId,
      username,
      password,
      clean: true,
      reconnectPeriod: 1000, // ms
      connectTimeout: 30 * 1000, // ms
    };
    this.client = mqtt.connect(url, options);
    if (successCalback) this.onConnect(successCalback);
    if (reconnectCalback) this.onConnect(reconnectCalback);
    if (failledCalback) this.onError(failledCalback);
  }

  disconnect() {
    this.client?.end(true);
  }
  onConnect(calback: (packet?: mqtt.IConnectPacket) => void) {
    this.client?.on("connect", calback);
  }

  onRecconnect(calback: () => void) {
    this.client?.on("reconnect", calback);
  }

  onDisconnect(calback: (packet: mqtt.IDisconnectPacket) => void) {
    this.client?.on("disconnect", calback);
  }

  onError(calback: (error: Error) => void) {
    this.client?.on("error", calback);
  }
  subscribe(topic: string) {
    this.client?.subscribe(topic);
  }

  onMessage(calback: (topic: string, payload: Buffer) => void) {
    this.client?.on("message", calback);
  }
}

export default MQTTClient;
