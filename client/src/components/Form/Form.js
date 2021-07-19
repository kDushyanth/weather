import { Button, Grid } from "@material-ui/core"
import { FormConsumer } from "./FormContext"
import Input from "./Input"
import { submitBtnStyle } from "./styles";

const Form = ({onClickHandler})=>{
    return (
        <form noValidate autoComplete="off">
            <Grid container direction="column" alignItems="center" spacing={2}>
                <FormConsumer>{
                (val)=>{      
                return (<>
                        <Grid item>
                            <Input ref={val.latRef} label="latitude" value={51.085}/>
                        </Grid>
                        <Grid item>
                            <Input ref={val.longRef} label="longitude" value={-0.1257}/>
                        </Grid>
                        </>
                        );
                }}</FormConsumer>
                <Grid item>
                    <Button color="primary" onClick = {onClickHandler} style={submitBtnStyle} variant="contained" type="submit">Submit</Button>
                </Grid>
            </Grid>    
        </form>
    );
};
export default Form;