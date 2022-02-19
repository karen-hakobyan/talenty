import {Box} from "@mui/material";

function fillArrForMap(count) {
    let arr = [];
    for (let i = 1; i <= count; i++) {
        arr.push(i);
    }
    return arr;
}

let PAGINATION_ITEM_STYLE = (active) => ({
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    color: "#FFFFFF",
    background: active ? "#7E0BD9" : "#D2D2D2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    fontFamily: "Proxima Nova",
});

export default function Pagination({pagesCount, exactPage}) {
    let arr = fillArrForMap(pagesCount - 1);
    return pagesCount ? (
        <Box sx={{display: "flex", flex: 1}}>
            <Box sx={{flex: 1, display: "flex"}}>
                {arr.map((el) => (
                    <Box sx={{display: "flex", alignItems: "center", flex: 1}} key={el}>
                        <Box sx={PAGINATION_ITEM_STYLE(exactPage >= el)}>{el}</Box>
                        {el !== pagesCount ? (
                            <Box
                                sx={{
                                    flex: 1,
                                    height: "2px",
                                    background: exactPage >= el ? "#7E0BD9" : "#D2D2D2",
                                }}
                            />
                        ) : null}
                    </Box>
                ))}
            </Box>
            <Box sx={PAGINATION_ITEM_STYLE(pagesCount === exactPage)}>
                {pagesCount}
            </Box>
        </Box>
    ) : null;
}