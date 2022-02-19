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

export default function Navigation({maxWidth, minWidth}) {
    const [navItemGeneratorState, setNavItemGeneratorState] =
        useState(navItemsGenerator);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isTextShown, setIsTextShown] = useState(false);

    useEffect(() => {
        if (!isNavOpen) {
            setIsTextShown(isNavOpen);
        } else {
            setTimeout(() => setIsTextShown(isNavOpen), 0.5 * 1000);
        }
    }, [isNavOpen]);

    useEffect(() => {
        if (!isTextShown) {
            setNavItemGeneratorState((prev) =>
                prev.map((item) => ({
                    ...item,
                    ...(item.open !== null ? {open: false} : {}),
                }))
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
                    ({IconComponent, key, text, open, children}) => {
                        return (
                            <Box {...{key}} sx={NAV_ITEM_CONTAINER}>
                                <Box>
                                    <Box sx={ICON_TEXT_CONTAINER}>
                                        <IconComponent/>
                                        {isTextShown && (
                                            <Box>
                                                <Box sx={MAIN_TEXT_STYLE}>{text}</Box>
                                            </Box>
                                        )}
                                    </Box>
                                    <Box sx={ITEM_CHILDREN_CONTAINER}>
                                        {isTextShown &&
                                            open &&
                                            children.map(({text, key, IconComponent}) => {
                                                return (
                                                    <Box sx={CHILD_ICON_TEXT_CONTAINER} {...{key}}>
                                                        {IconComponent && <IconComponent/>}
                                                        <Box sx={CHILD_TEXT}>{text}</Box>
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
                                            if (isTextShown) {
                                                setNavItemGeneratorState((prev) => {
                                                    return prev.map((elem) => {
                                                        return elem.key === key
                                                            ? {...elem, open: !elem.open}
                                                            : elem;
                                                    });
                                                });
                                            }
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
