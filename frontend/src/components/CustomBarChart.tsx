// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';

// const CustomBarChart = ({
//   data,
//   colors,
// }: {
//   data: {priority: string; count: number}[];
//   colors: string[];
// }) => {
//   const hasData = data && data.some((item) => item.count > 0);

//   const processedData = hasData
//     ? data
//     : [{ priority: 'No Data', count: 0 }];

//   return (
//     <div style={{ height: 325 }}>
//       {!hasData && (
//         <p className="text-center text-gray-500">No data to display</p>
//       )}
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart data={processedData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="priority" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="count" fill={colors[0] || '#8884d8'} />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default CustomBarChart;

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const CustomBarChart = ({
  data,
  colors,
}: {
  data: { priority: string; count: number }[];
  colors: string[];
}) => {
  const hasData = data && data.some((item) => item.count > 0);

  const processedData = hasData
    ? data
    : [{ priority: 'No Data', count: 0 }];

  return (
    <div style={{ height: 325 }}>
      {!hasData && (
        <p className="text-center text-gray-500">No data to display</p>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={processedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="priority" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" name="Task Count">
            {processedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;

