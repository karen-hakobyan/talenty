import React,{ useState }  from "react"
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { UploadPhoto } from "../../assets/icons/hrProfile";
import { MAIN_PURPLE } from "../../style/colors";
import { socialMediaData } from "./helper";
import { SocialLinks } from "./SocialLinks";

const CostumInput = styled("input")((theme) => ({
    minWidth: "50px",
    outline: "none",
    border: "none",
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "18px"
}))

export default function HrProfaileHeder() {
    const [value, setValue] = useState("System Company",)
    const [mediaData, setMediaData] = useState(socialMediaData)
    const onClose=()=>{
        setMediaData(mediaData.map(el=>{
            return {
                ...el,
                open:false
            }
        }))
    }
    return <Box>


        <Box sx={{ position: "relative" }}>
            <Box sx={{
                position: "relative",
                background: "#000",
                height: 391
            }}>
                <Box sx={{
                    position: "absolute",
                    top: "25px",
                    right: "65px"
                }}>
                    <UploadPhoto />
                </Box>
            </Box>
            <Box sx={{
                position: "absolute",
                top: 358,
                left: 60,
                display: "flex",
                alignItems: "center",
                width: "calc(100%-60px)",
                justifyContent: "space-between",
                "& span": {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    ml: 2
                },

            }}>
                <Box sx={{
                    display: "flex"
                }}>
                    <Box sx={{
                        display: "flex",
                        position: "relative",
                        background: MAIN_PURPLE,
                        width: "106px",
                        height: "106px",
                        borderRadius: "15px"
                    }} >
                        <Box sx={{
                            width: "12px",
                            height: "10.38px",
                            position: "absolute",
                            top: "12px",
                            right: "24px"
                        }}>
                            <UploadPhoto />
                        </Box>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            flexDirection: "column",
                            width: "100%",
                            "& span": {
                                fontFamily: 'Poppins',
                                fontSize: "10px",
                                lineHeight: "15px",
                                width: "100%",
                                color: "#fff",
                                display: "flex",
                                height: 33,
                                borderRadius: "15px",
                                transition: "all .5s",
                                margin: "0 auto"
                            },
                            "& span:hover": {
                                background: "#6a0ab6",
                                transition: "all .5s",
                            }

                        }}>
                            <span>Add Profile Photo</span>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: 2
                    }}>
                        <CostumInput
                            value={value}
                            onChange={e => {
                                setValue(e.target.value)
                                console.log(value);
                            }}
                        // onBlur={() => {
                        //     setData({
                        //         ...data,
                        //         name: value
                        //     })

                        // }}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                position: "absolute",
                right: 60,
                bottom: -40,
            }}>
                <Box sx={{
                    position: "relative",
                    display: "flex",
                }}>
                    {mediaData.map(({ id, open, Icon, placeholder }) => (
                        <React.Fragment key={id}>
                        <Box sx={{
                            mr: "34px",
                            // mb: open && "-20px",
                            width: "29ox",
                            height: "29px",
                            cursor: "pointer",
                            "&:nth-last-of-type(1)": {
                                mr: 0
                            }
                        }}
                            onClick={() => {
                                setMediaData(mediaData.map(el => {
                                    if (el.id === id) {
                                        return {
                                            ...el,
                                            open: true
                                        }
                                    } else {
                                        return {
                                            ...el,
                                            open: false
                                        }
                                    }
                                }
                                ))
                            }}
                        >
                            <Icon />
                        </Box>
                        {open && <SocialLinks placeholder={placeholder} onClose={onClose} />}
                        </React.Fragment>
                    ))}
                </Box>
            </Box>
        </Box>
    </Box>
}
