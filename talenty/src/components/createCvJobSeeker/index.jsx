import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TEMPLATE_INITIAL_DATA,
  TEMPLAT_DATA,
} from "../../constants/localStorage";
import { UPDATED_TEMPLATE_DATA } from "../../constants/redux/globalData";
import {
  localStorageGetter,
  localStorageSetter,
} from "../../helpers/localStorage";
import { globalDataSetter } from "../../request/get";
import { selectGlobalDataViaKey } from "../../store/globalData/selector";
import { setGlobalDataViaKey } from "../../store/globalData/slice";

export default function CreateCvJobSeeker() {
  let [data, setData] = useState(null);
  const [unchangeData, setUnchangedData] = useState(null);
  const dispatch = useDispatch();
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
      dispatch(setGlobalDataViaKey({ key: TEMPLAT_DATA, value: data }));
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
  return <Box sx={{ pt: "44px", pl: "52px", pr: "52px" }}>tenas ashxatec</Box>;
}
