import React, { useState, useEffect, createContext, useContext } from "react";
import "./App.css";
import { socket } from "./socket";
import Metrics from "./components/Metrics/Metrics";
import { getMetrics } from "./api/apiCalls";
import { useRecoilState } from "recoil";
import { metricsState } from "./store/atom";

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const [metricsArray, setMetricsArray] = useRecoilState(metricsState);

  const getAllMetrics = async () => {
    const result = await getMetrics();

    setMetricsArray(result);
  };

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      console.log("user connected");
    };

    getAllMetrics();
    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onMetricUpdateEvent = (value) => {
      getAllMetrics();
    };
    const onMetricCreateEvent = (value) => {
      getAllMetrics();
    };

    const onMetricDeleteEvent = (value) => {
      getAllMetrics();
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("metricUpdate", onMetricUpdateEvent);
    socket.on("metricDelete", onMetricDeleteEvent);
    socket.on("metricCreate", onMetricCreateEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("metricUpdate", onMetricUpdateEvent);
      socket.off("metricDelete", onMetricDeleteEvent);
      socket.off("metricCreate", onMetricCreateEvent);
    };
  }, []);

  return (
    <div className="App">
      <Metrics />
    </div>
  );
};

export default App;
