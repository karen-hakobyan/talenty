import {Box} from "@mui/system"
import {useNavigate} from "react-router-dom";
import TalentyAuth from "../../assets/icons/signImages/company.webp";
import TalentyAuth2 from "../../assets/icons/signImages/user.webp"
import {TalentyLogo} from "../../assets/sign";

function BackgroundImage({children, img}) {
    const navigate = useNavigate;
    return (<Box sx={{
        display: "flex",
        justifyContent: "space-between"
    }}>
        <Box sx={{
            zIndex: 1000
        }}>
            {children}

        </Box>

        <Box sx={{
            img: {
                height: 754,
                widht: "auto",
                minHeight: "23.75rem",
                maxWidth: "35rem",
            },
            position: "relative",
        }
        }>
            <img src={img ? TalentyAuth : TalentyAuth2} alt="Talenty"/>
            <Box sx={{
                position: "absolute",
                top: 43,
                right: 60,
                cursor: "pointer"
            }}
                 onClick={() => navigate("/")}>
                <TalentyLogo/>
            </Box>

        </Box>
    </Box>)
}

export default BackgroundImage