import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, TextField} from "@mui/material";
import JobSeekerSubsection from "../createCvJobSeeker/JobSeekerSubsection";
import {changeDialogDataById} from "../../store/dialogs/slice";
import {DeleteIcon} from "../../assets/icons/jobseeker";
import {onDelete} from "../../helpers/dialog";
import {selectDialogData} from "../../store/dialogs/selector";
import {convertToRaw} from "draft-js";
import MUIRichTextEditor from "mui-rte";

const defaultValue = {
    "blocks": [{
        "key": "b91t9",
        "text": "salkdfjalskdfljksd",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
    }], "entityMap": {}
}
export default function Description({data}) {
    const editorRef = useRef()
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    const dispatch = useDispatch()
    const dialogData = useSelector(selectDialogData);
    const id = data.id
    return <JobSeekerSubsection
        label={<Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        }}><Box>{data.metadata.required ? <Box>{data.name} *</Box> : data.name}</Box>
            {data.metadata.deletable ? (
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
                p: '0px 30px',
                width: '1038px',
            }}
            onClick={() => {
                editorRef.current.focus()
            }}
        >
            <MUIRichTextEditor
                ref={editorRef}
                controls={['title', 'italic', 'bold', 'underline', 'numberList', 'bulletList']}
                defaultValue={JSON.stringify(defaultValue)}
                onChange={(editorState) => {
                    const result = convertToRaw(editorState.getCurrentContent())
                }}
                onBlur={
                    () => {
                    }
                }
            />
        </Box>}
    />
}
