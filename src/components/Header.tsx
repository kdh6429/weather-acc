import React from 'react'
import { useRecoilState } from 'recoil'
import "./Header.scss"
const Header = () => {

    const titleClick = () => {
            window.location.href = "/";
    }
	return (
		<>
        <div className="header-wrapper">
            <div className="logo" onClick={titleClick}>
                <svg 
                    viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                    <g>
                    <title>Layer 1</title>
                    <rect fill="#6f69ac" strokeWidth="0" x="0" y="0" width="75" height="75" id="svg_10" stroke="#000"/>
                    <rect fill="#95dac1" strokeWidth="0" x="75" y="0" width="75" height="75" id="svg_15" stroke="#000"/>
                    <rect fill="#ffeba1" strokeWidth="0" x="0" y="75" width="75" height="75" id="svg_16" stroke="#000"/>
                    <ellipse fill="#fd6f96" strokeWidth="0" cx="112.49999" cy="112.24996" id="svg_17" rx="37.24999" ry="37.24999" stroke="#000"/>
                    </g>
                </svg>
            </div>
            <div className="title" onClick={titleClick}>
                <span>masterpiece</span> <span>color</span>
            </div>
            <span className="info">Use the colors in image to make your application like a masterpiece</span>
        </div>
		</>
	  );
}
export default Header