import { useState, useEffect } from "react";
import { db } from "../helpers/firebase";
import { authentication } from "../helpers/firebase";
import { getDocs, collection } from "firebase/firestore";
import { Bar } from "react-chartjs-2";
import { httpsCallable } from "firebase/functions";
import { functions } from "../helpers/firebase";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useAuth from "../contexts/Auth";

function BarChart({ policies }) {
  const { authClaims } = useAuth();
  const [sales, setSales] = useState({
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  });
  const [lastSales, setLastSales] = useState({
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  });
  useEffect(() => {
    let obj = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };
    let obj2 = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    policies.forEach((policy) => {
      if (policy?.createdAt) {
        const { createdAt } = policy;
        const date = new Date(createdAt);

        const yearCreated = date.getFullYear();
        const currentYear = new Date().getFullYear();

        if (yearCreated === currentYear) {
          switch (date.getMonth()) {
            case 0:
              obj.January += policy.stickersDetails.length;
              break;
            case 1:
              obj.February += policy.stickersDetails.length;
              break;
            case 2:
              obj.March += policy.stickersDetails.length;
              break;
            case 3:
              obj.April += policy.stickersDetails.length;
              break;
            case 4:
              obj.May += policy.stickersDetails.length;
              break;
            case 5:
              obj.June += policy.stickerDetails.length;
              break;
            case 6:
              obj.July += policy.stickerDetails.length;
              break;
            case 7:
              obj.August += policy.stickerDetails.length;
              break;
            case 8:
              obj.September += policy.stickerDetails.length;
              break;
            case 9:
              obj.October += policy.StickerDetails.length;
              break;
            case 10:
              obj.November += policy.StickerDetails.length;
              break;
            case 11:
              obj.December += policy.StickerDetails.length;
              break;
          }
        }
        if (yearCreated === currentYear - 1) {
          console.log(
            policy?.stickersDetails ? policy?.stickersDetails.length : 0
          );
          switch (date.getMonth()) {
            case 0:
              obj2.January += policy?.stickersDetails
                ? policy?.stickersDetails.length
                : 0;
              break;
            case 1:
              obj2.February += policy?.stickersDetails
                ? policy?.stickersDetails.length
                : 0;
              break;
            case 2:
              obj2.March += policy?.stickersDetails
                ? policy?.stickersDetails.length
                : 0;
              break;
            case 3:
              obj2.April += policy?.stickersDetails
                ? policy?.stickersDetails.length
                : 0;
              break;
            case 4:
              obj2.May += policy?.stickersDetails
                ? policy?.stickersDetails.length
                : 0;
              break;
            case 5:
              obj2.June += policy?.stickersDetails
                ? policy?.stickersDetails.length
                : 0;
              break;
            case 6:
              obj2.July += policy?.stickersDetails
                ? policy?.stickersDetails.length
                : 0;
              break;
            case 7:
              obj2.August += policy?.stickersDetails
                ? policy?.stickersDetails.length
                : 0;
              break;
            case 8:
              obj2.September += policy?.stickersDetails
                ? policy?.stickersDetails.length
                : 0;
              break;
            case 9:
              obj2.October += policy?.stickersDetails
                ? policy?.stickersDetails.length
                : 0;
              break;
            case 10:
              obj2.November += policy?.stickersDetails
                ? policy?.stickersDetails.length
                : 0;
              break;
            case 11:
              obj2.December += policy?.stickersDetails
                ? policy?.stickersDetails.length
                : 0;
              break;
          }
        }
      }
    });
    setLastSales(obj2);
    setSales(obj);
  }, [policies]);

  console.log("this: ", sales);
  console.log("last: ", lastSales);

  const labels = Object.keys(sales);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: false,
        text: "Monthly  Motor Third Party Stickers",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: new Date().getFullYear() - 1,
        data: [
          ...Object.values(lastSales),
          Math.max(...Object.values(lastSales)) +
            0.2 * Math.max(...Object.values(lastSales)),
        ],
        backgroundColor: "#d1d5db",
        hoverBackgroundColor: "#e5e7eb",
      },
      {
        label: new Date().getFullYear(),
        data: [
          ...Object.values(sales),
          Math.max(...Object.values(sales)) +
            0.2 * Math.max(...Object.values(sales)),
        ],
        backgroundColor: "#1f1f1f",
        hoverBackgroundColor: "#1f2937",
      },
    ],
  };
  return <Bar options={options} data={data} className="bar-chart" />;
}

export default BarChart;
