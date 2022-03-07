import React, {memo} from 'react'
import {useDispatch} from "react-redux";
import {Box} from "@mui/material";
import {sectionContainerTypes} from "./typeComponents/sectionContainerTypes/types";
import {addPublicationsSection} from "../../store/globalData/slice";

const ADD_BUTTON_STYLE = {
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '22px',
    color: '#8C0DF0',
    cursor: 'pointer',
    right: 0,
}
export default function PublicationSection({data}) {
    const dispatch = useDispatch()
    const articles = data.fields.filter(el => el.name === 'Article section');
    const books = data.fields.filter(el => el.name !== 'Article section');

    return <Box sx={{display: 'flex'}}>
        {/*articles below*/}
        {generatePublicationsBlock({fields: articles, isBook: false, dispatch, id: data.id})}
        <Box sx={{flex: 1}}/>
        {/*books below*/}
        {generatePublicationsBlock({fields: books, isBook: true, dispatch, id: data.id})}
    </Box>
}

function generatePublicationsBlock({fields, isBook, dispatch, id}) {
    return (
        <Box sx={{position: 'relative'}}>
            <Box sx={{position: 'absolute', ...ADD_BUTTON_STYLE}}
                 onClick={() => dispatch(addPublicationsSection({id, isBook}))}>+ Add</Box>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '28px'}}>
                {fields.map(el => {
                    return el.fields.map((element, index) => {
                        let TempComponent = sectionContainerTypes[element.metadata.type]
                        if (!TempComponent) {
                            return null
                        }
                        TempComponent = memo(TempComponent)
                        return (
                            <Box key={element.id} sx={{mt: +index !== 0 && element.name ? '10px' : '0px'}}>
                                <TempComponent data={element}/>
                            </Box>
                        )
                    })
                })}
            </Box>
        </Box>
    )
}