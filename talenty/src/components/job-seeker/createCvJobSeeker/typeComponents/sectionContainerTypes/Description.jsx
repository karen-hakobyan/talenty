import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {Box} from "@mui/material";
import MUIRichTextEditor from "mui-rte";
import JobSeekerSubsection from "../../JobSeekerSubsection";
import {setTemplateData} from "../../../../../store/globalData/slice";
import {convertToRaw} from "draft-js";

export default function Description({data}) {
    const editorRef = useRef()
    const dispatch = useDispatch()
    const [value] = useState(data.metadata.submitted_value || '')
    const [editorState, setEditorState] = useState(value)
    return <JobSeekerSubsection
        label={data.name}
        // Component={
        //     <TextField
        //         placeholder={data.metadata.placeholder}
        //         variant="outlined"
        //         multiline
        //         rows={4}
        //         value={value}
        //         InputProps={{sx: {
        //             fontFamily: "'Poppins', sans-serif",
        //             fontSize: "16px",
        //             lineHeight: "24px"
        //         }}}
        //         onChange={(e) => setValue(e.target.value)}
        //         onBlur={() => {
        //             setTimeout(() => {
        //                 dispatch(setTemplateData({id: data.id, value}))
        //             }, 100)
        //         }}
        //     />
        // }
        Component={
            <Box
                sx={{
                    border: '1px solid #D9D9D9',
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
        }
    />
}
