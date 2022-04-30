import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {Box} from "@mui/material";
import MUIRichTextEditor from "mui-rte";
import JobSeekerSubsection from "../../JobSeekerSubsection";
import {setTemplateData} from "../../../../../store/globalData/slice";
import {convertToRaw} from "draft-js";
import { validate } from "../../../../../helpers/validation/validation";

export default function Description({data}) {
    const editorRef = useRef()
    const dispatch = useDispatch()
    const [value] = useState(data.metadata.submitted_value || '')
    const [editorState, setEditorState] = useState(value)
    const [err, setErr]= useState({
        error: false,
        massage: ""
    })
    
    useEffect(()=>{
             setErr(validate({name:data.name,value:editorState,maxLength:data.metadata?.maxLength? data.metadata?.maxLength : 1000}))
    	},[data, editorState])

    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Box>
            <Box
                sx={{
                    border: '1px solid #D9D9D9',
                    borderColor: err.error? "#d32f2f":"#D9D9D9",
                    borderRadius: '4px',
                    minHeight: '152px',
                    pt: '0px',
                    pl: '30px',
                    pr: '30px',
                    pb: '15px',
                }}
                onClick={() => {
                    editorRef.current.focus()
                }}
            >
                <MUIRichTextEditor
                    ref={editorRef}
                    controls={['title', 'italic', 'bold', 'underline', 'numberList', 'bulletList']}
                    defaultValue={value}
                    onChange={(editorState) => {
                        const result = convertToRaw(editorState.getCurrentContent())
                        if (result.blocks.length !== 1 || result.blocks[0].text) {
                            setEditorState(JSON.stringify(result))
                        } else {
                            setEditorState('')
                        }
                    }}
                    onBlur={
                        () => {
                            // dispatch(changeDialogDataById({id: data.id, value: editorState}))
                            dispatch(setTemplateData({id: data.id, value: editorState}))
                        }
                    }
                />
            </Box>
                {err.massage?<Box sx={{
                        marginTop: "3px",
                        marginRight: "14px",
                        marginLeft:"14px",
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight:400,
                        fontSize: "0.75rem",
                        lineHeight: "1.66",
                        letterSpacing: "0.03333em",
                        color:"#d32f2f"
                }}>{err.massage}</Box>:null}
            </Box>
        }
    />
}
