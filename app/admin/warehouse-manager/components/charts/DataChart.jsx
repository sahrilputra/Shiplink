import React, { useState } from 'react'
import Chart from "react-apexcharts";

export const DataChart = () => {
    const [chartOptions, setChartOptions] = useState({
        chart: {
            id: 'line-chart',
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
    });

    const [chartSeries, setChartSeries] = useState([
        {
            name: 'Series 1',
            data: [30, 40, 25, 50, 49, 21, 70, 51, 60, 36, 66, 70],
        },
    ]);

    return (
        <>
            <div className=' h-max px-2.5 py-1.5 rounded-md border border-neutral-200 relative'>
                <div className="abosolute left-[40px]">
                    <Chart options={chartOptions} series={chartSeries} type="line" width={260} />
                </div>
            </div>
        </>
    );
};
