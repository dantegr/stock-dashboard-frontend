import React, { useState, useEffect, useContext } from "react";
import { deleteMetric, updateMetric } from "../../api/apiCalls";
import { useRecoilState } from "recoil";
import { metricsState } from "../../store/atom";
import "./Metric.css";

const Metric = (props) => {
  const [metricsArray, setMetricsArray] = useRecoilState(metricsState);

  const [currentMetric, setCurrentMetric] = useState(props.metric);
  const [currentMetricName, setCurrentMetricName] = useState("");
  const [currentMetricId, setCurrentMetricId] = useState("");
  const [currentMetricValue, setCurrentMetricValue] = useState(0);
  const [currentMetricMaxValue, setCurrentMetricMaxValue] = useState(0);
  const [currentMetricMinValue, setCurrentMetricMinValue] = useState(0);

  useEffect(() => {
    setCurrentMetricName(props.metric.name);
    setCurrentMetricId(props.metric._id);
    setCurrentMetricValue(props.metric.value);
    setCurrentMetricMaxValue(props.metric.maxValue);
    setCurrentMetricMinValue(props.metric.minValue);
  }, [props]);

  const handleClickAdd = async (id) => {
    let tempMetric = { ...currentMetric };
    let tempArray = [...metricsArray];

    tempMetric.value = currentMetricValue + 1;

    if (tempMetric.value > tempMetric.maxValue) {
      tempMetric.maxValue = tempMetric.value;
      setCurrentMetricMaxValue(tempMetric.maxValue);
    }
    const index = tempArray.findIndex((obj) => obj._id === id);

    tempArray[index] = tempMetric;

    setMetricsArray(tempArray);
    setCurrentMetricValue(tempMetric.value);
    setCurrentMetric(tempMetric);
    await updateMetric(id, tempMetric);
  };

  const handleClickSubtract = async (id) => {
    let tempMetric = { ...currentMetric };
    let tempArray = [...metricsArray];

    tempMetric.value = currentMetricValue - 1;

    if (tempMetric.value < tempMetric.minValue) {
      tempMetric.minValue = tempMetric.value;
      setCurrentMetricMinValue(tempMetric.minValue);
    }
    const index = tempArray.findIndex((obj) => obj._id === id);

    tempArray[index] = tempMetric;

    setMetricsArray(tempArray);
    setCurrentMetricValue(tempMetric.value);
    setCurrentMetric(tempMetric);
    await updateMetric(id, tempMetric);
  };

  const handleMetricDelete = async (id) => {
    /*  let tempArray = [...metricsArray];
    tempArray = tempArray.filter(function (obj) {
      return obj._id !== id;
    });

    setMetricsArray(tempArray); */
    await deleteMetric(id);
  };

  return (
    <div className="metricWrapper">
      {currentMetricName}
      <div
        style={{
          fontSize: "120%",
        }}
      >
        {currentMetricValue}
      </div>
      <div className="buttons">
        <button
          style={{
            fontSize: "60%",
            marginRight: "5px",
            backgroundColor: "green",
            borderRadius: "5px",
            width: "25px",
            height: "25px",
            color: "white",
            cursor: "pointer",
          }}
          onClick={async () => {
            await handleClickAdd(currentMetricId);
          }}
        >
          +
        </button>
        <button
          style={{
            fontSize: "60%",
            marginLeft: "5px",
            backgroundColor: "red",
            borderRadius: "5px",
            width: "25px",
            height: "25px",
            color: "white",
            cursor: "pointer",
          }}
          onClick={async () => {
            await handleClickSubtract(currentMetricId);
          }}
        >
          -
        </button>
      </div>
      <div className="minMaxValueWrapper">
        <span>Max: {currentMetricMaxValue}</span>
        <span>Min: {currentMetricMinValue}</span>
      </div>
      <button
        style={{
          top: "0",
          right: "0",
          backgroundColor: "red",
          borderRadius: "5px`",
          color: "white",
          position: "absolute",
          cursor: "pointer",
        }}
        onClick={async () => {
          await handleMetricDelete(currentMetricId);
        }}
      >
        <svg
          fill="#ffffff"
          height="10px"
          width="10px"
          version="1.1"
          id="Capa_1"
          viewBox="0 0 460.775 460.775"
        >
          <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
        </svg>
      </button>
    </div>
  );
};

export default Metric;
