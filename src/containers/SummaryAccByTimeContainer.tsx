import React, { useEffect, useState } from 'react';
import Highchart from '../components/HighChart';
import { SummaryDataType } from '../components/Map'
import { ColorSet } from '../constants/ColorSet';
import { SummaryInterface } from '../model/Summary';
import { TIMES } from '../constants/Time';
import { getTimeName } from '../features/Util';

type SummaryAccByTimeContainerProps = {
    data: SummaryInterface | undefined
}

const SummaryAccByTimeContainer:React.FC<SummaryAccByTimeContainerProps> = ({data}) => {
    
    const [options, setOptions] = useState({});
    
    useEffect(() => {
        if(data) {
            const tmpChartData:Array<any> = [];

            TIMES.forEach( time => {
                tmpChartData.push([ `${getTimeName(time.id)}`, (+data[time.id].pty.avg) * 100]);
            });
            setOptions({
                chart: {
                    type: 'column'
                },
                title: {
                    text: null
                }, 
                xAxis: {
                    labels: {
                        enabled: true,
                        formatter: (item) =>  tmpChartData[item.value][0],
                    }
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    title: {
                        text: '적중률',
                        align: 'high'
                    },
                },
                tooltip: {
                    valueSuffix: '%'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: "예측 시간별 적중률",
                    data: tmpChartData
                }]
            });
        }
    }, [data]);

	return (
		<>
        <h2>예측 시간대별 강수 유무 정확도</h2>
        {data && 
            <>
            <div>1시간 이후의 비/눈을 예보했을 때, 실제 비/눈이 온 경우는 {(+data?.u1.pty.avg) * 100}% 입니다. </div>
            <br/>
            {/* <br/>
            <div>24시간 이후의 비/눈을 예보했을 때, 실제 비/눈이 온 경우는 {(+data?.v24.pty.avg) * 100}% 입니다. </div> */}
            </>
        }
            <br/>
            <Highchart options={options}/>
		</>
	  );
}

export default SummaryAccByTimeContainer