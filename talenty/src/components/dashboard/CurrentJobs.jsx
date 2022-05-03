import {Box} from "@mui/system";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {confirmAnnoucementList} from "../../store/globalData/getTemplateActions";
import {selectAnnouncementList} from "../../store/globalData/selector";
import Tables from "../table/Table";


export default function CurrentJobs() {
    const dispatch = useDispatch()
    const announcementList = useSelector(selectAnnouncementList)
    useEffect(() => {
        dispatch(confirmAnnoucementList())
    }, [dispatch])

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
            >Current jobs</Box>
            <Tables data={announcementList}/>
        </Box>
    )
}
