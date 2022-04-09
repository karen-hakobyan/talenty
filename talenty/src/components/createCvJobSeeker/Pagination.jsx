import {Box} from "@mui/material";
import {useDispatch} from "react-redux";
import {setExactPage} from "../../store/globalData/slice";

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
    fontFamily: "'Poppins', sans-serif",
    cursor: 'pointer'
});

export default function Pagination({pagesCount, exactPage}) {
    let arr = fillArrForMap(pagesCount - 1);
    const dispatch = useDispatch()
    return pagesCount ? (
        <Box sx={{display: "flex", flex: 1}}>
            <Box sx={{flex: 1, display: "flex"}}>
                {arr.map((el) => (
                    <Box sx={{display: "flex", alignItems: "center", flex: 1}} key={el}>
                        <Box sx={PAGINATION_ITEM_STYLE(exactPage >= el)} onClick={() => {
                            dispatch(setExactPage(+el))
                        }}>{el}</Box>
                        {/*bellow lines stile*/}
                        {
                            el !== pagesCount ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flex: 1,
                                        pr: '2px',
                                        pl: '2px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: "2px",
                                            flex: 1,
                                            borderRadius: '3px',
                                            background: exactPage >= el ? "#7E0BD9" : "#D2D2D2",
                                        }}
                                    />
                                </Box>
                            ) : null
                        }
                    </Box>
                ))}
            </Box>
            <Box sx={PAGINATION_ITEM_STYLE(pagesCount === exactPage)}>
                {pagesCount}
            </Box>
        </Box>
    ) : null;
}
