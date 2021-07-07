import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Sensors from "./Sensors";
import axios from "axios";
import api from "../api";

const chartStyle = {
  width: "1000px",
  height: "auto",
  margin: "auto",
};

function Chart({ sensor, user, setSensor }) {
  const [records, setrecords] = useState([]);
  const [data, setdata] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperature",
        data: [],
        fill: false,
        radius: "3",
        borderWidth: "3",
        backgroundColor: "#152238",
        borderColor: "#45b6fe",
      },
    ],
  });

  const [options, setoptions] = useState({
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  });

  useEffect(() => {
    axios
      .get(`${api}/get-records/${sensor}`)
      .then((res) => {
        console.log("Sen Records", res.data);
        
      })
      .catch((e) => {
        // toast.error(`Invalid Login`);
      });
  }, [sensor]);

  return (
    <>
      <Sensors user={user} setSensor={setSensor} sensor={sensor} />
      {records.length != 0 && (
        <div style={chartStyle}>
          <Line data={data} options={options} />{" "}
        </div>
      )}
    </>
  );
}

export default Chart;
