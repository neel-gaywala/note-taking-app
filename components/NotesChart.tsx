import { format } from "date-fns";
import { BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartDataPoint } from "@/types";

interface NotesChartProps {
  data: ChartDataPoint[];
}

const NotesChart: React.FC<NotesChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">{"No data available"}</p>
          <p className="text-sm text-gray-400">
            {"Create some notes to see the chart"}
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd");
    } catch {
      return dateString;
    }
  };

  function CustomTooltip({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
  }) {
    if (active && payload && payload.length) {
      const date = formatDate(label || "");
      const count = payload[0].value;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="text-sm font-medium text-gray-900">{date}</p>
          <p className="text-sm text-gray-600">
            {count} {count === 1 ? "note" : "notes"} {"created"}
          </p>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: "#e5e7eb" }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: "#e5e7eb" }}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="count"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
            className="hover:opacity-80"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NotesChart;
