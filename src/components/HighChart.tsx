import React, { Component, Fragment, useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export interface ChartType {
    options: any
}
const Highchart:React.FC<ChartType> = ({options}) => {
    const [option, setOption] = useState({});
    useEffect(() => {
        setOption({
            ...options,
            chart: {
                ...options.chart,
                style: {
                    fontFamily: 'Roboto Mono'
                }
            }
        })
    }, [options]);
   
    return (
        <div className="highchart-container">
            <HighchartsReact highcharts={Highcharts} options={option} />
        </div>
    );
}
export default Highchart;