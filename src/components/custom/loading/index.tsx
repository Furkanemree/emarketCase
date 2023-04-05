import React from "react"
import { View, ActivityIndicator } from "react-native";
import useTheme from "../../../utils/redux-selectors/use-theme"
type Props = {
    [key: string]: any;
};

const Loading = ({ color, size = "large", flex = 0 }: Props) => {
    const theme: any = useTheme();

    return (
        <View style={{ flex: flex, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={size} color={color ? color : theme.PrimaryColor} />
        </View>
    )
}

export default React.memo(Loading);