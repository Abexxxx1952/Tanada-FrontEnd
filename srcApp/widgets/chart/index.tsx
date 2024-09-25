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
import { PhotosStatsResult } from "@/srcApp/entities/stats/model/types";

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
