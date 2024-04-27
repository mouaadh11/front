import { Line } from "react-chartjs-2";
import {
  Chart,
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
} from "chart.js";

export default function (data) {
  Chart.register(PointElement, CategoryScale, LineElement, LinearScale);
  console.log(data);
  const chartData = {
    labels: data.data.map((item) => item.time),
    datasets: [
      {
        label: "BPM",
        data: data.data.map((item) => item.bpm),
        fill: false,
        backgroundColor: "#0374db",
        borderColor: "#fb7c32",
      },
    ],
  };
  console.log(chartData);
  return (
    <>
      <div className="header">
        <h1 className="title">BPM over 24h</h1>
      </div>
      {data && <Line data={chartData} />}
    </>
  );
}
