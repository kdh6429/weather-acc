import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import Widget from '../components/widget';
import { LoadingStatus } from '../constants/LoadingStatus';
import SummaryMapContainer from '../containers/SummaryMapContainer';
import { timeSince } from '../features/Util';
import { getRegionDetail } from '../hooks/DataImportor';
import { RegionInterface } from '../model/Region';
import './RegionDetail.scss'

function RegionDetail({match}) {
    const [status, setStatus] = useState(LoadingStatus.LOADING);
    const [summary, setSummary] = useState<RegionInterface>();
    const [regionId, setRegionId] = useState<number>(0);
    console.log("a");
    useEffect(() => {
        const getData = async () => {
            const {id} = match.params;
            setRegionId(id);
            const [state, data] = await getRegionDetail(id as number);
            if(state) {
                setStatus(LoadingStatus.SUCCESS);
                if(data) setSummary(data);
            }
            else {
                setStatus(LoadingStatus.ERROR);
            }
        };
        getData();
    }, [match.params])
    
	return (
        <div className="regionDetail-wrapper">
            <div className="ago">Update : { timeSince(summary?.update) } ago</div>
            <Widget state={status}>
                {/* */}
            </Widget>
            <Widget state={status}>
                {/*  */}
            </Widget>
        </div>
    )
}

export default RegionDetail
	