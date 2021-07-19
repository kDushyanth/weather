import { TextField } from "@material-ui/core";
import React,{forwardRef} from "react";

const Input = ({label,value},ref)=>{
    return (
        <>
        <TextField
        variant="filled"
        label={label}
        defaultValue={value}
        inputRef = {ref}
        > 
        </TextField>
        </>
    )
}
export default forwardRef(Input);