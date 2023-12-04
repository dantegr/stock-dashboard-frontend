import React, { useContext, useEffect, useState } from "react";
import "./Metrics.css";
import Metric from "../Metric/Metric";
import AddNewMetric from "../AddNew/AddNewMetric";
import { useRecoilState } from "recoil";
import { metricsState } from "../../store/atom";

const Metrics = (props) => {
  const [metricsArray, setMetricsArray] = useRecoilState(metricsState);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    setMetrics(metricsArray);
  }, [metricsArray]);

  return (
    <>
      <div className="metricsWrapper">
        {metrics.map((el) => {
          return <Metric metric={el} key={el._id} />;
        })}
      </div>
      <AddNewMetric />
    </>
  );
};

export default Metrics;
