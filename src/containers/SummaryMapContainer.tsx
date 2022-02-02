import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Map, { MapDataType, RegionInfoType, SummaryDataType } from '../components/Map'
import Table from '../components/Table';
import { ColorSet } from '../constants/ColorSet';
import { TIMES } from '../constants/Time';
import { getRegionName } from '../features/Util';
import { SummaryInterface } from '../model/Summary';
import "./SummaryMapContainer.scss"

type SummaryMapContainerProps = {
    data: SummaryInterface | undefined
}

const LoadinitMapData = () => {
    const a = 'a';
    return {
        0: ColorSet.NONE,
        1: ColorSet.NONE,
        2: ColorSet.NONE,
        3: ColorSet.NONE,
        4: ColorSet.NONE,
        5: ColorSet.NONE,
        6: ColorSet.NONE,
        7: ColorSet.NONE,
        8: ColorSet.NONE,
        9: ColorSet.NONE,
    }
}

const LoadinitRegionsInfo = () => {
    const initRegionsInfo = [
        {regionId: 0, acc: 0},
        {regionId: 1, acc: 0},
        {regionId: 2, acc: 0},
        {regionId: 3, acc: 0},
        {regionId: 4, acc: 0},
        {regionId: 5, acc: 0},
        {regionId: 6, acc: 0},
        {regionId: 7, acc: 0},
        {regionId: 8, acc: 0},
        {regionId: 9, acc: 0},
    ];
    return {
        timeId: "v24",
        info: initRegionsInfo
    } as SummaryDataType;
}
const SummaryMapContainer:React.FC<SummaryMapContainerProps> = ({data}) => {
    
    const [mapData, setMapData] = useState(LoadinitMapData());
    const [regionsInfo, setRegionsInfo] = useState(LoadinitRegionsInfo());

    const [lowRegion, setLowRegion] = useState(0);
    const [summaryMapTime, setSummaryMapTime] = useState("v24");
    const [tableData, setTableData] = useState<Array<any>>([]);

    const history = useHistory();
    useEffect(() => {
        if(data) {
            const tmpMapData = {
                0: ColorSet.NONE,
                1: ColorSet.NONE,
                2: ColorSet.NONE,
                3: ColorSet.NONE,
                4: ColorSet.NONE,
                5: ColorSet.NONE,
                6: ColorSet.NONE,
                7: ColorSet.NONE,
                8: ColorSet.NONE,
                9: ColorSet.NONE,
            };
            
            const tmpRegionsInfo:Array<RegionInfoType> = [];
            Object.keys(data[summaryMapTime].pty.info).forEach(regionId => {
                let color = ColorSet.NONE;
                const acc = data[summaryMapTime].pty.info[regionId];
                if(acc >= 0.8) {
                    color = ColorSet.GREEN;
                }
                else if(acc >= 0.5) {
                    color = ColorSet.YELLOW;
                }
                else if(acc >= 0.3) {
                    color = ColorSet.ORANGE;
                }
                else {
                    color = ColorSet.RED;
                }
                tmpMapData[regionId] = color;
                tmpRegionsInfo.push({regionId: parseInt(regionId, 10), acc});
            });
            setMapData(tmpMapData)
            const tmpSummaryData = {
                timeId: summaryMapTime,
                info: tmpRegionsInfo
            } as SummaryDataType;
            setRegionsInfo(tmpSummaryData);

            // const lowRegion = tmpRegionsInfo.reduce( (res, obj) =>  (obj.acc < res.acc) ? obj : res );
            

            const tmpTableData = Object.keys(data[summaryMapTime].pty.info).map( rId => {
                const name = getRegionName(parseInt(rId, 10));
                const acc = +Math.round(data[summaryMapTime].pty.info[rId] * 100);
                return {id: rId, name, acc, accLabel: `${acc}%`};
            }).sort( (a,b) =>  b.acc - a.acc);
            setTableData(tmpTableData);

            setLowRegion(tmpTableData[tmpTableData.length-1].name);
        }


    }, [summaryMapTime, data]);

    const changeTime = (event: ChangeEvent<HTMLSelectElement>) => {
        setSummaryMapTime(event.target.value)
    }

    const tableClick = (row) => {
        history.push(`/r/${row.id}`);
    }

	return (
		<div className="map-container">
            <h2>지역별 예보 정확도</h2>
            <div className="">
                <div>
                    <select onChange={changeTime} value={summaryMapTime}>
                        {TIMES.map(t => (<option key={t.id} value={t.id}>{t.name}</option>))}
                    </select> 이후의 눈/비 예보 정확도가 가장 떨어지는 지역은 '{lowRegion}' 입니다.
                </div>
            </div>
            <div className="map-component-wrap">
                <Map mapData={mapData} summary={regionsInfo} />
            </div>
            <div className="info-component-wrap">
                <Table headers={["지역", "예보 정확도"]} rows={tableData} keys={["name", "accLabel"]} clickFunction={tableClick} />
            </div>
		</div>
	  );
}

export default SummaryMapContainer