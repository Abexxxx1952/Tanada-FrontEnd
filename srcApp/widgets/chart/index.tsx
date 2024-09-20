"use client";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import styles from "./styles.module.css";
import {
  PhotosStatsResult,
  UsersStatsResult,
} from "@/srcApp/entities/stats/model/types";

const data = [
  {
    created: 14,
    views: 55,
    deleted: 87,
  },
  {
    created: 27,
    views: 72,
    deleted: 62,
  },
  {
    created: 65,
    views: 69,
    deleted: 72,
  },
  {
    created: 12,
    views: 62,
    deleted: 35,
  },
  {
    created: 45,
    views: 65,
    deleted: 75,
  },
  {
    created: 24,
    views: 65,
    deleted: 78,
  },
  {
    created: 32,
    views: 45,
    deleted: 85,
  },
  {
    created: 32,
    views: 11,
    deleted: 4,
  },
  {
    created: 0,
    views: 0,
    deleted: 0,
  },
  {
    created: 0,
    views: 0,
    deleted: 0,
  },
  {
    created: 0,
    views: 0,
    deleted: 0,
  },
  {
    created: 15,
    views: 14,
    deleted: 0,
  },
];

type ChartProps = {
  data: PhotosStatsResult[];
  dataKey: string;
};

export function Chart({ data, dataKey }: ChartProps) {
  const transformedData = data.map((item, index) => ({
    ...item,
    index: (index + 1).toString(),
  }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={transformedData}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3e8aa1" stopOpacity={1} />
            <stop offset="60%" stopColor="#3e8aa1" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3e8aa1" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="4 4" vertical={false} />
        <XAxis dataKey="index" />

        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="#8884d8"
          fill="url(#color)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
