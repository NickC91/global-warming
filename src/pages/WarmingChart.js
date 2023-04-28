import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../reducers/ApiReducers"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WarmingChart = () => {
  const { type } = useParams()
  const dispatch = useDispatch()
  const { warming } = useSelector((state) => state.warming)

  let dataWarming = []

  if (warming && warming.result) {
    dataWarming = warming.result.slice(0, 200);
  } else if (warming && warming.co2) {
    dataWarming = warming.co2.slice(0, 200)
  } else if (warming && warming.methane) {
    dataWarming = warming.methane.slice(0, 200)
  } else if (warming && warming.nitrous) {
    dataWarming = warming.nitrous.slice(0, 200)
  } else if (warming && warming.arcticData) {
    dataWarming = warming.arcticData
  }

  const fetchWarming = () => {
    let apiUrl = `${type}-api`
    dispatch(fetchData(apiUrl))
  }

  useEffect(() => {
    fetchWarming()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  const warmingData = {
    labels: [],
    datasets: [
      {
        label: type,
        data: [],
        backgroundColor: ["#ffffff", "#bbbbbb"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  dataWarming.forEach((data) => {
    if (data.time && data.station) {
      warmingData.labels.push(data.time);
      warmingData.datasets[0].data.push({ x: data.time, y: data.station });
    } else if (data.date && data.average) {
      warmingData.labels.push(data.date);
      warmingData.datasets[0].data.push({ x: data.date, y: data.average });
    } else if (data.year && data.month && data.extent) {
      const dateString = `${data.year}-${data.month}`
      const date = new Date(dateString)
      warmingData.labels.push(dateString)
      warmingData.datasets[0].data.push({ x: date, y: data.extent })
      warmingData.options = {
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                parser: 'YYYY-MM',
                tooltipFormat: 'YYYY-MM',
                unit: 'month',
                unitStepSize: 1,
              },
            },
          ],
        },
      };
    } else if (data.year && data.month && data.day && data.cycle) {
      const dateString = `${data.year}-${data.month}-${data.day}`;
      const date = new Date(dateString);
      warmingData.labels.push(dateString);
      warmingData.datasets[0].data.push({ x: date, y: data.cycle });
      warmingData.options = {
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                parser: 'YYYY-MM-DD',
                tooltipFormat: 'YYYY-MM-DD',
                unit: 'day',
                unitStepSize: 1,
              },
            },
          ],
        },
      };
    }
  });

  return (
    <>
      <h1 className="text-gray-700 text-4xl mb-8 font-bold">{type}</h1>
      <Line className="rounded bg-white h-40 shadow-sm p-2" height={350} width={750} data={warmingData} />
    </>
  )
}

export default WarmingChart