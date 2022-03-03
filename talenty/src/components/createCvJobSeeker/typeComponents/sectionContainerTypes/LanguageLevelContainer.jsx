import {useDispatch} from "react-redux";
import {Box} from "@mui/material";
import JobSeekerSubsection from "../../JobSeekerSubsection";
import Button from "../../../../shared/components/Button";
import {setTemplateData} from "../../../../store/globalData/slice";

export default function LanguageLevelContainer({data}) {
    const dispatch = useDispatch()
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Box sx={{display: 'flex', width: '500px', gap: '16px'}}>
                {data.metadata.values.map(el => <Button
                        key={el}
                        sx={{
                            width: '156px',
                            color: '#8C8C8C',
                            border: '1px solid #8C8C8C',
                            ...(data.metadata.submitted_value === el ? {background: 'red'} : {}),
                            '&:hover': {
                                background: 'blue',
                            }
                        }}
                        onClick={() => {
                            dispatch(setTemplateData({id: data.id, value: el}))
                        }}
                    >
                        {el}
                    </Button>
                )}
            </Box>
        }
    />
}