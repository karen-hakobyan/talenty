import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import {ArrowUpSVG, OpenNavSVG} from "../../assets/icons/navigation";
import {navItemsGenerator} from "./helper";
import {
    CHILD_ICON_TEXT_CONTAINER,
    CHILD_TEXT,
    ICON_TEXT_CONTAINER,
    ITEM_CHILDREN_CONTAINER,
    MAIN_NAV_CONTAINER,
    MAIN_OPENER,
    MAIN_TEXT_STYLE,
    NAV_GENERATOR_CONTAINER,
    NAV_ITEM_CONTAINER,
} from "./style";
import {useNavigate} from "react-router-dom";
import {deleteHrCv, getTemplateLists} from "../../store/globalData/getTemplateActions";
import {useDispatch, useSelector} from "react-redux";
import {selectTemplateList} from "../../store/globalData/selector";
import { DeleteIconSVG } from "../../assets/icons/createTemplate";

function navChildDoor({setNavItemGeneratorState, isTextShown, key}) {
    if (isTextShown) {
        setNavItemGeneratorState((prev) => {
            return prev.map((elem) => {
                return elem.key === key
                    ? {...elem, open: !elem.open}
                    : elem;
            });
        });
    }
}

export default function Navigation({maxWidth, minWidth}) {
    const [navItemGeneratorState, setNavItemGeneratorState] =
        useState(navItemsGenerator());
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isTextShown, setIsTextShown] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const templateList = useSelector(selectTemplateList)
    useEffect(() => {
        dispatch(getTemplateLists())
    }, [dispatch])
    useEffect(() => {
        setNavItemGeneratorState((prev) => {
            let temp = navItemsGenerator(templateList, dispatch)
            return prev ? prev.map((el, index) => {
                return {
                    ...temp[index],
                    open: !!el.open,
                }
            }) : temp
        })
    }, [templateList, dispatch])

    useEffect(() => {
        if (!isNavOpen) {
            setIsTextShown(isNavOpen);
        } else {
            setTimeout(() => setIsTextShown(isNavOpen), 500);
        }
    }, [isNavOpen]);

    useEffect(() => {
        if (!isTextShown) {
            setNavItemGeneratorState((prev) => (
                    prev.map((item) => ({
                        ...item,
                        ...(item.open !== null ? {open: false} : {}),
                    }))
                )
            );
        }
    }, [isTextShown]);

    return (
        <Box sx={MAIN_NAV_CONTAINER(isNavOpen, maxWidth, minWidth)}>
            {/* main opener */}
            <OpenNavSVG
                onClick={() => {
                    setIsNavOpen((prev) => !prev);
                }}
                style={MAIN_OPENER(isNavOpen)}
            />
            <Box sx={NAV_GENERATOR_CONTAINER}>
                {navItemGeneratorState.map(
                    ({IconComponent, key, text, open, action, children}) => {
                        return (
                            <Box
                                {...{key}}
                                sx={{
                                    ...NAV_ITEM_CONTAINER,
                                    cursor: action ? 'pointer' : 'default'
                                }}
                                {...(action ? {onClick: () => action(navigate)} : {})}
                            >
                                <Box>
                                    <Box sx={ICON_TEXT_CONTAINER}>
                                        <IconComponent/>
                                        {isTextShown && (
                                            <Box>
                                                <Box
                                                    sx={{...MAIN_TEXT_STYLE, ...(isTextShown && open !== null ? {cursor: 'pointer'} : {})}}
                                                    onClick={() => open !== null && navChildDoor({
                                                        isTextShown,
                                                        setNavItemGeneratorState,
                                                        key
                                                    })}>{text}</Box>
                                            </Box>
                                        )}
                                    </Box>
                                    <Box sx={ITEM_CHILDREN_CONTAINER}>
                                        {isTextShown &&
                                            open &&
                                            children.map(({text, key, IconComponent, action},index) => {
                                                return (
                                                    <Box sx={CHILD_ICON_TEXT_CONTAINER} {...{key}} >
                                                        {IconComponent && <IconComponent/>}
                                                        <Box sx={{...CHILD_TEXT,  cursor: 'pointer'}}{...(action ? {
                                                         onClick: () => {
                                                            action(navigate)
                                                         }
                                                        } : {})}>{text}</Box>
                                                        {index!==0?<Box sx={{
                                                            ml:"15px",
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={()=>{
                                                            dispatch(deleteHrCv(key))
                                                        }}
                                                        ><DeleteIconSVG/></Box>:null}
                                                    </Box>
                                                );
                                            })}
                                    </Box>
                                </Box>

                                {isTextShown && open !== null ? (
                                    <ArrowUpSVG
                                        style={{
                                            ...(isNavOpen && open
                                                ? {}
                                                : {transform: "rotate(180deg)"}),
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            navChildDoor({isTextShown, setNavItemGeneratorState, key})
                                        }}
                                    />
                                ) : null}
                            </Box>
                        );
                    }
                )}
            </Box>
        </Box>
    );
}
