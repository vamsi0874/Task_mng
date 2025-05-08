
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CustomPieChartProps {
    data:{status:string,count:number}[],
    colors:string[]
}
const CustomPieChart = ({ data, colors }:CustomPieChartProps) => {

    console.log('Data:--', data);

    if (!data || data.every((item: { status: string; count: number; }) => item.count === 0)) {
        return <p className="text-center text-gray-500">No data to display</p>;
      }
     

    return (
      <ResponsiveContainer width="100%" height={325}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
          >
            {data.map((entry: { status: string; count: number; }, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };
  
  export default CustomPieChart;
  