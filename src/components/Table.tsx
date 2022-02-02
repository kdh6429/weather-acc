import React, { useState } from 'react'
import "./Table.scss"

type TableProps = {
    headers: Array<string>,
    rows: Array<object>
    keys: Array<string>
    clickFunction?: Function
}

const Table:React.FC<TableProps> = ({headers, rows, keys, clickFunction}) => {
    const [hoverIndex, setHoverIndex] = useState(0);
	return (
		<>
        <div className="table-component">
            <table>
            <thead>
                <tr>
                    {headers.map(header => (<th key={header}>{header}</th>))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr 
                    key={index.toString()}
                    onMouseEnter={() => {setHoverIndex(index)} }
                    onMouseLeave={() => {setHoverIndex(-1)}}
                    className={(hoverIndex === index ? 'hover' : '') + (clickFunction? ' pointer' : '')}
                    onClick={() => clickFunction && clickFunction(row)}>
                        {keys.map(key => (<td key={key}>{row[key]}</td>))}
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
		</>
    )
};

export default Table