import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useRecoilState } from 'recoil';
import Highchart from '../components/HighChart';
import Map, { MapDataType, RegionInfoType, SummaryDataType } from '../components/Map'
import { ColorSet } from '../constants/ColorSet';
import { TIMES } from '../constants/Time';
import { getRegionName } from '../features/Util';
import { SummaryInterface } from '../model/Summary';
import './SummaryPOPContainer.scss';

type SummaryMapContainerProps = {
    data: SummaryInterface | undefined
}

const SummaryMapContainer:React.FC<SummaryMapContainerProps> = ({data}) => {
    
    const [options, setOptions] = useState({});
    const [summaryMapTime, setSummaryMapTime] = useState("d3");

    const [targetRegion, setTargetRegion] = useState("");
    const [targetExpectAcc, setTargetExpectAcc] = useState(0);
    const [targetActualAcc, setTargetActualAcc] = useState(0);
    
    const history = useHistory();

    const changeTime = (timeId: string) => {
        setSummaryMapTime(timeId);
    }

    useEffect(() => {
        if(data) {
            const tmpChartData:Array<any> = [];
            const popKeys = ['pop_90', 'pop_80','pop_70','pop_60','pop_50','pop_40','pop_30','pop_20','pop_10','pop_0'];
            for(let regionKey=0; regionKey<10; regionKey++) {
                const name = getRegionName(regionKey);
                const chartData = popKeys.map( popkey => {
                    if (!(regionKey in data[summaryMapTime][popkey].info)) {
                        return null;
                    }
                    return Math.round(data[summaryMapTime][popkey].info[regionKey] * 100);
                });
                tmpChartData.push({name, data: chartData});
            }
            
            setOptions({
                chart: {
                    type: 'bar',
                    height: '1200px',
                    events: {
                        redraw: () => {
                        }
                    }
                },
                legend: {
                    verticalAlign: 'top',
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: null
                }, 
                xAxis: {
                    categories: popKeys.map(popKey => `예보가 ${popKey.split("_")[1]}% 일때`),
                    labels: {
                        enabled: true,
                        title: {
                            text: null
                        }
                    },
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '실제 비/눈이 온 비율',
                        align: 'high'
                    },
                },
                tooltip: {
                    // formatter: (item) => { 
                    //     console.log(item);
                    // }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true,
                            formatter() {
                                const that = this as any;
                                return `${getRegionName(that.colorIndex)} 평균 ${that.y}%`;
                            }
                        },
                    },
                    series: {
                        tooltip: {
                            pointFormatter() {
                                const that = this as any;
                                return `${getRegionName(that.colorIndex)} - 평균 ${that.y}% 비/눈이 옴`;
                            }
                        },
                        point: {
                            events: {
                               click() {
                                   console.log(this);
                                   const that = this as any;
                                   history.push(`/r/${that.colorIndex}`);
                               }
                           }
                       }
                    }
                },
                series: tmpChartData
            });

            // container label crate
            let flg = false;

            
            popKeys.some( popkey => {
                for(let regionKey=0; regionKey<10; regionKey++) {
                    const name = getRegionName(regionKey);
                        console.log( "data[summaryMapTime][popkey].info[regionKey]" ,data[summaryMapTime][popkey].info[regionKey]);
                        if(data[summaryMapTime][popkey].info[regionKey]<1) {
                            setTargetRegion(name);
                            setTargetExpectAcc(parseInt(popkey.split("_")[1],10));
                            setTargetActualAcc(Math.round(data[summaryMapTime][popkey].info[regionKey] * 100));
                            flg = true;
                            break;
                        }
                        
                }
                if(flg) return true;
                return false;
            });
        }
    }, [summaryMapTime, data]);

    const timeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setSummaryMapTime(event.target.value)
    }
	return (
		<div className="pop-container">
            <h2>강수확률별 실제 지역 강수 비율</h2>
            {data && 
            <>
                <div>
                    {targetRegion} 지역에 <select onChange={timeSelect} value={summaryMapTime}>
                        {TIMES.filter(time=>!time.id.startsWith('u')).map(t => (<option key={t.id} value={t.id}>{t.name}</option>))}
                    </select> 이후 강수확률이 {targetExpectAcc}% 일때, 실제 비/눈이 온 경우는 {targetActualAcc}% 입니다.
                    <br/>
                </div>
            </>
                
            }
            <div className="chart-component-wrap">
                <Highchart options={options}/>
            </div>
                
		</div>
	  );
}

export default SummaryMapContainer