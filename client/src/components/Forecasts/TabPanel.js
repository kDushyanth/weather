import Line from '../Charts/LineChart';
const TabPanel = ({data,index,isLoading,color,label,value,labels,...other})=>{
    let _data = {
        labels:labels,
        datasets:[
            {
                label:label,
                data:data,
                borderColor:color,
                fill:false
            }
        ]
    }
    return (
        <div
            hidden={ value !== index}
            {...other}
            style={{padding:10}}
         >
            {value === index && (
                <>
                    <Line data={_data}></Line>
                </>
            )}
        </div>
    );
}
export default TabPanel;