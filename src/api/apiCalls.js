import axios from "axios";

const baseURL = "http://localhost:3001";

export const getMetrics = async () => {
  try {
    const result = await axios.get(`${baseURL}/metrics`).then((response) => {
      return response.data;
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const deleteMetric = async (id) => {
  try {
    const result = await axios
      .delete(`${baseURL}/metric/${id}`)
      .then((response) => {
        return response.data;
      });
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const updateMetric = async (id, body) => {
  try {
    const result = await axios
      .put(`${baseURL}/metric/${id}`, body)
      .then((response) => {
        return response.data;
      });
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const createMetric = async (body) => {
  try {
    const result = await axios
      .post(`${baseURL}/metric`, body)
      .then((response) => {
        return response.data;
      });
    return result;
  } catch (err) {
    console.log(err);
  }
};
