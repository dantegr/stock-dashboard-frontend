import React, { useState } from "react";
import { createMetric } from "../../api/apiCalls";
import "./AddNewMetric.css";

const AddNewMetric = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createMetric(inputs);
    setInputs({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="inputs">
        <label>
          Name:
          <input
            className="inputField"
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Value:
          <input
            className="inputField"
            type="number"
            name="value"
            value={inputs.value || ""}
            onChange={handleChange}
          />
        </label>
      </div>
      <input className="submit-button" type="submit" value="Add new metric" />
    </form>
  );
};

export default AddNewMetric;
