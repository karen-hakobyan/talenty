import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, TextField} from "@mui/material";
import JobSeekerSubsection from "../job-seeker/createCvJobSeeker/JobSeekerSubsection";
import {changeDialogDataById} from "../../store/dialogs/slice";
import {DeleteIcon} from "../../assets/icons/jobseeker";
import {onDelete} from "../../helpers/dialog";
import {selectDialogData} from "../../store/dialogs/selector";
import {convertToRaw} from "draft-js";
import MUIRichTextEditor from "mui-rte";
import {ReactComponent as RequiredSVG} from "../../assets/icons/required.svg";

export default function Description({data}) {
    const editorRef = useRef()
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    const [editorState, setEditorState] = useState(value)
    const dispatch = useDispatch()
    const dialogData = useSelector(selectDialogData);
    const id = data.id
    return <JobSeekerSubsection
        label={<Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        }}><Box>{data.metadata.required ?
            <Box>{data.name}<RequiredSVG style={{marginBottom: '10px'}}/></Box> : data.name}</Box>
            {/*if have only one field do not give chance to delete it*/}
            {data.metadata.deletable && dialogData.fields.length !== 1 ? (
                <Box
                    sx={{
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        onDelete({dialogData, id, dispatch})
                    }}
                >
                    <DeleteIcon/>
                </Box>
            ) : null}
        </Box>
        }
        Component={data.metadata.required ? <TextField
            placeholder={data.metadata.placeholder}
            variant="outlined"
            multiline
            rows={3}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => dispatch(changeDialogDataById({id: data.id, value}))}
        /> : <Box
            sx={{
                border: '1px solid #D9D9D9',
                borderRadius: '4px',
                minHeight: '152px',
                pt: '0px',
                pl: '30px',
                pr: '30px',
                pb: '15px',
                width: '1038px',
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
                        dispatch(changeDialogDataById({id: data.id, value: editorState}))
                    }
                }
            />
        </Box>}
    />
}
