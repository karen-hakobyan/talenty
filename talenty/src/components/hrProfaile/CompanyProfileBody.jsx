import { Box } from "@mui/material";
import { useContext, useEffect, useState} from "react";
import { Delete, Edit, UploadVideo } from "../../assets/icons/hrProfile";
import { MultipleSelect } from "../../shared/components/Select";
import TextField from "../../shared/components/Textfield";
import { GREY_BG, TEXT } from "../../style/colors";
import { useSelectlist } from "../dashboard/hook";
import { CompanyProfile } from "./CompanyProfile";
import { POPPINS } from "../dialogs/constants";
import { body,  deleteSection, newAddSection,ProfaileTypsComponent,newAddSectionInBranches, canAddSection } from "./helper";
import ProfaileTextField from "./ProfaileTextField";
import { ADD_FILED, SECTION_STYLE, TITLE } from "./style";



export default function CompanyProfileBody({
    productsSectionInfo,setProductsSectionInfo,branchSectionInfo,setBranchSectionInfo
}) {
    const [legalForm,industry,benefits] = useSelectlist()
    const {data,setData} = useContext(CompanyProfile)
    const [aboutCompany, setAboutCompany]=useState("")
    const [additionalInformation,setAdditionalInformation]=useState("")
    useEffect(()=>{
        if(data && data.aboutCompany){
            setAboutCompany(data.aboutCompany)
        }
        if(data && data.additionalInformation){
            setAdditionalInformation(data.additionalInformation)
        }
    },[data])

    return <Box sx={{
        margin: "auto 60px"
    }}>
        <Box sx={{
            width: '100%',
            height: "1px",
            background: "#B3B4BB",
            mb: '18px'
        }} />
        <Box sx={{display:"flex",ml:"1px",gap:"266px", mb:"32px"}}>
            {body.map(el=>{
                return (<Box sx={{
                    width:"500px"
            }} key={el.id}>
                <Box>
                <Box sx={TITLE}> {el.name}</Box>
                    	<Box>{el.fields.map(el=>{
                    return (
                    <Box key={el.id} sx={{
                        display:"flex",
                        
                    }}>
                        <Box sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize:"16px",
                            lineHeight:"24px",
                            color: TEXT,
                            display:"flex",
                            alignItems:"center",
                            width:"100%",
                            mb:"30px",
                            "& > span":{
                                width:"180px",
                                mr: '5px',
                            },

                        }}>
                            <span>{el.name}</span>
                            <ProfaileTypsComponent type={el.type} placeholder={el.placeholder}
                                menuItems={el.type === "legal_form"? legalForm?.values : industry?.values}
                             />
                        </Box>
                        
                    </Box>)
                })}</Box>
                </Box>
                
            </Box>)
            })}
        </Box>
        <Box sx={{
            width: '100%',
            height: "1px",
            background: "#B3B4BB",
            mb: '30px',
            mt: "30px"
        }} />
            <Box>
            <Box sx={TITLE}>About Company </Box>
            <TextField
                inputPropsSx={{height: "100%",}}
                sx={{width:"100%"}}
                value={aboutCompany}
                onChange = {(e)=>{
                    setAboutCompany(e.target.value)
                }}
                onBlur = {()=>{
                    setData({
                        ...data,
                        aboutCompany:aboutCompany
                    })
                }}
                variant="outlined"
                multiline
                rows={5}
             />
        </Box>
        <Box sx={{
            width: '100%',
            height: "1px",
            background: "#B3B4BB",
            mb: '30px',
            mt: "30px"
        }} />
        <Box>
        <Box sx={{display:"flex",alignContent:"center", gap:"23px",...TITLE}}>
                <Box>Products</Box>
                <Box sx={ADD_FILED} onClick={()=>{
                    if(canAddSection(productsSectionInfo)){
                        setProductsSectionInfo(newAddSection(productsSectionInfo))
                    }
                }} ><span>+</span>Add product</Box>
            </Box>
            <Box>
                {productsSectionInfo.map(({id,fields,isEditing})=>{
                    return<Box key={id} sx={{
                        display:"flex",
                        justifyContent:"space-between",
                        mb:"24px",
                        width:"680px",
                        "&:last-of-type":{mb:0}
                    }}>
                        {fields.map(el=>{
                            if(isEditing && el.value){
                                return <Box key={el.id} sx={SECTION_STYLE}>{el.value}</Box>
                            }
                            return <ProfaileTextField key={el.id} childId={el.id} parentId={id} placeholder={el.placeholder} data={productsSectionInfo} setData={setProductsSectionInfo} values={el.value} type={el.type} />
                        })}
                        <Box sx={{
                            display:"flex",
                        }}>
                            {isEditing && <Box sx={{mr:"23px",cursor:"pointer"}} 
                            onClick={()=>{
                                setProductsSectionInfo(productsSectionInfo.map(el=>{
                                    if(el.id === id){
                                        return{
                                            ...el,
                                            isEditing:false
                                        }
                                    }
                                    return el
                                }))
                            }}><Edit/></Box>}
                            {productsSectionInfo.length !== 1 && <Box sx={{cursor:"pointer"}} 
                            onClick={()=>{
                                setProductsSectionInfo(deleteSection(id,productsSectionInfo))
                            }}
                            ><Delete/></Box>}
                        </Box>
                    </Box>
                })}
            </Box>
        </Box>
        <Box sx={{
            width: '100%',
            height: "1px",
            background: "#B3B4BB",
            gap: "26px",
            mb: '30px',
            mt: "30px"
        }} />
        <Box >
            <Box sx={{display:"flex",alignContent:"center", gap:"23px",...TITLE}}>
                <Box>Branches</Box>
                <Box sx={ADD_FILED} onClick={()=>{
                    if(canAddSection(branchSectionInfo)){
                        setBranchSectionInfo(newAddSectionInBranches(branchSectionInfo))
                    }
                }} ><span>+</span>Add branch</Box>
            </Box>
            <Box>
                {branchSectionInfo && branchSectionInfo.map(({id,fields,isEditing})=>{
                    return <Box key={id} sx={{
                        display:"flex",
                        width:isEditing?"600px":"100%",
                        justifyContent:"space-between",
                        mb:"24px",
                        "&:last-of-type":{mb:0}
                    }}>
                        {fields.map(el=>{
                            if(isEditing && el.value !== ""){
                                return <Box key={el.id} sx={SECTION_STYLE}>{el.value}</Box>
                            }
                            return <ProfaileTextField 
                            key={el.id} 
                            childId={el.id} 
                            parentId={id} 
                            placeholder={el.placeholder} 
                            data={branchSectionInfo} 
                            setData={setBranchSectionInfo}
                            values={el.value}
                            type={el.type}/>
                        })}
                        <Box sx={{
                            display:"flex",
                        }}>
                            {isEditing && <Box sx={{mr:"23px",cursor:"pointer"}} 
                            onClick={()=>{
                                setBranchSectionInfo(branchSectionInfo.map(el=>{
                                    if(el.id === id){
                                        return{
                                            ...el,
                                            isEditing:false
                                        }
                                    }
                                    return el
                                }))
                            }}><Edit/></Box>}
                            {branchSectionInfo.length !== 1 && <Box sx={{cursor:"pointer"}} 
                            onClick={()=>{
                                setBranchSectionInfo(deleteSection(id,branchSectionInfo))
                            }}
                            ><Delete/></Box>}
                        </Box>
                    </Box>
                }) }
            </Box>
        </Box>
        <Box sx={{
            width: '100%',
            height: "1px",
            background: "#B3B4BB",
            mb: '30px',
            mt: "30px",
        }} />
        <Box>
            <Box sx={TITLE}>Benefits</Box>
            <MultipleSelect
             menuItems={benefits?.values}
             value = {data.benefits || undefined}
             placeHolder="Benefits"
             onChange={(event) => {
                if (event.target.value.length === new Set(event.target.value).size) {
                    setData({
                        ...data,
                        benefits:event.target.value
                    })
                    // setValue(event.target.value.join('&&'))
                }
            }}
             fieldStyle={{width:"100%"}}
             />
        </Box>
        <Box sx={{
            width: '100%',
            height: "1px",
            background: "#B3B4BB",
            mb: '30px',
            mt: "30px",
            	    }} />
            <Box sx={TITLE}>Video upload</Box>
            <Box sx={{
            width:"631px",
            height:"351px",
            borderRadius:"23px",
            backgroundColor:GREY_BG,
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            mb:"30px"
            }}>
            <Box sx={{
                width:"191px",
                height:"106px",
                borderRadius:"6px",
                border:"1px solid #C4C4C4",
                backgroundColor:"#fff",
                }}>
                <Box sx={{
                    display:"flex",
                    justifyContent:"center",
            
                    }}>
                    <Box sx={{
                        fontFamily:POPPINS,
                        fontSize:"14px",
                        lineHeight:"21px",
                        fontWeight:300,
                        color:"#A09898",
                        mt:"22px",
                        
                        "& div":{
                            mt:"15px",
                            display:"flex",
                            justifyContent:"center"
                        }
                        }}>
                            Upload Your Video
                            <div><UploadVideo/></div>
                            </Box>
                </Box>
            </Box>
        </Box>
        <Box sx={{mb:"30px",...TITLE}}>Additional information</Box>
        <Box>
        <TextField
                inputPropsSx={{height: "100%",}}
                sx={{width:"100%"}}
                variant="outlined"
                value ={additionalInformation}
                onChange = {e=>{
                    setAdditionalInformation(e.target.value)
                }}
                onBlur={()=>{
                    setData({
                        ...data,
                        additionalInformation:additionalInformation
                    })
                }}
                multiline
                rows={5}
             />
        </Box>
    </Box>
}
