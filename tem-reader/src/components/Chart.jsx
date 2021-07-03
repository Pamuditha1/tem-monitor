import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "Temperature",
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: "blue",
      borderColor: "blue",
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const Chart = () => {
  const chartStyle = {
    width: "1000px",
    height: "auto",
    margin: "auto",
  };
  return (
    <>
      {/* <div className="header">
      <h1 className="title">Line Chart</h1>
      <div className="links">
        <a
          className="btn btn-gh"
          href="https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js"
        >
          Github Source
        </a>
      </div>
    </div> */}
      <div style={chartStyle}>
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default Chart;
