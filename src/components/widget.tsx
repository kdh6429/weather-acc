import React from 'react'
import "./widget.scss"
import styled from 'styled-components';
import { LoadingStatus } from '../constants/LoadingStatus';

type WidgetProps = {
    state: LoadingStatus
    height?: number
}

const Widget:React.FC<WidgetProps> = (props) => {
    const WidgetDiv = styled.div <{height?: string}>`
        width: 100%;
        border-radius: 10px;
        border: 1px solid black;
        position: relative;
        overflow: hidden;
        margin-bottom: 20px;
    `;
    const StateDiv = styled.div`
        width: 100%;
        border-radius: 10px;
        text-align: center;

        background: rgb(241 239 239 / 95%);
        opacity: 0.8;
        position: absolute;
        top: 0;
        left: 0;
    `;
	return (
		<>
        <WidgetDiv>
            {props.state === LoadingStatus.LOADING && <StateDiv>Loading</StateDiv>}
            {props.children}
        </WidgetDiv>
		</>
	  );
}
export default Widget