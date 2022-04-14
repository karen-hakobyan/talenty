import {memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box} from "@mui/material";
import typeComponents, {TYPES_TAKES_WHOLE_ROW} from "./typeComponents/typeComponents";
import {selectSectionContainerController} from "../../store/globalData/selector";
import {setSectionContainerController} from "../../store/globalData/slice";
import {UN_CLOSABLE_SECTION_CONTAINERS} from "./constants";
import PublicationSection from "./Publications";

export default function UserCVBody({data}) {
    const dispatch = useDispatch()
    const sectionContainerController = useSelector(selectSectionContainerController)
    useEffect(() => {
        if (data?.fields[0].metadata.type === 'section_container' && sectionContainerController?.name !== data.name && !UN_CLOSABLE_SECTION_CONTAINERS.includes(data.name)) {
            dispatch(setSectionContainerController({name: data.name, activeIndex: data.fields.length - 1}))
        }
        if (UN_CLOSABLE_SECTION_CONTAINERS.includes(data.name)) {
            dispatch(setSectionContainerController(null))
        }
    }, [dispatch, sectionContainerController, data])

    if (!data) {
        return null;
    }

    if (data.name === 'Publications') {
        return <PublicationSection {...{data}} />
    }

    return <Box
        sx={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', justifyContent: 'space-between', rowGap: '38px'}}>
        {data?.fields.filter(el => el.metadata.status !== 'DELETED').map((el, index) => {
            let TempComponent = typeComponents[el.metadata.type]
            if (!TempComponent) {
                return null
            }
            return (
                <Box sx={{
                    width: '100%',
                    ...(TYPES_TAKES_WHOLE_ROW.includes(el.metadata.type) || (el.metadata.type === 'section' && el.fields[0].metadata.type !== 'salary') ? {
                        gridColumnStart: 1,
                        gridColumnEnd: 3,
                    } : {display: 'flex', justifyContent: index % 2 !== 0 ? 'flex-end' : 'flex-start'})
                }} key={el.id}>
                    <TempComponent data={el} {...{index}} fields={data.fields} sectionid={data.id}/>
                </Box>
            )
        })}
    </Box>;
}
