// provide object if context does not exist purpose to destructor without additional warnings
import {useContext} from "react";

export const useDestructureContext = (Context) => {
    const result = useContext(Context)
    return result || {}
}