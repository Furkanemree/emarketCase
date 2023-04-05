import React, { useState, useCallback } from "react"
import { ActivityIndicator, View } from "react-native";
import useTheme from "../../../utils/redux-selectors/use-theme"
import useCommandBusListener from "../../../infrastructure/command-bus/hooks/use-command-bus-listener";
import { CommandTypeEnum } from "../../../infrastructure/command-bus/command-type-enum";
const FullScreenLoading = () => {
    const theme = useTheme();
    const [show, setShow] = useState(false)

    useCommandBusListener(CommandTypeEnum.OpenLoading, () => callbackOpen());

    useCommandBusListener(CommandTypeEnum.CloseLoading, () => callbackClose());


    const callbackOpen = useCallback(() => {
        setShow(true);
    }, [])

    const callbackClose = useCallback(() => {
        setShow(false);
    }, [])

    return (
        <>
            {show == true ?
                < View style={{ position: "absolute", top: 0, right: 0, left: 0, bottom: 0, backgroundColor: 'rgba(51,51,51,0.2)', justifyContent: "center", borderRadius: 8 }}>
                    <ActivityIndicator style={{ marginBottom: 5 }} size="large" color={theme.PrimaryColor} />
                </View> : null
            }

        </>
    )
}

export default React.memo(FullScreenLoading);