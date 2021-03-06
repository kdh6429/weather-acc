import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Highchart from '../components/HighChart';
import Table from '../components/Table';
import { TIMES } from '../constants/Time';
import { getRegionName } from '../features/Util';
import { SummaryInterface } from '../model/Summary';
import './SummaryRn1Container.scss';

type SummaryRn1ContainerProps = {
    data: SummaryInterface | undefined
}

const SummaryRn1Container:React.FC<SummaryRn1ContainerProps> = ({data}) => {
    
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
            if ('history' in data[summaryMapTime].rn1) {
                data[summaryMapTime].rn1.history.forEach( (item: any) => {
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
                        text: '????????? ??????(mm)',
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
                                return `?????? ${that.y}mm`;
                            }
                        },
                    },
                    series: {
                        tooltip: {
                            pointFormatter() {
                                const that = this as any;
                                return `?????? ${that.y}mm ??????`;
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
                    name: "??????-?????? ????????? ?????? ??????",
                    data : tmpChartData,
                }
            });
            
            if ('history' in data[summaryMapTime].rn1 && 'info' in data[summaryMapTime].rn1) {
                const lastDiff = data[summaryMapTime].rn1.history[data[summaryMapTime].rn1.history.length - 1];
                const tmpTableData = Object.keys(data[summaryMapTime].rn1.info).map( (regionId) => 
                    ({id: regionId, name: getRegionName(parseInt(regionId, 10)), diff: data[summaryMapTime].rn1.info[regionId]})
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
            <h2>??????-?????? ????????? ?????? ?????? ??????</h2>
            {data && 
            <>
                <div>
                    {targetRegion} ????????? <select onChange={timeSelect} value={summaryMapTime}>
                        {TIMES.filter(time=>!time.id.startsWith('d')).map(t => (<option key={t.id} value={t.id}>{t.name}</option>))}
                    </select> ?????? ????????? ?????? ???????????? ?????? ????????? {targetDiff}mm ?????????.
                    <br/><br/>
                </div>
            </>}
            <br/>
            <div className="chart-component-wrap">
                <Highchart options={options}/>
            </div>
            <div className="table-component-wrap">
                <Table headers={["??????", "?????? ????????? ???(mm)"]} rows={tableData} keys={["name", "diff"]} clickFunction={tableClick}/>
            </div>
		</div>
	  );
}

export default SummaryRn1Container