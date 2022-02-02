import React, { useState, useEffect } from 'react'
import { getSummary } from '../hooks/DataImportor'
import { LoadingStatus } from '../constants/LoadingStatus';
import './About.scss'
import { SummaryInterface } from '../model/Summary';
import SummaryMap from '../components/Map';
import Widget from '../components/widget';
import SummaryMapContainer from '../containers/SummaryMapContainer';
import { timeSince } from '../features/Util';

function About() {
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
        <div className="about-wrapper">
            about page
        </div>
    )
}

export default About
	