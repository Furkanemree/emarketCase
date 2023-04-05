import React from "react";
import { BackHandler, View } from "react-native";
import KeyboardSecureView from "../keyboard-secure-view";
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from "react-redux";
import CommandBus from "../../../infrastructure/command-bus/command-bus";
import { CommandTypeEnum } from "../../../infrastructure/command-bus/command-type-enum";
import useTheme from "../../../utils/redux-selectors/use-theme"

type Props = {
    [key: string]: any;
};
const ScreenContainer = (({
    children,
    color,
    tabs = false,
    style,
}: Props) => {

    const modal = useSelector((x:any) => x.modal)
    const theme = useTheme();
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (modal?.modals?.length > 0) {
                    CommandBus.sc.publish(CommandTypeEnum.modalClose);
                    return true
                }
                else {
                    return false;
                }

            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [modal])
    );

    return (
        <View style={{ flex: 1, backgroundColor: !color ? theme.White : color, ...style }}>
            <>
                {!tabs &&
                    <KeyboardSecureView>
                        {children}
                    </KeyboardSecureView>
                }
                {tabs &&
                    <View style={{ flex: 1 }}>
                        {children}
                    </View>

                }
            </>
        </View>
    )
}
)
export default ScreenContainer;