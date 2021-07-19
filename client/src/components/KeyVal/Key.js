import { Typography } from "@material-ui/core";
const Key = (props)=>{
    return <Typography display="inline"> <strong>{props.children}:</strong></Typography>
}
export default Key;