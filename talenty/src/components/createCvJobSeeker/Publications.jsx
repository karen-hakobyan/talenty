import React from 'react'
import {useDispatch} from "react-redux";
import {Box} from "@mui/material";
import {sectionContainerTypes} from "./typeComponents/sectionContainerTypes/types";
import {AddIcon, DeleteIcon} from "../../assets/icons/jobseeker";
import {addPublicationsSection, deletePublicationAction} from "../../store/globalData/slice";

export default function PublicationSection({data}) {
    const articles = data.fields.filter(el => el.name === 'Article section');
    const books = data.fields.filter(el => el.name !== 'Article section');

    return <Box sx={{display: 'flex'}}>
        {/*articles below*/}
        {/*{GeneratePublicationsBlock({fields: articles, isBook: false, dispatch, id: data.id, templateData})}*/}
        <GeneratePublicationsBlock fields={articles} id={data.id}/>
        <Box sx={{flex: 1}}/>
        {/*books below*/}
        {/*{GeneratePublicationsBlock({fields: books, isBook: true, id: data.id})}*/}
        <GeneratePublicationsBlock fields={books} id={data.id} isBook/>
    </Box>
}

function GeneratePublicationsBlock({fields, isBook, id, templateData}) {
    const dispatch = useDispatch()
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '28px', position: 'relative'}}>
            {fields.filter(el => el.metadata.status !== 'DELETED').map((el, index1, arr) => {
                return <Box sx={{position: 'relative'}} key={el.id}>
                    <Box sx={{display: 'flex', gap: '25px', position: 'absolute', right: 0}}>
                        {
                            arr.length !== 1 && <DeleteIcon style={{cursor: 'pointer'}} onClick={() => {
                                dispatch(deletePublicationAction(el.id))
                                // deletePublications({dispatch, templateData, id: el.id})
                            }}/>
                        }
                        {
                            index1 === 0 && <AddIcon
                                style={{cursor: 'pointer'}}
                                onClick={() => dispatch(addPublicationsSection({id, isBook}))}
                            />
                        }
                    </Box>
                    {
                        el.fields.map((element, index2) => {
                            let TempComponent = sectionContainerTypes[element.metadata.type]
                            if (!TempComponent) {
                                return null
                            }
                            return (
                                <Box
                                    key={element.id}
                                    sx={{mt: +index2 !== 0 && element.name ? '10px' : '0px'}}
                                >
                                    <TempComponent data={element}/>
                                </Box>
                            )
                        })
                    }
                </Box>
            })}
        </Box>
    )
}

