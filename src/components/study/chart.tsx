"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

//기본 Line 차트
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]; //x축 기준

interface LineChartProps {
  commitOfMonth: { [key: number]: number };
}

export default function LineChart({ commitOfMonth }) {
  // 월별 커밋 데이터를 배열로 변환
  const commitData = Array.from(
    { length: 12 },
    (_, i) => commitOfMonth[i + 1] || 0
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "three.js",
        data: commitData,
        borderColor: "rgb(53, 162, 235)", //실제 그려지는 데이터(Y축 숫자)
        //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className='w-full p-[100px] mt-14'>
      <div className=''>
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
}
