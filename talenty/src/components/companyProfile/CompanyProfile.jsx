import React, {  useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useHrProfaileUsersinfo } from "../dashboard/hook";
import Button from "../../shared/components/Button";
import { PINK_BUTTON } from "../../shared/styles";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/auth/authSlice";
import { instance, POST_UPDATE_COPMANY_PROFILE_INFO } from "../../constants/requests";
import { genId } from "../dashboard/helper";
import { branchSection, productsSection, takeTheBranchisValues, takeTheProductsValues } from "./helper";
import CompanyProfileHeder from "./CompanyProfileHeder";
import CompanyProfileBody from "./CompanyProfileBody";

export const CompanyProfile = React.createContext()

export default function ProfileOfCompany() {
    const dispatch = useDispatch()
    const [data,setData,setUpdatePage,updatePage] = useHrProfaileUsersinfo()
    const [productsSectionInfo,setProductsSectionInfo]=useState([])
    const [branchSectionInfo,setBranchSectionInfo] = useState([])
    useEffect(() => {
        if(data.products?.length) {
            setProductsSectionInfo(data.products.map(el => {
                return {
                    id: genId(),
                    isEditing:true,
                    fields: [
                        {
                            id: genId(),
                            placeholder: 'Product name',
                            value: el.productName,
                        },
                        {
                            id: genId(),
                            placeholder: "Product link",
                            value: el.productLink,
                        }
                    ]
                }
            }))
        }
        if(data.products && !data.products.length) {
            setProductsSectionInfo(productsSection)
        } 
    }, [data.products])
    useEffect (()=>{
        if(data?.branches?.length){
            setBranchSectionInfo(data?.branches.map(el=>{
                return {
                    id:genId(),
                    isEditing:true,
                    fields:[
                        {
                            type: "select",
                            id: genId(),
                            placeholder: "-Country-",
                            value: el.country,
                        },
                        {
                            type: "input",
                            id: genId(),
                            placeholder: "City",
                            value: el.city
                        },
                        {
                            type: "number",
                            id: genId(),
                            placeholder: "Number of employees 100",
                            value: el.numberOfEmployees
                        }
                    ]
                }
            }))
        }
        if(!data?.branches?.length){
            setBranchSectionInfo(branchSection)
        }
    },[data.branches])

    return <Box>
        <CompanyProfile.Provider value={
            {
                data:data,
                setData:setData
            }
        }>
        <CompanyProfileHeder />
        <Box sx={{
            mt: "147px"
        }}>
            <CompanyProfileBody
            productsSectionInfo={productsSectionInfo} 
            setProductsSectionInfo={setProductsSectionInfo} 
            branchSectionInfo= {branchSectionInfo}
            setBranchSectionInfo = {setBranchSectionInfo}
             />
        </Box>
        </CompanyProfile.Provider>
        <Box sx={{
            margin:"84px 0 80px",
            display:"flex",
            justifyContent:"flex-end"
        }}>
                    <Button
                        onClick={()=>{
                            dispatch(setLoading(true));

                            instance.post(POST_UPDATE_COPMANY_PROFILE_INFO,{
                                ...data,
                                products: takeTheProductsValues(productsSectionInfo),
                                branches: takeTheBranchisValues(branchSectionInfo)
                            }).then(response=>{
                                setUpdatePage(!updatePage)
                            }).catch(err=>{
                                dispatch(setLoading(false))
                                console.log(err);
                            })
                        }}
                        sx={{...PINK_BUTTON, width: "147px",mr:"66px"}}
                        style={{textTransform: "none"}}
                    >
                        Save
                    </Button>

        </Box>
        
    </Box>
}
