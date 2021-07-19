import {Line} from 'react-chartjs-2';
import React from 'react';
const LineGraph = ({data})=>{
    let _options = {
        title:{
            display:false
        }
    }
    return (
        <React.Fragment>
            <Line data = {data} options={_options}></Line>
        </React.Fragment>
    )
}
export default LineGraph;