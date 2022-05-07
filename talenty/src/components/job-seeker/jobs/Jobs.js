import {useDispatch} from "react-redux";
import {setLoading} from "../../../store/auth/authSlice";

export default function Jobs() {
    const dispatch = useDispatch()
    return <div>
        <button onClick={() => {
            dispatch(setLoading(true))
        }}>click to load
        </button>
    </div>
}