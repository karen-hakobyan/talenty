import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ArrowBack} from "../../assets/icons/jobseeker";
import {
    TEMPLATE_INITIAL_DATA,
    TEMPLAT_DATA,
} from "../../constants/localStorage";
import {UPDATED_TEMPLATE_DATA} from "../../constants/redux/globalData";
import {
    localStorageGetter,
    localStorageSetter,
} from "../../helpers/localStorage";
import {globalDataSetter} from "../../request/get";
import Button from "../../shared/components/Button";
import SharedTemplateHeader from "../../shared/components/TemplateHeader";
import {HOME_PRIMARY_BUTTON, TEMPLATE_BUTTON_ADD} from "../../shared/styles";
import {selectGlobalDataViaKey} from "../../store/globalData/selector";
import {setGlobalDataViaKey} from "../../store/globalData/slice";
import Pagination from "./Pagination";
import UserCVBody from "./UserCVBody";

export default function CreateCvJobSeeker() {
    let [data, setData] = useState(null);
    const [unchangeData, setUnchangedData] = useState(null);
    const dispatch = useDispatch();
    const [exactPage, setExactPage] = useState(1);
    const updatedTemplateData = useSelector(
        selectGlobalDataViaKey(UPDATED_TEMPLATE_DATA)
    );
    console.log(data);

    useEffect(() => {
        if (updatedTemplateData) {
            setData(updatedTemplateData);
        }
    }, [updatedTemplateData]);
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
        <Box sx={{pt: "44px", pl: "52px", pr: "52px"}}>
            <Box sx={{display: "flex", flexDirection: "column", gap: "46px"}}>
                <Box>{data?.name}</Box>
                <Pagination pagesCount={data?.fields.length || 0} {...{exactPage}} />
            </Box>
            {/* body */}
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
            <Box sx={{display: "flex", pt: "44px"}}>
                {exactPage !== 1 ? (
                    <Button
                        sx={HOME_PRIMARY_BUTTON}
                        onClick={() => setExactPage((prev) => --prev)}
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
                    <Button sx={{...TEMPLATE_BUTTON_ADD, color: "#8C0DF0"}}>Add</Button>
                    {data?.fields && data.fields.length !== exactPage && (
                        <Button
                            sx={HOME_PRIMARY_BUTTON}
                            onClick={() => {
                                setExactPage((prev) => ++prev);
                            }}
                        >
                            Next
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
