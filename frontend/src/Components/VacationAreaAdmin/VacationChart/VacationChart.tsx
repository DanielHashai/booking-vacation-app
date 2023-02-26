import "./VacationChart.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import service from "../../../Services/VacationService";
import ChartModel from "../../../Models/ChartModel";
function VacationChart(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>();
  const [data, setData] = useState<ChartModel[]>();

  useEffect(() => {
    service
      .getAllVacations()
      .then((res) => {
        setVacations(res);
        const totalData = res.map((r) => {
          return {
            name: r.destination,
            followers: r.followersCount,
          };
        });
        setData(totalData);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            dataKey="followers"
            fill="#8884d8"
            background={{ fill: "#eee" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default VacationChart;
