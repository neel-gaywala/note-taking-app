import { format } from "date-fns";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), "MMM dd");
  } catch {
    return dateString;
  }
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
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
};

export default CustomTooltip;