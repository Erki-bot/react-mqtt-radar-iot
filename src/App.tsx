import React, { useEffect, useState } from "react";
import { RadarChart } from "./components/RadarChart";
import { RadarDist } from "./components/RadarDist";
import Test2 from "./components/Test2";
import TempChart from "./components/project2/TempChart";
import MQTTClient from "./mqtt/MQTTClient";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Button, Container, Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import HumChart from "./components/project2/HumChart";
import { hu } from "@faker-js/faker";
import GasChart from "./components/project2/GasChart";
import Status from "./components/Status";
import Test from "./components/Test";
const mqttClient = new MQTTClient();
function App() {
  const [tempDatas, setTempDatas] = useState<any>();
  const [humDatas, setHumDatas] = useState<any>();
  const [gasData, setGasData] = useState<any>();
  const [radarDatas, setRadarDatas] = useState<any>();
  const [host, setHost] = useState(window.location.hostname);
  const [h, setH] = useState("");
  const [port, setPort] = useState(8083);
  const [protocol, setProtocol] = useState("ws");
  const [startup, setStartup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [project1, setProject1] = useState(false);
  const [project2, setProject2] = useState(false);

  useEffect(() => {
    // initMqtt();
    return () => mqttClient.disconnect();
  }, []);
  function handleClick() {
    setIsLoading(true);
    setHost(h);
    initMqtt();
  }

  function handleCancel() {
    mqttClient.disconnect(() => {
      console.log("@@@@@@@@@@@@@@@@Disconnected");
    });
    setIsLoading(false);
  }
  function initMqtt() {
    mqttClient.connect(
      {
        host,
        protocol,
        port,
        username: "Erki",
        password: "erki",
        clientId: `id_${parseInt(`${Math.random() * 1000}`)}`,
      },
      () => {
        console.log("Connected to the broker");
        setIsLoading(false);
        setStartup(true);
      },
      () => console.log("Reconnecting to broker"),
      (error) => {
        console.log(`Something failled ==> ${error?.message}`);
        setIsLoading(false);
      }
    );

    mqttClient.subscribe("esp32/distance");
    mqttClient.subscribe("home/#");
    mqttClient.subscribe("status/#");
    mqttClient.onMessage((topic, payload) => {
      // payload = '{"name": "esp32"}'mqttData
      let mqttData;
      // try {
      // mqttData = JSON.parse(payload.toString());
      // } catch (e) {
      mqttData = payload.toString();
      // }
      // console.log(payload.toString());
      let time = new Date().toString();
      if (topic === "home/temp") {
        setTempDatas({ data: mqttData, time });
      } else if (topic === "home/hum") {
        // console.log(topic);
        setHumDatas({ data: mqttData, time });
      } else if (topic === "home/gas") {
        setGasData({ data: mqttData, time });
      } else if (topic === "home/distance") {
        mqttData = JSON.parse(mqttData);
        setRadarDatas({ data: mqttData, time });
      } else if (topic === "status/esp1") {
        mqttData === "on" ? setProject1(true) : setProject1(false);
      } else if (topic === "status/esp2") {
        mqttData === "on" ? setProject2(true) : setProject2(false);
      }
      //   console.log(JSON.parse("{'name':'esp32'}"));
      //   console.log(payload.toString());
      // console.log(mqttData);
    });
  }

  return startup ? (
    <div className="container">
      <Tabs
        defaultActiveKey="project1"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="project1" title="Station Météo">
          <Status project={"Station Météo"} status={project1} />
          <Container>
            <TempChart tempDatas={tempDatas} />
            <HumChart humDatas={humDatas} />
            <GasChart gasData={gasData} />
          </Container>
        </Tab>
        <Tab eventKey="project2" title="Radar">
          <Status project={"Projet 2"} status={project2} />
          {/* <Test radarDatas={radarDatas} /> */}
          {/* <Test radarDatas={radarDatas} />
        </Tab>
        <Tab eventKey="all" title="Tous">
          {/* <RadarDist radarDatas={tempDatas} /> */}
          {/* <Test2 radarDatas={radarDatas}/> */}
          <RadarDist radarDatas={radarDatas} />
        </Tab>
      </Tabs>
      {/* <AreaChart /> */}
      {/* <RadarChart/> */}
    </div>
  ) : (
    <div
      className="d-flex justify-content-center align-items-center "
      style={{ marginTop: 100 }}
    >
      <Form className="my-5">
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="">MQTT server address</Form.Label>
          <Form.Control
            type="email"
            placeholder="MQTT server address"
            defaultValue={host}
            onChange={(e) => {
              e.preventDefault();
              setHost(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            Addresse IP de la machine sur laquelle le broker MQTT est installé
          </Form.Text>
          <br />
          <Form.Label className="">Port</Form.Label>
          <Form.Control
            type="number"
            placeholder="Exemple 8083"
            defaultValue={port}
            onChange={(e) => setPort(Number(e.target.value))}
          />
          <Form.Text className="text-muted">
            Port du broker{" "}
            <span className="font-style-italic">(par défaut 8083)</span>
          </Form.Text>
          <br />
          <Form.Label className="">Protocol</Form.Label>
          <Form.Control
            type="text"
            defaultValue={protocol}
            placeholder="Exemple ws"
            onChange={(e) => setProtocol(e.target.value)}
          />
          <Form.Text className="text-muted">
            <span className="font-style-italic">(par défaut ws)</span>
          </Form.Text>
        </Form.Group>
        <Button
          className="m-2"
          disabled={!host || !protocol || !port || isLoading}
          onClick={handleClick}
        >
          {!isLoading ? "Se connecter" : "Connexion en cours..."}
        </Button>
        {isLoading && (
          <Button className="m-2" variant="danger" onClick={handleCancel}>
            Annuler
          </Button>
        )}
      </Form>
    </div>
  );
}

export default App;
