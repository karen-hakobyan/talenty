import React,{ useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import { POPPINS } from "../dialogs/constants";

const Wrapper = styled("div")((theme)=>({
    fontFamily:POPPINS,
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "18px",
}))
const Span =styled("span")(theme=>({
    position: "absolute",
    opacity: 0,
    whiteSpace: "pre",
}))
const Input = styled("input")((theme)=>({
    minWidth:"25px",
    padding:0
}))

const CostumInput = React.forwardRef( ({value,...props},ref)=>{
    const [width, setWidth] = useState(0);
    const span = useRef();
    useEffect(() => {
        setWidth(span.current.offsetWidth);
      }, [value]);
   return <Wrapper is="custom">
        <Span id="hide" ref={span}>{value}</Span>
        <Input type="text" style={{ width }}
        value={value}
        />
    </Wrapper>
})
export default CostumInput
