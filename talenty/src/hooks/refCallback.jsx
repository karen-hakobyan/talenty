import {useCallback, useRef} from "react";

function useHookWithRefCallback() {
    const ref = useRef(null)
    const setRef = useCallback(node => {
        ref.current = node
    }, [])

    return [setRef]
}
export default useHookWithRefCallback