import { Pie } from "react-chartjs-2";

const PieChart = ({_labels,data_v,_bg,_text})=>{
    let _data = {
        labels:_labels,
        datasets:[
            {
                data:data_v,
                backgroundColor:_bg
            }
        ]
    };
    let _options = {
        title:{
            display:true,
            text:_text
        },
        legend: {
            display: false
          }
    };
    return (
        <>
            <Pie 
            data = {_data} options={_options}
            >
            </Pie>
        </>
    )
}
export default PieChart;