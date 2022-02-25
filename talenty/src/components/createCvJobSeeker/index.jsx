import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ArrowBack} from "../../assets/icons/jobseeker";
import {
    TEMPLATE_INITIAL_DATA,
    TEMPLAT_DATA,
} from "../../constants/localStorage";
import {
    localStorageGetter,
    localStorageSetter,
} from "../../helpers/localStorage";
import {globalDataSetter} from "../../request/get";
import Button from "../../shared/components/Button";
import SharedTemplateHeader from "../../shared/components/TemplateHeader";
import {HOME_PRIMARY_BUTTON, TEMPLATE_BUTTON_ADD} from "../../shared/styles";
import {setExactPage, setGlobalDataViaKey, setNextPage, setPrevPage} from "../../store/globalData/slice";
import Pagination from "./Pagination";
import UserCVBody from "./UserCVBody";

export default function CreateCvJobSeeker() {
    let [data, setData] = useState(null);
    const [, setUnchangedData] = useState(null);
    const dispatch = useDispatch();
    const exactPage = useSelector((state) => state.globalData.exactPage)

    useEffect(() => {
        if (!exactPage) {
            dispatch(setExactPage(1))
        }
    }, [dispatch, exactPage])
    // update local storage whenever data changed and also redux
    useEffect(() => {
        if (data) {
            let unchangedData = localStorageGetter(TEMPLATE_INITIAL_DATA);
            setUnchangedData(unchangedData);
            localStorageSetter(TEMPLAT_DATA, data);
            dispatch(setGlobalDataViaKey({key: TEMPLAT_DATA, value: data}));
        }
    }, [data, dispatch]);
    useEffect(() => {
        let storageExistingData = localStorageGetter(TEMPLAT_DATA);

        storageExistingData
            ? setData(storageExistingData)
            : globalDataSetter({
                stateSetter: (data) => {
                    setData(data);
                    localStorageSetter(TEMPLATE_INITIAL_DATA, data);
                },
                urlKey: "getTemplates",
            });
    }, []);

    if (!data) {
        return null;
    }
    return (
        <Box sx={{pt: "44px", pl: "52px", pr: "52px", minHeight: '100vh'}}>
            <Pagination pagesCount={data?.fields.length || 0} {...{exactPage}} />
            {/* body */}
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 'calc(100vh - 130px)'}}>
                <Box
                    sx={{
                        mt: "44px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "42px",
                    }}
                >
                    <SharedTemplateHeader title={data?.fields[exactPage - 1]?.name}/>
                    <UserCVBody data={data?.fields[exactPage - 1]}/>
                </Box>
                {/* actions bellow*/}
                <Box sx={{display: "flex", pt: '44px', pb: '40px'}}>
                    {exactPage !== 1 ? (
                        <Button
                            sx={HOME_PRIMARY_BUTTON}
                            onClick={() => dispatch(setPrevPage())}
                        >
                            <ArrowBack/>
                            Back
                        </Button>
                    ) : null}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            flex: 1,
                            gap: "12px",
                        }}
                    >
                        {data?.fields[exactPage - 1].fields[0].metadata.type === 'section_container' && <Button sx={{...TEMPLATE_BUTTON_ADD, color: "#8C0DF0"}}>Add</Button>}
                        {data?.fields && data.fields.length !== exactPage && (
                            <Button
                                sx={HOME_PRIMARY_BUTTON}
                                onClick={() => {
                                    dispatch(setNextPage())
                                }}
                            >
                                Next
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
