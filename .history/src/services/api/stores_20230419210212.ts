import endPoints from "./index";
import axios from "axios";

const createStore = async (body: any) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(endPoints.stores.create, body, config);
  return response.data;
};

const updateStore = async (id: any, body: any) => {
  const config = {};
  const response = await axios.put(endPoints.stores.update(id), body, config);
  return response.data;
};

const getStoreWithinDistance = async (store_lat: any, store_lon: any) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  const body = {
    store_lat: { store_lat },
    store_lon: { store_lon },
    distance: 1000,
  };
  const response = await axios.post(
    endPoints.stores.withinDistance.get,
    body,
    config
  );
  return response.data;
};

export { createStore, updateStore };
