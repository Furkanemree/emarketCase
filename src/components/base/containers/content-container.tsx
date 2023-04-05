import React from "react";
import { View } from "react-native";
import useTheme from "../../../utils/redux-selectors/use-theme";
type Props = {
    [key: string]: any;
};
const ContentContainer = ({
    children,
    top = 10,
    flex = 1,
    bottom = 4,
    color,
    vertical = 0,
    style,
}: Props) => {
    const theme: any = useTheme()
    return (
        <View style={{ flex: flex, paddingHorizontal: 16, backgroundColor: color ? color : theme.BackgroundColor, paddingVertical: vertical, paddingTop: top, paddingBottom: bottom, ...style }}>
            {children}
        </View>
    )
}

export default ContentContainer;