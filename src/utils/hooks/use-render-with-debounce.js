import React, { useCallback, useRef, useState } from "react";

const useRenderWithDebounce = () => {
    const renderRequestCountRef = useRef(0);
    const debounceTimerRef = useRef(null);

    const [, setRenderState] = useState(false);

    const render = useCallback(() => {
        setRenderState(curr => !curr);
        renderRequestCountRef.current = 0;
    }, [])


    const renderRequest = useCallback(() => {
        renderRequestCountRef.current += 1;
        if (renderRequestCountRef.current > 40) {
            // force render
            render();
            return;
        }
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = setTimeout(() => {
            render();
        }, 350);
    }, []);

    return renderRequest;
}

export default useRenderWithDebounce;