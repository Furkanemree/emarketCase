import React, { useEffect, useState } from "react"
import { AppState, StyleSheet, Text, View } from "react-native";
const useAppState = () => {
    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
        const run = nextAppState => {
            if (appState !== nextAppState)
                setAppState(nextAppState)
        };

        AppState.addEventListener("change", run);

        return () => {
            AppState.removeEventListener("change", run);
        };
    }, [appState]);


    return {
        state: appState,
        active: appState === "active",
        background: appState === "background",
        extension: appState === "extension",
        inactive: appState === "inactive",
        unknown: appState === "unknown",
    }
}
export default useAppState;