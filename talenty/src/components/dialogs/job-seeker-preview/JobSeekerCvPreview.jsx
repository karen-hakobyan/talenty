import React from 'react'
import {Box, Divider} from "@mui/material";
import {useRightLeftSections} from "./hooks";
import Left from "./left/Left";
import Right from "./right/Right";

export default function JobSeekerCvPreview(props) {
    const [leftSections, rightSections] = useRightLeftSections()
    return (
        <Box sx={{width: '950px'}}>
            <Box sx={{display: 'flex'}}>
                {/*left part*/}
                <Box sx={{width: '322px', px: '28px', py: '30px'}}>
                    <Left data={leftSections}/>
                </Box>
                <Divider orientation='vertical' color="#c4c4c4" flexItem/>
                {/*rigth part*/}
                <Box sx={{flex: 1, px: '28px', py: '30px'}}>
                    <Right data={rightSections}/>
                </Box>
            </Box>
        </Box>
    )
}