import { Typography,Tab,Tabs,Paper, Box} from "@material-ui/core"
import { useState } from "react";
import TabPanel from './TabPanel';
const Forecast = ({title,data,loading,desc})=>{
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
        <Box mt={2} mb={3}  elevation={3}>
        <Typography variant="h5" color="secondary" display="inline">
            {title}
        </Typography>
        <Box m={2} display="inline">
        <Typography variant="subtitle1" display="inline">
                {desc}
        </Typography>
        </Box>
        <hr></hr>
        <Box  elevation={3}>
        <Paper elevation={3}>        
        <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            <Tab label="temperature" />
            <Tab label="humidity" />
            <Tab label="wind speed" />
        </Tabs>
        </Paper>
        <TabPanel isLoading ={loading} color={'orange'} data = {data.temp} label={"temperature (deg C)"} labels={data.labels} value={value} index={0}/>
        <TabPanel isLoading ={loading} color={'rgb(75, 192, 192)'} data={data.humidity} label={"humidity (%)"} labels={data.labels} value={value} index={1}/>        
        <TabPanel isLoading ={loading} color={'rgb(153,102,255)'} data={data.wind} label={"wind speed (m/s)"} labels={data.labels} value={value} index={2}/>
        </Box>
        </Box>
        </>
    )
}
export default Forecast