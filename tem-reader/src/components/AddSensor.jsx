import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../api";
import jwtDecode from "jwt-decode";

function AddSensor() {
  const [sensorData, setsensorData] = useState({
    sensor_id: "",
    user: "",
    threshold_value: "",
  });

  useEffect(() => {
    const jwt = localStorage.getItem("token");

    // Set User by Token
    if (jwt) {
      setsensorData({ ...sensorData, user: jwtDecode(jwt)._id });
    } else {
      setsensorData({ ...sensorData, user: "" });
      //   toast.error(`User not Logged In`);
    }
  }, []); //ado mn poddk mute krnoo, call ekaka inne. ee gaman hdnnm ah ela ela

  const submit = async (e) => {
    e.preventDefault();
    console.log(sensorData);
    axios.post(`${api}/add-sensor`, sensorData).catch((e) => {
      // toast.error(`Invalid Login`);
    });
  };

  return (
    <div className="row">
      <div className="col-1"></div>
      <div className="col-1">
        <h6>Add Sensor</h6>
      </div>
      <div className="col-5">
        <form>
          <div className="row">
            <div className="col-6">
              <input
                onChange={(e) =>
                  setsensorData({ ...sensorData, sensor_id: e.target.value })
                }
                value={sensorData.sensor_id}
                className="form-control col-6"
                type="text"
                id="sensor_id"
                name="sensor_id"
                placeholder="Sensor No"
              />
            </div>
            <div className="col-6">
              <input
                onChange={(e) =>
                  setsensorData({
                    ...sensorData,
                    threshold_value: e.target.value,
                  })
                }
                value={sensorData.threshold_value}
                className="form-control"
                type="number"
                id="threshold_value"
                name="threshold_value"
                placeholder="Threshold Value"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="col-3">
        <button onClick={submit} type="submit" className="btn btn-success">
          Add Sensor
        </button>
      </div>
    </div>
  );
}

export default AddSensor;
