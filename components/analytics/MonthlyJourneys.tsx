import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import LineAreaChart from "../charts/LineAreaChart";

const MonthlyJourneys = () => {
  const chartData = [
    {
      name: "Revenue",
      data: [50, 64, 48, 66, 49, 68],
      color: "#28A265A1",
    },
  ];

  const chartOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
      customLegendItems: ["fasdfasdf"],
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 6,
        strokeColor: "#000",
        fillColors: "#fff",
        radius: 5,
        offsetX: 12,
        offsetY: 12,
      },
    },

    theme: {
      mode: "light",
    },
    chart: {
      type: "area",

      toolbar: {
        show: false,
      },
    },

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.9,
        stops: [0, 95, 100],
      },
    },
    dataLabels: {
      enabled: false,
      markers: {
        discrete: [],
        size: 7,
        strokeColors: ["#CCCED0", "#0000"],
        strokeWidth: 3,
        strokeOpacity: 1,
        strokeDashArray: 30,
        fillOpacity: 1,
        shape: "circle",
        width: 8,
        height: 8,
        radius: 2,
        offsetX: 20,
        offsetY: 20,
        showNullDataPoints: true,
        hover: {
          size: 2,
          sizeOffset: 6,
        },
        floating: true,
      },
    },
    stroke: {
      curve: "smooth",
    },

    tooltip: {
      enabled: true,
      shared: true,
      style: {
        fontSize: "12px",
        backgroundColor: "#000000",
      },
      theme: "dark",
      x: {
        format: "dd/MM/yy HH:mm",
      },
      marker: {
        show: true,
      },
      items: {
        display: "flex",
      },
    },
    grid: {
      show: true,
    },
    xaxis: {
      labels: {
        style: {
          colors: "#66CDAA",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
      type: "text",
      categories: ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"],
    },
    yaxis: {
      show: true,
    },
  };

  return (
    <Card className="w-full bg-white group shadow shadow-shadow transition-colors cursor-pointer">
      <CardHeader className="w-full flex flex-row items-center justify-start space-y-0 pb-2 gap-3">
        <CardTitle className="text-sm font-medium flex flex-col">
          <span className="font-medium text-gray-500">Monthly</span>
          <span className="font-bold text-base">Bus journeys</span>
        </CardTitle>
      </CardHeader>
      <div className="w-full h-[50vh]">
        <LineAreaChart chartOptions={chartOptions} chartData={chartData} />
      </div>
    </Card>
  );
};

export default MonthlyJourneys;
