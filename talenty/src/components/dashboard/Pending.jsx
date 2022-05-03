import {Box} from "@mui/material";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {pendingAnnoucementList} from "../../store/globalData/getTemplateActions";
import {selectAnnouncementList} from "../../store/globalData/selector";
import Tables from "../table/Table";


export default function Pending() {
    const dispatch = useDispatch()
    const announcementList = useSelector(selectAnnouncementList)
    useEffect(() => {
        dispatch(pendingAnnoucementList())
    }, [dispatch])
    if (!announcementList) {
        return null
    }

    return (
        <Box sx={{
            flex: 1,
            padding: "24px 24px 0",
        }}>
            <Box
                sx={{
                    fontFamily: 'Poppins',
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: 32,
                    color: "#5A029F",
                    marginBottom: 5.5
                }}
            >Pending jobs</Box>
            <Tables data={announcementList}/>
        </Box>
    )
}
