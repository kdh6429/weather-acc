import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Highchart from '../components/HighChart';
import Table from '../components/Table';
import { TIMES } from '../constants/Time';
import { getRegionName } from '../features/Util';
import { SummaryInterface } from '../model/Summary';
import './SummaryStmpContainer.scss';

type SummaryStmpContainerProps = {
    data: SummaryInterface | undefined
}

const SummaryStmpContainer:React.FC<SummaryStmpContainerProps> = ({data}) => {
    
    const [options, setOptions] = useState({});
    const [summaryMapTime, setSummaryMapTime] = useState("v12");

    const [targetRegion, setTargetRegion] = useState("");
    const [targetDiff, setTargetDiff] = useState(0);

    const [tableData, setTableData] = useState<Array<any>>([]);
    
    const history = useHistory();

    const changeTime = (timeId: string) => {
        setSummaryMapTime(timeId);
    }

    useEffect(() => {
        if(data) {
            const tmpChartData:Array<any> = [];
            let stmpKey = 'stmp_w';
            const curMonth = new Date().getMonth()+1;

            if (curMonth >= 6 && curMonth <= 9) {
                stmpKey = 'stmp_s';
            }
            if ('history' in data[summaryMapTime][stmpKey]) {
                data[summaryMapTime][stmpKey].history.forEach( (item: any) => {
                    tmpChartData.push([+item.t, +item.avg]);
                });
            }
            
            
            setOptions({
                chart: {
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
                    type: 'datetime',
                    dateTimeLabelFormats: { // don't display the dummy year
                        minTickInterval: 60 * 3600 * 1000,
                        hour: '%m-%d',
                        day: '%m-%d',
                        week: '%m-%d',
                        month: '%Y-%m',
                        year: '%Y'
                    },
                    title: {
                        // text: 'Date'
                    }
                    // categories: popKeys.map(popKey => `????????? ${popKey.split("_")[1]}% ??????`),
                    // labels: {
                    //     enabled: true,
                    //     title: {
                    //         text: null
                    //     }
                    // },
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '???????????? ??????',
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
                                return `?????? ${that.y}%`;
                            }
                        },
                    },
                    series: {
                        tooltip: {
                            pointFormatter() {
                                const that = this as any;
                                return `?????? ${that.y}??? ??????`;
                            }
                        },
                        point: {
                            events: {
                               click() {
                                   console.log(this);
                                   const that = this as any;
                               }
                           }
                       }
                    }
                },
                series: {
                    name: "??????-?????? ???????????? ?????? ??????",
                    data : tmpChartData,
                }
            });
            
            if ('history' in data[summaryMapTime][stmpKey] && 'info' in data[summaryMapTime][stmpKey]) {
                const lastDiff = data[summaryMapTime][stmpKey].history[data[summaryMapTime][stmpKey].history.length - 1];
                const tmpTableData = Object.keys(data[summaryMapTime][stmpKey].info).map( (regionId) => 
                    ({id: regionId, name: getRegionName(parseInt(regionId, 10)), diff: data[summaryMapTime][stmpKey].info[regionId]})
                ).sort((a, b) => (b.diff - a.diff));
                
                setTargetRegion(tmpTableData[0].name);
                setTargetDiff(tmpTableData[0].diff);  
                
                setTableData(tmpTableData);
            }
        }
    }, [summaryMapTime, data]);

    const timeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setSummaryMapTime(event.target.value)
    }
    const tableClick = (row) => {
        history.push(`/r/${row.id}`);
    }
	return (
		<div className="stmp-container">
            <h2>??????-?????? ???????????? ?????? ?????? ??????</h2>
            {data && 
            <>
                <div>
                    {targetRegion} ????????? <select onChange={timeSelect} value={summaryMapTime}>
                        {TIMES.filter(time=>!time.id.startsWith('d')).map(t => (<option key={t.id} value={t.id}>{t.name}</option>))}
                    </select> ?????? ?????? ????????? ?????? ?????? ?????? ????????? {targetDiff}??? ?????????.
                    <br/><br/>
                </div>
            </>}
            <br/>
            <div className="chart-component-wrap">
                <Highchart options={options}/>
            </div>
            <div className="table-component-wrap">
                <Table headers={["??????", "?????? ?????? ?????? ???"]} rows={tableData} keys={["name", "diff"]} clickFunction={tableClick}/>
            </div>
		</div>
	  );
}

export default SummaryStmpContainer