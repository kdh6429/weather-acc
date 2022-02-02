import React, { useState, useEffect } from 'react'
import { getSummary } from '../hooks/DataImportor'
import { LoadingStatus } from '../constants/LoadingStatus';
import './Main.scss'
import { SummaryInterface } from '../model/Summary';
import SummaryMap from '../components/Map';
import Widget from '../components/widget';
import SummaryMapContainer from '../containers/SummaryMapContainer';
import { timeSince } from '../features/Util';
import SummaryAccByTimeContainer from '../containers/SummaryAccByTimeContainer';
import SummaryPOPContainer from '../containers/SummaryPOPContainer';
import SummaryStmpContainer from '../containers/SummaryStmpContainer';
import SummaryRn1Container from '../containers/SummaryRn1Container';

function Main() {
    const [status, setStatus] = useState(LoadingStatus.LOADING);
    const [summary, setSummary] = useState<SummaryInterface>();
    useEffect(() => {
        const getData = async () => {
            const [state, data] = await getSummary();
            if(state) {
                setStatus(LoadingStatus.SUCCESS);
                if(data) setSummary(data);
            }
            else {
                setStatus(LoadingStatus.ERROR);
            }
        };
        getData();
    }, [])
	return (
        <div className="main-wrapper">
            <div className="ago">Update : { timeSince(summary?.update) } ago</div>
            <Widget state={status}>
                <SummaryMapContainer data={summary}/>
            </Widget>
            <Widget state={status}>
                <SummaryAccByTimeContainer data={summary}/>
            </Widget>
            <Widget state={status}>
                <SummaryStmpContainer data={summary}/>
            </Widget>
            <Widget state={status}>
                <SummaryPOPContainer data={summary}/>
            </Widget>
            <Widget state={status}>
                <SummaryRn1Container data={summary}/>
            </Widget>
            
        </div>
    )
}

export default Main
	