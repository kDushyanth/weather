import { Grid } from "@material-ui/core";
import DayCard from "./DayCard"

const DailyForecast = ({data : temp})=>{
    
    return (
        <Grid container direction="row" spacing={4} justifyContent={'center'}>
        {
        [1,2,3,4,5,6,7,8].map((x,y)=>{
               return (
                   <Grid item key={y} >
                   <DayCard t_min={temp.tempmin[y]} t_max = {temp.tempmax[y]} desc={temp.description[y]} url = {temp.urls[y]} label={temp.labels[y]}/>
                   </Grid>
               ); 
        })
        }
        </Grid>
    )
}
export default DailyForecast;